import { supabase } from "@/lib/supabase-node"

export const CheckToken = (async (headers: Record<string, any>) => {

    const authHeader = headers.get("authorization")
    const token = authHeader.split(" ")[1]

    const { data, error } = await supabase.auth.getUser(token)

    if (!data || error) {
        throw new Error(`Auth error: ${error}`)
    }
    console.log(error)

    return data?.user?.id
})