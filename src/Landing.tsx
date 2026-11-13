import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Waves, Code2, Terminal, Megaphone, Loader2, AlertCircle, ArrowUp, PhoneCall, Globe, BarChart3, ShieldCheck, Menu, X, ArrowRight, Check, Send, Bot, Users, Play, Plus, Minus, Rocket, Zap, LifeBuoy, TrendingDown, Webhook, Lock, Database, Layers, RotateCcw, Pause, CheckCircle2, CalendarClock, Briefcase, Sparkles } from 'lucide-react'
import { submitToWeb3Forms } from './lib/api'

const NAV = [['Demo', '#/demo'], ['Workflows', '#/workflows'], ['Platform', '#/product'], ['WebConnect', '#/webconnect'], ['Internships', '#/internships'], ['FAQ', '#/faq']]

/* ---------- helpers ---------- */
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null); const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (reduced() || !('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el); return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}
export const Reveal = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const [r, seen] = useInView<HTMLDivElement>()
  return <div ref={r} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</div>
}
function Count({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [n, setN] = useState(0); const [r, seen] = useInView<HTMLSpanElement>(0.5)
  useEffect(() => {
    if (!seen) return; if (reduced()) { setN(to); return }
    const t0 = performance.now(); let raf = 0
    const f = (t: number) => { const p = Math.min(1, (t - t0) / 1300); setN(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(f) }
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={r} className="tabular-nums">{n.toFixed(decimals)}{suffix}</span>
}
export const Eyebrow = ({ children, light }: { children: ReactNode; light?: boolean }) => <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-brand-400' : 'text-brand-600'}`}>{children}</p>
const Pill = ({ icon: I, children }: { icon: typeof Rocket; children: ReactNode }) => <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400"><I size={14} />{children}</span>
export function Logo({ light }: { light?: boolean }) {
  return <a href="#/" className="flex items-center gap-2.5" aria-label="Privoice home"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-[0_0_24px_-4px_rgba(79,207,102,.6)]"><Waves size={17} className="text-navy-950" /></span><span className={`text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>Privoice</span></a>
}
export const Wave = ({ n = 36, color = 'bg-brand-400', on = true }: { n?: number; color?: string; on?: boolean }) => <div className="flex h-8 items-center gap-[3px]" aria-hidden>{Array.from({ length: n }, (_, i) => <span key={i} style={{ animationDelay: `${(i % 8) * 90}ms`, height: `${30 + ((i * 37) % 70)}%` }} className={`w-[3px] flex-1 origin-center rounded-full transition-colors ${on ? `animate-wave ${color}` : 'bg-white/15'}`} />)}</div>
const glow = 'pointer-events-none absolute rounded-full blur-3xl'
const H2 = ({ children }: { children: ReactNode }) => <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-[42px] sm:leading-[1.1]">{children}</h2>
const card = 'rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm'

/* ---------- header ---------- */
export function Header() {
  const [open, setOpen] = useState(false); const [sc, setSc] = useState(false)
  useEffect(() => { const f = () => setSc(window.scrollY > 12); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${sc || open ? 'border-b border-white/5 bg-navy-950/85 backdrop-blur-md' : ''}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo light />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">{NAV.map(([l, h]) => <a key={h} href={h} className="text-sm text-slate-400 transition-colors hover:text-white">{l}</a>)}</nav>
        <div className="hidden items-center gap-2 lg:flex"><a href="#/enquire" className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-slate-300 hover:text-white">Book a demo</a><a href="#/login" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-brand-400"><Play size={13} className="fill-current" />Live app</a></div>
        <button className="text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="flex flex-col gap-1 border-t border-white/10 px-5 pb-5 pt-2 lg:hidden">{NAV.map(([l, h]) => <a key={h} onClick={() => setOpen(false)} href={h} className="rounded-lg px-2 py-2.5 text-slate-200 hover:bg-white/5">{l}</a>)}<a href="#/login" className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 font-semibold text-navy-950">Open live app</a></nav>}
    </header>
  )
}

/* ---------- hero ---------- */
const STATS: [number, string, number, string][] = [[3.2, '×', 1, 'Faster speed-to-lead vs manual SDRs'], [27, '%', 0, 'Average lift in trial-to-paid conversion'], [60, '%', 0, 'Fewer tier-1 support tickets']]
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 pb-24 pt-32 text-white sm:pb-28 sm:pt-40">
      <div className={`${glow} -right-40 -top-40 h-[34rem] w-[34rem] bg-brand-500/15`} /><div className={`${glow} -bottom-48 -left-40 h-[30rem] w-[30rem] bg-brand-600/15`} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 30% 30%,#000,transparent 65%)', WebkitMaskImage: 'radial-gradient(ellipse at 30% 30%,#000,transparent 65%)' }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-fadeUp">
          <Pill icon={Rocket}>Tech startups &amp; SaaS</Pill>
          <h1 className="mt-7 text-[42px] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[60px]">Qualify Leads. Activate Users. <span className="text-brand-400">Scale Without Headcount.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">Privoice gives tech startups an always-on AI voice workforce for lead qualification, trial activation and customer success, at any volume.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#/login" className="group inline-flex h-[52px] items-center gap-3 rounded-xl bg-brand-500 px-7 text-[17px] font-semibold text-navy-950 shadow-[0_10px_40px_-10px_rgba(79,207,102,.7)] transition-all hover:bg-brand-400">Start Free Trial <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></a>
            <a href="#/demo" className="inline-flex h-[52px] items-center gap-2 rounded-xl border border-white/20 px-7 text-[17px] font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"><PhoneCall size={17} />Hear a Demo Call</a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">{['Live in under a day', 'HubSpot & Salesforce sync', 'SOC 2-ready'].map(t => <li key={t} className="flex items-center gap-1.5"><Check size={14} className="text-brand-400" />{t}</li>)}</ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {STATS.map(([n, x, d, l], i) => <div key={l} style={{ animationDelay: `${120 + i * 90}ms` }} className={`${card} animate-fadeUp flex items-center gap-5 px-6 py-5 transition-colors hover:border-brand-500/40 sm:flex-col sm:text-center lg:flex-row lg:text-left`}>
            <p className="min-w-[6.5rem] text-[40px] font-bold leading-none tracking-tight text-brand-400"><Count to={n} suffix={x} decimals={d} /></p><p className="text-[15px] leading-snug text-slate-400">{l}</p></div>)}
        </div>
      </div>
    </section>
  )
}

/* ---------- interactive demo ---------- */
type Line = { who: 'ai' | 'user'; t: string }
interface Scenario { id: string; label: string; icon: typeof Rocket; caller: string; role: string; campaign: string; lines: Line[]; fields: [string, string, number][]; outcome: string; sync: string }
const SCENARIOS: Scenario[] = [
  { id: 'lead', label: 'Inbound lead', icon: Zap, caller: 'Maya Chen', role: 'Head of Ops · Loopwise (Series A)', campaign: 'Speed-to-lead · called 41s after form fill', sync: 'HubSpot',
    lines: [{ who: 'ai', t: 'Hi Maya, this is the Privoice assistant for Loopwise. You just requested a demo, so I have a couple of quick questions. Is now okay?' }, { who: 'user', t: 'Sure, go ahead.' }, { who: 'ai', t: 'How big is the team that would use it, and what are you using today?' }, { who: 'user', t: 'About 35 people in support and sales. We are on spreadsheets and a basic dialer.' }, { who: 'ai', t: 'Got it. When are you hoping to have something live?' }, { who: 'user', t: 'This quarter, ideally within six weeks.' }, { who: 'ai', t: 'That is a great fit for our Growth plan. I can book you with an account executive on Thursday at 11 AM. Does that work?' }, { who: 'user', t: 'Thursday works.' }],
    fields: [['Team size', '35 seats', 3], ['Current stack', 'Spreadsheets + dialer', 3], ['Timeline', '< 6 weeks', 5], ['Plan fit', 'Growth', 6], ['Next step', 'Demo · Thu 11:00', 7]], outcome: 'Qualified · demo booked' },
  { id: 'trial', label: 'Trial activation', icon: Rocket, caller: 'Arjun Mehta', role: 'CTO · Stackbyte (Seed)', campaign: 'Day 3 of a 14-day trial · no API key created', sync: 'Salesforce',
    lines: [{ who: 'ai', t: 'Hi Arjun, it is the Stackbyte onboarding assistant. I noticed you have not created an API key yet. Is anything blocking you?' }, { who: 'user', t: 'Honestly, I could not find where the webhooks are configured.' }, { who: 'ai', t: 'They are under Settings, Developers, Webhooks. I just emailed you a direct link and the Node quick-start.' }, { who: 'user', t: 'Perfect, that is what I needed.' }, { who: 'ai', t: 'Would a 15-minute setup session with a solutions engineer help your team go live faster?' }, { who: 'user', t: 'Yes, tomorrow morning if possible.' }],
    fields: [['Blocker', 'Webhook setup', 1], ['Resolved', 'Docs link sent', 2], ['Activation risk', 'High → Low', 3], ['Next step', 'SE session · tomorrow', 5]], outcome: 'Activated · setup call booked' },
  { id: 'churn', label: 'Churn save', icon: TrendingDown, caller: 'Priya Nair', role: 'RevOps Lead · Fintrail', campaign: 'Usage down 48% in 30 days · renewal in 21 days', sync: 'HubSpot',
    lines: [{ who: 'ai', t: 'Hi Priya, I am calling from Fintrail customer success. Your renewal is coming up, and I wanted to check how things are going.' }, { who: 'user', t: 'Usage dropped because the reporting is too slow for our board deck.' }, { who: 'ai', t: 'Thanks for flagging that. The new scheduled-exports feature shipped last week and is built for exactly that. I can enable it on your workspace today.' }, { who: 'user', t: 'If it works, we will renew.' }, { who: 'ai', t: 'Done, it is on. Your CSM will follow up on Friday to confirm it fits your board pack.' }],
    fields: [['Churn reason', 'Slow reporting', 1], ['Save offer', 'Scheduled exports', 2], ['Renewal intent', 'Likely', 3], ['Next step', 'CSM check-in · Fri', 4]], outcome: 'At-risk → retained' },
  { id: 'support', label: 'Tier-1 support', icon: LifeBuoy, caller: 'Daniel Ruiz', role: 'Admin · Shipfast', campaign: 'Inbound support line · after hours', sync: 'Zendesk',
    lines: [{ who: 'user', t: 'Hi, our team cannot log in with Google SSO since this morning.' }, { who: 'ai', t: 'Sorry about that, Daniel. I can see your workspace switched to SAML yesterday. Was that intentional?' }, { who: 'user', t: 'Oh, our IT team must have done that.' }, { who: 'ai', t: 'That explains it. Users now need to sign in through Okta. I have sent you the setup guide, and I can switch it back if IT approves.' }, { who: 'user', t: 'Great, that solves it.' }],
    fields: [['Issue', 'SSO login failure', 0], ['Root cause', 'SAML enabled by IT', 1], ['Resolution', 'Guide sent', 3], ['Ticket', 'Auto-closed · CSAT 5/5', 4]], outcome: 'Resolved without an agent' },
]
function Demo() {
  const [sid, setSid] = useState(SCENARIOS[0].id); const s = SCENARIOS.find(x => x.id === sid)!
  const [step, setStep] = useState(0); const [playing, setPlaying] = useState(false); const [secs, setSecs] = useState(0)
  const [ref, seen] = useInView<HTMLDivElement>(0.35); const box = useRef<HTMLDivElement>(null)
  const done = step >= s.lines.length
  useEffect(() => { if (seen && step === 0) { if (reduced()) setStep(s.lines.length); else setPlaying(true) } }, [seen]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!playing) return; if (done) { setPlaying(false); return }
    const prev = s.lines[step - 1]; const t = setTimeout(() => setStep(x => x + 1), step === 0 ? 500 : Math.min(2600, 700 + (prev?.t.length ?? 20) * 18)); return () => clearTimeout(t)
  }, [playing, step, done, s])
  useEffect(() => { if (!playing) return; const i = setInterval(() => setSecs(x => x + 1), 1000); return () => clearInterval(i) }, [playing])
  useEffect(() => { const b = box.current; if (b) b.scrollTo({ top: b.scrollHeight, behavior: reduced() ? 'auto' : 'smooth' }) }, [step])
  const choose = (id: string) => { setSid(id); setSecs(0); if (reduced()) { setStep(SCENARIOS.find(x => x.id === id)!.lines.length); setPlaying(false) } else { setStep(0); setPlaying(true) } }
  const replay = () => { setStep(0); setSecs(0); setPlaying(true) }
  const typing = playing && !done && step > 0
  return (
    <section id="demo" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
      <div className={`${glow} left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 bg-brand-500/10`} />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center"><Eyebrow light>Live demo</Eyebrow><H2>Hear Privoice work a real call</H2><p className="mt-4 text-slate-400">Pick a scenario. Watch the AI talk, capture the details and update your CRM as the call happens.</p></Reveal>
        <div role="tablist" aria-label="Demo scenarios" className="mx-auto mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {SCENARIOS.map(x => <button key={x.id} role="tab" aria-selected={sid === x.id} onClick={() => choose(x.id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${sid === x.id ? 'bg-brand-500 text-navy-950 shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}><x.icon size={15} />{x.label}</button>)}
        </div>
        <div ref={ref} className="mt-8 grid gap-5 lg:grid-cols-[1.45fr_1fr]">
          <div className={`${card} flex flex-col overflow-hidden`}>
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 ${playing ? 'animate-pulseRing' : ''}`}><PhoneCall size={18} /></span>
              <div className="min-w-0 flex-1"><p className="font-semibold">{s.caller}</p><p className="truncate text-xs text-slate-400">{s.role}</p></div>
              {playing ? <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-500/15 px-2.5 py-1 text-[11px] font-semibold text-brand-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />LIVE · {Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</span>
                : <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-400">{done ? 'ENDED' : 'READY'}</span>}
            </div>
            <div className="border-b border-white/10 bg-white/[0.02] px-5 py-3"><p className="mb-2 text-[11px] text-slate-500">{s.campaign}</p><Wave n={56} on={playing} /></div>
            <div ref={box} aria-live="polite" className="h-[340px] space-y-3 overflow-y-auto px-5 py-5">
              {step === 0 && !playing && <p className="py-16 text-center text-sm text-slate-500">Press play to start the call.</p>}
              {s.lines.slice(0, step).map((l, i) => <div key={sid + i} className={`flex animate-fadeUp ${l.who === 'user' ? 'justify-end' : ''}`}><div className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${l.who === 'ai' ? 'rounded-tl-sm bg-white/[0.07] text-slate-100' : 'rounded-tr-sm bg-brand-500 text-navy-950'}`}>{l.who === 'ai' && <span className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-brand-400"><Bot size={12} />Privoice AI</span>}{l.t}</div></div>)}
              {typing && <div className={`flex ${s.lines[step]?.who === 'user' ? 'justify-end' : ''}`}><span className="flex gap-1 rounded-2xl bg-white/[0.06] px-4 py-3">{[0, 1, 2].map(k => <span key={k} style={{ animationDelay: `${k * 150}ms` }} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />)}</span></div>}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3">
              {done ? <button onClick={replay} className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-medium hover:bg-white/15"><RotateCcw size={14} />Replay call</button>
                : <button onClick={() => setPlaying(p => !p)} className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-semibold text-navy-950 hover:bg-brand-400">{playing ? <><Pause size={14} />Pause</> : <><Play size={14} className="fill-current" />{step ? 'Resume' : 'Play call'}</>}</button>}
              <span className="ml-auto text-xs text-slate-500">Simulated conversation · sample data</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className={`${card} p-5`}>
              <div className="flex items-center justify-between"><p className="text-sm font-semibold">Captured to CRM</p><span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-400"><Database size={11} />{s.sync}</span></div>
              <ul className="mt-4 space-y-2.5">{s.fields.map(([k, v, at]) => { const got = step > at; return <li key={sid + k} className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-500 ${got ? 'border-brand-500/30 bg-brand-500/[0.07]' : 'border-white/5 bg-white/[0.02]'}`}><span className="text-slate-400">{k}</span>{got ? <span className="flex animate-fadeUp items-center gap-1.5 text-right font-medium text-white"><CheckCircle2 size={14} className="shrink-0 text-brand-400" />{v}</span> : <span className="h-2 w-20 rounded-full bg-white/10" />}</li> })}</ul>
            </div>
            <div className={`rounded-2xl border p-5 transition-all duration-500 ${done ? 'border-brand-500/50 bg-brand-500/10' : 'border-white/10 bg-white/[0.03]'}`}>
              <p className="text-xs uppercase tracking-wider text-slate-500">Outcome</p>
              <p className={`mt-1.5 text-xl font-bold ${done ? 'text-brand-400' : 'text-slate-600'}`}>{done ? s.outcome : 'Call in progress…'}</p>
              <p className="mt-2 text-xs text-slate-500">{done ? `Summary, transcript and next step synced to ${s.sync}. Your team gets a Slack alert.` : 'Fields fill in as the AI hears them.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- workflows ---------- */
function Workflows() {
  const w = [[Zap, 'Lead Qualification', 'Call every demo request and trial sign-up within a minute. Qualify team size, budget and timeline, then book the right account executive automatically.'], [Rocket, 'Trial Activation & Onboarding', 'Spot stalled trials from product events and call users with the exact next step, such as an API key, an integration or a setup session, before they drift away.'], [TrendingDown, 'Churn Prevention & Renewals', 'Reach accounts whose usage is dropping before renewal. Capture the real reason, offer the right fix and log every outcome to your CRM.']] as const
  const f = [[Database, 'HubSpot & Salesforce sync'], [Lock, 'SOC 2-ready, GDPR-aware'], [Webhook, 'API, webhooks & product events'], [Layers, 'Multi-product campaigns']] as const
  return (
    <section id="workflows" className="relative bg-navy-950 py-24 text-white sm:py-28"><div className="mx-auto max-w-6xl px-5">
      <Reveal className="mx-auto max-w-2xl text-center"><Eyebrow light>What Privoice does for you</Eyebrow><H2>Built for Your Workflows</H2><p className="mt-4 text-slate-400">From first touch to renewal, one AI voice workforce runs the conversations your startup cannot staff yet.</p></Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">{w.map(([I, t, d], i) => <Reveal key={t} delay={i * 90}><article className={`${card} group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40`}>
        <span className="absolute -right-2 -top-6 text-[110px] font-bold leading-none text-white/[0.04] transition-colors group-hover:text-brand-500/10">{i + 1}</span>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-xl font-bold text-navy-950">{i + 1}</span>
        <h3 className="relative mt-6 flex items-center gap-2 text-xl font-semibold"><I size={18} className="text-brand-400" />{t}</h3><p className="relative mt-3 leading-relaxed text-slate-400">{d}</p></article></Reveal>)}</div>
      <Reveal className="mt-6"><ul className={`${card} grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4`}>{f.map(([I, t]) => <li key={t} className="flex items-center gap-3 text-sm text-slate-300"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400"><I size={16} /></span>{t}</li>)}</ul></Reveal>
    </div></section>
  )
}

/* ---------- product showcase ---------- */
const TABS = [
  { id: 'voice', label: 'AI Voice', icon: PhoneCall, title: 'Calling campaigns on autopilot', pts: ['Inbound and outbound campaigns from one place', 'Approved scripts, languages, schedules and retries', 'Live transcripts, recordings and outcomes'] },
  { id: 'adm', label: 'Pipeline', icon: Briefcase, title: 'Every deal, first lead to closed-won', pts: ['Table and Kanban pipeline views', 'Deal checklist: NDA, security review, SOW', 'Owner assignment, notes and full history'] },
  { id: 'web', label: 'WebConnect', icon: Globe, title: 'Answers grounded in your docs', pts: ['Import pricing, features, docs and changelog', 'Sync status, timestamps and error alerts', 'Escalates when nothing verified is found'] },
] as const
function Mock({ id }: { id: string }) {
  if (id === 'voice') return (
    <div className="space-y-3">{[['Maya Chen', 'Loopwise', '1:42', true], ['Arjun Mehta', 'Stackbyte', '0:58', true], ['Priya Nair', 'Fintrail', '', false]].map(([n, c, t, l]) => <div key={n as string} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-400">{(n as string).split(' ').map(w => w[0]).join('')}</span><div className="flex-1"><p className="text-sm font-medium">{n} <span className="font-normal text-slate-500">· {c}</span></p><p className="text-xs text-slate-400">{l ? 'Speaking with AI assistant' : 'Callback scheduled · 4 PM'}</p></div>{l ? <span className="flex items-center gap-1.5 rounded-full bg-brand-500/15 px-2 py-0.5 text-xs font-medium text-brand-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />{t}</span> : <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-300">Scheduled</span>}</div>)}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><Wave n={48} /><div className="mt-2 flex justify-between text-xs text-slate-400"><span>Recording</span><span>Qualified · 82%</span></div></div></div>)
  if (id === 'adm') return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[['Contacted', ['Loopwise', 'Nexa']], ['Qualified', ['Stackbyte', 'Fintrail', 'Orbit']], ['Proposal', ['Helix']], ['Won', ['Shipfast', 'Quantra']]].map(([c, l]) => <div key={c as string} className="rounded-xl bg-white/[0.03] p-2"><p className="px-1 pb-2 text-xs font-semibold text-slate-300">{c as string}</p><div className="space-y-2">{(l as string[]).map((x, i) => <div key={x} className="rounded-lg border border-white/10 bg-white/[0.05] p-2.5"><p className="text-xs font-medium">{x}</p><div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-brand-500" style={{ width: `${30 + i * 25 + (c === 'Won' ? 30 : 0)}%` }} /></div></div>)}</div></div>)}</div>)
  return (
    <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2">{[['Company website', 'Synced', 'ok'], ['Developer docs', 'Syncing', 'brand'], ['Security whitepaper', 'Synced', 'ok']].map(([n, s, t]) => <div key={n} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3"><div className="flex items-center gap-2.5"><Globe size={15} className="text-slate-500" /><span className="text-sm font-medium">{n}</span></div><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${t === 'ok' ? 'bg-brand-500/15 text-brand-400' : t === 'brand' ? 'bg-sky-400/10 text-sky-300' : 'bg-red-400/10 text-red-300'}`}>{s}</span></div>)}</div>
      <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[13px]"><p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-brand-500 px-3 py-1.5 text-navy-950">Pricing for 20 seats?</p><p className="rounded-2xl rounded-bl-sm bg-white/[0.07] px-3 py-1.5">Growth plan: $49 / seat / month, so $980 / month.<span className="mt-1 block border-t border-white/10 pt-1 text-[11px] text-slate-400">Source: Company website · Pricing</span></p></div></div>)
}
function Product() {
  const [tab, setTab] = useState<typeof TABS[number]['id']>('voice'); const cur = TABS.find(t => t.id === tab)!
  return (
    <section id="product" className="bg-navy-900 py-24 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center"><Eyebrow light>The platform</Eyebrow><H2>Not a dialer. A revenue OS for startups.</H2><p className="mt-4 text-slate-400">Three connected workspaces, from the first call to the signed contract.</p></Reveal>
        <Reveal className="mt-10">
          <div role="tablist" aria-label="Product areas" className="mx-auto flex w-fit max-w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">{TABS.map(t => <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-navy-950' : 'text-slate-400 hover:text-white'}`}><t.icon size={15} />{t.label}</button>)}</div>
          <div className={`${card} mt-6 grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.25fr]`}>
            <div key={cur.id} className="animate-fadeUp"><h3 className="text-2xl font-semibold tracking-tight">{cur.title}</h3><ul className="mt-5 space-y-3">{cur.pts.map(p => <li key={p} className="flex items-start gap-3 text-slate-300"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400"><Check size={12} /></span>{p}</li>)}</ul><a href="#/login" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300">Open it in the live app <ArrowRight size={15} /></a></div>
            <div key={cur.id + 'm'} className="animate-fadeUp rounded-2xl bg-navy-950/60 p-4 ring-1 ring-white/10"><Mock id={cur.id} /></div>
          </div>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[BarChart3, 'Analytics & reports', 'Win rate, product demand and rep performance with CSV/PDF export.'], [Users, 'Unified contacts', 'Leads, customers and partners with segments, tags and history.'], [Sparkles, 'Multilingual voices', 'Per-campaign language and voice for global users.'], [ShieldCheck, 'Secure by design', 'Role-based access, workspace isolation and audit logs.']].map(([I, t, d], i) => { const Ic = I as typeof Users; return <Reveal key={t as string} delay={i * 70}><div className={`${card} h-full p-5 transition-colors hover:border-brand-500/30`}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400"><Ic size={17} /></span><h3 className="mt-3 font-semibold">{t as string}</h3><p className="mt-1 text-sm text-slate-400">{d as string}</p></div></Reveal> })}</div>
      </div>
    </section>
  )
}

/* ---------- how ---------- */
function How() {
  const steps = [[Globe, 'Connect', 'Link your site, docs and CRM so the assistant knows your product, pricing and customers.'], [PhoneCall, 'Launch', 'Turn on approved campaigns, or route inbound calls and form fills to the AI.'], [Briefcase, 'Track', 'Every call lands in the pipeline with a transcript, summary and next step.'], [BarChart3, 'Improve', 'Review outcomes and analytics to tune scripts every week.']] as const
  return (
    <section className="bg-navy-950 py-24 text-white"><div className="mx-auto max-w-6xl px-5">
      <Reveal className="mx-auto max-w-2xl text-center"><Eyebrow light>How it works</Eyebrow><H2>Live in a day, not a quarter</H2></Reveal>
      <ol className="relative mt-14 grid gap-8 md:grid-cols-4"><div className="absolute left-[12%] right-[12%] top-7 hidden border-t border-dashed border-white/15 md:block" />{steps.map(([I, t, d], i) => <Reveal key={t} delay={i * 90}><li className="relative text-center"><span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-navy-900 text-brand-400 shadow-[0_0_30px_-8px_rgba(79,207,102,.5)]"><I size={22} /></span><p className="mt-4 text-xs font-semibold text-brand-400">Step {i + 1}</p><h3 className="mt-1 text-lg font-semibold">{t}</h3><p className="mx-auto mt-1 max-w-[230px] text-sm text-slate-400">{d}</p></li></Reveal>)}</ol>
    </div></section>
  )
}

/* ---------- WebConnect ---------- */
function WebConnect() {
  const items = [['Verified product knowledge', 'Plans, pricing, features, integrations and docs imported from your official website and help center.'], ['Website voice & chat widget', 'Visitors can talk or chat with your AI instantly, and every answer cites the page it came from.'], ['Sync status & alerts', 'See last-updated times and error alerts for every connected source.']]
  const opts = [[PhoneCall, 'Talk now', 'Speak with our AI live'], [Bot, 'Chat with us', 'Message our AI assistant'], [CalendarClock, 'Call me later', 'Get an AI callback']] as const
  const [open, setOpen] = useState(0); const [pick, setPick] = useState(0)
  return (
    <section id="webconnect" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
      <div className={`${glow} -left-24 top-10 h-80 w-80 bg-brand-500/10`} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal>
          <Eyebrow light>WebConnect</Eyebrow>
          <H2>Turn your website into a voice-first sales rep</H2>
          <p className="mt-4 max-w-lg text-lg text-slate-400">Connect your site and docs once. Voice, chat and AI callbacks then answer every visitor with verified information.</p>
          <ul className="mt-8 border-t border-white/10">{items.map(([t, d], i) => <li key={t} className="border-b border-white/10"><button onClick={() => setOpen(i)} aria-expanded={open === i} className="flex w-full items-center justify-between py-5 text-left"><span className={`text-lg font-medium transition-colors ${open === i ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>{t}</span><ArrowRight size={16} className={`transition-transform ${open === i ? 'rotate-90 text-brand-400' : 'text-slate-600'}`} /></button>{open === i && <p className="animate-fadeUp pb-5 pr-8 text-sm leading-relaxed text-slate-400">{d}</p>}</li>)}</ul>
          <a href="#/enquire" className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-brand-500 px-6 font-semibold text-navy-950 hover:bg-brand-400">Connect my website <ArrowRight size={16} /></a>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative rounded-[28px] border border-white/10 bg-navy-950 p-5 shadow-2xl sm:p-8" aria-hidden>
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#ef6a5e]" /><span className="h-3 w-3 rounded-full bg-[#f5be4f]" /><span className="h-3 w-3 rounded-full bg-[#62c554]" /><span className="ml-3 flex h-7 flex-1 items-center rounded-full bg-white/5 px-3 text-[11px] text-slate-500">yourstartup.io/pricing</span></div>
            <div className="mt-6 grid gap-3"><div className="h-7 w-40 rounded-full bg-white/[0.07]" /><div className="h-4 w-3/4 rounded-full bg-white/[0.05]" /><div className="h-4 w-1/2 rounded-full bg-white/[0.05]" /><div className="mt-2 grid grid-cols-3 gap-3">{[0, 1, 2].map(k => <div key={k} className="h-28 rounded-2xl bg-white/[0.04]" />)}</div></div>
            <div className="relative ml-auto mt-[-120px] w-full max-w-[290px] rounded-2xl border border-white/10 bg-navy-800 p-3 shadow-2xl sm:mt-[-150px]">
              <div className="space-y-2">{opts.map(([I, t, d], i) => <button key={t} tabIndex={-1} onMouseEnter={() => setPick(i)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${pick === i ? 'border-brand-500/40 bg-brand-500/10' : 'border-white/5'}`}><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${pick === i ? 'bg-brand-500 text-navy-950' : 'bg-white/5 text-brand-400'}`}><I size={17} /></span><span><span className="block text-sm font-semibold">{t}</span><span className="block text-[11px] text-slate-400">{d}</span></span></button>)}</div>
              <p className="mt-3 text-center text-[10px] text-slate-500">Powered by <span className="font-semibold text-brand-400">Privoice</span></p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- internships teaser ---------- */
function InternshipTeaser() {
  return (
    <section className="bg-navy-950 py-20 text-white"><div className="mx-auto max-w-6xl px-5"><Reveal><div className={`${card} grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr]`}>
      <div><Eyebrow light>We're hiring interns</Eyebrow><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Tech internships for 2nd &amp; 3rd-year students</h2><p className="mt-3 text-slate-400">Build voice AI with our team in frontend, backend or developer-relations roles.</p>
        <a href="#/internships" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-navy-950 hover:bg-slate-100">View internships <ArrowRight size={15} /></a></div>
      <ul className="grid gap-3">{[[Code2, 'Frontend Developer Intern (React)'], [Terminal, 'Backend Developer Intern (Python)'], [Megaphone, 'Developer Relations Intern']].map(([I, t]) => { const Ic = I as typeof Code2; return <li key={t as string} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400"><Ic size={17} /></span><span className="text-sm font-medium">{t as string}</span></li> })}</ul>
    </div></Reveal></div></section>
  )
}

/* ---------- enquiry form ---------- */
const empty = { company: '', name: '', role: 'Founder / CEO', email: '', phone: '', website: '', size: '', interest: 'Lead qualification', message: '', botcheck: '' }
const ROLES = ['Founder / CEO', 'Sales / Revenue leader', 'Customer success / Support', 'Growth / Marketing', 'Engineering / Product', 'Other']
const SIZES = ['', '1 – 10', '11 – 50', '51 – 200', '201 – 1,000', '1,000+']
const INTERESTS = ['Lead qualification', 'Trial activation', 'Churn & renewals', 'Tier-1 support', 'Everything']
export const inpCls = (bad?: string) => `h-10 w-full rounded-lg border bg-white px-3 text-sm placeholder:text-ink-4 hover:border-slate-300 focus:border-brand-500 ${bad ? 'border-bad-500' : 'border-line'}`
const darkInp = (bad?: string) => `h-11 w-full rounded-lg border bg-white/[0.04] px-3 text-sm text-white placeholder:text-slate-500 hover:border-white/25 focus:border-brand-500 focus:outline-none [&>option]:bg-navy-900 ${bad ? 'border-red-400' : 'border-white/10'}`
export const Lbl = ({ t, err, children, dark }: { t: string; err?: string; children: ReactNode; dark?: boolean }) => <label className="block"><span className={`mb-1.5 block text-xs font-medium ${dark ? 'text-slate-300' : 'text-ink-2'}`}>{t}</span>{children}{err && <span role="alert" className={`mt-1 block text-xs ${dark ? 'text-red-300' : 'text-bad-600'}`}>{err}</span>}</label>

function Enquire() {
  const [f, setF] = useState(empty); const [err, setErr] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle'); const [msg, setMsg] = useState('')
  const set = (k: keyof typeof empty, v: string) => { setF(p => ({ ...p, [k]: v })); setErr(p => ({ ...p, [k]: '' })); if (state !== 'sending') setState('idle') }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (state === 'sending') return
    const er: Record<string, string> = {}
    if (!f.company.trim()) er.company = 'Company name is required'
    if (!f.name.trim()) er.name = 'Your name is required'
    if (!/\S+@\S+\.\S+/.test(f.email)) er.email = 'Enter a valid work email'
    if (f.phone.replace(/\D/g, '').length < 10) er.phone = 'Enter a valid phone number'
    if (f.website && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}/i.test(f.website.trim())) er.website = 'Enter a valid website, e.g. yourstartup.io'
    setErr(er); if (Object.keys(er).length) return
    setState('sending')
    const { botcheck, ...fields } = f
    const r = await submitToWeb3Forms(botcheck ? { ...fields, botcheck } : fields, `New Privoice demo request: ${f.company.trim()}`)
    if (r.ok) { setF(empty); setState('ok') } else { setState('fail'); setMsg(r.message) }
  }
  return (
    <section id="enquire" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
      <div className={`${glow} -right-32 bottom-0 h-96 w-96 bg-brand-500/10`} />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr]">
        <Reveal><Eyebrow light>Book a demo</Eyebrow><H2>See Privoice on your own funnel</H2><p className="mt-4 text-slate-400">Tell us about your startup. We'll set up a demo agent trained on your website and call you with it.</p>
          <ul className="mt-8 space-y-4">{['30-minute call with a voice AI specialist', 'A demo agent trained on your site', 'Pricing that fits seed to Series C'].map(t => <li key={t} className="flex items-center gap-3 text-slate-300"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/15 text-brand-400"><Check size={13} /></span>{t}</li>)}</ul></Reveal>
        <Reveal delay={80}>
          <form onSubmit={submit} noValidate className={`${card} grid gap-4 p-6 sm:p-8`}>
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" checked={f.botcheck === 'on'} onChange={e => set('botcheck', e.target.checked ? 'on' : '')} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Lbl dark t="Company name *" err={err.company}><input className={darkInp(err.company)} value={f.company} onChange={e => set('company', e.target.value)} autoComplete="organization" /></Lbl></div>
              <Lbl dark t="Your name *" err={err.name}><input className={darkInp(err.name)} value={f.name} onChange={e => set('name', e.target.value)} autoComplete="name" /></Lbl>
              <Lbl dark t="Your role"><select className={darkInp()} value={f.role} onChange={e => set('role', e.target.value)}>{ROLES.map(r => <option key={r}>{r}</option>)}</select></Lbl>
              <Lbl dark t="Work email *" err={err.email}><input type="email" className={darkInp(err.email)} value={f.email} onChange={e => set('email', e.target.value)} autoComplete="email" /></Lbl>
              <Lbl dark t="Phone *" err={err.phone}><input className={darkInp(err.phone)} value={f.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" /></Lbl>
              <Lbl dark t="Website" err={err.website}><input className={darkInp(err.website)} value={f.website} onChange={e => set('website', e.target.value)} placeholder="yourstartup.io" autoComplete="url" /></Lbl>
              <Lbl dark t="Team size"><select className={darkInp()} value={f.size} onChange={e => set('size', e.target.value)}>{SIZES.map(r => <option key={r} value={r}>{r || 'Select…'}</option>)}</select></Lbl>
              <div className="sm:col-span-2"><Lbl dark t="Main use case"><select className={darkInp()} value={f.interest} onChange={e => set('interest', e.target.value)}>{INTERESTS.map(r => <option key={r}>{r}</option>)}</select></Lbl></div>
              <div className="sm:col-span-2"><Lbl dark t="Message"><textarea rows={3} className={`${darkInp()} h-auto py-2.5`} value={f.message} onChange={e => set('message', e.target.value)} placeholder="What would you like the AI to handle?" /></Lbl></div>
            </div>
            <button disabled={state === 'sending'} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-500 font-semibold text-navy-950 transition-all hover:bg-brand-400 active:scale-[.98] disabled:opacity-60">{state === 'sending' ? <><Loader2 size={16} className="animate-spin" />Sending…</> : <><Send size={16} />Book my demo</>}</button>
            {state === 'ok' && <p role="status" className="flex items-center gap-2 rounded-lg bg-brand-500/10 px-3 py-2.5 text-sm text-brand-300"><Check size={15} />Thanks! We received your details and will contact you soon.</p>}
            {state === 'fail' && <p role="alert" className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-sm text-red-300"><AlertCircle size={15} />{msg} Your details are still in the form.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
function Faq() {
  const q = [['Is Privoice only for tech startups?', 'Yes. Privoice is built for SaaS, developer tools, fintech and other tech startups, with workflows for lead qualification, trial activation, churn prevention and tier-1 support.'], ['Does the demo place real calls?', 'No. The demo on this page and the live app use simulated calls, transcripts and recordings, clearly labelled. In production, real telephony and voice providers plug in.'], ['Where does the AI get its answers?', 'From verified content imported from your own website, docs and help center through WebConnect. If nothing verified is found, it hands off to your team instead of guessing.'], ['Which tools does it connect to?', 'HubSpot, Salesforce, Slack, Zendesk, Google Sheets, Twilio, and your own product events through webhooks and the API.'], ['What happens to the form I submit?', 'Your details are emailed to the Privoice team so we can reach out and set up your demo.']]
  return (
    <section id="faq" className="bg-navy-950 py-24 text-white"><div className="mx-auto max-w-3xl px-5">
      <Reveal className="text-center"><Eyebrow light>FAQ</Eyebrow><H2>Questions, answered</H2></Reveal>
      <div className={`${card} mt-10 divide-y divide-white/10`}>{q.map(([a, b]) => <details key={a} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium"><span>{a}</span><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors group-open:bg-brand-500 group-open:text-navy-950"><Plus size={14} className="group-open:hidden" /><Minus size={14} className="hidden group-open:block" /></span></summary><p className="mt-3 pr-10 text-sm leading-relaxed text-slate-400">{b}</p></details>)}</div>
    </div></section>
  )
}

function Cta() {
  return (
    <section className="bg-navy-950 px-5 pb-24"><Reveal><div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-16 text-center text-white sm:py-20">
      <div className={`${glow} -left-10 -top-10 h-72 w-72 bg-brand-500/20`} /><div className={`${glow} -bottom-16 -right-10 h-72 w-72 bg-brand-600/20`} />
      <div className="relative"><h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]">Ready to transform your startup's outreach?</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">Join tech startups already using Privoice to automate conversations and grow faster.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3"><a href="#/login" className="group inline-flex h-[52px] items-center gap-3 rounded-xl bg-brand-500 px-7 text-[17px] font-semibold text-navy-950 hover:bg-brand-400">Get Started Free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></a><a href="#/enquire" className="inline-flex h-[52px] items-center rounded-xl border border-white/20 px-7 text-[17px] font-semibold hover:bg-white/5">Talk to Sales</a></div></div>
    </div></Reveal></section>
  )
}

function Sticky() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(window.scrollY > 600); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <>
      <div className={`fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-white/10 bg-navy-950/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}><a href="#/login" className="flex h-11 flex-1 items-center justify-center rounded-lg bg-brand-500 text-sm font-semibold text-navy-950">Start free trial</a><a href="#/enquire" className="flex h-11 flex-1 items-center justify-center rounded-lg border border-white/20 text-sm font-medium text-white">Book a demo</a></div>
      <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-6 right-4 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-navy-950 shadow-lg transition-opacity md:flex ${show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}><ArrowUp size={16} /></button>
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 pb-24 pt-14 text-slate-500 md:pb-10"><div className="mx-auto max-w-6xl px-5"><div className="flex flex-wrap items-start justify-between gap-8"><div className="max-w-xs"><Logo light /><p className="mt-3 text-sm">The AI voice platform for tech startups: sales, onboarding and support conversations at any volume.</p></div><nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm" aria-label="Footer">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-white">{l}</a>)}<a href="#/enquire" className="hover:text-white">Book a demo</a><a href="#/login" className="hover:text-white">Live app</a></nav></div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs"><p>© 2026 Privoice. All rights reserved. · Built by <a href="https://dialgrow.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-400 underline-offset-4 hover:underline">DialGrow</a></p><p className="flex gap-5"><span>Terms</span><span>Privacy</span><span>Security</span></p></div></div></footer>
  )
}

export default function Landing() {
  const { pathname } = useLocation()
  useEffect(() => {
    const id = pathname.slice(1); if (!id) { window.scrollTo(0, 0); return }
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60); return () => clearTimeout(t)
  }, [pathname])
  return (
    <div className="bg-navy-950">
      <a href="#/demo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <Header />
      <main><Hero /><Demo /><Workflows /><Product /><How /><WebConnect /><InternshipTeaser /><Enquire /><Faq /><Cta /></main>
      <Sticky />
      <Footer />
    </div>
  )
}
