import { supabase } from "@/lib/supabase-node"
import { CheckToken } from "@/server/checkToken"
import { error } from "console"
import { NextResponse } from "next/server"

export async function POST(req: Request) {


    const { eventid } = await req.json()



    try {


        const userid = await CheckToken(req.headers)


        console.log("eeee")
        const { data, error: checkError } = await supabase.from("Participants")
            .select("*")
            .eq("eventid", eventid)
            .eq("userid", userid)

        console.log(data, checkError)
        console.log("eee close")

        if (!data) {
            console.log("not exi")
            return NextResponse.json("User isnt in the event")
        }

        const { data: memberList, error: membersError } = await supabase.from("Participants")
            .select("userid,isOwner,Users!inner(username)")
            .eq("eventid", eventid)

        console.log(memberList, membersError)


        return NextResponse.json(memberList)

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}