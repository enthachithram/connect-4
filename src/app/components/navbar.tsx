import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { useContext } from "react"

const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext)!

    const logout = (async () => {
        dispatch({ type: "LOGOUT" })
        await supabase.auth.signOut()
    })

    return (

        <>
            <div>aaaa</div>
            <div>user id: {user?.user.id}</div>

            {user && <div onClick={logout}> LOGOUT </div>}
        </>

    )
}

export default Navbar

