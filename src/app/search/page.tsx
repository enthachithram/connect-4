"use client"

import Link from "next/link";
import { useState } from "react"
import EventCards from "../components/EventCards";

const Search = (() => {

    const [query, setQuery] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [eventlist, setEventlist] = useState<{
        eventid: string; name: string; date: string; location: string; people: number, cityid: string
    }[]>
        ([{ eventid: "0001", name: "Example event", date: "2026-04-26T17:00:00", location: "Home", people: 3, cityid: "Hyderabad" }]);


    const handlesubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)


        fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        }).then(res => res.json().then(data => {
            setLoading(false)
            data.events && setEventlist(data.events)

            console.log(data)
            console.log(data.events)
        })).catch(error => console.log(error))





    })


    return (
        <div>
            <div className=" ">

                <div>
                    <form onSubmit={handlesubmit}
                        className="w-full flex justify-center ">
                        <input

                            className="w-[75%] text-center  p-2 rounded-3xl outline-none"
                            type="text"
                            required
                            placeholder="Search with AI"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}

                        />
                        <button type="submit"> search</button>
                    </form>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {loading ? <div> Loading... </div> : eventlist.length > 0 ? <EventCards eventlist={eventlist} /> : "no events match your query"}

                </div>
            </div>
        </div>
    )
})

export default Search