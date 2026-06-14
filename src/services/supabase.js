
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vwxyndkashtnzktsyagl.supabase.co'
const supabaseKey = "sb_publishable_iAPbBrvUXd-l7sUes400Ng_htlb-c90"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase