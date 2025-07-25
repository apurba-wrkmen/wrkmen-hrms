// services/user.api.ts
import supabase from "./supabase";

export async function getUser() {
  const { data: sessionResponse } = await supabase.auth.getSession();
  if (!sessionResponse.session) return null;

  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error(error?.message || "Failed to get user");

  return {
    ...user,
    role: "authenticated", // or use a real role if stored in user_metadata
  };
}
