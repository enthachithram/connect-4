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
    })

    supaUser && console.log("supUSer", supaUser)

    const [signupmodal, setSignupmodal] = useState<boolean>(false)

    const signupclose = (() => {
        setSignupmodal(!signupmodal)
    })

    return (

        <motion.nav className=" backdrop-blur-7xl top-0   relative   flex px-5  justify-between items-center-safe rounded-4xl py-1 mt-3"
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>

            <Link href={"/cities"}> <h1 className=" font-bold text-2xl">CONNECT-4 </h1></Link>

            <div className="flex space-x-5 items-center">
                <Link href={"/search"} className=" hover:text-cyan-400 transition font-bold cursor-pointer"> AI SEARCH</Link>

                <div className="">


                    {authLoading ? <span className="spinner"></span> : user ? <div className="relative font-bold cursor-auto "
                        onMouseEnter={() => setMenu(true)} onMouseLeave={() => { setMenu(false) }}> {authLoading ? <span className="spinner"></span> : user?.username + " " + "▾"}

                        {menu &&
                            <motion.div className="cursor-pointer absolute text-md left-[50%] transform translate-x-[-50%]  h-auto top-6 w-max border-gray-400 rounded-md border  px-1 py-0.5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}>

                                <div className="" > My Events</div>
                                <div className="text-red-700" onClick={logout}> Logout</div>
                            </motion.div>}
                    </div> : < div className="font-bold" onClick={() => { setSignupmodal(true); setMenu(false) }}>LOGIN</div>}

                    { }



                    {/* {user && <div>user name: {authLoading ? <span className="spinner"></span> : user?.username}</div>}
                    {user && <div onClick={logout}> LOGOUT </div>} */}


                    {signupmodal && <Signup closemodal={signupclose} />}
                </div>
            </div>
        </motion.nav >

    )
}

export default Navbar

