import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const mono = "'Courier New', monospace"
const gold = '#d4af72'

export default function Success() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer)
          router.push('/signup')
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#070709', fontFamily: mono, color: '#f0eef8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} } @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>

      <div style={{ fontSize: 72, marginBottom: 24, animation: 'float 3s ease-in-out infinite', color: gold }}>✦</div>
      
      <h1 style={{ fontSize: 40, fontWeight: 300, marginBottom: 12, animation: 'fadeUp 0.6s both' }}>
        Order confirmed! 🖤
      </h1>
      
      <p style={{ color: 'rgba(240,238,248,0.5)', fontSize: 15, lineHeight: 1.8, maxWidth: 380, marginBottom: 16, animation: 'fadeUp 0.6s 0.1s both' }}>
        Thank you for your order! Your Cnect card is on its way. We'll email you with tracking info shortly.
      </p>

      <div style={{ background: 'rgba(212,175,114,0.08)', border: '1px solid rgba(212,175,114,0.2)', borderRadius: 16, padding: '20px 28px', marginBottom: 32, animation: 'fadeUp 0.6s 0.2s both', maxWidth: 380, width: '100%' }}>
        <p style={{ fontSize: 13, color: gold, fontWeight: 700, marginBottom: 8 }}>✦ While you wait</p>
        <p style={{ fontSize: 13, color: 'rgba(240,238,248,0.5)', lineHeight: 1.7 }}>
          Set up your Cnect profile now so it's ready the moment your card arrives. Takes 2 minutes!
        </p>
      </div>

      <a href="/signup" style={{ background: `linear-gradient(135deg,${gold},#c9a55a)`, color: '#070709', borderRadius: 50, padding: '14px 40px', fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: mono, boxShadow: `0 0 30px rgba(212,175,114,0.3)`, marginBottom: 16, animation: 'fadeUp 0.6s 0.3s both', display: 'inline-block' }}>
        Set Up My Profile →
      </a>

      <p style={{ fontSize: 11, color: 'rgba(240,238,248,0.25)', animation: 'fadeUp 0.6s 0.4s both' }}>
        Redirecting in {countdown} seconds...
      </p>
    </div>
  )
}
