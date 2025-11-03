"use client"

import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { s } from "framer-motion/client"
import { useContext, useEffect, useState } from "react"

const Members = ({ eventid, joined }: { eventid: string, joined: boolean }) => {

    const { user } = useContext(AuthContext)!

    const [members, setMembers] = useState<any>([])
    const [loading, setLoading] = useState<any>(true)
    const [show, setShow] = useState<boolean>(false)




    useEffect(() => {

        const getMembers = (async () => {

            setLoading(true)
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

            setLoading(false)


            console.log(res, "members")
            console.log(members, "fimal")
        })

        getMembers()
    }, [joined])




    return (

        <motion.div className="mb-5 flex flex-col w-[70%] self-center justify-center mt-5   border border-white overflow-hidden px-2 py-2 rounded-2xl">
            <div className="flex justify-between cursor-pointer px-4"
                onClick={() => setShow(!show)}>
                <div className="opacity-0 pointer-events-none"> ▼ </div>
                <h1 className="text-center font-bold">Members</h1>
                <div className={`${show ? "rotate-180" : "rotate-0"} transition-all duration-500`}> ▼ </div>
            </div>

            <motion.div className="flex text-gray-200 flex-col items-center pl-2 space-y-1.5 text-center  "
                initial={{ height: show ? "auto" : "0", opacity: show ? 1 : 1, pointerEvents: show ? "auto" : "none" }}
                animate={{ height: show ? "auto" : "0", opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none", }}
                transition={{ height: { type: !show ? "tween" : "spring", damping: 17, stiffness: 125, ease: "linear" }, opacity: { duration: 0.2 }, pointerEvents: { duration: 0 } }}>


                <div className="flex text-gray-200 flex-col items-center px-4 space-y-1.5 text-center justify-center py-4">


                    {loading ? <div className="spinner"> </div> : members && members.map((m: any) => (
                        <div key={m.userid}>
                            <h1 className={`${m.isOwner ? "text-red-500" : ""}`}> {m?.Users?.username} &nbsp;</h1>

                        </div>

                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Members