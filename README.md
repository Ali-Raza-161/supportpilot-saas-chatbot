# SupportPilot — AI Customer Support SaaS (Demo)

A complete, professional-looking SaaS website with a working AI support chatbot.
**Suggested GitHub repo name:** `supportpilot-saas-chatbot` (repo not created by this build — see note below)

> Demo only: there is no real login, payment or backend. The demo login button
> opens the dashboard directly. All customer, order and analytics data is
> clearly labelled sample data. No API key or paid service is required.

## What it does

- **Landing page:** hero, features, pricing with a monthly/yearly toggle, FAQ, footer.
- **Demo dashboard:** overview stats, recent conversations (sample), and a
  weekly chats/resolved chart drawn with plain HTML canvas — no chart library.
- **AI support chatbot:** answers from a knowledge base of 36 Q&As across
  orders, refunds, shipping, pricing, account, payments, product and technical
  topics. Honest fallback + ticket creation when an answer is not found,
  typing indicator, suggestion chips and session memory ("tell me more").
- **Knowledge Base manager:** add and delete Q&As. Entries save in
  `localStorage` and the chatbot uses new entries immediately.
- **Embed widget:** copy an embed-code snippet and try a live widget preview
  on a sample business page.
- **Settings:** business name, greeting message, and English / Roman Urdu
  greeting language. Settings save in `localStorage`.

## How to run (no build step)

```bash
cd supportpilot-saas-chatbot
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly in a browser. For screenshots / video,
append a view, e.g. `?view=dashboard`, `?view=chat`, `?view=kb`,
`?view=widget` or `?view=pricing` — these open the demo dashboard directly
for demonstration purposes.

## Try it

1. Click **Demo login** (or **Try the live demo**).
2. In **Chatbot**, try: "Where is my order?", "How do I get a refund?",
   "How long does shipping take?", "What are your pricing plans?"
3. In **Knowledge Base**, add your own Q&A, then ask the chatbot that question.
4. In **Embed Widget**, copy the snippet and try the preview widget.
5. In **Settings**, change the business name and switch the greeting to
   Roman Urdu, then save.

## Files

- `index.html` — landing page + dashboard app
- `styles.css` — all styling, responsive
- `app.js` — app logic, chatbot matching, dashboard, KB manager, widget, settings
- `data.js` — 36 knowledge-base Q&As, sample conversations, sample analytics
- `TESTING.md` — test results and how the testing video was made
- `docs/testing-video.mp4` — testing/demo video (screenshots of the real app)

## How the chatbot works (honest note)

This is a local, keyword/retrieval chatbot — not a large language model.
It scores knowledge-base entries by keyword and question-word overlap and
answers only from the best match above a threshold. That is deliberate for a
free, offline demo. A production upgrade path would be: replace
`findAnswer()` in `app.js` with a hosted LLM/RAG call, keep the same
fallback + ticket flow, and add human-agent handoff.

## GitHub

This local build was **not** pushed to GitHub. The parent agent will push it
after the user creates the empty repository, as agreed. GitHub Pages is
**not** live for this project yet.
