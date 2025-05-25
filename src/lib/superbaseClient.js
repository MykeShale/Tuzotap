import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmvsvhssxijkmrmnqkdc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdnN2aHNzeGlqa21ybW5xa2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTczMjcsImV4cCI6MjA2MzY5MzMyN30.o57564GpN5MQm3KSzav9lTd29uw9JzFsMyme4ZUjrkI'

export const supabase = createClient(supabaseUrl, supabaseKey)

