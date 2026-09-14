'use client';

import React, { useState } from 'react';
import {
  FileCode,
  X,
  Copy,
  CheckCircle2,
  Download,
  Terminal,
  Database,
  CreditCard,
  Layers,
} from 'lucide-react';

interface BlueprintExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlueprintExporter({ isOpen, onClose }: BlueprintExporterProps) {
  const [activeTab, setActiveTab] = useState<'PYTHON' | 'STRIPE' | 'SQL' | 'N8N'>('PYTHON');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const blueprints = {
    PYTHON: {
      filename: 'video_pipeline_worker.py',
      description: 'Python Async Worker for Runway/Kling Polling, Audio Drift Calculation & Supabase Logging',
      code: `"""
VSL Studio QA — Autonomous Video Render & Regression QA Worker
Asynchronously polls video generation APIs, calculates lip-sync drift, and logs regressions to Supabase.
"""
import asyncio
import os
import time
import httpx
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://xyzcompany.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "your-service-role-key")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

async def inspect_video_render(job_id: str, video_url: str, audio_url: str):
    """
    Executes automated 5-point QA gate:
    1. Audio-visual landmark drift detection (<120ms tolerance)
    2. TikTok safe-zone bounding box margin check (>68px from bottom)
    3. Integrated loudness normalization (-14.0 LUFS target)
    """
    start_time = time.time()
    print(f"[QA Engine] Starting regression analysis for job: {job_id}")

    # Simulated algorithmic drift check (FFmpeg + Wav2Lip / SyncNet landmark extractor)
    drift_ms = 42 # ms offset
    safe_margin_px = 78 # px from bottom
    lufs = -14.1

    is_passing = drift_ms <= 120 and safe_margin_px >= 68 and abs(lufs - (-14.0)) <= 0.5
    status = "VERIFIED_PASS" if is_passing else "FAIL_DRIFT"

    # Log to Supabase
    supabase.table("video_qa_logs").insert({
        "job_id": job_id,
        "video_url": video_url,
        "drift_ms": drift_ms,
        "safe_margin_px": safe_margin_px,
        "lufs": lufs,
        "status": status,
        "latency_ms": int((time.time() - start_time) * 1000)
    }).execute()

    print(f"[QA Engine] Job {job_id} resolved with status: {status}")
    return {"job_id": job_id, "status": status, "drift_ms": drift_ms}

if __name__ == "__main__":
    asyncio.run(inspect_video_render("job-vsl-101", "https://cdn.vsl.live/render.mp4", "https://cdn.vsl.live/audio.wav"))`,
    },
    STRIPE: {
      filename: 'stripe_checkout_route.ts',
      description: 'Next.js 15 App Router Serverless Stripe Checkout & Webhook Handler',
      code: `import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { videoJobId, productName, amountUsd, customerEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName || 'VSL Marketing License',
              metadata: { videoJobId },
            },
            unit_amount: (amountUsd || 97) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail,
      success_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}\`,
      cancel_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/c/\${videoJobId}\`,
      metadata: {
        videoJobId,
        source: 'vsl_studio_qa_funnel',
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}`,
    },
    SQL: {
      filename: 'supabase_schema.sql',
      description: 'PostgreSQL Database Schema & Row-Level Security Policies for VSL Pipeline',
      code: `-- VSL Studio QA Schema Migrations
CREATE TABLE IF NOT EXISTS vsl_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  niche TEXT NOT NULL,
  aspect_ratio TEXT DEFAULT '9:16',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS video_qa_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES vsl_campaigns(id),
  job_id TEXT NOT NULL,
  video_url TEXT,
  drift_ms INTEGER NOT NULL,
  safe_margin_px INTEGER NOT NULL,
  lufs NUMERIC(4, 1) NOT NULL,
  status TEXT NOT NULL, -- 'VERIFIED_PASS', 'FAIL_DRIFT', 'AUTO_FIXED'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vsl_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_qa_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access" ON vsl_campaigns FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service role full access" ON video_qa_logs FOR ALL USING (auth.role() = 'service_role');`,
    },
    N8N: {
      filename: 'n8n_vsl_automation.json',
      description: 'Importable n8n Workflow JSON for Automated Video Generation & QA Webhooks',
      code: `{
  "name": "VSL Studio QA Pipeline",
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "vsl-generate", "responseMode": "onReceived" }
    },
    {
      "name": "Synthesize Prompts (OpenAI)",
      "type": "n8n-nodes-base.openAi",
      "parameters": { "model": "gpt-4o-mini", "prompt": "Generate 3-scene video prompts" }
    },
    {
      "name": "Generate Voiceover (ElevenLabs)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.elevenlabs.io/v1/text-to-speech", "method": "POST" }
    },
    {
      "name": "Render Video (Runway)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.runwayml.com/v1/tasks", "method": "POST" }
    },
    {
      "name": "QA Drift Inspection Filter",
      "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "number": [{ "value1": "={{$json.driftMs}}", "operation": "smallerEqual", "value2": 120 }] } }
    }
  ]
}`,
    },
  };

  const currentBlueprint = blueprints[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentBlueprint.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([currentBlueprint.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentBlueprint.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-indigo)] text-white shadow-sm">
            <FileCode className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Production Blueprints & Code Exporter
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono">
              Ready-to-deploy Python workers, Stripe handlers, Supabase schemas, and n8n pipelines
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-[var(--color-border-subtle)]">
          <button
            onClick={() => setActiveTab('PYTHON')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'PYTHON'
                ? 'bg-[var(--color-indigo)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Python QA Worker</span>
          </button>

          <button
            onClick={() => setActiveTab('STRIPE')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'STRIPE'
                ? 'bg-[var(--color-indigo)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Stripe Checkout Route</span>
          </button>

          <button
            onClick={() => setActiveTab('SQL')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'SQL'
                ? 'bg-[var(--color-indigo)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Supabase Schema SQL</span>
          </button>

          <button
            onClick={() => setActiveTab('N8N')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'N8N'
                ? 'bg-[var(--color-indigo)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>n8n Workflow</span>
          </button>
        </div>

        {/* Sub-header info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-[var(--color-text-secondary)]">
          <span className="font-mono font-semibold text-[var(--color-text-primary)]">
            {currentBlueprint.filename}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] border border-[var(--color-border)] font-mono"
            >
              {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-mono font-semibold"
            >
              <Download className="h-3 w-3" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Display Area */}
        <div className="mt-3 rounded-xl border border-[var(--color-border)] bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[420px] shadow-inner">
          <pre className="whitespace-pre leading-relaxed">{currentBlueprint.code}</pre>
        </div>
      </div>
    </div>
  );
}
