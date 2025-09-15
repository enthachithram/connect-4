"use client"
import { AuthContext } from "@/context/authContext"
import citynames from "@/harcode"
import { supabase } from "@/lib/supabase"
import { useContext, useState } from "react"


const Create = (() => {

    const { user } = useContext(AuthContext)!

    const [cityid, setCityid] = useState<string>("")

    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const [place, setPlace] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<object>()

    const handlesubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { data, error } = await supabase.from("Events").insert([
            {
                cityid: cityid.toLowerCase(),
                name: name,
                date: date,
                location: place,
                description: description,
                created_by: user?.user.id


            }])

        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
        }
    })



    return (
        <div className="flex justify-center max-w-full ">
            <form className="flex flex-col space-y-3" onSubmit={handlesubmit}>

                <select
                    className="createInput"
                    required
                    value={cityid}
                    onChange={(e) => setCityid(e.target.value)}
                >
                    <option className="" value="" disabled>Select City</option>
                    {citynames.map((city, index) => (
                        <option key={index}> {city} </option>
                    ))}

                </select>


                <input
                    className="createInput"
                    type="text"
                    placeholder="Event name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <input
                    className="createInput"
                    type="date"
                    placeholder="Date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />


                <input
                    className="createInput"

                    type="text"
                    placeholder="Place"
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)} />
                <textarea
                    className="createInput"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Event"}
                </button>







            </form>
        </div>
    )
})

export default Create