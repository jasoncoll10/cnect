import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const mono = "'Courier New', monospace"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ label: '', url: '', icon: '🔗' })
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('links')

  const ICONS = ['🔗','📸','🌐','🎵','✉️','💼','🎬','🛒','📱','🎨','📝','🚀','⭐','🎯','💡','🎮']

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        loadData(session.user.id)
      } else {
        setLoading(false)
      }
    })
  }, [])

  const loadData = async (userId) => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    const { data: linksData } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .order('position')

    setProfile(profileData)
    setLinks(linksData || [])
    setLoading(false)
  }

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { alert(error.message); return }
    setUser(data.user)
    loadData(data.user.id)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setLinks([])
  }

  const saveProfile = async () => {
    await supabase.from('profiles').update({
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
    }).eq('id', user.id)
    alert('Profile saved! 🖤')
  }

  const addLink = async () => {
    if (!newLink.label || !newLink.url) return
    const { data } = await supabase.from('links').insert({
      user_id: user.id,
      label: newLink.label,
      url: newLink.url,
      icon: newLink.icon,
      active: true,
      position: links.length,
    }).select().single()
    setLinks(l => [...l, data])
    setNewLink({ label: '', url: '', icon: '🔗' })
  }

  const removeLink = async (id) => {
    await supabase.from('links').delete().eq('id', id)
    setLinks(l => l.filter(x => x.id !== id))
  }

  const toggleLink = async (id, active) => {
    await supabase.from('links').update({ active: !active }).eq('id', id)
    setLinks(l => l.map(x => x.id === id ? { ...x, active: !active } : x))
  }

  const inp = { width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#f0eef8', fontSize: 14, boxSizing: 'border-box', fontFamily: mono }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, color: '#f0eef8' }}>
      Loading...
    </div>
  )

  if (!user) return (
    <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: mono, color: '#f0eef8', padding: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✦</div>
        <h1 style={{ fontFamily: mono, fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Welcome back</h1>
        <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 14 }}>Log in to manage your Cnect profile</p>
      </div>
      <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inp} />
        <button onClick={login} style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', border: 'none', borderRadius: 50, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: mono, marginTop: 8 }}>
          Log In →
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#070709', fontFamily: mono, color: '#f0eef8' }}>
      
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#a78bfa' }}>✦ Cnect</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(240,238,248,0.4)' }}>{user.email}</span>
          <button onClick={logout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,238,248,0.5)', borderRadius: 50, padding: '6px 16px', fontSize: 12, cursor: 'pointer', fontFamily: mono }}>Log out</button>
        </div>
      </div>

      <div style={{ padding: '24px', maxWidth: 500, margin: '0 auto' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {['links', 'profile'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 50, border: 'none', background: tab === t ? 'linear-gradient(135deg,#a78bfa,#c084fc)' : 'rgba(255,255,255,0.05)', color: tab === t ? '#fff' : 'rgba(240,238,248,0.5)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: mono, textTransform: 'capitalize' }}>
              {t}
            </button>
          ))}
        </div>

        {/* LINKS TAB */}
        {tab === 'links' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {links.map(link => (
              <div key={link.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 16px', opacity: link.active ? 1 : 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{link.icon}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{link.label}</span>
                  <button onClick={() => toggleLink(link.id, link.active)} style={{ background: link.active ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 50, padding: '4px 12px', fontSize: 11, color: link.active ? '#a78bfa' : 'rgba(240,238,248,0.3)', cursor: 'pointer', fontFamily: mono }}>
                    {link.active ? 'ON' : 'OFF'}
                  </button>
                  <button onClick={() => removeLink(link.id)} style={{ background: 'none', border: 'none', color: 'rgba(240,238,248,0.3)', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>✕</button>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(240,238,248,0.3)', marginTop: 6, paddingLeft: 30 }}>{link.url}</div>
              </div>
            ))}

            {/* Add new link */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(240,238,248,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>+ Add Link</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setNewLink(p => ({ ...p, icon: ic }))} style={{ fontSize: 18, background: newLink.icon === ic ? 'rgba(167,139,250,0.2)' : 'none', border: newLink.icon === ic ? '1px solid #a78bfa' : '1px solid transparent', borderRadius: 8, padding: '4px 6px', cursor: 'pointer' }}>{ic}</button>
                ))}
              </div>
              <input placeholder="Label (e.g. Instagram)" value={newLink.label} onChange={e => setNewLink(p => ({ ...p, label: e.target.value }))} style={{ ...inp, marginBottom: 8 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="URL (https://...)" value={newLink.url} onChange={e => setNewLink(p => ({ ...p, url: e.target.value }))} style={{ ...inp, flex: 1 }} />
                <button onClick={addLink} style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: mono, whiteSpace: 'nowrap' }}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {tab === 'profile' && profile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Display Name', key: 'name', placeholder: 'Your name' },
              { label: 'Title / Role', key: 'title', placeholder: 'e.g. Designer, Founder' },
              { label: 'Bio', key: 'bio', placeholder: 'A short line about you...' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,238,248,0.45)', display: 'block', marginBottom: 8 }}>{f.label}</label>
                <input value={profile[f.key] || ''} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inp} />
              </div>
            ))}
            <button onClick={saveProfile} style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', border: 'none', borderRadius: 50, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: mono, marginTop: 8 }}>
              Save Profile 🖤
            </button>
            <a href={`/u/card003`} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', fontSize: 13, color: '#a78bfa', marginTop: 4 }}>
              View my profile →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
