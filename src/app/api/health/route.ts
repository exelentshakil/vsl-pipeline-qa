import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('placeholder'));
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('placeholder'));
  const hasInngest = Boolean(process.env.INNGEST_EVENT_KEY && !process.env.INNGEST_EVENT_KEY.includes('placeholder'));
  const hasSupabase = isSupabaseConfigured();

  return NextResponse.json({
    status: 'operational',
    service: 'VSL Studio QA — Autonomous Video Pipeline & Regression Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    providers: {
      openai: {
        active: hasOpenAI,
        model: 'gpt-4o-mini',
        role: 'Primary Cognitive Engine & Structured JSON Synthesizer',
      },
      gemini: {
        active: hasGemini,
        model: 'gemini-2.0-flash',
        role: 'High-Velocity Failover & Latency Optimizer',
      },
      supabase: {
        active: hasSupabase,
        role: 'Video Run State & Regression Telemetry Vault',
      },
      inngest: {
        active: hasInngest,
        role: 'Durable Pipeline Event Orchestrator',
      },
      deterministicFallback: {
        active: true,
        role: 'Sub-20ms Air-Gapped Rule Matrix',
      },
    },
    capabilities: [
      'Asynchronous Video Generation API Polling (Runway, Kling, Luma)',
      'Algorithmic Lip-Sync Drift Detection (<120ms Gate)',
      'Safe-Zone OCR Subtitle Bounding Box Validator',
      'One-Click Remediation & Re-queue Trigger',
      'Dynamic Stripe Checkout & Funnel Publisher',
    ],
  });
}
