import supabase from "./supabase";

// This function assumes the user is already logged in
export const resetPassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) throw new Error(error.message);
    return data;
};
