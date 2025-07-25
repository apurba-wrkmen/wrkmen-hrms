import supabase from "@/services/supabase"

export const punchInApi = async (data) => {

    const { data: res, error } = await supabase
        .from('work_logs')
        .insert([
            { "checked_in": data.checekInTime, "date": data.date, "user_id": data.id }
        ])
        .select()


    if (error) throw new Error(error.message)
    return res
}


export const punchOutApi = async (data) => {

    const { data: res, error } = await supabase
        .from('work_logs')
        .update({ checked_out: data.checekOutTime })
        .eq("user_id", data.id)
        .eq("date", data.date)
        .select()


    if (error) throw new Error(error.message)
    return res
}