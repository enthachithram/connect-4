"use client"

import { motion } from "framer-motion";
import Link from "next/link"
import { BookmarkIcon, } from "@heroicons/react/24/outline"
import { useState } from "react";
import { FormatDate } from "../events/[eventid]/components/formatDate";



const EventCards = (({ eventlist, search }: { eventlist: any, search: boolean }) => {

    const [showFilters, setShowFilters] = useState(false)





    const [days, setDays] = useState<any>(new Set([]))

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const sessions = ["Morning", "Afternoon", "Evening"]




    return (


        <div className="relative mt-10 mb-20 flex flex-col items-center justify-between w-full px-[1%]   ">
            <div className="bg-green-400"> </div>

            <section className="w-180 my-7">
                <div className="flex flex-col border border-gray-400 w-full overflow-hidden rounded-2xl py-2 px-2 items-center">
                    <div className="w-full flex justify-between px-4    cursor-pointer"
                        onClick={() => setShowFilters(!showFilters)}>

                        <div></div>
                        <div className="font-bold">

                            Filters
                        </div>
                        <div className={`${showFilters ? "rotate-180" : ""} transition-all duration-400`}>▼</div>

                    </div>

                    <motion.div className="flex flex-col items-center w-full"
                        initial={{ height: showFilters ? "auto" : "0", opacity: showFilters ? 1 : 0, pointerEvents: showFilters ? "auto" : "none" }}
                        animate={{ height: showFilters ? "auto" : "0", opacity: showFilters ? 1 : 0, pointerEvents: showFilters ? "auto" : "none", }}
                        transition={{ height: { type: !showFilters ? "tween" : "spring", damping: 17, stiffness: 125, ease: "linear", duration: 0.3 }, opacity: { duration: 0.2 }, pointerEvents: { duration: 0 } }}>

                        <div className=" flex grid-cols-3 space-x-3  p-3 row-auto text-black">
                            {dayNames.map((d: any, index: number) => (
                                <div className={` ${days.has(d) ? "bg-white text-black border-white" : "text-white border-gray-400"}
                                     border rounded-md py-1 px-2 text-center transition-all duration-400 cursor-pointer active:scale-[0.95] hover:scale-[1.05]`}
                                    key={d}
                                    onClick={() => {


                                        setDays((prev: any) => {
                                            const newDays = new Set(prev)
                                            days.has(d) ? newDays.delete(d) : newDays.add(d)
                                            return newDays
                                        })
                                        console.log(days)
                                    }}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* <div className=" flex grid-cols-3 space-x-3  p-3 row-auto text-black">
                            {sessions.map((d: any, index: number) => (
                                <div className={` ${days.has(d) ? "bg-white text-black border-white" : "text-white border-gray-400"}
                                     border rounded-md py-1 px-2 text-center transition-all duration-400 cursor-pointer active:scale-[0.95] hover:scale-[1.05]`}
                                    key={d}
                                    onClick={() => {


                                        setDays((prev: any) => {
                                            const newDays = new Set(prev)
                                            days.has(d) ? newDays.delete(d) : newDays.add(d)
                                            return newDays
                                        })
                                        console.log(days)
                                    }}>
                                    <div>{d}</div>
                                    <div className="text-xs">4:00-12:00</div>
                                </div>
                            ))}
                        </div> */}



                    </motion.div>


                </div>

            </section>

            <section className=" flex flex-col space-y-5  mb-15 ">
                {eventlist && eventlist.length > 0 ?
                    eventlist.map((event: any, index: number) => (

                        days.has(new Date(event?.date).toLocaleDateString("en-US", { weekday: "short" })) || days.size === 0 ?



                            <div className="" key={event.eventid}>


                                <Link href={`/events/` + event.eventid}>
                                    <motion.div
                                        className="bg-blend-saturation bg-black border border-gray-400 px-4 py-2 rounded-xl w-180 transition-shadow  shadow-md hover:shadow-xl"
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, y: { delay: (index <= 7 ? index * 0.07 : 0.1) }, opacity: { delay: (index <= 4 ? index * 0.07 : 0.1) } }}
                                        whileHover={{
                                            scale: 1.05,

                                            transition: { duration: 0.2, ease: "easeInOut", delay: 0 },
                                        }}
                                    >
                                        <div className="flex justify-between">
                                            {/* left */}
                                            <div className="truncate w-70">
                                                <p className="text-[18px] font-semibold mb-2">{event.name}</p>

                                                <p className="text-gray-500">{FormatDate(event.date)}</p>
                                                {/* <p className="text-gray-500">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long" })}</p> */}


                                                {/* <p className="text-gray-500 ">{event.date.toString().split("T")[1]?.slice(0, 5)} </p> */}

                                                <p className="text-gray-500">{event.location} {search && "(" + event.cityid + ")"}</p>



                                            </div>
                                            {/* right */}
                                            <div className="flex flex-col justify-center items-end">
                                                <div className="flex justify-end mb-2">
                                                    <BookmarkIcon className=" h-5 w-5" />
                                                    {/* <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" /> */}
                                                </div>


                                                <p className="text-gray-500">{new Date(event?.date).toLocaleDateString("en-US", { weekday: "long" })}, <span className="text-gray-500 ">{event?.date?.toString().split("T")[1]?.slice(0, 5)} </span></p>
                                                <p className="text-gray-500">{event.people}/4</p>



                                            </div>

                                        </div>
                                    </motion.div>
                                </Link>
                            </div> : null

                    ))
                    : "No Events"}
            </section>



        </div>

    )
})

export default EventCards



