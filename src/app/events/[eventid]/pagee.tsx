"use client"

import Chat from "@/app/components/Chat"
import Members from "@/app/components/members"
import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { motion, spring } from "framer-motion"
import { useParams } from "next/navigation"

import React, { useContext, useEffect, useState } from "react"

const Eventinfo = () => {

    const { user, authLoading } = useContext(AuthContext)!

    const { eventid } = useParams() as { eventid: string }


    const [eventInfo, setEventInfo] = useState<any>()
    const [joined, setJoined] = useState<boolean | null>(null);
    const [showInfo, setShowInfo] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [infoLoading, setInfoLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<boolean>(true);

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

            const data = await result.json()

            if (!result.ok) throw new Error(data.error)


            else {
                setJoined(!joined)
                if (!joined) setShowInfo(false)
            }






        } catch (error: any) {
            console.error(error, "try catch error from join/leave")
            alert(`an error occured: ${error.message}`)
        }
        finally {
            setLoading(false)


        }


    }


    useEffect(() => {

        const info = (async () => {
            setInfoLoading(true)
            const { data, error } = await supabase.from("Events").select("*").eq("eventid", eventid)

            if (error) console.log(error, "event info error")
            data && setEventInfo(data[0])

            if (data) {
                const { data: userData } = await supabase
                    .from("Users")
                    .select("username")
                    .eq("id", data[0].created_by)

                setUsername(userData?.[0]?.username ?? null)
            }
            setInfoLoading(false)





        })

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
            setShowInfo(!(data.length > 0))

            setTimeout(() => setLoading(false), 0);



        })
        info()
        check()
    }, [user])



    return (


        <div className="flex flex-col ">
            <motion.div
                className=" flex flex-col w-[70%] self-center justify-center mt-20   border border-white overflow-hidden px-2 py-1 rounded-2xl">





            </motion.div>

            {joined && <Chat eventid={eventid} joined={joined}></Chat>}

            {joined && <Members eventid={eventid} joined={joined}></Members>}



        </div >

    )
}



export default Eventinfo