"use client"

import { AuthContext } from "@/context/authContext"



import { supabase } from "@/lib/supabase"
import { useContext, useEffect, useState } from "react"
import Signup from "./signup"
import { motion } from "framer-motion"
import Link from "next/link"



const Navbar = () => {

    const { user, dispatch, supaUser, authLoading } = useContext(AuthContext)!

    const [user2, setUser2] = useState<any>()
    const [menu, setMenu] = useState<boolean>(false)

    useEffect(() => {

        const userdata = (async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            user && setUser2(user)
            console.log(user, "supa")
        })
        userdata()

    }, [])





    const logout = (async () => {
        dispatch({ type: "LOGOUT" })
        await supabase.auth.signOut()
        window.location.reload()
    })



    const [signupmodal, setSignupmodal] = useState<boolean>(false)

    const signupclose = (() => {
        setSignupmodal(!signupmodal)
    })

    return (

        <motion.nav className=" backdrop-blur-7xl top-0   relative   flex px-10  justify-between items-center-safe rounded-4xl py-1 mt-3"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
        >

            <Link href={"/cities"}> <h1 className=" font-bold text-2xl">CONNECT-4 </h1></Link>

            <div className="flex space-x-5 items-center">
                <Link href={"/search"} className=" hover:text-cyan-400 transition font-bold cursor-pointer"> AI SEARCH</Link>

                <div className="">


                    {authLoading ? <span className="spinner"></span> : user ? <div className="relative font-bold cursor-pointer"
                        onMouseEnter={() => setMenu(true)} onMouseLeave={() => { setMenu(false) }}> {authLoading ? <span className="spinner"></span> : user?.username + " " + "▾"}


                        <motion.div className={`absolute ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all duration-350 flex flex-col space-y-0.5 cursor-pointer text-[15px] left-[50%] transform translate-x-[-50%]  h-auto top-6 border-t-1  w-max border-gray-600 rounded-md border px-3 py-2`}
                        >

                            <Link href={"/myevents"} className="hover:underline cursor-pointer" > My Events</Link>
                            <div className="text-red-700 hover:underline cursor-pointer" onClick={logout}> Logout</div>
                        </motion.div>
                    </div> : < div className="font-bold cursor-pointer" onClick={() => { setSignupmodal(true); setMenu(false) }}>LOGIN</div>}



                    {/* {user && <div>user name: {authLoading ? <span className="spinner"></span> : user?.username}</div>}
                    {user && <div onClick={logout}> LOGOUT </div>} */}


                    {signupmodal && <Signup closemodal={signupclose} />}
                </div>
            </div>
        </motion.nav >

    )
}

export default Navbar

