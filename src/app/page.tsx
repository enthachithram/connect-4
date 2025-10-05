"use client"

import { motion } from "framer-motion";

import Link from "next/link";
import { useState } from "react";



export default function Home() {


  const [tech, setTech] = useState<boolean>(false)

  return (

    <div className=" items-center   w-full  flex flex-col   font-[family-name:var(--font-geist-sans)]">
      <motion.div className="mt-15 items-center border border-white w-[75%] overflow-hidden  flex flex-col  rounded-xl   font-[family-name:var(--font-geist-sans)]"
        initial={{ height: "0", opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}>
        <motion.main className="flex flex-col items-center "
          initial={{ opacity: 0, }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}>


          <h1 className="mt-5 text-center font-bold">About this project: </h1>
          <ul className="list-disc list-inside space-y-2 text-gray-200 mt-5 ">
            <li>Connect-4 is a <strong>user-driven</strong> platform for organizing local events around niche hobbies and interests.</li>
            
            <li>Each event includes details like topic, time, date, and location.</li>
            <li>Users can create new events or join existing ones. All your joined/created are in "my events" page.</li>
            <li>Every event is limited to 4 participants, with a private chat once joined.</li>
            <li>A RAG powered search for natural language queries like  "dev meetups next month anywhere in south india"</li>
          </ul>






          <div className="w-[75%] overflow-hidden  px-5 py-1 text-center mt-7 rounded-2xl mb-10 border border-white">

            <div onClick={() => setTech(!tech)} className="flex justify-between cursor-pointer">
              <div></div>
              <h1 className="font-bold"> Technologies used:</h1>
              <div className={`${tech ? "rotate-180" : "rotate-0"} transition-all duration-400`}> v</div>
            </div>

            <motion.div

              initial={{ height: tech ? "auto" : "0", opacity: tech ? 1 : 0 }}
              animate={{ height: tech ? "auto" : "0", opacity: tech ? 1 : 0 }}
              transition={{ duration: 0.4, height: { type: !tech ? "tween" : "spring", damping: 17, stiffness: 125, ease: "linear" } }}>

              <ul className="list-disc list-inside space-y-2 text-left text-white py-4">
                <li>Next.js (React + TypeScript)</li>
                <li>Supabase (Database, Auth, Real-time, Vector storage)</li>
                <li>OpenAI (RAG for AI-based event filtering)</li>

                <li>Framer Motion (Animations & Transitions)</li>
              </ul>

            </motion.div>
          </div>

          <div className="text-center mb-10 mt-5 hover:scale-106 transition-all duration-200 "><Link className="bg-white text-black  text-md font-bold   py-1 px-6 rounded-3xl" href={"/cities"}> Enter Website </Link></div>




        </motion.main>

      </motion.div>


    </div>
  );
}
