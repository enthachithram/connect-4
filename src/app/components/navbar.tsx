import { AuthContext } from "@/context/authContext"




import { supabase } from "@/lib/supabase"
import { useContext, useEffect, useState } from "react"
import Signup from "./signup"
import { motion } from "framer-motion"



const Navbar = () => {

    const { user, dispatch, supaUser, authLoading } = useContext(AuthContext)!

    const [user2, setUser2] = useState<any>()
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

        <motion.nav className=" backdrop-blur-7xl top-0   shadow-[0_8px_32px_rgba(0,0,0,0.6)]   relative   flex px-7  justify-between items-center-safe rounded-4xl py-1 mt-3"
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>

            <h1 className=" font-bold text-2xl">CONNECT-4 </h1>

            <div className="flex space-x-5">
                <div className="hover:text-cyan-400 transition font-bold"> AI SEARCH</div>

                <div className="">

                    {/* <div>user id: {authLoading ? <span className="spinner"></span> : user?.id}</div> */}

                    {user && <div>user name: {authLoading ? <span className="spinner"></span> : user?.username}</div>}
                    {user && <div onClick={logout}> LOGOUT </div>

                    }
                    {!user && < div className="font-bold" onClick={() => setSignupmodal(true)}>LOGIN</div>}

                    {signupmodal && <Signup closemodal={signupclose} />}
                </div>
            </div>
        </motion.nav>

    )
}

export default Navbar

