import { AuthContext } from "@/context/authContext"
import { useContext } from "react"

const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext)!

    const logout = (() => {
        dispatch({ type: "LOGOUT" })
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

