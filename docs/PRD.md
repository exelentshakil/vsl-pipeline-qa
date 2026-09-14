# Product Requirements Document (PRD)
## VSL Studio QA — Autonomous Video Generation Pipeline & Regression Test Engine

**Document Reference:** PRD-VSL-2026-09  
**Target Client:** Mike (AI-Powered Marketing Tools Founder, Coral Springs, FL • Eastern Time)  
**System Classification:** Production-Grade Video Generation Pipeline, Automated QA Inspector & Funnel Deployment Engine  
**Lead Systems Architect:** Shakil Ahmed (BarakahSoft LLC)  

---

### 1. Executive Summary & Problem Space
The client (Mike) builds AI-driven video marketing tools, VSLs (Video Sales Letters), and ad creation pipelines. In production video generation (Runway Gen-3, Kling 1.5, Luma Dream Machine, HeyGen, ElevenLabs, Replicate), API calls are asynchronous, non-deterministic, and prone to edge-case failures:
1. **Time Sink & Manual Iteration Drag:** Waiting 2–4 minutes per video render only to discover audio-video desync, hallucinated visual artifacts, or clipped subtitle overlays.
2. **Quality Assurance Gap:** Without automated validation, buggy outputs reach funnels or require constant human eye-balling across dozens of test variations.
3. **Friction Connecting Videos to Revenue:** Turning an approved video into a live landing page with high-converting copy and working Stripe checkout requires repetitive manual front-end and back-end plumbing.
4. **Previous Freelancer Churn:** Low-rate ($9–$12/hr) generalists failed because they waited for step-by-step instructions rather than taking full ownership of testing, debugging, and shipping end-to-end.

**Core Thesis:** *Automate the testing, triage, and deployment loop so Mike spends zero minutes waiting on renders or fixing broken front-ends.*

---

### 2. 100-Person Virtual Studio Team Discovery Standard
To ensure enterprise software quality, this product is analyzed across 7 multidisciplinary perspectives:

1. **Lead Product Designer:**
   - Visual archetype: High-Tech Software Laboratory (Lovable/Vercel/Supabase aesthetic).
   - Crisp Light Mode default (`#fafafa` canvas, `#ffffff` card surfaces, `#e2e8f0` hairline borders) with seamless dark mode support.
   - Strict typography scale: 12px minimum (`text-xs`), prominent monospace KPI tabular numbers, zero sub-12px micro-text.
   - Pixel-perfect max-w-7xl layout alignment with zero horizontal layout shift.

2. **Systems Architect:**
   - Asynchronous event-driven pipeline orchestrating script generation, TTS audio synthesis, video rendering, automated QA gating, and funnel publishing.
   - Resilient webhook listeners handling `render.completed`, `render.failed`, and `stripe.checkout.session.completed` events.
   - Idempotent execution keys to prevent duplicate billing or ghost renders.

3. **Full-Stack Programmer (Next.js 15 / TypeScript / Supabase / Stripe):**
   - Clean App Router architecture with type-safe server endpoints.
   - Supabase schema migrations for pipeline runs, QA regression logs, and landing page funnels.
   - Zero console warnings, defensive runtime typing, and instant localStorage fallback state.

4. **AI Research Specialist:**
   - Real Dual-Provider AI integration: OpenAI `gpt-4o-mini` primary with instant failover to Google Gemini `gemini-2.0-flash`.
   - Structured JSON output schemas for VSL script hooks, 3-scene visual prompts, audio pacing cues, and automated QA diagnostics.
   - Sub-second latency telemetry and live provider attribution badges.

5. **Motion / Animation Designer:**
   - Living animated SVG pipeline canvas (`WorkflowCanvas.tsx`) featuring continuous ambient pulse energy and traveling data packet lasers.
   - Visual status transitions from `ARMED` to `RUNNING` to `INSPECTING` to `VERIFIED_PASS`.

6. **Product Marketer / Deal Closer:**
   - Zero embedded proposals, bid numbers, or Upwork references in the software UI.
   - Commercial focus: High-converting VSL copy hooks, instant Stripe checkout integration, and measurable ROI (token burn vs executive hours saved).

7. **End-User / Client QA:**
   - Interactive QA Regression Bench allowing side-by-side inspection of video outputs.
   - Diagnostic error classification (`DRIFT_DESYNC`, `PROMPT_BLEED`, `OVERLAY_CLIPPED`, `API_TIMEOUT`).
   - One-click "Auto-Fix & Rerun" trigger with automatic parameter adjustments (CFG scale, audio trimming, seed variation).

---

### 3. Core Feature Architecture & Modules

#### Module 1: Interactive Visual Pipeline Canvas (`WorkflowCanvas.tsx`)
- 5-stage sequential workflow:
  1. **Script & Prompt Engineering** (AI Hook & Scene Structuring)
  2. **Audio / Voice Synthesis** (ElevenLabs / TTS Alignment)
  3. **Video Generation Engine** (Runway Gen-3 / Kling 1.5 / Luma)
  4. **Automated Video QA Inspector** (5-Point Algorithmic Gate)
  5. **Funnel & Stripe Publisher** (Dynamic Landing Page + Checkout)
- SVG connector physics with animated traveling data packets.

#### Module 2: Video QA & Regression Workbench (`VideoQaWorkbench.tsx`)
- Multi-run video player simulator with active playback scrubber.
- 5-Point Automated QA Inspection Suite:
  - **Lip-Sync Drift Detection:** Measures millisecond offset between audio phonemes and facial landmarks (Tolerance: <120ms).
  - **Aspect Ratio & Safe Zone Compliance:** Validates 9:16 (TikTok/Reels) vs 16:9 (Desktop VSL) bounding boxes.
  - **Subtitle OCR Clipping Guard:** Detects text cutoffs, illegible contrast, or UI button overlaps.
  - **Audio Loudness Normalization:** Measures integrated LUFS (-14 LUFS broadcast target).
  - **Visual Artifact & Hallucination Score:** Algorithmic scan for multi-limb glitches or uncanny frame drops.
- **One-Click Auto-Remedy & Re-queue:** Automatically recalculates generation seeds, clamps guidance scales, and retries failed scenes without manual intervention.

#### Module 3: Live Dual-Provider AI VSL Generator (`/api/ai/vsl-generator`)
- Real OpenAI `gpt-4o-mini` primary + Gemini `gemini-2.0-flash` fallback.
- Accepts target niche (e.g. B2B SaaS, E-Commerce, Financial Trading, Real Estate) and generates:
  - High-converting Hook (3-second pattern interrupt)
  - 3-Scene Video Generation Prompts (Camera motion, lighting, subject action)
  - ElevenLabs Voiceover Script with SSML emotion tags
  - Exact API payloads ready for Runway / Kling / HeyGen.

#### Module 4: Dynamic Marketing Funnel & Stripe Checkout Previewer (`FunnelStripePreview.tsx`)
- Instantly previews the generated VSL embedded into a high-converting landing page.
- Interactive Stripe Checkout modal simulator with test card credentials (`4242...`), price tier selection, and immediate webhook dispatch simulation.

#### Module 5: Live Execution Log & Webhook Telemetry Drawer (`ExecutionLogDrawer.tsx`)
- Collapsible bottom drawer streaming real-time structured JSON event logs with millisecond timestamps.
- Webhook inspector for incoming video provider callbacks, Supabase DB inserts, and Stripe payment receipts.

#### Module 6: Production Blueprints & Code Exporter (`BlueprintExporter.tsx`)
- Downloadable production assets:
  - `video_pipeline_worker.py`: Python async worker for polling & webhook handling.
  - `stripe_checkout_route.ts`: Next.js 15 App Router serverless checkout handler.
  - `schema_migrations.sql`: Production Supabase tables with RLS policies.
  - `n8n_vsl_automation.json`: Complete workflow blueprint for visual orchestrators.

---

### 4. Technical Stack & Standards
- **Framework:** Next.js 15.5.4 App Router, React 19, TypeScript 5.7.
- **Styling:** Tailwind CSS v4, custom theme CSS variables, Lucide React icons.
- **Theme:** Default Light Mode with dark mode toggle support (`next-themes`).
- **Data Persistence:** Supabase PostgreSQL with local offline fallback.
- **AI Engine:** Zero-dependency HTTP fetch chain (OpenAI + Gemini fallback).
- **Hosting & CI/CD:** Vercel edge deployment with automated GitHub integration.
- **Analytics:** 1-line zero-overhead tracking pixel reporting to central dashboard.

---

### 5. Acceptance Criteria (Mapped to Client Brief)
- [x] Full-stack architecture covering front-end funnels and back-end pipeline orchestration.
- [x] Dedicated testing and QA suite that catches errors (drift, clipping, timeouts) before delivery.
- [x] Live API integration with real AI generation and latency telemetry.
- [x] Clear bug documentation and structured error triage logs.
- [x] Stripe checkout integration demonstrating end-to-end commercial viability.
- [x] Production code exportable in Python and TypeScript.
