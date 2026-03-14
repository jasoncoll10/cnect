import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function CardPage({ id, claimed, profile, links }) {  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ email: '', password: '', name: '', title: '', bio: '' })

  const mono = "'Courier New', monospace"
  
const handleActivate = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) {
      alert(error.message)
      return
    }

    const user = data.user

    await supabase.from('profiles').insert({
      id: user.id,
      name: form.name,
      title: form.title,
      bio: form.bio,
    })

    await supabase.from('cards').update({
      owner_id: user.id,
      status: 'active'
    }).eq('id', id)

    setStep(3)
  }
  
if (claimed && profile) {
    return (
      <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 40px', fontFamily: mono, color: '#f0eef8' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#a78bfa,#c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16, boxShadow: '0 0 0 3px rgba(167,139,250,0.3), 0 8px 32px rgba(167,139,250,0.3)' }}>
            {profile.name ? profile.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : '??'}
          </div>
          <h1 style={{ fontFamily: mono, fontSize: 26, fontWeight: 600, margin: 0 }}>{profile.name}</h1>
          {profile.title && <p style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '6px 0 0' }}>{profile.title}</p>}
          {profile.bio && <p style={{ fontSize: 14, color: 'rgba(240,238,248,0.5)', margin: '10px 0 0', maxWidth: 280, textAlign: 'center', lineHeight: 1.65 }}>{profile.bio}</p>}
        </div>
        <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.filter(l => l.active).map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, textDecoration: 'none', color: '#f0eef8', fontFamily: mono }}>
              <span style={{ fontSize: 22 }}>{link.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>{link.label}</span>
              <span style={{ fontSize: 12, color: 'rgba(240,238,248,0.5)' }}>→</span>
            </a>
          ))}
          {links.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(240,238,248,0.3)', fontSize: 14, marginTop: 20 }}>No links added yet.</p>
          )}
        </div>
        <p style={{ marginTop: 48, fontSize: 11, color: 'rgba(240,238,248,0.3)', letterSpacing: '0.08em' }}>Powered by <strong style={{ color: '#a78bfa' }}>Cnect</strong></p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: mono, color: '#f0eef8', padding: 24 }}>
      
      {step === 0 && (
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>✦</div>
          <h1 style={{ fontFamily: mono, fontSize: 40, fontWeight: 300, marginBottom: 12 }}>This card is yours.</h1>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 15, lineHeight: 1.7, marginBottom: 40, fontFamily: mono }}>
            Set up your Cnect profile and start sharing your links with a single tap.
          </p>
          <button onClick={() => setStep(1)} style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', border: 'none', borderRadius: 50, padding: '16px 40px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', fontFamily: mono }}>
            Activate My Card →
          </button>
          <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(240,238,248,0.3)', fontFamily: mono }}>Card ID: {id}</p>
        </div>
      )}

      {step === 1 && (
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontFamily: mono, fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Create account</h2>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 14, marginBottom: 28, fontFamily: mono }}>You'll use this to log in and update your profile.</p>
          {[
            { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'Create a password' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,238,248,0.45)', display: 'block', marginBottom: 8, fontFamily: mono }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#f0eef8', fontSize: 14, boxSizing: 'border-box', fontFamily: mono }} />
            </div>
          ))}
          <button onClick={() => setStep(2)} style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', border: 'none', borderRadius: 50, padding: '16px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 8, fontFamily: mono }}>
            Continue →
          </button>
          <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', color: 'rgba(240,238,248,0.3)', cursor: 'pointer', width: '100%', marginTop: 12, fontSize: 13, fontFamily: mono }}>← Back</button>
        </div>
      )}

      {step === 2 && (
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontFamily: mono, fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Your profile</h2>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 14, marginBottom: 28, fontFamily: mono }}>This is what people see when they tap your card.</p>
          {[
            { label: 'Full Name', key: 'name', placeholder: 'Your name' },
            { label: 'Title / Role', key: 'title', placeholder: 'e.g. Designer, Founder' },
            { label: 'Bio', key: 'bio', placeholder: 'A short line about you...' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,238,248,0.45)', display: 'block', marginBottom: 8, fontFamily: mono }}>{f.label}</label>
              <input placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#f0eef8', fontSize: 14, boxSizing: 'border-box', fontFamily: mono }} />
            </div>
          ))}
          <button onClick={() => handleActivate()} style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', border: 'none', borderRadius: 50, padding: '16px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 8, fontFamily: mono }}>
            Finish Setup →
          </button>
          <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'rgba(240,238,248,0.3)', cursor: 'pointer', width: '100%', marginTop: 12, fontSize: 13, fontFamily: mono }}>← Back</button>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🖤</div>
          <h1 style={{ fontFamily: mono, fontSize: 40, fontWeight: 300, marginBottom: 12 }}>You're live!</h1>
          <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 15, lineHeight: 1.7, marginBottom: 8, fontFamily: mono }}>Your Cnect profile is active at</p>
          <p style={{ color: '#a78bfa', fontFamily: mono, fontSize: 14, marginBottom: 32 }}>cnect.me/u/{id}</p>
          <p style={{ color: 'rgba(240,238,248,0.4)', fontSize: 13, lineHeight: 1.7, fontFamily: mono }}>Tap your card anytime to share your profile. Log in to update your links.</p>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: card } = await supabase
    .from('cards')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!card || !card.owner_id) {
    return { props: { id: params.id, claimed: false, profile: null, links: [] } }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', card.owner_id)
    .single()

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', card.owner_id)

  return { 
    props: { 
      id: params.id, 
      claimed: true,
      profile: profile || null,
      links: links || []
    } 
  }
}
