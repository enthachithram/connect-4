"use client";

import Link from "next/link"
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const Events = () => {

    let { cityid } = useParams();
    const cityidLower = String(cityid).toLowerCase();

    const [loading, setLoading] = useState<boolean>(true)
    const [eventlist, setEventlist] = useState<{ eventid: number; name: string; date: string; location: string; people: number }[]>([{ eventid: 1, name: "dfdf", date: "fdfdf", location: "akjhkh", people: 3 }]);


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
        fetchevents()

    }, [])

    return (
        <div className="p-2 flex flex-col items-center w-auto">
            <div className="mt-5 text-2xl"> Upcoming events in <span className="font-bold">{cityid}:</span> </div>

            <div className="flex flex-col space-y-4 mt-10">
                {loading ? <h1 className="text-2xl ">Loading...</h1> : eventlist.length === 0 ? <h1>No events yet</h1> :
                    eventlist.map((event, index) => (

                        <div key={event.eventid}>


                            <Link href={`/cities/` + cityid + `/events/` + event.name}>
                                <motion.div
                                    className="bg-[#FFFFFF] border border-gray-400 px-5 py-2 rounded-xl w-150 transition-shadow  shadow-md hover:shadow-xl"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.07 }}
                                    whileHover={{
                                        scale: 1.05,

                                        transition: { duration: 0.2, ease: "easeInOut" },
                                    }}
                                >
                                    <div className="flex justify-between">
                                        {/* left */}
                                        <div className="truncate w-70">
                                            <p className="text-[18px] font-semibold">{event.name}</p>
                                            <p className="text-gray-500 ">{event.date}</p>

                                            <p className="text-gray-500">{event.location}</p>

                                            <p className="text-gray-500">{event.people}/4</p>

                                        </div>
                                        {/* right */}
                                        <div className="flex flex-col justify-center">
                                            <p>Save</p>
                                            <p>Report</p>
                                            <p>info</p>
                                        </div>

                                    </div>
                                </motion.div>
                            </Link>
                        </div>

                    ))
                }</div>

            <div className="text-white fixed bottom-7 right-5 border-2 py-1.5 px-3 bg-black rounded-3xl "> <Link href={`/cities/` + cityid + `/create`}> Create an event </Link> </div>

        </div>

    )
}

export default Events