import { useEffect, useReducer, createContext, PropsWithChildren } from "react";

interface AuthContextType {
    user: any;
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

        default:
            return state;
    }
};



export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authError: null,
        numb: 9
    })




    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user")!)

        if (user) {
            dispatch({ type: "LOGIN", payload: user });
            console.log(state.user, state.numb, "auth")

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
