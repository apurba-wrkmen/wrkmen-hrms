import { createClient } from "@supabase/supabase-js"

// const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
const supabaseUrl = import.meta.env.VITE_SUPBASE_URL
// const supabaseKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseKey = import.meta.env.VITE_SUPBASE_KEY

if (!supabaseUrl) throw new Error("Missing VITE_SUPABASE_URL")
if (!supabaseKey) throw new Error("Missing VITE_SUPABASE_ANON_KEY")

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase