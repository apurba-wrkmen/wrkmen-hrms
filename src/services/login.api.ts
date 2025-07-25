import supabase from "@/services/supabase"

export const login = async (data: { email: string, password: string }) => {
    const { data: res, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    })

    if (error) throw new Error(error.message)
    return res
}