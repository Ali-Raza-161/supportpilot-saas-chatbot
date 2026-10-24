# Testing — SupportPilot

## What was tested

### 1. Syntax checks — PASS
- `node --check data.js` — PASS
- `node --check app.js` — PASS

### 2. Logic smoke tests (Node) — 10/10 PASS
Knowledge base has **36 Q&As**. Tested with `findAnswer()`:

| Question | Expected | Result |
|---|---|---|
| Where is my order? | Tracking answer | PASS — matched "Where is my order?" |
| How do I get a refund? | Refund answer | PASS |
| How long does shipping take? | Shipping answer | PASS |
| What are your pricing plans? | Pricing answer | PASS |
| How do I reset my password? | Password answer | PASS |
| What is the capital of France? | No answer (honest fallback) | PASS — no answer returned |
| Add a new Q&A, then ask it | New answer used immediately | PASS |
| Delete that Q&A, then ask it again | No answer | PASS |
| Yearly price for Pro $29/mo | $23/mo | PASS |
| Ticket ID with 3 existing tickets | T-1043 | PASS |

### 3. Real browser UI tests (Playwright + headless Chromium) — ALL PASS
Run against the actual app served locally (`python3 -m http.server`):

- Pricing toggle: clicking **Yearly** changed Pro price to **$23/mo** — PASS
- Demo login: dashboard became visible, no real login required — PASS
- Chatbot: asking "Where is my order?" returned the tracking answer — PASS
- Ticket creation: created **T-1040** with the subject shown on screen — PASS
- Knowledge Base: count went from **36 Q&As to 37 Q&As** after adding a
  question, and the chatbot then answered that new question with the new
  answer — PASS

### 4. Screenshots — verified by eye
Real screenshots of the running app were taken with headless Chromium and
checked visually: landing page, pricing section, dashboard with canvas chart,
chatbot conversation, knowledge-base list and widget preview all render
correctly and professionally.

## Testing video — how it was honestly made

**File:** `docs/testing-video.mp4` — **893 KB, 84 seconds, 1280×800, no audio.**

This is **not** a live screen recording. In this environment, a live screen
recording was not available, so the video was assembled from **actual
screenshots of the running app** (taken with headless Chromium via
Playwright, at the views listed below), each shown for about 12 seconds
with a clear on-screen step caption added at the bottom:

1. Landing page
2. Pricing — monthly / yearly toggle
3. Dashboard — stats + analytics chart
4. Chatbot answering from the knowledge base
5. Knowledge Base manager
6. Embed widget preview

The screenshots are real renders of `index.html`, `styles.css`, `app.js`
and `data.js` — not mock-ups and not AI-generated animation. The
interactive behaviour (clicks, typing, ticket creation, KB add) was
verified separately by the Playwright UI tests above, not by the video.

## Known limitations (honest)

- Demo login is not real authentication.
- The chatbot is a local keyword/retrieval matcher, not an LLM. See README
  for the production upgrade path.
- Data is sample data stored in the browser only; nothing is sent to a server.
- GitHub Pages is **not** live for this project yet, and nothing in this
  folder has been pushed to GitHub by this build.
