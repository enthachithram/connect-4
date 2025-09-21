import { motion } from "framer-motion";
import Link from "next/link"



const EventCards = (({ eventlist }: { eventlist: any }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix =
            day % 10 === 1 && day !== 11 ? "st" :
                day % 10 === 2 && day !== 12 ? "nd" :
                    day % 10 === 3 && day !== 13 ? "rd" : "th";

        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();


        return `${day}${suffix} ${month} ${year} `;
    };




    return (
        <div>
            <div className="flex flex-col space-y-4 mt-10 mb-15">
                {
                    eventlist.map((event: any, index: number) => (

                        <div key={event.eventid}>


                            <Link href={`/events/` + event.eventid}>
                                <motion.div
                                    className="bg-[#FFFFFF] border border-gray-400 px-5 py-2 rounded-xl w-150 transition-shadow  shadow-md hover:shadow-xl"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, y: { delay: index * 0.07 } }}
                                    whileHover={{
                                        scale: 1.05,

                                        transition: { duration: 0.2, ease: "easeInOut", delay: 0 },
                                    }}
                                >
                                    <div className="flex justify-between">
                                        {/* left */}
                                        <div className="truncate w-70">
                                            <p className="text-[18px] font-semibold">{event.name}</p>

                                            <p className="text-gray-500">{formatDate(event.date)}</p>
                                            <p className="text-gray-500">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long" })}</p>


                                            <p className="text-gray-500 ">{event.date.toString().split("T")[1]?.slice(0, 5)} </p>

                                            <p className="text-gray-500">{event.location}</p>



                                        </div>
                                        {/* right */}
                                        <div className="flex flex-col justify-center">
                                            <p className="text-gray-500">{event.people}/4</p>
                                            <p>Save</p>
                                            <p>Report</p>
                                            <p>info</p>
                                        </div>

                                    </div>
                                </motion.div>
                            </Link>
                        </div>

                    ))
                }
            </div>
        </div>
    )
})

export default EventCards



