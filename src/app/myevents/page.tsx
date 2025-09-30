"use client"

import { useContext, useEffect, useState } from "react"
import EventCards from "../components/EventCards"
import { supabase } from "@/lib/supabase"
import { AuthContext } from "@/context/authContext"
import { motion } from "framer-motion"
import { join } from "path"


const Myevents = (() => {
    const { user } = useContext(AuthContext)!
    const [show, setShow] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [joinedEvents, setJoinedEvents] = useState<any>([])
    const [createdEvents, setCreatedEvents] = useState<any>([])

    useEffect(() => {

        const fetchjoined = (async () => {
            if (!user) return
            setLoading(true)
            const { data, error } = await supabase.from("Participants").select("Events!inner(*)").eq("userid", user.id)
            console.log(data, "joiend data")
            if (error) console.log(error, "joined events error")
            else {
                const newdata = data.map(e => (
                    e.Events
                ))
                setJoinedEvents(newdata)
                setLoading(false)
            }
        })

        const fetchcreated = (async () => {
            if (!user) return
            setLoading(true)
            const { data, error } = await supabase.from("Events").select("*").eq("created_by", user.id)
            console.log(data, "created data")
            setCreatedEvents(data)
            // console.log(createdEvents,data,"created events")
            setLoading(false)
        })

        fetchjoined()
        fetchcreated()
    }, [user])

    return (
        <div className="mt-10 ">
            <div className="flex justify-center space-x-10 items-center cursor-pointer">
                <div className={`relative transition-all duration-400 ${show === 1 ? "text-black" : "text-white"} py-1 px-4`} onClick={() => setShow(1)}>Joined
                    {show === 1 && <motion.div
                        layoutId="znz"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        className="absolute rounded-4xl bottom-0 left-0 right-0 h-full w-full bg-white  -z-10"
                    />}
                </div>

                <div className={`relative transition-all duration-400  ${show === 2 ? "text-black" : "text-white"} py-1 px-4`} onClick={() => setShow(2)}>Created
                    {show === 2 && <motion.div
                        layoutId="znz"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        className="absolute rounded-4xl bottom-0 left-0 right-0 h-full w-full bg-white  -z-10"
                    />}
                </div>

                <div className={`relative transition-all duration-400  ${show === 3 ? "text-black" : "text-white"} py-1 px-4`} onClick={() => setShow(3)}>Saved
                    {show === 3 && <motion.div
                        layoutId="znz"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        className="absolute rounded-4xl bottom-0 left-0 right-0 h-full w-full bg-white  -z-10"
                    />}
                </div>
            </div>
            <section className="flex flex-col items-center">{loading ? <span className="mt-5 spinner border-t-transparent border-white"></span> : <EventCards eventlist={show === 1 ? joinedEvents : show === 2 ? createdEvents : null} />} </section>
            <section></section>
            <section></section>
        </div>
    )

})

export default Myevents