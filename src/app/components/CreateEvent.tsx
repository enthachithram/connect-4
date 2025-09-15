import { useState } from "react"


const CreateEvent = (() => {

    const [city, setCity] = useState<string>("")

    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [place, setPlace] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")



    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Event name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <input
                    type="date"
                    placeholder="Date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />


                <input
                    type="text"
                    placeholder="Place"
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)} />
                <textarea
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

export default CreateEvent