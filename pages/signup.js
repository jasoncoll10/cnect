import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const mono = "'Courier New', monospace"
const gold = '#d4af72'

export default function Signup() {
  const [step, setStep] = useState('signup') // signup | login | success
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const inp = { width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(212,175,114,0.15)', background: 'rgba(255,255,255,0.04)', color: '#f0eef8', fontSize: 14, boxSizing: 'border-box', fontFamily: mono, outline: 'none' }

  const handleSignup = async () => {
    if (!email || !password || !name) { alert('Please fill in all fields'); return }
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { alert(error.message); setLoading(false); return }

    await supabase.from('profiles').insert({
      id: data.user.id,
      name: name,
    })

    setLoading(false)
    setStep('success')
  }

  const handleLogin = async () => {
    if (!email || !password) { alert('Please fill in all fields'); return }
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { alert(error.message); setLoading(false); return }
    setLoading(false)
    window.location.href = '/dashboard'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070709', fontFamily: mono, color: '#f0eef8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>

      {/* Logo */}
      <a href="/" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.15em', color: gold, textDecoration: 'none', marginBottom: 48 }}>✦ cnect</a>

      {step === 'success' && (
        <div style={{ textAlign: 'center', maxWidth: 380, animation: 'fadeUp 0.4s both' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>✦</div>
          <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 12, color: gold }}>You're in!</h1>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Welcome to Cnect! Your account is ready. Get your card to start sharing your links with a single tap.
          </p>
          <a href="/dashboard" style={{ display: 'block', background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', borderRadius: 50, padding: '14px', fontSize: 14, fontWeight: 700, fontFamily: mono, textDecoration: 'none', marginBottom: 12 }}>
            Go to my account →
          </a>
          <a href="/#pricing" style={{ display: 'block', background: 'transparent', color: 'rgba(240,238,248,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, padding: '14px', fontSize: 14, fontFamily: mono, textDecoration: 'none' }}>
            Get a card →
          </a>
        </div>
      )}

      {step === 'signup' && (
        <div style={{ width: '100%', maxWidth: 380, animation: 'fadeUp 0.4s both' }}>
          <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Create account</h1>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 14, marginBottom: 32 }}>
            Join Cnect — get early access to new products and drops. 🖤
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inp} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inp} />
          </div>
          <button onClick={handleSignup} disabled={loading} style={{ width: '100%', background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', border: 'none', borderRadius: 50, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: mono, marginBottom: 16, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(240,238,248,0.4)' }}>
            Already have an account?{' '}
            <button onClick={() => setStep('login')} style={{ background: 'none', border: 'none', color: gold, cursor: 'pointer', fontFamily: mono, fontSize: 13 }}>Log in</button>
          </p>
        </div>
      )}

      {step === 'login' && (
        <div style={{ width: '100%', maxWidth: 380, animation: 'fadeUp 0.4s both' }}>
          <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 14, marginBottom: 32 }}>Log in to manage your Cnect account.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inp} />
          </div>
          <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', border: 'none', borderRadius: 50, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: mono, marginBottom: 16, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Log In →'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(240,238,248,0.4)' }}>
            Don't have an account?{' '}
            <button onClick={() => setStep('signup')} style={{ background: 'none', border: 'none', color: gold, cursor: 'pointer', fontFamily: mono, fontSize: 13 }}>Sign up</button>
          </p>
        </div>
      )}
    </div>
  )
}
