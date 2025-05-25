import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://rjdsuvgaehzckefgtaxe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZHN1dmdhZWh6Y2tlZmd0YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDEzMDYsImV4cCI6MjA1NjQxNzMwNn0.ziaAZLYzF0v54lh_hfrxMhTEIH-4HVEtYOaazJDB2_o")

export default supabase;