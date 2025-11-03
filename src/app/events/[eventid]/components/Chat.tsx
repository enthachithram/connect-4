import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { useContext, useEffect, useRef, useState } from "react"
import { FormatDate } from "./formatDate";

interface message {
    id: string;
    eventid: string;
    message: string;
    Users: any;
}

const Chat = (({ eventid, joined }: { eventid: string, joined: boolean | null }) => {

    const { user } = useContext(AuthContext)!
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<any>([])
    const [newMessage, setNewMessage] = useState<string>("")
    const [showTime, setShowTime] = useState<any>([])
    const [chatLoading, setChatLoading] = useState(true)
    const [loading, setLoading] = useState(false)


    const handleSubmit = (async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { data, error } = await supabase.from("Chats").insert({ message: newMessage, eventid })

        if (error) {
            console.log(error, "insert error")
            return
        }

        setNewMessage("")
        setLoading(false)
    })

    useEffect(() => {
        const fetchChat = (async () => {
            setChatLoading(true)
            const { data, error } = await supabase
                .from("Chats")
                .select("id,message,eventid,created_at,Users!inner(username)")
                .eq("eventid", eventid)
                .order("created_at", { ascending: true })

            if (error) console.log(error, "from chat fetch")





            data && setMessages(data)
            setChatLoading(false)
        })

        fetchChat()
    }, [joined])

    useEffect(() => {
        // console.log(eventid, "event id ")
        const channel = supabase
            .channel(`chat-${eventid}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "Chats",
                    // only this event’s messages
                },
                async (payload) => {
                    const newMessage = payload.new

                    const { data: userData } = await supabase
                        .from("Users")
                        .select("username")
                        .eq("id", newMessage.userid)
                        .single()

                    if (payload.new.eventid === eventid) {
                        setMessages((prev: any) => [...prev, { ...newMessage, Users: userData ? { username: userData.username } : [newMessage.userid] }])
                    }

                    // console.log(payload.new, "payload")

                }
            )
            .subscribe((status) => {
                console.log("Subscription status:", status)
            })


        return () => {
            supabase.removeChannel(channel)
        }
    }, [eventid])

    useEffect(() => {



        messagesEndRef.current?.scrollTo({ top: messagesEndRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    return (
        <div >
            <h1></h1>
            <section className="flex flex-col items-center mb-20 mt-10 ">
                <div className=" h-120 w-[70%]  py-2 pb-3 px-5 flex flex-col justify-between rounded-2xl border border-white ">
                    <div className="text-center font-bold">Chat </div>



                    {chatLoading ?
                        <div className="spinner text-center self-center"></div> :

                        <div className=" text-white overflow-y-scroll no-scrollbar space-y-3 mb-4 px-2" ref={messagesEndRef} >


                            {messages.length === 0 && <h1 className="text-center"> Be the first to send a message in this chat !</h1>}
                            {messages.map((m: any) => (
                                <div key={m.id} className="flex flex-col justify-baseline " onMouseEnter={() => setShowTime((prev: any) => [...prev, m.id])} onMouseLeave={() => setShowTime((prev: any) => prev.filter((e: any) => e !== m.id))}>
                                    <div> <b>{m.Users?.username}:&nbsp; </b>
                                        <span className={`${showTime.includes(m.id) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} text-[70%] text-yellow-200 font-bold flex-nowrap transition-all duration-400`}>
                                            {m.created_at.split("T")[1]?.slice(0, 5)}, &nbsp;{FormatDate(m.created_at).slice(0, -5)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="wrap-anywhere text-gray-200 ">{m.message}

                                        </span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    }

                    <div>
                        <form
                            className="flex space-x-3 mb-2"
                            onSubmit={handleSubmit}>
                            <input
                                className="w-full text-gray-200 rounded-3xl border border-gray-300 py-1.5 px-4 outline-none focus:ring-0"
                                type="text"
                                required
                                placeholder=" Type something..."
                                value={newMessage}
                                onChange={(e) => { setNewMessage(e.target.value) }}
                            />
                            <button className="cursor-pointer w-12" type="submit">{loading ? <span className="spinner"></span> : "Send"}</button>
                        </form>
                    </div>


                </div>


            </section>



        </div>
    )


})

export default Chat