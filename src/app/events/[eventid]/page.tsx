"use client"

import Chat from "@/app/components/Chat"
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
            console.log(result, "result before json")
            const data = await result.json()

            if (!result.ok) throw new Error(data.error)


            else {
                setJoined(!joined)
                if (!joined) setShowInfo(false)
            }




            console.log(data, "resut:")

        } catch (error: any) {
            console.error(error, "try catch error from join/leave")
            alert(`an error occured: ${error.message}`)
        }
        finally {
            setLoading(false)

            console.log(joined, "finally")
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

            console.log(eventInfo, "event info")



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

            setLoading(false)

            console.log(data)
            data && console.log(joined)
        })
        info()
        check()
    }, [user])



    return (


        <div className="flex flex-col ">
            <motion.div
                className="flex flex-col w-[70%] self-center justify-center mt-20   border border-white overflow-hidden px-2 py-1 rounded-2xl">
                <div onClick={() => setShowInfo(!showInfo)}
                    className="flex justify-between items-center pl-2 cursor-pointer"
                >
                    <div className=""><b> </b></div>
                    <div className="">{infoLoading ? <span className="spinner border-t-transparent border-white"></span> : <b>{eventInfo?.name} </b>}</div>
                    <div className={`${showInfo ? "rotate-180" : "rotate-0"} transition-all duration-500`}> ▼ </div>
                </div>


                <motion.div className="flex text-gray-200 flex-col items-start pl-2 space-y-1.5 "
                    initial={{ height: showInfo ? "auto" : "0", opacity: showInfo ? 1 : 0, pointerEvents: showInfo ? "auto" : "none" }}
                    animate={{ height: showInfo ? "auto" : "0", opacity: showInfo ? 1 : 0, pointerEvents: showInfo ? "auto" : "none", }}
                    transition={{ height: { type: !showInfo ? "tween" : "spring", damping: 17, stiffness: 125, ease: "linear" }, opacity: { duration: 0.2 }, pointerEvents: { duration: 0 } }}>


                    {/* <div> chat of the event: {eventid} </div> */}
                    {infoLoading ? <div role="status" aria-busy="true" className="w-full space-y-5">
                        <div className="mt-4.5 h-3 w-3/6 rounded bg-gray-900 animate-pulse" />
                        <div className="h-3 w-1/6 rounded bg-gray-900  animate-pulse" />
                        <div className="h-3 w-4/6 rounded bg-gray-900  animate-pulse" />
                        <div className="h-3 w-3/5 rounded bg-gray-900 animate-pulse" />
                        <div className=" h-3 w-3/5 rounded bg-gray-900 animate-pulse" />
                        <div className=" h-3 w-2/5 rounded bg-gray-900 animate-pulse" />
                        <div className="mb-0.5 h-3 w-4/5 rounded bg-gray-900 animate-pulse" />
                    </div> :

                        <> <h1 className="mt-5"> <b>Event Name: </b>{eventInfo?.name} </h1>
                            <h1> <b>Members: </b>{eventInfo?.people} </h1>
                            <p> <b>Description: </b>{eventInfo?.description} </p>
                            <p> <b>Date: </b>{eventInfo?.date} </p>
                            <p >  <b>Location: </b>{eventInfo?.location} ({eventInfo?.cityid})</p>
                            <p >  <b>Created by: </b>{username} </p>
                            <p >  <b>Created on: </b>{eventInfo?.created_at.split("T")[0]} </p></>}

                    <motion.button className={`self-center mb-2 mt-2 w-[250px] px-6 rounded-4xl py-1.5 transition-all duration-300 cursor-pointer text-black  ${joined ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-black " : " bg-white border border-white hover:bg-gray-200 "} whitespace-nowrap overflow-hidden `}
                        onClick={handlesubmit}>

                        {authLoading || loading || joined === null ? <span className={`spinner border-t-transparent
  border-black ${joined ? "border-white" : "border-black"}`}></span> : joined ? "Leave this event" : "Join this event"}  </motion.button>
                </motion.div>


            </motion.div>

            {joined && <Chat eventid={eventid} joined={joined}></Chat>}
        </div >

    )
}



export default Eventinfo