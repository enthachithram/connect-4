import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Summary = ({ eventid, joined }: { eventid: string, joined: boolean }) => {

    const [summary, setSummary] = useState("")
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState<boolean>(false)


    const getSummary = (async () => {
        setLoaded(true)
        setLoading(true)
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            setLoading(false)
            return "Sign up or Login"
        }

        const token = session.access_token

        const result = await fetch(`/api/events/summarize?eventid=${eventid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
        const summarized = await result.json()



        setSummary(summarized.summary)
        setLoading(false)


    })




    useEffect(() => {



    }, [joined])

    return (

        <div className="flex flex-col self-center justify-center w-[70%] overflow-hidden border rounded-2xl px-2 py-2 mb-30 ">
            <div className="flex flex-col">
                <div className="flex justify-between cursor-pointer px-4"
                    onClick={() => { setShow(!show); !loaded && getSummary() }}>
                    <div className="opacity-0 pointer-events-none ">▼ </div>
                    <div className="font-bold">AI Summary of the chat</div>
                    <div className={`${show ? "rotate-180" : "rotate-0"} transition-all duration-500`}>▼ </div>

                </div>


                <motion.div className=""
                    initial={{ height: show ? "auto" : "0", opacity: show ? 1 : 1, pointerEvents: show ? "auto" : "none" }}
                    animate={{ height: show ? "auto" : "0", opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none", }}
                    transition={{ height: { type: !show ? "tween" : "spring", damping: 17, stiffness: 125, ease: "linear" }, opacity: { duration: 0.2 }, pointerEvents: { duration: 0 } }}>
                    <div className="p-2 flex flex-col ">
                        {
                            loading ? <div className="spinner self-center text-center my-2"></div> :
                                <div className="markdown">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {summary}
                                    </ReactMarkdown>
                                </div>

                        }

                    </div>

                </motion.div>

            </div>

        </div>


    )
}