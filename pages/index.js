import { useState } from 'react'

const mono = "'Courier New', monospace"

export default function Home() {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#070709', fontFamily: mono, color: '#f0eef8', overflowX: 'hidden' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.1em', color: '#f0eef8' }}>✦ cnect</span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#how" style={{ fontSize: 13, color: 'rgba(240,238,248,0.5)', letterSpacing: '0.08em' }}>How it works</a>
          <a href="#pricing" style={{ fontSize: 13, color: 'rgba(240,238,248,0.5)', letterSpacing: '0.08em' }}>Pricing</a>
          <a href="/dashboard" style={{ fontSize: 13, color: '#a78bfa', letterSpacing: '0.08em', border: '1px solid rgba(167,139,250,0.3)', padding: '8px 20px', borderRadius: 50 }}>Log in</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: '100px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto', animation: 'fadeUp 0.8s both' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 24 }}>
          ✦ NFC Digital Business Cards ✦
        </p>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 32 }}>
          Share everything.<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(167,139,250,0.6)' }}>One tap.</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(240,238,248,0.5)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 48px' }}>
          One black NFC card. Tap it to share all your links — Instagram, website, portfolio, anything. Update your profile anytime, no new card needed.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#pricing" style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', borderRadius: 50, padding: '16px 40px', fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', boxShadow: '0 0 40px rgba(167,139,250,0.3)' }}>
            Get Your Card →
          </a>
          <a href="#how" style={{ background: 'transparent', color: 'rgba(240,238,248,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '16px 40px', fontSize: 14, letterSpacing: '0.05em' }}>
            See how it works
          </a>
        </div>
      </div>

      {/* CARD MOCKUP */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 48px 100px', animation: 'fadeUp 0.8s 0.2s both' }}>
        <div style={{ position: 'relative' }}>
          {/* Phone */}
          <div style={{ width: 220, height: 440, background: 'linear-gradient(145deg,#1a1a2e,#0f0f1a)', borderRadius: 36, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(167,139,250,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 18px 24px', overflow: 'hidden' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#a78bfa,#c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12, boxShadow: '0 0 0 3px rgba(167,139,250,0.3)' }}>JC</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Jason Coll</div>
            <div style={{ fontSize: 9, color: '#a78bfa', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Photographer</div>
            {['📸 Instagram', '🌐 Website', '✉️ Email Me'].map((l, i) => (
              <div key={i} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px', fontSize: 11, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                {l}
              </div>
            ))}
            <div style={{ fontSize: 9, color: 'rgba(240,238,248,0.2)', marginTop: 'auto', letterSpacing: '0.08em' }}>Powered by cnect</div>
          </div>

          {/* Floating NFC card */}
          <div style={{ position: 'absolute', right: -90, bottom: 60, width: 150, height: 95, background: 'linear-gradient(135deg,#1e1b2e,#2a1f3d)', borderRadius: 12, border: '1px solid rgba(167,139,250,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', padding: 14, transform: 'rotate(8deg)', animation: 'float 4s ease-in-out infinite', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', color: '#a78bfa' }}>cnect</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ fontSize: 8, color: 'rgba(240,238,248,0.4)', letterSpacing: '0.06em' }}>Jason Coll</span>
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                {[6,10,14].map((h,i) => <div key={i} style={{ width: 3, height: h, background: 'rgba(167,139,250,0.5)', borderRadius: 2 }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" style={{ padding: '100px 48px', maxWidth: 1000, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 20 }}>How it works</p>
        <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 300, marginBottom: 64, lineHeight: 1.1 }}>Simple as a tap.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { num: '01', title: 'Order your card', desc: 'Premium matte black NFC card ships to your door in 3-5 days.' },
            { num: '02', title: 'Set up your profile', desc: 'Add your links, bio, and photo in minutes at cnect.me/dashboard.' },
            { num: '03', title: 'Tap to share', desc: 'Hold your card near any phone. Your profile opens instantly.' },
            { num: '04', title: 'Update anytime', desc: 'Changed jobs? New Instagram? Update online, card stays the same.' },
          ].map((s, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: '36px 28px', background: hovered === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.2s', cursor: 'default', borderRadius: i === 0 ? '12px 0 0 12px' : i === 3 ? '0 12px 12px 0' : 0 }}>
              <div style={{ fontSize: 48, fontWeight: 300, color: 'rgba(167,139,250,0.15)', lineHeight: 1, marginBottom: 20 }}>{s.num}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(240,238,248,0.5)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={{ padding: '100px 48px', maxWidth: 800, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 20 }}>Pricing</p>
        <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 300, marginBottom: 16, lineHeight: 1.1 }}>Simple pricing.</h2>
        <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 15, marginBottom: 56 }}>One card. Yours forever.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, maxWidth: 620, margin: '0 auto' }}>
          {[
            { tier: 'Essential', price: '19', note: 'one-time', features: ['1 NFC Card', 'Unlimited links', 'Custom profile', 'QR code included'], featured: false },
            { tier: 'Pro', price: '29', note: 'one-time + $3/mo', features: ['1 Premium NFC Card', 'Unlimited links', 'Custom profile', 'Tap analytics', 'Priority support'], featured: true },
          ].map((p, i) => (
            <div key={i} style={{ background: p.featured ? 'linear-gradient(145deg,rgba(167,139,250,0.08),rgba(192,132,252,0.04))' : 'rgba(255,255,255,0.03)', border: `1px solid ${p.featured ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 24, padding: '40px 32px', textAlign: 'left', position: 'relative' }}>
              {p.featured && <span style={{ position: 'absolute', top: 20, right: 20, background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 50 }}>Popular</span>}
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16 }}>{p.tier}</div>
              <div style={{ fontSize: 52, fontWeight: 300, lineHeight: 1, marginBottom: 4 }}><sup style={{ fontSize: 22, verticalAlign: 'super' }}>$</sup>{p.price}</div>
              <div style={{ fontSize: 12, color: 'rgba(240,238,248,0.4)', marginBottom: 28 }}>{p.note}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ fontSize: 13, color: 'rgba(240,238,248,0.6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#a78bfa', fontSize: 10 }}>✦</span> {f}
                  </div>
                ))}
              </div>
              <a href="mailto:hello@cnect.me" style={{ display: 'block', textAlign: 'center', background: p.featured ? 'linear-gradient(135deg,#a78bfa,#c084fc)' : 'transparent', color: p.featured ? '#fff' : 'rgba(240,238,248,0.5)', border: p.featured ? 'none' : '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '14px', fontSize: 14, fontWeight: 700, fontFamily: mono }}>
                Order Now →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '100px 48px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: 48, marginBottom: 24, animation: 'float 3s ease-in-out infinite' }}>✦</div>
        <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 300, marginBottom: 20, lineHeight: 1.1 }}>
          Ready to make an<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(167,139,250,0.6)' }}>impression?</span>
        </h2>
        <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 15, marginBottom: 40 }}>Join the people already using Cnect.</p>
        <a href="mailto:hello@cnect.me" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#a78bfa,#c084fc)', color: '#fff', borderRadius: 50, padding: '18px 48px', fontSize: 15, fontWeight: 700, letterSpacing: '0.05em', boxShadow: '0 0 40px rgba(167,139,250,0.3)', fontFamily: mono }}>
          Get Your Cnect Card 🖤
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.1em' }}>✦ cnect</span>
        <span style={{ fontSize: 12, color: 'rgba(240,238,248,0.3)' }}>© 2026 Cnect. All rights reserved.</span>
        <a href="/dashboard" style={{ fontSize: 12, color: 'rgba(240,238,248,0.3)' }}>Dashboard →</a>
      </div>
    </div>
  )
}
