import supabase from "@/services/supabase";

interface PunchData {
  id: string;
  date: string;
  email?:string;
  checekInTime?: string;
  checekOutTime?: string;
}

export const punchDetailsApi = async (id: string, date: string) => {
  const { data: res, error } = await supabase
    .from("work_logs")
    .select("*")
    .eq("user_id", id)
    .eq("date", date);

  if (error) throw new Error(error.message);
  return res;
};

export const punchInApi = async (data: PunchData) => {
  const { data: res, error } = await supabase
    .from("work_logs")
    .insert([
      {
        checked_in: data.checekInTime,
        date: data.date,
        user_id: data.id,
        email: data.email,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return res;
};

export const punchOutApi = async (data: PunchData) => {
  const { data: res, error } = await supabase
    .from("work_logs")
    .update({ checked_out: data.checekOutTime })
    .eq("user_id", data.id)
    .eq("date", data.date)
    .select();

  if (error) throw new Error(error.message);
  return res;
};
