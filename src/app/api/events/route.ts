"use server"

import { supabase } from "@/lib/supabase-node"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    console.log("gottt")
    const body = await req.json()
    const header = req.headers.get("authorization")
    const token = header?.split(" ")[1]


    try {
        console.log(body)
        const { data: userdata, error: authError } = await supabase.auth.getUser(token)
        console.log(userdata)

        if (!userdata) {
            return NextResponse.json({ error: "Auth denied" }, { status: 401 })
        }

        const { data: createData, error: createError } = await supabase.from("Events").insert([body]).select("eventid")


        const { data: participateData, error: participateError } = await supabase.from("Participants").insert([{ userid: userdata?.user?.id, eventid: createData?.[0].eventid, isOwner: true }])

        if (!createError && !participateError) {
            return NextResponse.json({ eventid: createData[0].eventid }, { status: 201 })
        }
        else {
            console.log(createError, participateError)
            return NextResponse.json({ createError, participateError }, { status: 500 })
        }

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}