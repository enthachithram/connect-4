"use client"
import { AuthContext } from "@/context/authContext"
import citynames from "@/harcode"
import { supabase } from "@/lib/supabase"
import { useParams, useRouter } from "next/navigation"

import { useContext, useState } from "react"


const Create = (() => {

    const router=useRouter()

    const {cityid}:{cityid:string}=useParams()

    const { user } = useContext(AuthContext)!

    const [selectedcityid, setCityid] = useState<string>(cityid)

    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const [place, setPlace] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<object>()
    

    const handlesubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)


        const { data, error } = await supabase.from("Events").insert([
            {
                cityid: selectedcityid.toLowerCase(),
                name: name,
                date: new Date(`${date}T${time}:00`).toISOString(),
                location: place,
                description: description,
                created_by: user?.id


            }])

        if (error) {
            console.log(error)
            setLoading(false)
            return
        }
        else {
            console.log(data)
            router.push(`/cities/${selectedcityid}/events`)
        }
        
    })



    return (
        <div className="flex justify-center  max-w-full ">
            <form className="flex flex-col space-y-3 mt-25 w-[30%]" onSubmit={handlesubmit}>

                <select
                    className="block mb-10 px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-white border border-gray-600 text-white;"
                    required
                    value={selectedcityid}
                    onChange={(e) => setCityid(e.target.value)}
                >
                    <option className="" value="" disabled>Select City</option>
                    {citynames.map((city, index) => (
                        <option key={index}> {city} </option>
                    ))}

                </select>


                <input
                    className="block  px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-white border border-gray-600 text-white;"
                    type="text"
                    placeholder="Event name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                    <textarea
                    className="createInput"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />

                    <input
                    className="createInput mb-10" 

                    type="text"
                    placeholder="Placee"
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)} />

                <input
                    className="createInput mt-2"
                    type="date"
                    placeholder="Date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />


                <input
            
                    className="createInput mt-2 mb-10"
                    type="time"
                    placeholder="Time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)} />


                
                
                <button className="bg-white text-black hover:scale-106 py-2 rounded-3xl transition-all duration-300 cursor-pointer" type="submit" disabled={loading}>
                    {loading ? <span className="spinner border-t-transparent border black"></span>: "Create Event"}
                </button>







            </form>
        </div>
    )
})

export default Create