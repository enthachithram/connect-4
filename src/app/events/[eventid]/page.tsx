"use client"

import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation"
import React, { useContext } from "react"

const Eventinfo = ({ params }: { params: { eventid: string } }) => {

    const { supaUser } = useContext(AuthContext)!


    const { eventid } = useParams()




    const handlesubmit = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return alert("signup or login ")
        const token = session.access_token



        const result = await fetch("/api/events/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ eventid: eventid }),
            credentials: "include",
        })


        const data = await result.json()
        console.log(data)

    }



    return (



        <div>
            <div> chat of the event: {eventid} </div>
            <div className="text-red-700 cursor-pointer" onClick={handlesubmit}> Join this event </div>

        </div>

    )









}



export default Eventinfo