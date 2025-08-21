import Link from "next/link"

const Events = ({ params }: { params: { cityid: string } }) => {

    const { cityid } = params
    const eventlist = ["chess", "meetup", "event3", "event4"]

    return (
        <>
            <div>events of a cityyy </div>
            {console.log(params)}
            <h1>city id:{cityid}</h1>
            {eventlist.map(event => (

                <Link key={event} href={cityid + "/events/" + event}>
                    <p>{event}</p>
                </Link>

            ))}

            <div className="text-red-700"> create an event</div>

        </>

    )
}

export default Events