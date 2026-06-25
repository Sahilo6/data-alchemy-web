// ───────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE. This is the only file you need to touch to
//  fill in real event details. Find-and-replace the [PLACEHOLDERS].
// ───────────────────────────────────────────────────────────────

export const EVENT = {
  name: 'Data Alchemy 4.0',
  tagline: 'Where data becomes intelligence.',
  subtagline: 'From raw data to autonomous agents. Build a real AI agent yourself - in a single day.',

  // Set this to the actual start datetime to drive the countdown.
  // Format: 'YYYY-MM-DDTHH:MM:SS' (24h, local time). e.g. '2026-08-15T09:00:00'
  dateISO: '[2026-XX-XXT09:00:00]',

  // Human-readable versions shown on the page:
  dateLabel: '[DATE - e.g. Saturday, 15 August]',
  timeLabel: '9:00 AM - 5:00 PM',
  venueLabel: '[VENUE - e.g. Seminar Hall, CS Dept]',

  hashtag: '#DataAlchemy4',

  // Day-of links shown in the "On the day" hub (catch-up + helper).
  // Paste the shared Colab starter/reference notebook link here.
  notebookUrl: '[STARTER_NOTEBOOK_LINK]',

  // "Call a volunteer" button target. Defaults to the built-in serverless
  // function (/api/volunteer) that posts a ticket into your Telegram group.
  // That function needs TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID set in Vercel.
  // (You can also point this at any external webhook URL instead.)
  helpWebhookUrl: '/api/volunteer',

  // Socials / contact (leave a placeholder to hide a link, or fill in).
  instagram: '[INSTAGRAM_URL]',
  contactEmail: '[CLUB_EMAIL]',
  clubName: '[YOUR CLUB NAME]',
}

// The day, beginner track (Flow 1.0). Edit freely.
export const SCHEDULE = [
  { time: '9:00 - 9:45', title: 'Opening + Foundations', kind: 'concept',
    desc: 'What agentic AI actually is, how an agent differs from a chatbot, and a live demo of what you’ll have built by 5 PM. The four building blocks: model, goal, tools, memory.' },
  { time: '9:45 - 10:15', title: 'Hands-on: First contact', kind: 'handson',
    desc: 'Make your first AI call and get a response. Everyone gets set up and gets an early win.' },
  { time: '10:15 - 11:05', title: 'The Agent Loop', kind: 'concept',
    desc: 'The core idea that turns a chatbot into an agent: reason → act → observe → repeat. How an agent decides what to do next and when it’s done.' },
  { time: '11:05 - 11:30', title: 'Hands-on: Atlas learns to loop', kind: 'handson',
    desc: 'Turn your single AI call into an agent that takes multiple steps on its own.' },
  { time: '11:30 - 12:30', title: 'Tools & Function Calling', kind: 'concept',
    desc: 'How agents do things in the real world - searching, calculating, calling APIs - by using tools. How an agent picks a tool and acts on the result.' },
  { time: '12:30 - 1:30', title: 'Lunch', kind: 'break',
    desc: 'Refuel and compare notes.' },
  { time: '1:30 - 1:45', title: 'Re-anchor', kind: 'concept',
    desc: 'Quick recap and reset before the afternoon.' },
  { time: '1:45 - 2:10', title: 'Hands-on: Atlas gets tools', kind: 'handson',
    desc: 'Give your agent a tool and watch it decide to use it.' },
  { time: '2:10 - 3:10', title: 'Memory & Planning', kind: 'concept',
    desc: 'Why agents need memory, how they remember across steps, and how they break a big goal into a plan they can execute.' },
  { time: '3:10 - 3:35', title: 'Hands-on: Atlas remembers', kind: 'handson',
    desc: 'Add memory so your agent can handle a multi-step task without losing track.' },
  { time: '3:35 - 4:25', title: 'Frameworks & Multi-Agent Systems', kind: 'concept',
    desc: 'How the pros package it: structured flows with LangGraph and teams of agents with CrewAI. When multi-agent setups make sense, and where the field is headed.' },
  { time: '4:25 - 4:50', title: 'Hands-on: Atlas, assembled', kind: 'handson',
    desc: 'Combine the loop, tools, and memory into one complete agent and run it on a real task. Stretch goals for those who race ahead.' },
  { time: '4:50 - 5:00', title: 'Capstone - Demos & Certificates', kind: 'concept',
    desc: 'A few live demos, certificates, resources to keep going, and what’s next.' },
]

export const STACK = ['Claude / Gemini API', 'LangGraph', 'CrewAI', 'Python', 'Google Colab']

// A generalized, four-block view of the day for the overview section.
// (The detailed SCHEDULE above still drives the live day-of clock.)
export const PHASES = [
  { when: 'Morning', range: '9:00 - 12:30', title: 'Foundations & your first agent',
    blurb: 'What an agent actually is, your first AI call, the reason-act-observe loop, and giving it tools.' },
  { when: 'Lunch', range: '12:30 - 1:30', title: 'Break', blurb: '' },
  { when: 'Afternoon', range: '1:30 - 4:25', title: 'Memory, planning & frameworks',
    blurb: 'Tools in practice, memory across steps, planning, then how LangGraph and CrewAI package it all.' },
  { when: 'Capstone', range: '4:25 - 5:00', title: 'Assemble Atlas & demo',
    blurb: 'Combine the loop, tools and memory into one agent, run it for real, then demos and certificates.' },
]

// Quick reason chips in the "Call a volunteer" panel.
export const HELP_REASONS = ['Setup / login', 'Stuck on a cell', 'Got an error', 'Falling behind', 'Something else']

// "You should have X by now" - keyed to the title of each hands-on. The day-of
// hub highlights the most recently completed milestone so anyone who lost the
// thread knows exactly where they should be.
export const CHECKPOINTS = [
  { after: 'Hands-on: First contact', have: 'a working call_llm() - you can send a prompt and get text back.' },
  { after: 'Hands-on: Atlas learns to loop', have: 'an agent that runs reason → act → observe for several steps on its own.' },
  { after: 'Hands-on: Atlas gets tools', have: 'an agent that decides to call a tool and acts on the result.' },
  { after: 'Hands-on: Atlas remembers', have: 'memory wired in - Atlas carries context across a multi-step task.' },
  { after: 'Hands-on: Atlas, assembled', have: 'the full Atlas: loop + tools + memory running one real task.' },
]

// Common errors people hit while building, with a one-line fix each.
// Mirrors the workshop's contingency plan (keys, rate limits, offline tools).
export const DEBUG = [
  { err: 'AuthenticationError / 401', fix: 'Your API key isn’t set or has a typo. Re-run the setup cell and paste the key again - no quotes, no stray spaces.' },
  { err: 'RateLimitError / 429', fix: 'Too many calls too fast. Wait ~20 seconds and retry. If it keeps happening, switch to the pooled backup key from the setup email.' },
  { err: 'ModuleNotFoundError', fix: 'You skipped the install cell. Run the very first setup cell at the top of the notebook, then re-run yours.' },
  { err: 'JSONDecodeError / can’t parse the reply', fix: 'The model returned prose, not JSON. Ask it explicitly for JSON, or use the parse_json() helper that retries.' },
  { err: 'Agent loops forever', fix: 'No stopping condition. Add a max-steps cap (e.g. stop after 5 loops) and a clear “task done” check.' },
  { err: 'KeyError / “tool not found”', fix: 'The tool name in your call doesn’t match the one you registered. Make the two strings identical.' },
  { err: 'Cell hangs / nothing happens', fix: 'Network or API hiccup. Switch the tool to its mock/offline version and keep moving - fix the live call later.' },
  { err: 'Colab disconnected / weird state', fix: 'Runtime → Restart session, then re-run the setup cells from the top. Clears most mystery errors.' },
]
