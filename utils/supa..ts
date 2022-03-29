import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://vuoszjbifkmjeadyrrdl.supabase.co'

export const initSupabase = (key: string) => createClient(supabaseUrl, key)
export const getSupabase = () => createClient(supabaseUrl, process.env.SUPABASE_KEY || "")