import { supabase } from "@/lib/supabase-node";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
import OpenAI from "openai";
dotenv.config({ path: "./.env.local" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
    try {


        const query = await req.json()

        await supabase.from("Logs").insert({query})

        //----1.---//
        const { data: semifilter, error } = await supabase.from("Events").select("*")



        if (error) throw error

        //---2.---//

        const candidates = semifilter.map((e: any) => ({
            id: e.eventid,

            name: e.name,
            description: e.description,
            city: e.cityid,
            date: e.date,
            location: e.location,
            people: e.people,
        }))

        candidates ? console.log(candidates.length) : console.log("database error")

        //---3---//



        console.log(query)

        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini-2025-04-14",
            messages: [
                {
                    role: "system",
                    content: `You are an assistant that filters events by a user query and outputs only their IDs.
                    Always respond with valid JSON only. 



Input:
- A user query in plain language.
- A list of events, each with: "id", "name", "description", "date", "location", "city".

Rules:
1. Select events that best match the query, using meaning, synonyms, dates, locations, and cities.
2. Locations are important: users may mention cities, regions, or states.
   - If the query mentions a state or region, include events from all cities in that region.
   - If the query mentions a city, include events in that city.
3. Dates and weekdays are important: 
   - If the query mentions a specific day of the week (e.g., Friday, Saturday), compute the weekday from the "date" field and filter events accordingly.
   - If the query mentions a specific date or range, filter based on the "date" field.
4. Only return event IDs from the provided list.
5. Do not invent or modify IDs.
6. If no matches, return an empty array.
7. Output strictly JSON, using this schema:
   { "matched_event_ids": [101, 202, 303] }

Example:
Query: "Looking for chess events in Maharashtra not on Saturdays"
Events: [
  { "id": 101, "name": "Chess Meetup Mumbai", "city": "Mumbai", "date": "2025-09-26T18:00:00", ... },
  { "id": 102, "name": "Chess Club Pune", "city": "Pune", "date": "2025-09-27T18:00:00", ... },
  { "id": 103, "name": "Chess Club Delhi", "city": "Delhi", "date": "2025-09-27T18:00:00", ... }
]
Output:
{ "matched_event_ids": [102] }
`
                },
                {
                    role: "user",
                    content: JSON.stringify({
                        query,
                        events: candidates
                    })
                }
            ],
            temperature: 0,
            response_format: { type: "json_object" } 
        });


        const aiText = response.choices[0].message?.content ?? "[]";
        console.log("CHOICE 0:", JSON.stringify(response.choices[0], null, 2));

        console.log("AI raw:", aiText);

        let parsed: any = [];
        try {
            parsed = JSON.parse(aiText);
        } catch {
            console.error("AI did not return valid JSON:", aiText);
        }

        let selectedIds: string[] = [];
        if (parsed && Array.isArray(parsed.matched_event_ids)) {
            selectedIds = parsed.matched_event_ids;
        } else {
            console.error("AI returned unexpected format:", parsed);
        }
        console.log(selectedIds)

        //---- 4. ---//
        const finalEvents = semifilter.filter((e: any) =>
            selectedIds.includes(e.eventid)

        
        );
        return NextResponse.json({ events: finalEvents });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}