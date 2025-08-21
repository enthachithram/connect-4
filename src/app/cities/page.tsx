import Link from "next/link"

const Cities = () => {

    const citylist = ["asas", "assadaswsd", "434rr"]

    return (
        <>
            <div>list of cities</div>

            {citylist.map(city => (
                <Link key={city} href={'/cities/' + city}> <div >{city}</div></Link>

            ))}
        </>
    )
}

export default Cities 