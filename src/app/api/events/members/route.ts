import { supabase } from "@/lib/supabase-node"
import { NextResponse } from "next/server"

export async function POST(req: Request) {


    const { userid, eventid } = await req.json()

    try {
        console.log("eeee")
        const { data, error: checkError } = await supabase.from("Participants")
            .select("*")
            .eq("eventid", eventid)
            .eq("userid", "289226e5-b690-48eb-8acb-e20d76619fe9")

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

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}