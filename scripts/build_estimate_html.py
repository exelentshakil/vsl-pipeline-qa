import os
import base64
import subprocess
import re

docs_dir = os.path.expanduser("~/Apps/claude-code/vsl-pipeline-qa/docs")
html_path = os.path.join(docs_dir, "estimate.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Formal Estimate - VSL Studio QA Engine</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.34;
      font-size: 9.8px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #6366f1;
      padding-bottom: 6px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #6366f1;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 8.8px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 8.5px;
      text-align: right;
      line-height: 1.38;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope Table */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }}
    .section-title {{
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #6366f1;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.5px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 4px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4.6px 6px;
      font-size: 8.7px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.7px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 9.1px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 8px;
      margin-top: 1px;
      line-height: 1.22;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 5px 6px;
      font-size: 9.2px;
    }}

    /* 3. 2-Column Grid */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6.5px 9px;
    }}
    .card-box-title {{
      font-size: 8.8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 3.5px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2.5px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2.5px 0;
      font-size: 8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 8px;
      color: #334155;
      margin-bottom: 2.5px;
      padding-left: 10px;
      position: relative;
      line-height: 1.22;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 6.5px 9px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 7.8px;
      line-height: 1.22;
    }}
    .term-title {{
      font-weight: 800;
      color: #6366f1;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1.5px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 7px 11px;
    }}
    .auth-title {{
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2.5px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2.5px;
      font-size: 8px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 4px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 26px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 14px;
      color: #1e3a8a;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 75px;
      border-bottom: 1.2px solid #475569;
      min-height: 26px;
      font-family: ui-monospace, monospace;
      font-size: 8.2px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
    }}
    .auth-label {{
      font-size: 7px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 9px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #6366f1;
      box-shadow: 0 1px 3px rgba(99,102,241,0.15);
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.8px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.5px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2.5px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 17px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.6px;
      color: #4338ca;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">
  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise Systems Engineering • Ref #BS-2026-VSL-082</div>
      <h1>VSL Studio QA — Autonomous Video Pipeline & Regression Engine</h1>
      <p class="subtitle">Algorithmic Lip-Sync Drift Gate, TikTok Safe-Zone OCR Validator, Auto-Remedy Poller & Stripe Funnel Publisher</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Mike • Coral Springs, FL (Eastern Time)</div>
      <div><strong>Turnaround:</strong> 10–14 Business Days (Modular Cadence)</div>
      <div><strong>Calibrated Rate:</strong> <strong>$20.00 / hr (Turnkey Package: $1,160.00)</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified & Audited</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Milestone Scope & Delivery Schedule</h2>
      <span class="section-meta">Rate: $20.00 / hr • 58.5 Total Scoped Hours</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 13%;">Phase</th>
          <th style="width: 55%;">Technical Deliverables & Architecture</th>
          <th style="width: 10%; text-align: center;">Hours</th>
          <th style="width: 10%; text-align: right;">Rate</th>
          <th style="width: 12%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num">Phase 0</td>
          <td>
            <div class="phase-name">Live Working Prototype & Architecture Verification</div>
            <div class="phase-desc">Interactive Visual Pipeline Canvas, 5-Point QA Regression Bench, Dual-Provider AI VSL Prompts, and Live Telemetry.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace, monospace;">0.5 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$0.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;" class="phase-0-badge">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1</td>
          <td>
            <div class="phase-name">Async Video Render Ingestion & Webhook Mesh</div>
            <div class="phase-desc">Runway Gen-3 / Kling / Luma API connectors; idempotent webhook signature checks; Supabase video run state persistence.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace, monospace;">12.0 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$20.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$240.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2</td>
          <td>
            <div class="phase-name">Algorithmic Video QA & Drift Inspection Engine</div>
            <div class="phase-desc">Audio-visual landmark alignment (&lt;120ms drift); safe-zone bounding box parser (TikTok 9:16 vs 16:9); subtitle OCR collision; -14 LUFS.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace, monospace;">15.0 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$20.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$300.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3</td>
          <td>
            <div class="phase-name">1-Click Auto-Remedy & Re-Queue Infrastructure</div>
            <div class="phase-desc">Automated failure triage (DRIFT_DESYNC, OVERLAY_CLIPPED); seed locking (#8492041); audio silence trimming; CFG clamp to 7.0.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace, monospace;">11.0 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$20.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$220.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 4</td>
          <td>
            <div class="phase-name">Turnkey Landing Page Funnels & Stripe Checkout</div>
            <div class="phase-desc">Next.js 15 dynamic video funnel pages; embedded video player with safe-zone compliance; Stripe Elements checkout integration.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace, monospace;">13.0 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$20.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$260.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 5</td>
          <td>
            <div class="phase-name">Production Hardening, Loom Walkthroughs & Handover</div>
            <div class="phase-desc">Complete Loom walkthroughs; modular architecture docs; Vercel edge deployment; Supabase schema migrations; 14-day warranty SLA.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace, monospace;">7.0 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$20.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace;">$140.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-size: 9.5px; letter-spacing: 0.02em;">TOTAL PRODUCTION INVESTMENT (PHASES 0–5)</td>
          <td style="text-align: center; font-family: ui-monospace, monospace; font-size: 9.5px;">58.5 hrs</td>
          <td style="text-align: right; font-family: ui-monospace, monospace; font-size: 9.5px;">$20.00</td>
          <td style="text-align: right; font-family: ui-monospace, monospace; font-size: 9.8px;">$1,160.00 USD</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Grid: Milestone Packages & Architectural Guarantees -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">
        <span>Delivery Options & Retainer Cadence</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option A: Turnkey Production Package</strong> (Phases 1–5 in 10–14 Days)</span>
        <span class="milestone-val">$1,160.00 Fixed</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option B: Dedicated Daily Sprint Retainer</strong> (30 hrs/wk Eastern Time)</span>
        <span class="milestone-val">$600.00 / week</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option C: Hourly Ad-Hoc Pipeline Engineering</strong> (On-demand triage)</span>
        <span class="milestone-val">$20.00 / hr</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">
        <span>Architectural Guarantees & Technical Guardrails</span>
      </div>
      <div class="guardrail-item">
        <strong>Algorithmic QA Guardrail:</strong> Drift &lt;120ms, Safe-Zone &gt;68px, and -14.0 LUFS mathematically gated.
      </div>
      <div class="guardrail-item">
        <strong>Dual-Provider AI Resilience:</strong> OpenAI gpt-4o-mini primary with sub-second Gemini 2.0 Flash failover.
      </div>
      <div class="guardrail-item">
        <strong>100% Client IP Ownership:</strong> Complete code, schema migrations, and deployment credentials transferred.
      </div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Escrow Funding</div>
        <div class="term-body">Upwork milestone escrow funded prior to each phase initiation; released upon verified acceptance criteria.</div>
      </div>
      <div class="term-col">
        <div class="term-title">IP & Code Rights</div>
        <div class="term-body">100% intellectual property, repository commits, and infrastructure access transferred directly to Mike upon delivery.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Warranty SLA</div>
        <div class="term-body">14-day comprehensive bug-fix and regression coverage included post-deployment at zero additional charge.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Eastern Time Sync</div>
        <div class="term-body">Active daily Eastern Time collaboration for live testing, Loom walkthroughs, and fast iteration cycles.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Acceptance & Authorization</span>
      <span style="font-weight: 500; font-size: 7.8px; color: #64748b;">Binding upon milestone activation or Upwork contract offer</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider (BarakahSoft LLC)</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">Sep 15, 2026</div>
        </div>
        <div class="auth-label">Authorized Provider Signature • Shakil Ahmed, Founder</div>
      </div>
      <div class="auth-party">
        <div class="auth-party-title">Authorized Client (Mike • AI Marketing Systems)</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="font-family: inherit; font-size: 9px; color: #475569; padding-bottom: 3px;">
            [ Accepted via Upwork Contract Offer / Sign-off ]
          </div>
          <div class="auth-date-field">October 2026</div>
        </div>
        <div class="auth-label">Authorized Client Signature • Mike, Founder</div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Principal Systems Architect & Founder</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Verified Upwork Partner • 12+ Years Enterprise Systems</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Eastern Time Active</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft LLC" class="business-logo" />
      <a href="https://vsl-pipeline-qa.vercel.app" class="demo-badge">Verified Live Prototype ↗</a>
    </div>
  </div>
</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Wrote HTML estimate to {html_path}")

# Compile PDF using Headless Chrome with absolute file:// URI
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file://{os.path.abspath(html_path)}"
]

subprocess.run(chrome_cmd, check=True)
print(f"Compiled PDF to {pdf_path}")

# Verify single-page constraint
with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
page_count = len(pages)
print(f"Verified PDF Page Count: {page_count} page(s)")
assert page_count == 1, f"ERROR: Expected strictly 1 page, got {page_count} pages!"

# Verify file size
file_size_kb = len(pdf_bytes) / 1024
print(f"Verified PDF File Size: {file_size_kb:.1f} KB")
assert file_size_kb > 400, f"ERROR: PDF size {file_size_kb:.1f} KB is too small (expected >400KB with embedded base64 assets)!"
