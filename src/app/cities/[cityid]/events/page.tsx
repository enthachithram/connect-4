"use client";

import Link from "next/link"
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCards from "@/app/components/EventCards";


const Events = () => {

    let { cityid } = useParams();
    const cityidLower = String(cityid).toLowerCase();

    const [loading, setLoading] = useState<boolean>(true)
    const [eventlist, setEventlist] = useState<{ eventid: number; name: string; date: string; location: string; people: number }[]>([]);


    useEffect(() => {


        const fetchevents = (async () => {


            setLoading(true)

            const { data, error } = await supabase.from("Events").select("*").eq("cityid", cityidLower)


            if (error) {
                console.error(error)
                setLoading(false)
            }
            else {
                setEventlist(data)
                setLoading(false)
                console.log(data)
            }

        })
        if (eventlist.length < 1) {
            fetchevents()
        }

    }, [])

    return (
        <div className="p-2 flex flex-col items-center w-auto">
            <div className="mt-5 text-2xl"> Upcoming events in <span className="font-bold">{cityid}:</span> </div>


            {loading ? <h1 className="text-2xl ">Loading...</h1> : eventlist.length === 0 ? <h1>No events yet</h1> :
                <EventCards eventlist={eventlist} />
            }

            <div className="text-white fixed bottom-7 right-5 border-2 py-1.5 px-3 bg-black rounded-3xl "> <Link href={`/cities/` + cityid + `/create`}> Create an event </Link> </div>

        </div>

    )
}

export default Events

