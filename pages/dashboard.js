import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const mono = "'Courier New', monospace"
const gold = '#d4af72'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ label: '', url: '', icon: '🔗' })
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('links')
  const [uploading, setUploading] = useState(false)
  const [hasCard, setHasCard] = useState(false)

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
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)

    let profileData = profilesData && profilesData.length > 0 ? profilesData[0] : null

    if (!profileData) {
      await supabase.from('profiles').insert({ id: userId, name: '' })
      profileData = { id: userId, name: '', title: '', bio: '', avatar: '' }
    }

    const { data: cardData } = await supabase
      .from('cards')
      .select('*')
      .eq('owner_id', userId)

    const { data: linksData } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .order('position')

    setProfile(profileData)
    setLinks(linksData || [])
    setHasCard(cardData && cardData.length > 0)
    setLoading(false)
  }

  const login = async () => {
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
    const { error } = await supabase.from('profiles').update({
      username: profile.username?.toLowerCase().replace(/[^a-z0-9]/g, ''),
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      phone: profile.phone,
      contact_email: profile.contact_email,
    }).eq('id', user.id)
    if (error) { alert(error.message); return }
    alert('Profile saved! 🖤')
  }

  const uploadAvatar = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}.${fileExt}`
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })
    if (error) { alert(error.message); setUploading(false); return }
    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)
    await supabase.from('profiles').update({ avatar: data.publicUrl }).eq('id', user.id)
    setProfile(p => ({ ...p, avatar: data.publicUrl }))
    setUploading(false)
    alert('Photo updated! 🖤')
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

if (!user) {
  if (typeof window !== 'undefined') {
    window.location.href = '/signup'
  }
  return (
    <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, color: '#f0eef8' }}>
      Redirecting...
    </div>
  )
}

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

        {/* No card banner */}
{!hasCard && (
  <div style={{ margin: '24px 24px 0', background: 'rgba(212,175,114,0.08)', border: '1px solid rgba(212,175,114,0.2)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
    <div>
      <p style={{ fontSize: 14, fontWeight: 700, color: gold, marginBottom: 4 }}>✦ You don't have a card yet</p>
      <p style={{ fontSize: 13, color: 'rgba(240,238,248,0.5)' }}>Get your Cnect card to start sharing your links with a single tap.</p>
    </div>
    <a href='/#pricing' style={{ background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', border: 'none', borderRadius: 50, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: mono, textDecoration: 'none', whiteSpace: 'nowrap' }}>
      Get a Card →
    </a>
  </div>
)}

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
    
    {/* Avatar upload */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '20px 0' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: `2px solid rgba(212,175,114,0.3)`, boxShadow: '0 0 20px rgba(212,175,114,0.2)' }}>
        {profile.avatar ? (
          <img src={profile.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#1a1a0f,#2a2510)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: gold }}>
            {profile.name ? profile.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : '??'}
          </div>
        )}
      </div>
      <label style={{ background: `rgba(212,175,114,0.1)`, border: `1px solid rgba(212,175,114,0.2)`, color: gold, borderRadius: 50, padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: mono, letterSpacing: '0.06em' }}>
        {uploading ? 'Uploading...' : '📷 Upload Photo'}
        <input type="file" accept="image/*" onChange={uploadAvatar} style={{ display: 'none' }} disabled={uploading} />
      </label>
    </div>

    {[
      { label: 'Username', key: 'username', placeholder: 'e.g. jasoncoll' },
      { label: 'Display Name', key: 'name', placeholder: 'Your name' },
      { label: 'Title / Role', key: 'title', placeholder: 'e.g. Designer, Founder' },
      { label: 'Bio', key: 'bio', placeholder: 'A short line about you...' },
      { label: 'Phone Number', key: 'phone', placeholder: '+1 (555) 000-0000' },
      { label: 'Contact Email', key: 'contact_email', placeholder: 'your@email.com' },
    ].map(f => (
      <div key={f.key}>
        <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,238,248,0.45)', display: 'block', marginBottom: 8, fontFamily: mono }}>{f.label}</label>
        <input value={profile[f.key] || ''} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(212,175,114,0.15)', background: 'rgba(255,255,255,0.04)', color: '#f0eef8', fontSize: 14, boxSizing: 'border-box', fontFamily: mono, outline: 'none' }} />
      </div>
    ))}
    <button onClick={saveProfile} style={{ background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', border: 'none', borderRadius: 50, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: mono, marginTop: 8 }}>
      Save Profile 🖤
    </button>
    <a href={`/u/${profile.username || 'card001'}`} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', fontSize: 13, color: gold, marginTop: 4 }}>
  View my profile →
</a>
  </div>
)}
      </div>
    </div>
  )
}
