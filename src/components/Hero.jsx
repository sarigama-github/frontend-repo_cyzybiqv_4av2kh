import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const gradients = (
  <div className="absolute inset-0">
    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.4),transparent_60%)] blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-12 translate-y-12 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_60%)] blur-3xl" />
    <div className="pointer-events-none absolute top-1/3 left-0 h-64 w-64 -translate-x-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.3),transparent_60%)] blur-3xl" />
  </div>
)

export default function Hero() {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(x, { stiffness: 120, damping: 20 })
  const ry = useSpring(y, { stiffness: 120, damping: 20 })
  const [loaded, setLoaded] = useState(false)
  const splineRef = useRef(null)

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } })
  }, [])

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px * 16)
    y.set(py * 16)
    if (splineRef.current) {
      // subtle camera orbit
      const scene = splineRef.current
      if (scene.setZoom) {
        // no-op for compatibility
      }
    }
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      {gradients}

      <motion.div
        className="absolute inset-0"
        style={{ perspective: 1000 }}
        animate={{}}
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: ry, rotateY: rx }}
        >
          <div className="h-[70dvh] w-full">
            <Spline
              ref={splineRef}
              scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>
      </motion.div>

      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handleLeave}
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end px-6 pb-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          className="text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          A New Mykonos Experience Is Coming
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
          className="mt-3 text-center text-base text-cyan-200/80"
        >
          Exclusive. Tailored. Made in Italy.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 text-center text-sm text-cyan-200/70"
        >
          <TypeLine />
        </motion.p>

        <div className="mt-7 w-full max-w-md">
          <WaitlistForm />
        </div>

        <Footer />
      </div>

      {/* subtle noise for depth */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)' }} />
    </section>
  )
}

function TypeLine() {
  const [text, setText] = useState('')
  const full = 'Be the first to enter.'
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setText(full.slice(0, i + 1))
      i++
      if (i >= full.length) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [])
  return <span className="font-medium tracking-wide text-cyan-100/80">{text}</span>
}

function Footer() {
  return (
    <div className="mt-12 flex w-full max-w-md items-center justify-between text-xs text-cyan-200/60">
      <span>© 2025 Made in Italy</span>
      <div className="flex items-center gap-3">
        <Social icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M19.615 3.184A12.683 12.683 0 0 1 12 6.338a12.683 12.683 0 0 1-7.615-3.154A9.513 9.513 0 0 0 2 8.108c0 5.271 3.789 11.366 10 12.892 6.211-1.526 10-7.621 10-12.892 0-1.715-.335-3.349-.385-4.924Z"/></svg>
        }/>
        <Social icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.163c-5.468 0-9.88 4.413-9.88 9.851 0 4.35 2.816 8.038 6.725 9.34.492.091.672-.214.672-.476 0-.235-.009-.858-.013-1.684-2.737.595-3.315-1.315-3.315-1.315-.448-1.137-1.095-1.44-1.095-1.44-.895-.612.068-.6.068-.6 1.02.071 1.557 1.048 1.557 1.048.88 1.54 2.309 1.095 2.872.838.089-.63.344-1.095.625-1.347-2.186-.246-4.484-1.092-4.484-4.862 0-1.074.389-1.951 1.028-2.639-.103-.25-.446-1.253.098-2.612 0 0 .84-.269 2.75 1.007A9.594 9.594 0 0 1 12 7.149c.85.004 1.706.115 2.505.338 1.909-1.276 2.748-1.007 2.748-1.007.546 1.359.203 2.362.1 2.612.64.688 1.027 1.565 1.027 2.639 0 3.78-2.301 4.613-4.492 4.855.354.303.667.902.667 1.818 0 1.313-.011 2.372-.011 2.695 0 .265.178.573.678.475 3.91-1.303 6.724-4.991 6.724-9.34 0-5.438-4.412-9.851-9.88-9.851Z"/></svg>
        }/>
        <Social icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.04c-5.523 0-10 4.477-10 10 0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12.04h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.916h2.773l-.443 2.892H13.56v6.987C18.343 21.168 22 17.031 22 12.04c0-5.523-4.477-10-10-10Z"/></svg>
        }/>
      </div>
    </div>
  )
}

function Social({ icon }) {
  return (
    <button className="group relative grid h-9 w-9 place-items-center rounded-full bg-white/5 backdrop-blur-md ring-1 ring-white/10 transition-transform active:scale-95">
      <div className="absolute inset-0 rounded-full bg-cyan-400/0 blur-md transition duration-300 group-hover:bg-cyan-400/30" />
      <span className="relative text-cyan-100/80 transition-colors group-hover:text-cyan-50">{icon}</span>
    </button>
  )
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const valid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid) return
    setStatus('loading')

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'coming-soon' })
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setMessage(data.message || 'Welcome to the list')
      } else {
        setStatus('error')
        setMessage(data.detail || 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="group relative flex items-center overflow-hidden rounded-2xl bg-white/5 p-[2px] backdrop-blur-md ring-1 ring-white/10 transition-shadow focus-within:ring-cyan-400/40">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 blur-xl transition-opacity group-focus-within:opacity-100" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="z-10 w-full flex-1 bg-transparent px-4 py-3 text-base text-cyan-50 placeholder:text-cyan-200/40 focus:outline-none"
        />
        <button
          disabled={!valid || status === 'loading' || status === 'success'}
          className="z-10 m-1 inline-flex shrink-0 items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition-all enabled:active:scale-[0.98] disabled:opacity-50"
        >
          {status === 'loading' ? 'Joining…' : status === 'success' ? 'Joined' : 'Join the Waitlist'}
        </button>
      </div>
      {status === 'success' && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center text-sm text-cyan-200">
          You are on the list. We will be in touch.
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center text-sm text-red-300">
          {message}
        </motion.div>
      )}
    </form>
  )
}
