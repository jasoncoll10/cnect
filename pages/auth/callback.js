import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const mono = "'Courier New', monospace"
const gold = '#d4af72'

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // Check if profile exists, if not create one
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (!profile) {
          await supabase.from('profiles').insert({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || '',
          })
        }

        window.location.href = '/dashboard'
      } else {
        window.location.href = '/signup'
      }
    }

    handleCallback()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: mono, color: '#f0eef8' }}>
      <div style={{ fontSize: 32, marginBottom: 16, color: gold }}>✦</div>
      <p style={{ fontSize: 14, color: 'rgba(240,238,248,0.5)', letterSpacing: '0.08em' }}>Signing you in...</p>
    </div>
  )
}
