"use client"

import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"

const Members = ({ eventid, joined }: { eventid: string, joined: boolean }) => {

    const { user } = useContext(AuthContext)!

    const [members, setMembers] = useState<any>([])
    const [loading, setLoading] = useState<any>(true)
    const [show, setShow] = useState<boolean>(true)


    const handleClick = () => {


    }

    useEffect(() => {

        const getMembers = (async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setLoading(false)
                return


            }
            const token = session.access_token


            const data = await fetch("/api/events/members", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ eventid: eventid })
            })

            const res = await data.json()
            setMembers(res)

            console.log(res, "members")
            console.log(members, "fimal")
        })

        getMembers()
    }, [joined])




    return (

        <motion.div className="mb-30 flex flex-col w-[70%] self-center justify-center mt-20   border border-white overflow-hidden px-2 py-1 rounded-2xl">
            <div onClick={() => setShow(!show)}>
                <h1>members</h1>
            </div>

            <motion.div className="flex text-gray-200 flex-col items-start pl-2 space-y-1.5"
                initial={{ height: show ? "auto" : "0", opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }}
                animate={{ height: show ? "auto" : "0", opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none", }}
                transition={{ height: { type: !show ? "tween" : "spring", damping: 17, stiffness: 125, ease: "linear" }, opacity: { duration: 0.2 }, pointerEvents: { duration: 0 } }}>



                {members && members.map((m: any) => (
                    <h1 key={m.userid}> {m?.Users?.username}</h1>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default Members