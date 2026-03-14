import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function CardPage({ id, claimed, profile, links }) {  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ email: '', password: '', name: '', title: '', bio: '' })

  const mono = "'Courier New', monospace"

const [tapCount, setTapCount] = useState(profile?.taps || 0)

useEffect(() => {
    const countTap = async () => {
      if (claimed && profile) {
        await supabase.rpc('increment_taps', { user_id: profile.id })
        const { data } = await supabase
          .from('profiles')
          .select('taps')
          .eq('id', profile.id)
          .single()
        if (data) setTapCount(data.taps)
      }
    }
    countTap()
  }, [])
                                                                   

useEffect(() => {
    const handleGoogleReturn = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session && !claimed) {
        // User just logged in with Google, claim the card
        const { data: existingCard } = await supabase
          .from('cards')
          .select('*')
          .eq('id', id)
          .single()

        if (existingCard && !existingCard.owner_id) {
          // Check if profile exists
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

          await supabase.from('cards').update({
            owner_id: session.user.id,
            status: 'active'
          }).eq('id', id)

          // Reload the page to show the profile
          window.location.reload()
        }
      }
    }
    handleGoogleReturn()
  }, [])
                                                                   
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
    const initials = profile.name ? profile.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : '??'
    
    const getIcon = (label, url) => {
      const l = label.toLowerCase()
      const u = (url || '').toLowerCase()
      
      if (l.includes('instagram') || u.includes('instagram')) return { bg: '#E1306C', logo: 'https://cdn.simpleicons.org/instagram/white' }
      if (l.includes('tiktok') || u.includes('tiktok')) return { bg: '#010101', logo: 'https://cdn.simpleicons.org/tiktok/white' }
      if (l.includes('twitter') || l.includes('x.com') || u.includes('twitter') || u.includes('x.com')) return { bg: '#000000', logo: 'https://cdn.simpleicons.org/x/white' }
      if (l.includes('youtube') || u.includes('youtube')) return { bg: '#FF0000', logo: 'https://cdn.simpleicons.org/youtube/white' }
      if (l.includes('spotify') || u.includes('spotify')) return { bg: '#1DB954', logo: 'https://cdn.simpleicons.org/spotify/white' }
      if (l.includes('linkedin') || u.includes('linkedin')) return { bg: '#0077B5', logo: 'https://cdn.simpleicons.org/linkedin/white' }
      if (l.includes('facebook') || u.includes('facebook')) return { bg: '#1877F2', logo: 'https://cdn.simpleicons.org/facebook/white' }
      if (l.includes('snapchat') || u.includes('snapchat')) return { bg: '#FFFC00', logo: 'https://cdn.simpleicons.org/snapchat/black' }
      if (l.includes('pinterest') || u.includes('pinterest')) return { bg: '#E60023', logo: 'https://cdn.simpleicons.org/pinterest/white' }
      if (l.includes('twitch') || u.includes('twitch')) return { bg: '#9146FF', logo: 'https://cdn.simpleicons.org/twitch/white' }
      if (l.includes('discord') || u.includes('discord')) return { bg: '#5865F2', logo: 'https://cdn.simpleicons.org/discord/white' }
      if (l.includes('whatsapp') || u.includes('whatsapp')) return { bg: '#25D366', logo: 'https://cdn.simpleicons.org/whatsapp/white' }
      if (l.includes('telegram') || u.includes('telegram')) return { bg: '#26A5E4', logo: 'https://cdn.simpleicons.org/telegram/white' }
      if (l.includes('github') || u.includes('github')) return { bg: '#181717', logo: 'https://cdn.simpleicons.org/github/white' }
      if (l.includes('behance') || u.includes('behance')) return { bg: '#1769FF', logo: 'https://cdn.simpleicons.org/behance/white' }
      if (l.includes('dribbble') || u.includes('dribbble')) return { bg: '#EA4C89', logo: 'https://cdn.simpleicons.org/dribbble/white' }
      if (l.includes('etsy') || u.includes('etsy')) return { bg: '#F16521', logo: 'https://cdn.simpleicons.org/etsy/white' }
      if (l.includes('shopify') || u.includes('shopify')) return { bg: '#96BF48', logo: 'https://cdn.simpleicons.org/shopify/white' }
      if (l.includes('amazon') || u.includes('amazon')) return { bg: '#FF9900', logo: 'https://cdn.simpleicons.org/amazon/white' }
      if (l.includes('patreon') || u.includes('patreon')) return { bg: '#FF424D', logo: 'https://cdn.simpleicons.org/patreon/white' }
      if (l.includes('venmo') || u.includes('venmo')) return { bg: '#3D95CE', logo: 'https://cdn.simpleicons.org/venmo/white' }
      if (l.includes('cashapp') || u.includes('cashapp') || l.includes('cash app')) return { bg: '#00C244', logo: 'https://cdn.simpleicons.org/cashapp/white' }
      if (l.includes('email') || l.includes('mail') || u.includes('mailto')) return { bg: '#d4af72', logo: null, icon: '✉️' }
      if (l.includes('website') || l.includes('portfolio') || l.includes('site')) return { bg: '#333', logo: null, icon: '🌐' }
      if (l.includes('phone') || l.includes('call')) return { bg: '#333', logo: null, icon: '📞' }
      return { bg: '#333', logo: null, icon: '🔗' }
    }

    return (
      <div style={{ minHeight: '100vh', background: '#070709', fontFamily: mono, color: '#f0eef8', overflow: 'hidden' }}>
        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
          @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(212,175,114,0.3),0 0 0 3px rgba(212,175,114,0.15)} 50%{box-shadow:0 0 40px rgba(212,175,114,0.5),0 0 0 3px rgba(212,175,114,0.3)} }
          .link-btn { transition: all 0.2s ease !important; }
          .link-btn:hover { transform: translateY(-3px) scale(1.05) !important; }
          .social-btn { transition: all 0.2s ease !important; }
          .social-btn:hover { transform: translateY(-4px) scale(1.1) !important; }
        `}</style>

        {/* Background effects */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,114,0.06),transparent 70%)', top: -200, left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,114,0.04),transparent 70%)', bottom: -100, right: -100 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px 80px', maxWidth: 480, margin: '0 auto' }}>

          {/* Avatar */}
          <div style={{ marginBottom: 20, animation: 'fadeUp 0.6s both' }}>
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', animation: 'glow 3s ease-in-out infinite', border: '3px solid rgba(212,175,114,0.3)' }} />
            ) : (
              <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'linear-gradient(135deg,#1a1a0f,#2a2510)', border: '3px solid rgba(212,175,114,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 700, color: '#d4af72', animation: 'glow 3s ease-in-out infinite', boxShadow: '0 0 30px rgba(212,175,114,0.2)' }}>
                {initials}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div style={{ textAlign: 'center', marginBottom: 32, animation: 'fadeUp 0.6s 0.1s both' }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.3px', background: 'linear-gradient(135deg,#f0eef8,#d4af72)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {profile.name}
            </h1>
            {tapCount > 0 && (
              <p style={{ fontSize: 11, color: 'rgba(212,175,114,0.4)', letterSpacing: '0.12em', marginTop: 4 }}>
                ✦ {tapCount} {tapCount === 1 ? 'tap' : 'taps'}
              </p>
            )}
            {profile.bio && (
              <p style={{ fontSize: 14, color: 'rgba(240,238,248,0.55)', lineHeight: 1.7, maxWidth: 300, margin: '0 auto' }}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* Links */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeUp 0.6s 0.2s both' }}>
            {links.filter(l => l.active).map((link, i) => {
              const result = getIcon(link.label, link.url)
              return (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="link-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'rgba(212,175,114,0.04)', border: '1px solid rgba(212,175,114,0.12)', borderRadius: 16, textDecoration: 'none', color: '#f0eef8', backdropFilter: 'blur(10px)', animationDelay: `${i * 0.05}s` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: result.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    {result.logo ? (
                      <img src={result.logo} alt={link.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: 16 }}>{result.icon}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{link.label}</span>
                  <span style={{ fontSize: 16, color: 'rgba(212,175,114,0.4)' }}>→</span>
                </a>
              )
            })}

            {links.filter(l => l.active).length === 0 && (
              <p style={{ textAlign: 'center', color: 'rgba(240,238,248,0.25)', fontSize: 13, padding: '32px 0' }}>No links added yet.</p>
            )}
          </div>

          {/* Save Contact Button */}
          {(profile.phone || profile.contact_email) && (
            <>
              <div style={{ width: '100%', height: 1, background: 'rgba(212,175,114,0.08)', margin: '8px 0 16px' }} />
              <a href={`data:text/vcard;charset=utf-8,BEGIN:VCARD%0AVERSION:3.0%0AFN:${encodeURIComponent(profile.name || '')}%0ATITLE:${encodeURIComponent(profile.title || '')}%0ATEL:${encodeURIComponent(profile.phone || '')}%0AEMAIL:${encodeURIComponent(profile.contact_email || '')}%0AURL:https://cnect.me/u/${encodeURIComponent(profile.username || '')}%0AEND:VCARD`}
                download={`${profile.name || 'contact'}.vcf`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', maxWidth: 400, background: 'linear-gradient(135deg,rgba(212,175,114,0.15),rgba(212,175,114,0.05))', border: '1px solid rgba(212,175,114,0.3)', color: '#d4af72', borderRadius: 16, padding: '16px 20px', fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: mono, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>👤</span>
                Save Contact
                <span style={{ fontSize: 12, opacity: 0.6 }}>→</span>
              </a>
            </>
          )}

          {/* Footer */}
          <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, animation: 'fadeUp 0.6s 0.4s both' }}>
            <a href="/signup" style={{ background: 'linear-gradient(135deg,rgba(212,175,114,0.15),rgba(212,175,114,0.05))', border: '1px solid rgba(212,175,114,0.2)', color: '#d4af72', borderRadius: 50, padding: '10px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase' }}>
              ✦ Get your Cnect card
            </a>
            <p style={{ fontSize: 10, color: 'rgba(240,238,248,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Powered by <strong style={{ color: 'rgba(212,175,114,0.4)' }}>Cnect</strong>
            </p>
          </div>
        </div>
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
    
    {/* Google button */}
    <button onClick={async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      await sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `https://cnect.me/u/${id}` }
      })
    }} style={{ width: '100%', background: '#fff', color: '#070709', border: 'none', borderRadius: 50, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: mono, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <span style={{ fontSize: 18 }}>G</span> Continue with Google
    </button>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
      <span style={{ fontSize: 11, color: 'rgba(240,238,248,0.3)', letterSpacing: '0.08em', fontFamily: mono }}>OR</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
    </div>

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

  const id = params.id

  // First try to find by username
  const { data: profileByUsername } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', id)
    .single()

  if (profileByUsername) {
    // Found by username — load their links
    const { data: links } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', profileByUsername.id)

    return {
      props: {
        id,
        claimed: true,
        profile: profileByUsername,
        links: links || []
      }
    }
  }

  // Otherwise try by card ID
  const { data: card } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single()

  if (!card || !card.owner_id) {
    return { props: { id, claimed: false, profile: null, links: [] } }
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
      id,
      claimed: true,
      profile: profile || null,
      links: links || []
    }
  }
}
