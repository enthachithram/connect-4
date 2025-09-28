import { supabase } from '@/lib/supabase-node';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
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
            return NextResponse.json({ error: data }, { status: 400 })
        }

        return NextResponse.json({ success: true })



    } catch (error: any) {
        return NextResponse.json({ error: error })

    }
}


export async function DELETE(req: Request) {
    try {

        const { eventid } = await req.json()
        const header = req.headers.get("authorization")
        const token = header?.split(" ")[1]
        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const { data: userdata, error: authError } = await supabase.auth.getUser(token)

        if (authError || !userdata) {
            return NextResponse.json({ error: "not authenticated", r: authError }, { status: 401 })
        }

        const { data, error: leaveError } = await supabase.rpc("leave_event", { n_userid: userdata.user.id, n_eventid: eventid })

        if (leaveError) {
            return NextResponse.json({ error: leaveError.message }, { status: 400 })
        }

        if (data !== "Removed user") {
            return NextResponse.json({ error: data })
        }
        console.log(data)

        return NextResponse.json({ success: true })


    } catch (error) {
        return NextResponse.json({ error: error })
    }
}
