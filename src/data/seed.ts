import type { InstData, Institution, Lead, Call, Campaign, Internship, InternApp, Contact, Knowledge, Integration, LeadStage, InternStage, TranscriptLine } from '@/lib/types'
import { LEAD_STAGES, INTERN_STAGES } from '@/lib/types'

export const INSTITUTIONS: Institution[] = [
  { id: 'inst-1', name: 'Nimbus Cloud Technologies', short: 'NCT', city: 'Hyderabad' },
  { id: 'inst-2', name: 'Stackline Software', short: 'STK', city: 'Bengaluru' },
  { id: 'inst-3', name: 'Northfield IT Services', short: 'NIS', city: 'Pune' },
]
function rng(seed: number) { let s = seed; return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296 }
const FIRST = ['Aarav','Ananya','Rohan','Priya','Kavya','Arjun','Sneha','Vikram','Ishita','Rahul','Meera','Aditya','Divya','Karthik','Neha','Siddharth','Pooja','Manish','Tanvi','Harsh','Lakshmi','Varun','Shreya','Nikhil','Aisha','Dev','Riya','Sai','Tara','Yash','Anika','Kabir','Diya','Ishaan','Myra','Reyansh','Saanvi','Vihaan','Navya','Advait','Kiara','Atharv','Pari','Krish','Anvi','Rudra','Zara','Aryan','Ira','Shaurya','Mahika','Aarush','Tisha','Dhruv','Nisha','Veer','Aditi','Lakshya','Sara','Om','Trisha','Kian','Avni','Rishi','Mira','Samar','Jiya','Neil','Ruhi','Parth','Esha','Ayaan','Vanya','Hriday','Naina','Tejas','Ritika','Arnav','Sia','Ved','Anaya','Kunal','Bhavya','Mohit','Charvi','Jay','Disha','Nakul','Ojas','Pranav','Rhea','Tanay','Uma','Vedant','Yamini','Zain','Alia','Bharat','Chaitra','Daksh','Falak','Gauri','Hemant','Indu']
// company → plans/products they are evaluating ("dept" holds the company, "course" the plan)
const DEPTS: Record<string, string[]> = {
  'Acme Analytics': ['Growth plan','Enterprise plan'], 'PixelForge Studios': ['Starter plan','Growth plan'],
  'Quantra Fintech': ['Enterprise plan','API Platform'], 'Brightpath HR': ['Growth plan'], 'Orbit Logistics': ['Enterprise plan','Professional Services'],
  'Cloudkart Retail': ['Starter plan','API Platform'], 'Helix Health': ['Enterprise plan'], 'ZenDesk Labs': ['Growth plan','API Platform'],
}
const OFFICERS = ['Radhika (AE)','Imran (AE)','Sunita (SDR)','Dinesh (SDR)']
const SOURCES = ['Website','AI Voice Inbound','Campaign','Referral','Conference','LinkedIn','Free trial']
const CITIES = ['Hyderabad','Chennai','Bengaluru','Vijayawada','Pune','Mumbai','Kochi','Visakhapatnam']
const DOCS = ['NDA signed','Discovery call','Security questionnaire','Technical evaluation','Proposal / SOW','MSA & PO']
const iso = (offsetH: number) => new Date(Date.now() + offsetH * 3600e3).toISOString()
const pick = <T,>(r: () => number, a: T[]) => a[Math.floor(r() * a.length)]

export function transcript(name: string, course: string, outcome: string): TranscriptLine[] {
  const base: TranscriptLine[] = [
    { who: 'ai', t: 0, text: `Hi, am I speaking with ${name}? This is the AI assistant from the sales team. You signed up for a trial recently.` },
    { who: 'student', t: 6, text: 'Yes, speaking. Is this about the trial?' },
    { who: 'ai', t: 10, text: `Yes — you showed interest in the ${course}. I can share pricing, features and integrations. What would you like to know first?` },
    { who: 'student', t: 21, text: 'How much is it for around 20 seats, and does it support SSO?' },
    { who: 'ai', t: 28, text: 'Growth is $49 per seat per month, so about $980 a month for 20 seats, and it includes Google and Microsoft SSO. That is from our official pricing page.' },
  ]
  if (outcome === 'Callback requested') base.push({ who: 'student', t: 44, text: 'I am in meetings all day. Can you call me back tomorrow afternoon?' }, { who: 'ai', t: 50, text: 'Of course. I have scheduled a callback for tomorrow at 4 PM. Is that fine?' }, { who: 'student', t: 56, text: 'Yes, thank you.' })
  else if (outcome === 'Not interested') base.push({ who: 'student', t: 44, text: 'We already signed with another vendor, thanks.' }, { who: 'ai', t: 50, text: 'Understood. I will update our records and check in at your renewal. Have a great day.' })
  else base.push({ who: 'student', t: 44, text: 'That sounds good. Can we see a demo with my team?' }, { who: 'ai', t: 50, text: 'Sure. I can book a 30-minute demo with an account executive on Thursday at 11 AM and email the invite. Shall I do that?' }, { who: 'student', t: 58, text: 'Yes please.' })
  return base
}

export function buildInstitution(idx: number): InstData {
  const r = rng(101 + idx * 77)
  const depts = Object.keys(DEPTS)
  const leads: Lead[] = Array.from({ length: 64 }, (_, i) => {
    const dept = pick(r, depts); const course = pick(r, DEPTS[dept])
    const stage = LEAD_STAGES[Math.min(7, Math.floor(Math.pow(r(), 1.7) * 8))] as LeadStage
    const si = LEAD_STAGES.indexOf(stage); const name = pick(r, FIRST)
    const docState = (k: number) => si >= 5 ? 'verified' : si === 4 ? (k < 4 ? 'verified' : 'pending') : si === 3 ? (k < 2 ? 'pending' : 'missing') : 'missing'
    return {
      id: `L-${1000 + i}`, name, phone: `+91 9${Math.floor(r() * 1e9).toString().padStart(9, '0')}`, email: `${name.toLowerCase()}@${dept.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      course, dept, stage, source: pick(r, SOURCES), officer: pick(r, OFFICERS), progress: Math.round((si / 7) * 100),
      docs: DOCS.map((d, k) => ({ name: d, status: (r() < 0.06 && si >= 4 ? 'rejected' : docState(k)) as 'verified' })),
      followUp: si < 6 && r() > 0.3 ? iso(Math.round((r() - 0.25) * 96)) : null, createdAt: iso(-Math.round(r() * 24 * 28)),
      score: Math.round(40 + si * 7 + r() * 15),
      notes: [{ id: `n${i}a`, at: iso(-Math.round(r() * 200)), by: 'System', text: `Lead captured via ${pick(r, SOURCES)}.`, kind: 'system' },
        ...(si > 0 ? [{ id: `n${i}b`, at: iso(-Math.round(r() * 100)), by: pick(r, OFFICERS), text: 'AI call completed. Asked about SSO, API limits and annual pricing.', kind: 'call' as const }] : [])],
    }
  })
  const campaigns: Campaign[] = [
    { id: 'C-1', name: 'Q3 Inbound Demo Requests', status: 'active', course: 'Growth plan', language: 'English', window: '09:00–18:00', days: ['Mon','Tue','Wed','Thu','Fri'], retries: 3, retryGap: 4, targets: 1240, reached: 812, converted: 164, approved: true, startsAt: iso(-240), script: 'Greet the lead by name. Confirm the team size and use case. Share pricing and key features using verified website data. Offer to book a demo with an account executive. Escalate security and legal questions to the AE.' },
    { id: 'C-2', name: 'Trial-to-Paid Conversion', status: 'active', course: 'Starter plan', language: 'English + Hindi', window: '10:00–19:00', days: ['Mon','Tue','Wed','Thu','Fri'], retries: 2, retryGap: 6, targets: 640, reached: 391, converted: 71, approved: true, startsAt: iso(-120), script: 'Check in on trial usage, answer setup questions, highlight Growth features and offer a discount for annual billing.' },
    { id: 'C-3', name: 'Renewal & Overdue Invoice Reminder', status: 'paused', course: 'All', language: 'English', window: '09:30–17:30', days: ['Mon','Tue','Wed','Thu','Fri'], retries: 2, retryGap: 24, targets: 310, reached: 188, converted: 97, approved: true, startsAt: iso(-72), script: 'Remind customers about upcoming renewals or overdue invoices and explain how to pay in the billing portal.' },
    { id: 'C-4', name: 'Enterprise Outbound (BFSI)', status: 'draft', course: 'Enterprise plan', language: 'English', window: '10:00–17:00', days: ['Mon','Wed','Fri'], retries: 2, retryGap: 8, targets: 420, reached: 0, converted: 0, approved: false, startsAt: iso(48), script: 'Awaiting compliance review.' },
  ]
  const outcomes = ['Interested','Callback requested','Not interested','Demo booked','No answer'] as const
  const calls: Call[] = Array.from({ length: 90 }, (_, i) => {
    const l = leads[Math.floor(r() * leads.length)]
    const status = r() < 0.72 ? 'completed' : r() < 0.6 ? 'missed' : 'failed'
    const outcome = status === 'completed' ? pick(r, [...outcomes.slice(0, 4)]) : status === 'missed' ? 'No answer' : 'Wrong number'
    return {
      id: `K-${5000 + i}`, student: l.name, phone: l.phone, campaign: pick(r, campaigns.slice(0, 3)).name, status, duration: status === 'completed' ? 45 + Math.floor(r() * 260) : status === 'missed' ? 0 : 6,
      startedAt: iso(-i * 1.3 - r()), outcome: outcome as Call['outcome'], direction: r() < 0.2 ? 'inbound' : 'outbound', language: pick(r, ['English','English','Hindi','Spanish']),
      sentiment: outcome === 'Not interested' ? 'negative' : outcome === 'Callback requested' ? 'neutral' : 'positive',
      summary: status === 'completed' ? `${l.name} (${l.dept}) asked about the ${l.course}. ${outcome === 'Callback requested' ? 'Requested a callback.' : outcome === 'Not interested' ? 'Signed with another vendor.' : 'Demo invite sent.'}` : status === 'missed' ? 'No answer after ring timeout. Retry scheduled per campaign policy.' : 'Call could not be connected.',
      transcript: status === 'completed' ? transcript(l.name, l.course, outcome) : [],
    }
  })
  const internships: Internship[] = [
    { id: 'I-1', title: 'Frontend Developer Intern (React)', dept: 'Engineering', duration: '12 weeks', positions: 6, filled: 3, coordinator: 'Anitha (Eng Manager)', status: 'open', mode: 'Hybrid', stipend: '₹15,000 / month', deadline: iso(24 * 12), description: 'For 2nd and 3rd-year students. Build product UI in React and TypeScript, ship features behind flags and learn code review.', skills: ['React','TypeScript','Git'], certTemplate: 'Standard Completion' },
    { id: 'I-2', title: 'Backend Developer Intern (Python)', dept: 'Engineering', duration: '12 weeks', positions: 5, filled: 2, coordinator: 'Anitha (Eng Manager)', status: 'open', mode: 'Remote', stipend: '₹15,000 / month', deadline: iso(24 * 14), description: 'For 2nd and 3rd-year students. Build REST APIs, write tests and work with PostgreSQL and cloud services.', skills: ['Python','REST APIs','SQL'], certTemplate: 'Standard Completion' },
    { id: 'I-3', title: 'Developer Relations Intern', dept: 'Marketing', duration: '10 weeks', positions: 4, filled: 2, coordinator: 'Rahul (DevRel Lead)', status: 'open', mode: 'Hybrid', stipend: '₹10,000 / month + certificate', deadline: iso(24 * 9), description: 'For 2nd and 3rd-year students. Write tutorials and sample apps, host community meetups and collect developer feedback.', skills: ['Technical writing','Public speaking','JavaScript'], certTemplate: 'Merit Certificate' },
    { id: 'I-4', title: 'QA Automation Intern', dept: 'Engineering', duration: '8 weeks', positions: 3, filled: 1, coordinator: 'Meera (QA Lead)', status: 'open', mode: 'Remote', stipend: '₹12,000 / month', deadline: iso(24 * 20), description: 'Write end-to-end tests with Playwright and help keep CI green.', skills: ['Playwright','JavaScript','Testing'], certTemplate: 'Standard Completion' },
    { id: 'I-5', title: 'Data Analyst Intern', dept: 'Data', duration: '10 weeks', positions: 2, filled: 0, coordinator: 'Ashok (Data Lead)', status: 'draft', mode: 'Hybrid', stipend: '₹12,000 / month', deadline: iso(24 * 30), description: 'Build product usage dashboards and analyse funnel data.', skills: ['SQL','Python','Dashboards'], certTemplate: 'Standard Completion' },
  ]
  const internApps: InternApp[] = Array.from({ length: 40 }, (_, i) => {
    const stage = INTERN_STAGES[Math.min(6, Math.floor(Math.pow(r(), 1.3) * 7))] as InternStage
    const name = pick(r, FIRST); const si = INTERN_STAGES.indexOf(stage)
    return { id: `A-${300 + i}`, student: name, email: `${name.toLowerCase()}@mail.com`, college: pick(r, ['IIIT Hyderabad','JNTU Hyderabad','VIT Vellore','BITS Pilani','Christ University']), internshipId: pick(r, internships.slice(0, 4)).id, stage, cgpa: +(6.5 + r() * 3.3).toFixed(1), interview: si === 3 ? iso(Math.round(r() * 120)) : null, appliedAt: iso(-Math.round(r() * 24 * 20)), coordinator: pick(r, ['Anitha (Eng Manager)','Rahul (DevRel Lead)','Meera (QA Lead)']), certificate: si === 6 ? (r() < 0.6 ? 'issued' : 'pending') : 'none', hours: si >= 5 ? Math.round(r() * 200) : 0, skills: ['React','Python','SQL'].slice(0, 1 + Math.floor(r() * 3)) }
  })
  const contacts: Contact[] = Array.from({ length: 70 }, (_, i) => {
    const name = pick(r, FIRST); const type = pick(r, ['Lead','Customer','Partner','Prospect'] as const)
    return { id: `P-${i}`, name, type, phone: `+91 9${Math.floor(r() * 1e9).toString().padStart(9, '0')}`, email: `${name.toLowerCase()}@${pick(r, Object.keys(DEPTS)).toLowerCase().replace(/[^a-z]/g, '')}.com`, tags: [pick(r, ['Decision maker','Champion','Hot lead','Technical buyer','Renewal due','Upsell']), ...(r() > 0.6 ? ['VIP'] : [])], segment: pick(r, ['Mid-market','Enterprise','Startups','Partner referrals']), city: pick(r, CITIES), lastContact: iso(-Math.round(r() * 24 * 14)), custom: { Company: pick(r, Object.keys(DEPTS)), 'Best time': pick(r, ['Morning','Afternoon','Evening']) }, history: [{ id: `h${i}`, at: iso(-Math.round(r() * 24 * 10)), by: 'AI Assistant', text: pick(r, ['AI call: shared pricing for Growth plan.', 'Email: sent demo recording.', 'Email: security whitepaper delivered.']), kind: 'call' }] }
  })
  const knowledge: Knowledge[] = [
    { id: 'W-1', label: 'Company website', url: 'https://www.nimbuscloud.io', kind: 'Website', status: 'synced', lastSync: iso(-3), pages: 142, items: { Products: 12, 'Pricing pages': 6, Features: 84, Integrations: 40 } },
    { id: 'W-2', label: 'Developer docs', url: 'https://docs.nimbuscloud.io', kind: 'Website', status: 'syncing', lastSync: iso(-26), pages: 356, items: { 'API endpoints': 120, Guides: 64, SDKs: 3 } },
    { id: 'W-3', label: 'Security whitepaper (PDF)', url: 'https://nimbuscloud.io/docs/security-whitepaper.pdf', kind: 'PDF', status: 'synced', lastSync: iso(-14), pages: 36, items: { 'Security controls': 42, Certifications: 4 } },
    { id: 'W-4', label: 'Help center FAQ', url: 'https://help.nimbuscloud.io', kind: 'FAQ', status: 'synced', lastSync: iso(-9), pages: 48, items: { FAQs: 164, Troubleshooting: 41 } },
  ]
  const integrations: Integration[] = [
    { id: 'g-web', name: 'Company Website & Docs', category: 'Knowledge', desc: 'Crawl official pages and docs to ground the AI assistant in verified information.', connected: true, configured: 'nimbuscloud.io', demo: false },
    { id: 'g-crm', name: 'Salesforce Sales Cloud', category: 'CRM', desc: 'Two-way sync of leads, opportunities and activities.', connected: false, configured: '', demo: false },
    { id: 'g-hub', name: 'HubSpot CRM', category: 'CRM', desc: 'Push AI call outcomes and notes to HubSpot contacts and deals.', connected: false, configured: '', demo: false },
    { id: 'g-gs', name: 'Google Sheets', category: 'Data', desc: 'Auto-export leads and call logs to a spreadsheet.', connected: true, configured: 'Pipeline-2026-Master', demo: true },
    { id: 'g-mail', name: 'Email (SMTP / SendGrid)', category: 'Email', desc: 'Send demo invites, proposals and follow-ups from your domain.', connected: true, configured: 'sales@nimbuscloud.io', demo: true },
    { id: 'g-wa', name: 'Slack', category: 'Messaging', desc: 'Alert your team in Slack when a hot lead or escalation comes in.', connected: false, configured: '', demo: false },
    { id: 'g-tel', name: 'Telephony (Twilio / Exotel)', category: 'Telephony', desc: 'Outbound and inbound voice routing for AI calls.', connected: false, configured: '', demo: false },
    { id: 'g-voice', name: 'AI Voice Provider', category: 'AI', desc: 'Speech-to-text, LLM and text-to-speech engine for conversations.', connected: false, configured: '', demo: false },
    { id: 'g-sis', name: 'Helpdesk (Zendesk / Freshdesk)', category: 'SIS', desc: 'Create and update support tickets from AI calls.', connected: false, configured: '', demo: false },
  ]
  return {
    leads, calls, campaigns, internships, internApps, contacts, knowledge, integrations,
    audit: [
      { id: 'au1', at: iso(-1), user: 'Radhika', role: 'sales_rep', action: 'Moved lead', target: leads[0].name + ' → Qualified' },
      { id: 'au2', at: iso(-5), user: 'Demo Admin', role: 'company_admin', action: 'Approved campaign script', target: 'Q3 Inbound Demo Requests' },
      { id: 'au3', at: iso(-26), user: 'Anitha', role: 'hiring_coordinator', action: 'Scheduled interview', target: internApps[2].student },
    ],
    notifications: [
      { id: 'nt1', at: iso(-0.2), title: 'Knowledge source synced', body: 'Security whitepaper (PDF) synced successfully.', read: false, kind: 'success' },
      { id: 'nt2', at: iso(-1), title: 'Campaign milestone', body: 'Q3 Inbound Demo Requests reached 800 conversations.', read: false, kind: 'success' },
      { id: 'nt3', at: iso(-4), title: '12 follow-ups due today', body: 'Review pending follow-ups in Pipeline.', read: false, kind: 'info' },
    ],
  }
}
