# SignalMatch

SignalMatch is a truth-first job-match product.

![SignalMatch resume to job description visual](./public/generated/signalmatch-hero.png)

The user pastes a resume and a job description. The app returns:

- matched signals already visible to ATS or recruiter screens
- missing terms to add only if they are true
- sharper bullet rewrites without inventing achievements
- proof prompts for weak bullets
- a short interview drill bank
- a 30-second positioning pitch

## Why this direction

This repo intentionally avoids the service-outreach path. It is a direct
consumer product for job seekers instead.

The bet is that job-search pain is large, urgent, and already spending money on
tools, but many AI products still feel risky because they encourage fake or
sloppy applications. SignalMatch leans the other way: make the application
stronger without hallucinating experience.

Current sources behind the angle:

- [LinkedIn research, 2026](https://news.linkedin.com/en-us/2026/LinkedIn-Research-Talent-2026)
- [Gartner press release, July 31, 2025](https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them)
- [CNBC report, February 28, 2025](https://www.cnbc.com/2025/02/28/nearly-two-thirds-of-job-candidates-are-using-ai-in-their-applications-report-says.html)

The short market read:

- LinkedIn said nearly 80% of people feel unprepared to find a job in 2026.
- LinkedIn also said 93% of recruiters plan to increase their AI use in 2026.
- Gartner said only 26% of applicants trust AI to evaluate them fairly, even as
  52% believe AI screens their information.
- CNBC reported that around 65% of candidates use AI somewhere in the
  application process.

That combination creates room for a product that is faster than manual prep and
safer than generic AI rewriting.

## Product scope

SignalMatch is tuned for:

- product
- operations
- analyst
- growth
- customer success

The engine is deterministic and explainable. It does not call an LLM or any
paid API.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify it

```bash
npm run verify
```

## Intended monetization

The cleanest first launch is:

- free keyword scan
- $19 one-role pack
- $49 interview sprint upsell
- $39 Agent Browser Operator OS for the separate builder/operator audience

Do not overbuild checkout, accounts, or saved history before validating demand.
The immediate value is the report quality and positioning.

Interim support route while the real role-pack checkout is not connected:
https://nicdunz.gumroad.com/l/smrimu

That receipt is not the $19 role pack. It is only a lightweight way to support
the build if SignalMatch saved you time or gave you a useful application angle.

Separate builder route:
https://nicdunz.gumroad.com/l/agent-browser-operator-os

Agent Browser Operator OS is a $39 self-serve material route for browser-agent
operator workflows. It is not the SignalMatch Role Pack and it does not include
Chrome plugin repair, guaranteed automation, account access, custom setup,
calls, or public posting without human approval.
