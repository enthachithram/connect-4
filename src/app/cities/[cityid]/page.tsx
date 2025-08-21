import Link from "next/link"

const Events = ({ params }: { params: { cityid: string } }) => {

    const { cityid } = params
    console.log(params, cityid)
    return (
        <>
            {console.log(params, cityid)}
            <Link href={`/cities/${cityid}/events`}><div>events</div></Link>
            <h1>{cityid}</h1>

        </>

    )
}

export default Events