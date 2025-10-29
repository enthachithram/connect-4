import { supabase } from '@/lib/supabase-node';
import { CheckToken } from '@/server/checkToken';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextResponse } from "next/server";


export async function POST(req: Request) {




    try {

        const { eventid } = await req.json()
        console.log(eventid)
        const userid = await CheckToken(req.headers)



        const { data, error } = await supabase.rpc("join_event", { n_userid: userid, n_eventid: eventid })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        if (data !== "New user joined") {
            return NextResponse.json({ error: data }, { status: 400 })
        }

        return NextResponse.json({ success: true })



    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 400 })

    }
}


export async function DELETE(req: Request) {
    try {

        const { eventid } = await req.json()
        const userid = await CheckToken(req.headers)

        const { data, error: leaveError } = await supabase.rpc("leave_event", { n_userid: userid, n_eventid: eventid })

        if (leaveError) {
            return NextResponse.json({ error: leaveError.message }, { status: 400 })
        }

        if (data !== "Removed user") {
            return NextResponse.json({ error: data }, { status: 400 })
        }
        console.log(data)

        return NextResponse.json({ success: true })


    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}
