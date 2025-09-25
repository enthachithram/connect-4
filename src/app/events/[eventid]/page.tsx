"use client"

import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

const Eventinfo = () => {

    const { user, authLoading } = useContext(AuthContext)!

    const { eventid } = useParams()

    const [joined, setJoined] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);






    const handlesubmit = async () => {

        try {
            setLoading(true)



            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setLoading(false)
                return alert("signup or login ")
            }
            const token = session.access_token






            const result = await fetch("/api/events/join", {
                method: joined ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ eventid: eventid }),
                credentials: "include",
            })

            if (!result.ok) throw new Error("An error occured")
            else {
                setJoined(!joined)
            }


            const data = await result.json()
            console.log(data)

        } catch (error) {
            console.error(error)
            alert("an erroe occured")
        }
        finally {
            setLoading(false)
        }


    }


    useEffect(() => {

        const check = (async () => {
            if (!user) {
                setJoined(false)
                setLoading(false)
                return
            }
            setLoading(true)

            const { data, error } = await supabase.from("Participants")
                .select("*")
                .eq("eventid", eventid)
                .eq("userid", user.id)

            if (!data) {
                setJoined(false)
                setLoading(false)
                return
            }
            setJoined(data.length > 0);
            setLoading(false)

            console.log(data)
            data && console.log(joined)
        })
        check()
    }, [user])



    return (



        <div className="flex flex-col items-center">


            <div> chat of the event: {eventid} </div>
            <motion.button className={`w-[250px] px-6 rounded-4xl py-1.5 cursor-pointer text-white ${joined ? "bg-red-700" : "bg-black"} whitespace-nowrap overflow-hidden `}
                onClick={handlesubmit}>

                {authLoading || loading || joined === null ? <span className="spinner"></span> : joined ? "Leave this event" : "Join this event"}  </motion.button>


        </div>

    )









}



export default Eventinfo