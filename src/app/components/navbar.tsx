import { AuthContext } from "@/context/authContext"




import { supabase } from "@/lib/supabase"
import { useContext, useEffect, useState } from "react"
import Signup from "./signup"



const Navbar = () => {

    const { user, dispatch, supaUser } = useContext(AuthContext)!

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

        <>

            <div>user id: {user?.id}</div>
            <div>user name: {user?.username}</div>
            {user && <div onClick={logout}> LOGOUT </div>}
            <div onClick={() => setSignupmodal(true)}>sign up</div>
            {signupmodal && <Signup closemodal={signupclose} />}
        </>

    )
}

export default Navbar

