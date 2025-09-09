import Link from "next/link"

const Cities = () => {

    const citylist = ["HYDERABAD", "MUMBAI", "CHENNAI", "DELHI", "PUNE", "BENGALURU", "KOLKATA", "AHMEDABAD", "JAIPUR", "SURAT"]

    return (
        <div>

            <div className="flex flex-col items-center mt-20">
                {/* <div className="flex  flex-col  font-bold text-2xl">Select a city:</div> */}
                <div className=" w-60 h-auto mt-10 flex flex-col space-y-1.5 text-center justify-center">
                    {citylist.map(city => (

                        <Link
                            className=" text-2xl w-auto font-semibold text-left transition-all duration-300 hover:text-4xl hover:font-bold"
                            key={city} href={'/cities/' + city + '/events'}> <div >{city}</div>
                        </Link>


                    ))} </div>
            </div>
        </div>
    )
}

export default Cities