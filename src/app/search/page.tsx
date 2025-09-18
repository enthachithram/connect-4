"use client"

import Link from "next/link";
import { useState } from "react"

const Search = (() => {

    const [query, setQuery] = useState<string>("")
    const [eventlist, setEventlist] = useState<{
        eventid: number; name: string; date: string; location: string; people: number, cityid: string
    }[]>
        ([{ eventid: 1, name: "dfdf", date: "fdfdf", location: "akjhkh", people: 3, cityid: "cityyyy" }]);


    const handlesubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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
                    </form>
                </div>
                <div className="flex justify-center">
                    {eventlist.map((event, index) => (
                        <div key={event.eventid}>
                            <Link href={`/cities/` + event.cityid + `/events/` + event.eventid} key={event.eventid}> {event.name} </Link>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
})

export default Search