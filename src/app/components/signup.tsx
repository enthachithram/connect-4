"use client"

import { AuthContext } from "@/context/authContext"
import { supabase } from "@/lib/supabase"
import { easeIn, motion, spring } from "framer-motion"
import { useContext, useState } from "react"

const Signup = (({ closemodal }: { closemodal: () => void }) => {
    const { user, numb, dispatch } = useContext(AuthContext)!
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
            console.log(data)
            if (error) {
                setMessage(error.message)
            }
            else {
                const { error: usernameError } = await supabase.from("Users").insert([{ id: data?.user?.id, email: email, username: name }])

                if (usernameError) {
                    setMessage(usernameError.message)
                }
                else {
                    closemodal()
                    localStorage.setItem("user", JSON.stringify(data));
                    dispatch({ type: "LOGIN", payload: data });

                }

            }

        }
        else {
            const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password })

            if (error) {
                setMessage(error.message)
            }
            else {
                closemodal()
                localStorage.setItem("user", JSON.stringify(data));
                dispatch({ type: "LOGIN", payload: data })
            }
        }

        setLoading(false)


    })
    console.log(numb, "ss", user)


    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center text-white z-[9999]">
            <motion.div
                className="flex flex-col w-[40%] h-[60%]  rounded-2xl shadow-xl shadow-gray-600 bg-gray-700 relative"
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut", type: spring, bounce: 0.15 }}
            >
                <div className="absolute top-3 right-5 cursor-pointer text-gray-300 text-2xl" onClick={closemodal}> x </div>
                <div className="mt-[10%] text-2xl flex justify-center ">Sign up or Login </div>
                <motion.form className="mt-[10%] flex flex-col items-center space-y-3"

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
                    <button type="submit" className="py-2 rounded-md w-[20%] bg-white cursor-pointer text-black"> {loading ? "Loading... " : thh ? "Sign up" : "Login"}</button>


                </motion.form>
                <a className="flex justify-center bottom-5 underline cursor-pointer mt-3" onClick={() => setThh(!thh)}>
                    {thh ? "Have an account? Login" : "No account? Signup"}
                </a>
                <div> {messsage}</div>
                <div> {user?.user.id}aa</div>

            </motion.div>
        </div>
    )
})

export default Signup