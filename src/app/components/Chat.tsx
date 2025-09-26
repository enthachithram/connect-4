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
    const [newMessage, setNewMessage] = useState<string>()


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
                    filter: ``, // only this event’s messages
                },
                (payload) => {
                    const newMessage = payload.new


                    setMessages((prev: any) => [...prev, payload.new])
                    console.log(payload.new, "payload")

                }
            )
            .subscribe()


        return () => {
            supabase.removeChannel(channel)
        }
    }, [eventid])

    useEffect(() => {


        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div >
            <h1>chat:</h1>
            <section className="flex flex-col items-center">
                <div className=" h-100 w-[70%] bg-gray-700 py-5 px-3 flex flex-col  ">
                    <div className=" text-white overflow-y-auto">
                        {messages.map((m: any) => (
                            <div key={m.id}>
                                <b>{m.Users?.username}:</b> {m.message}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div> add a message
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder="add your message"
                            value={newMessage}
                            onChange={e => { setNewMessage(e.target.value) }}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </section>
        </div>
    )


})

export default Chat