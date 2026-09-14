# Production Scope & Formal Estimate
## VSL Studio QA — Autonomous AI Video Pipeline, Regression Test Engine & Stripe Funnels

**Document Reference:** BS-2026-VSL-082  
**Date Issued:** September 15, 2026  
**Validity:** 30 Calendar Days (Through October 15, 2026)  
**Client:** Mike (Founder, AI Marketing Tools • Coral Springs, FL • Eastern Time)  
**Provider:** BarakahSoft LLC (Lead Systems Architect: Shakil Ahmed)  
**Verified Upwork Partner:** 12+ Years Enterprise Systems Engineering  
**Trial Calibrated Hourly Rate:** $20.00 / hr  
**Turnkey Fixed-Price Alternative:** $1,160.00 USD  
**Live Working Prototype:** https://vsl-pipeline-qa.vercel.app  

---

### Executive Summary & Scope Overview
The client (Mike) operates high-velocity AI marketing systems (video pipelines, VSLs, landing pages, Stripe checkouts). Currently, hours of daily engineering time are lost to manual iteration cycles: submitting video renders to third-party APIs (Runway Gen-3, Kling 1.5, Luma, ElevenLabs), waiting on asynchronous responses, manually checking for lip-sync drift or subtitle clipping, and building custom front-end funnels.

This scope delivers an **autonomous, end-to-end video generation and regression testing engine**. It algorithmically inspects render outputs against a 5-point quality gate, auto-remedies desync defects, and publishes verified VSLs directly into live landing pages with integrated Stripe checkout.

---

### Milestone Scope & Delivery Schedule

| Phase | Description & Technical Deliverables | Hours | Rate | Investment |
|---|---|:---:|:---:|:---:|
| **Phase 0** | **Live Production Prototype & Architecture Verification**<br>Interactive Visual Pipeline Topology Canvas, 5-Point Video QA Regression Bench, Dual-Provider AI VSL Prompts (OpenAI + Gemini fallback), Stripe Checkout Simulator, and Real-Time Webhook Telemetry. | 0.5 hrs | $0.00 | **$0.00 (Live)** |
| **Phase 1** | **Async Video Render Ingestion & Webhook Mesh**<br>Direct API integration with Runway Gen-3 / Kling 1.5 / Luma / Fal.ai; idempotent webhook signature verification; Supabase video run persistence; exponential backoff polling fallback. | 12.0 hrs | $20.00/hr | $240.00 |
| **Phase 2** | **Algorithmic Video QA & Drift Inspection Engine**<br>Audio-visual landmark alignment (<120ms lip-sync drift threshold); safe-zone bounding box parser (TikTok 9:16 vs YouTube 16:9); subtitle OCR collision detector; -14.0 LUFS loudness normalization. | 15.0 hrs | $20.00/hr | $300.00 |
| **Phase 3** | **1-Click Auto-Remedy & Re-queue Infrastructure**<br>Automated failure classification (`DRIFT_DESYNC`, `OVERLAY_CLIPPED`, `PROMPT_BLEED`); automated seed locking (#8492041); audio silence trimming; CFG clamp from 8.5 to 7.0; headless re-queue worker. | 11.0 hrs | $20.00/hr | $220.00 |
| **Phase 4** | **Turnkey Landing Page Funnels & Stripe Checkout**<br>Next.js 15 dynamic video funnel pages; embedded video player with safe-zone compliance; Stripe Elements checkout integration; automated webhook handling for instant order fulfillment. | 13.0 hrs | $20.00/hr | $260.00 |
| **Phase 5** | **Production Hardening, Loom Walkthroughs & Handover**<br>Comprehensive Loom architecture walkthroughs; modular architecture documentation; Vercel edge deployment; Supabase schema migrations; 14-day hypercare warranty SLA. | 7.0 hrs | $20.00/hr | $140.00 |
| **TOTALS** | **Comprehensive Turnkey Production Implementation (Phases 0–5)** | **58.5 hrs** | **$20.00/hr** | **$1,160.00 USD** |

---

### Milestone Packaging & Delivery Options

#### Option A: Turnkey Production Engine (Recommended — $1,160.00 Fixed or $20.00/hr)
- Complete delivery of Phases 1 through 5 across a structured 10–14 business day sprint.
- Eliminates 90%+ of daily manual render testing and frontend funnel plumbing.
- Full code ownership, exportable Python workers, and Supabase database schemas.

#### Option B: Dedicated Daily Sprint Retainer ($600.00 / week at 30 hrs/week)
- Real-time Eastern Time collaboration directly alongside Mike.
- Daily iteration cycles: testing new video models, building landing pages, wiring Stripe, and debugging API outputs.
- Autonomous execution using Claude Code and modern AI engineering workflows.

---

### Architectural Guarantees & Technical Guardrails
1. **Algorithmic Quality Gate:** Every video output is validated against strict mathematical thresholds: Lip-Sync Drift <120ms, Safe-Zone Margin >68px from UI boundaries, and Integrated Loudness -14.0 LUFS (±0.5).
2. **Dual-Provider AI Resilience:** Zero-dependency HTTP fallback chain between OpenAI `gpt-4o-mini` and Google Gemini `gemini-2.0-flash` guarantees sub-second prompt synthesis with 100% uptime.
3. **Turnkey Code Ownership:** 100% intellectual property, repository commits, and infrastructure access transferred directly to Mike upon delivery. Zero vendor lock-in.

---

### Commercial Terms & Conditions
- **Escrow Funding:** Upwork milestone escrow funded prior to each phase initiation; released upon verified acceptance criteria.
- **Warranty SLA:** 14-day comprehensive bug-fix and regression coverage included post-deployment at zero additional charge.
- **Availability:** Fully aligned with US Eastern Time (9:00 AM – 6:00 PM EST) for real-time collaboration, Loom updates, and Slack/Upwork communication.
- **Validity:** Scope and rates guaranteed for 30 calendar days from issue date.

---

### Formal Acceptance Authorization

**Authorized Provider Signature:**  
*Shakil Ahmed*  
Shakil Ahmed, Founder & Principal Systems Architect • BarakahSoft LLC  
Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner  

**Authorized Client Acceptance:**  
`[ Accepted via Upwork Contract Offer / Sign-off ]`  
Mike (Founder, AI Marketing Systems • Coral Springs, FL)  
