import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { eventid: string } }) {

    const { searchParams } = new URL(req.url)

    const eventid = searchParams.get("eventid")

    console.log(eventid)






    return NextResponse.json({ ok: eventid })
}