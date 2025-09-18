import { supabase } from "../src/lib/supabase-node.js";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./.env.local" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generate = async () => {
  console.log("starting fetch");

  const { data: events, error } = await supabase.from("Events").select("*");
  // .limit(2);
  if (error) {
    console.log("error fetching from supa", error.message);
    return;
  }

  if (!events || events.length === 0) {
    console.log("No events found.");
    return;
  }

  for (const event of events) {
    const input = `${event.name} ${event.description} ${event.cityid} ${event.date} ${event.location} ${event.people}`;

    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: input,
      });

      const embedding = response.data[0].embedding;
      console.log(embedding.length);

      const { data, error: rpcError } = await supabase.rpc(
        "update_event_embedding",
        {
          eid: event.eventid, // matches your column
          emb: embedding, // float array
        }
      );

      if (rpcError) {
        console.log("column error for", rpcError, event.eventid, event.name);
      } else {
        console.log("column added for", event.name, data);
      }
    } catch (embeddingError) {
      console.log("AI embedding error: ", embeddingError.message);
    }
  }
  console.log("done");
};

generate();
