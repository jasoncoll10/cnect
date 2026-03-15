import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const mono = "'Courier New', monospace"
const gold = '#d4af72'

export default function Checkout() {
  const [selected, setSelected] = useState('pro')
  const [loading, setLoading] = useState(false)

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: 9.99,
      note: 'one-time',
      features: ['1 Smart Card', 'Unlimited links', 'Custom profile', 'QR code included'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 12.99,
      note: 'one-time + $3/mo',
      features: ['1 Premium Smart Card', 'Unlimited links', 'Custom profile', 'Tap analytics', 'Priority support'],
      featured: true,
    },
  ]

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070709', fontFamily: mono, color: '#f0eef8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>

      <a href="/" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.15em', color: gold, textDecoration: 'none', marginBottom: 48 }}>✦ cnect</a>

      <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8, textAlign: 'center' }}>Get your card</h1>
      <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 14, marginBottom: 40, textAlign: 'center' }}>One tap. All your links. Forever.</p>

      {/* Plan selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 420, marginBottom: 32 }}>
        {plans.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)} style={{
            background: selected === plan.id ? `rgba(212,175,114,0.08)` : 'rgba(255,255,255,0.02)',
            border: `2px solid ${selected === plan.id ? gold : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 20, padding: '24px 28px', cursor: 'pointer',
            transition: 'all 0.2s', position: 'relative',
          }}>
            {plan.featured && <span style={{ position: 'absolute', top: 16, right: 16, background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 50 }}>Popular</span>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selected === plan.id ? gold : 'rgba(255,255,255,0.2)'}`, background: selected === plan.id ? gold : 'transparent', transition: 'all 0.2s' }} />
              <span style={{ fontSize: 16, fontWeight: 700 }}>{plan.name}</span>
              <span style={{ marginLeft: 'auto', marginRight: 80, fontSize: 24, fontWeight: 300, color: gold }}>${plan.price}</span>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(240,238,248,0.35)', marginBottom: 12, letterSpacing: '0.06em' }}>{plan.note}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: 'rgba(240,238,248,0.6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: gold, fontSize: 10 }}>✦</span> {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleCheckout} disabled={loading} style={{
        width: '100%', maxWidth: 420,
        background: `linear-gradient(135deg,${gold},#c9a55a)`,
        color: '#070709', border: 'none', borderRadius: 50,
        padding: '16px', fontSize: 15, fontWeight: 700,
        cursor: loading ? 'default' : 'pointer',
        fontFamily: mono, opacity: loading ? 0.7 : 1,
        boxShadow: `0 0 40px rgba(212,175,114,0.3)`,
        letterSpacing: '0.04em',
      }}>
        {loading ? 'Redirecting to checkout...' : `Order ${selected === 'pro' ? 'Pro' : 'Essential'} — $${selected === 'pro' ? 12.99 : 9.99} →`}
      </button>

      <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(240,238,248,0.25)', letterSpacing: '0.06em' }}>
        Secure checkout powered by Stripe 🔒
      </p>
    </div>
  )
}
