import { supabase } from '@/lib/supabase-node';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";


export async function POST(req: Request) {




    try {

        const { eventid } = await req.json()
        console.log(eventid)
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }
        console.log(req)

        const { data: userdata, error: authError } = await supabase.auth.getUser(token)

        if (authError || !userdata) {
            return NextResponse.json({ error: "Not authenticated", r: authError }, { status: 401 })
        }
        console.log(userdata)

        const { data, error } = await supabase.rpc("join_event", { n_userid: userdata.user.id, n_eventid: eventid })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        if (data !== "New user joined") {
            return NextResponse.json({ error: data })
        }

        return NextResponse.json({ success: true })



    } catch (error: any) {
        return NextResponse.json({ error: error })

    }
}
