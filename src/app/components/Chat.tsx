import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { useContext, useEffect, useRef, useState } from "react"

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


    const handleSubmit = (async (e: React.FormEvent) => {
        e.preventDefault()
        const { data, error } = await supabase.from("Chats").insert({ message: newMessage, eventid })

        if (error) {
            console.log(error, "insert error")
            return
        }
        setNewMessage("")
    })

    useEffect(() => {
        const fetchChat = (async () => {
            const { data, error } = await supabase
                .from("Chats")
                .select("id,message,eventid,created_at,Users!inner(username)")
                .eq("eventid", eventid)
                .order("created_at", { ascending: true })

            if (error) console.log(error, "from chat fetch")
            console.log(data, "from chat comp")



            data && setMessages(data)
        })

        fetchChat()
    }, [joined])

    useEffect(() => {
        console.log(eventid, "event id ")
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

                    console.log(payload.new, "payload")

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


        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div >
            <h1></h1>
            <section className="flex flex-col items-center mb-20 mt-7 ">
                <div className=" h-100 w-[70%]  py-5 px-5 flex flex-col justify-between rounded-2xl border border-white ">


                    <div className=" text-white overflow-y-scroll  no-scrollbar space-y-2 mb-2">
                        {messages.length === 0 && <h1 className="text-center"> Be the first to send a message in this chat !</h1>}
                        {messages.map((m: any) => (
                            <div key={m.id} className="flex justify-baseline">
                                <b>{m.Users?.username}:&nbsp; </b><span className="break-all">{m.message}</span>

                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div>
                        <form
                            className="flex space-x-3"
                            onSubmit={handleSubmit}>
                            <input
                                className="w-full text-gray-200 border border-white rounded-2xl py-1 px-3 outline-none focus:ring-0"
                                type="text"
                                placeholder=" Type your message"
                                value={newMessage}
                                onChange={(e) => { setNewMessage(e.target.value) }}
                            />
                            <button className="cursor-pointer" type="submit">Send</button>
                        </form>
                    </div>


                </div>


            </section>
        </div>
    )


})

export default Chat