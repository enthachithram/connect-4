"use client"

import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { easeIn, motion, spring } from "framer-motion"
import { useContext, useState } from "react"

const Signup = (({ closemodal }: { closemodal: () => void }) => {
    const { user, dispatch } = useContext(AuthContext)!

    let userid: string | undefined;

    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [thh, setThh] = useState<boolean>(true)
    const [messsage, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handlesubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (thh) {
            const { data, error } = await supabase.auth.signUp({ email: email, password: password })

            console.log(data, "user data from supa sign up")
            if (error) {
                setMessage(error.message)
                setLoading(false)
                return
            }

            const { error: usernameError } = await supabase.from("Users").insert([{ id: data?.user?.id, email: email, username: name }])

            if (usernameError) {
                setMessage(usernameError.message)
            }
            else {

                userid = data?.user?.id
                console.log(userid)
                closemodal()



            }



        }
        else {

            const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password })
            console.log(data, "user data from supa log in ")

            if (error) {
                setMessage(error.message)
                setLoading(false)
                return
            }


            userid = data?.user?.id
            console.log(data?.user?.id)
            console.log(userid)
            closemodal()


            // const { data: userdata, error: userdataerror } = await supabase.from("Users").select("id,username").eq("id", data.user.id).single()




        }


        console.log(userid, "signuppage end")

        const { data, error } = await supabase
            .from("Users")
            .select("*")
            .limit(10);

        console.log("first 10 rows:", data);


        const { data: userdata, error: userdataerror } = await supabase.from("Users").select("id,username").eq("id", userid).single()
        userdataerror && console.log(userdataerror, "userdata error")
        console.log(userdata, "user data after fetch")

        dispatch({ type: "LOGIN", payload: userdata })

        setLoading(false)
        window.location.reload()


    })



    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center text-white z-100">
            <motion.div
                className="flex flex-col w-[40%] pb-5  rounded-2xl shadow-md border-white border shadow-gray-600 bg-black relative"
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut", type: spring, bounce: 0.15 }}
            >
                <div className="absolute top-3 right-5 cursor-pointer text-gray-300 text-2xl" onClick={closemodal}> x </div>


                <div className="mt-[4%] text-md flex justify-center space-x-2 ">

                    <div className={`  relative ${thh ? "text-black" : "text-white"} z-500 transition-all duration-300 py-1 px-4 cursor-pointer`}
                        onClick={() => setThh(true)}>
                        Sign up
                        {thh && <motion.div className="absolute bg-white h-full w-full rounded-2xl -z-200 left-0 right-0 bottom-0"
                            layoutId="sign"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>
                        </motion.div>}
                    </div>
                    <div className={`relative ${!thh ? "text-black" : "text-white"} z-500 transition-all duration-300 py-1 px-4 cursor-pointer`}
                        onClick={() => setThh(false)}>
                        Login
                        {!thh && <motion.div className="absolute bg-white h-full w-full rounded-2xl -z-200 left-0 right-0 bottom-0"
                            layoutId="sign"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.34 }}>
                        </motion.div>}

                    </div>
                </div>
                <motion.form className="mt-[7%] flex flex-col items-center space-y-3 "

                    onSubmit={handlesubmit}>
                    <input
                        className="please"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />


                    <input
                        className="please"
                        type="password"
                        placeholder="password"
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    {/* initial={{ height: thh ? "auto" : "0", opacity: thh ? 1 : 0, y: 50 }}
                        animate={{ height: thh ? "auto" : "0", opacity: thh ? 1 : 0, y: 0 }}
                        transition={{ duration: 0., opacity: { duration: 0.1 } }} */}
                    {thh && <input
                        className="please mt-1"
                        type="text"
                        placeholder="username"
                        required
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}

                    />}
                    <button type="submit" className="hover:scale-106 transition-all  duration-200 py-2 rounded-md w-[20%] bg-white cursor-pointer text-black"> {loading ? <span className="spinner border-t-transparent border-black"></span> : thh ? "Sign up" : "Login"}</button>


                </motion.form>
                {/* <a className="flex justify-center bottom-5 underline cursor-pointer mt-3" onClick={() => setThh(!thh)}>
                    {thh ? "Have an account? Login" : "No account? Signup"}
                </a> */}
                <div className=" text-center text-red-500"> {messsage}</div>


            </motion.div>
        </div>
    )
})

export default Signup