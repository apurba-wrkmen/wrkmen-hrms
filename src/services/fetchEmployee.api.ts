import supabase from "@/services/supabase";

export const fetchEmployee = async (id: string) => {
  const { data: res, error } = await supabase
    .from("employees")
    .select("*")
    .eq("userId", id);

  if (error) throw new Error(error.message);
  return res;
};
