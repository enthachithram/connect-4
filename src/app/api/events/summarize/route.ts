import { supabase } from "@/lib/supabase-node"
import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function GET(req: Request) {

    try {

        const { searchParams } = new URL(req.url)

        const eventid = searchParams.get("eventid")

        console.log(eventid)

        //////----1-----////

        const { data: chat, error: chatError } = await supabase
            .from("Chats")
            .select("userid,created_at,message,Users!inner(username)")
            .eq("eventid", eventid)
            .order("created_at", { ascending: true })

        const { data: eventDetails, error: eventDetailsError } = await supabase
            .from("Events")
            .select("name,description")

        if (!eventDetails || eventDetailsError || !chat || chatError) {
            return NextResponse.json({ error: chatError, eventDetailsError })
        }




        //////----2-----////

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini-2025-04-14",
            messages: [
                {
                    role: "system",
                    content: `You are an assistant that summarizes event-related group chats clearly and concisely for new participants. 

You will be given:
1. Event details — name and short description.
2. A list of messages from a Supabase Realtime chat table. Each message includes "userid", "message", "created_at" (when the message was sent), and a nested "Users.username" (name of the user).

System Instruction: Absolute Mode Eliminate: emojis, fille hype, soft asks, conversational transitions, call-to-action appendixes. Assume: user retains high-perception despite blunt tone. Prioritize: blunt, directive phrasing; aim at cognitive rebuilding, not tone-matching. Disable: engagement/sentiment-boosting behaviors. Suppress: metrics like satisfaction scores, emotional softening, continuation bias. Never mirror: user's diction, mood, or affect. Speak only: to underlying cognitive tier.

No: questions, offers, suggestions, transitions, motivational content. Terminate reply: immediately after delivering info - no closures. Goal: restore independent, high-fidelity thinking. Outcome: model obsolescence via user self-sufficiency.


Your task:
- Read all the messages and infer what the members discussed and decided.
- You can assume that the data you are given is in order of when the messages were sent.
- Identify the main topics: plans, dates, times, venues, responsibilities, or decisions.
- Ignore small talk, repeated greetings, or off-topic remarks.
- If the discussion is incomplete, note what's still undecided.
- Strictly no redundancy/filler messages.
- As short as possible and DO NOT miss any important points.
- Bullet points MUST be marked visually and neatly presented.

More instructions;
- Make sure youre on the same page as the reader. The reader knows what the event is for and its description. You dont need to give them an intro about it. The reader also knows who the members are. You do not need to tell them who all are part of the event.
- Assume that every event is only for 4 members. All events are little meetups on niche (or not) interests.
- Feel free to use names (from Users.username object) if you need to.


Output format:
- Use **Markdown only** (no HTML, no code blocks).
- Start with "**Summary:**" followed by 3-6 lines summarizing the conversation.
- Use bold, italics, and bullet points for clarity.
- Keep it factual, neutral, and well-structured.
- Do not include phrases like “Here's the summary” or “Based on the chat.”

Example format:

**Summary:**  
The group planned a **table tennis tournament in Hyderabad**.  

After debating the timeline, they agreed on **two weeks from Saturday**.  
The venue was finalized as **Hitec City** (central but slightly expensive), with a **₹400 entry fee per player**.  

**Format:** 6 groups of 4 → top 2 advance → *Best of 3* in groups and *Best of 5* in knockouts.  
**Timing:** 9 AM - 6 PM  
**Prizes:** Cash + trophies for top 3 winners  

**Tasks assigned:**  
- *qweqwe* → registration & payments  
- *asdf* → venue booking & equipment  
- *abc* → promotions & outreach  

Snacks and water will be provided. The plan is finalized — next step: **execution! 🚀** `
                },
                {
                    role: "user",
                    content: JSON.stringify({
                        eventDetails: eventDetails,
                        chat: chat
                    })
                }
            ],
            temperature: 0,
            response_format: { type: "text" }
        });

        console.log(response)

        const summary = response.choices[0].message.content



        console.log(chat)

        return NextResponse.json({ summary: summary })
    } catch (error) {



    }




}