"use client"

import citynames from "@/harcode"
import { motion } from "framer-motion"
import Link from "next/link"

const Cities = () => {



    return (
        <div>

            <div className="flex flex-col items-center mt-20">
                {/* <div className="flex  flex-col  font-bold text-2xl">Select a city:</div> */}
                <div className=" w-60 h-auto mt-10 flex flex-col space-y-1.5 text-center justify-center">
                    {citynames.map((city: string, index: any) => (
                        <div key={index}
                            className=" "
                        >
                            <Link href={'/cities/' + city + '/events'}>
                                <motion.div
                                    className="text-2xl w-auto font-semibold text-left transition-hover duration-300  hover:text-3xl hover:font-bold hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.3)] "

                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ y: { delay: 0.01 * index, duration: 0.3 }, opacity: { delay: 0.07 * index }, }}
                                >
                                    {city}

                                </motion.div>
                            </Link>
                        </div>


                    ))} </div>
            </div>
        </div>
    )
}

export default Cities