import { supabase } from "@/lib/supabase";
import { useEffect, useReducer, createContext, PropsWithChildren } from "react";

interface AuthContextType {
    user: any;
    supaUser: any;
    authError: any;
    numb: any;
    dispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":

            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
                authError: null

            };

        case "LOGOUT":
            localStorage.removeItem("user");
            return {
                ...state,
                user: null,
                authError: null
            };

        case "supaUser":
            return {
                ...state,
                supaUser: action.payload,
                authError: null
            }

        default:
            return state;
    }
};



export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        supaUser: null,
        authError: null,
        numb: 9
    })




    useEffect(() => {

        const supa = (async () => {
            const { data: supaUser } = await supabase.auth.getUser()
            dispatch({ type: "supaUser", payload: supaUser.user })
            console.log("from auth context", supaUser)
        })

        const user = JSON.parse(localStorage.getItem("user")!)

        if (user) {
            dispatch({ type: "LOGIN", payload: user });
            console.log(state.user, state.numb, "auth")
            supa()



        } else {
            state.authError = "no user";

        }

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}

        </AuthContext.Provider>
    )
}
