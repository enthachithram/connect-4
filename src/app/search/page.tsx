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
        ([{ eventid: "ijj", name: "dfdf", date: "fdfdf", location: "akjhkh", people: 3, cityid: "cityyyy" }]);


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

                            className="w-[75%] text-center border-2 border-black p-2 rounded-3xl "
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