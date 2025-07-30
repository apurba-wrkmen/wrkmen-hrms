import supabase from "@/services/supabase"

export const logout = async (data: { email: string, password: string }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout error:", error.message);
        // Show toast or UI message
    } else {
        // Optionally redirect or show confirmation
        console.log("User logged out");
    }
}