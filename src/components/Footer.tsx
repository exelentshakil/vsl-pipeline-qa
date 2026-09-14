'use client';

import React from 'react';
import {
  ShieldCheck,
  Server,
  Lock,
  Cpu,
  Workflow,
  Zap,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export function Footer() {
  const architecturalDecisions = [
    {
      title: 'Asynchronous Webhook Mesh',
      description:
        'Decouples high-latency video render jobs (2–4 minutes) from client connections using idempotent webhook callbacks and exponential backoff retry queues.',
      icon: Server,
    },
    {
      title: '5-Point Algorithmic QA Gate',
      description:
        'Validates lip-sync drift (<120ms), safe-zone bounding box margins (>68px), and integrated audio loudness (-14 LUFS) prior to funnel publishing.',
      icon: ShieldCheck,
    },
    {
      title: 'Dual-Provider LLM Resilience',
      description:
        'Zero-dependency HTTP fallback chain between OpenAI gpt-4o-mini and Gemini 2.0 Flash ensures sub-second prompt synthesis with 100% uptime.',
      icon: Cpu,
    },
    {
      title: 'Turnkey Stripe & Supabase Bridge',
      description:
        'Immediately provisions live checkout sessions and persists regression logs with strict row-level security policies and zero vendor lock-in.',
      icon: Lock,
    },
  ];

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-panel)] px-0 py-10 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Architectural Decision Cards Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="h-4 w-4 text-[var(--color-indigo)]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Production Architecture & System Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {architecturalDecisions.map((decision, idx) => {
              const Icon = decision.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--color-indigo-subtle)] text-[var(--color-indigo)]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] leading-snug">
                        {decision.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {decision.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--color-brand)]">
                    <span>Verified Production Spec</span>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Specs & Attribution Row */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-text-muted)] font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <span>Stack: Next.js 15.5 • React 19 • TypeScript • Tailwind v4</span>
            <span className="hidden md:inline">•</span>
            <span>APIs: Runway Gen-3 • Kling 1.5 • ElevenLabs v2 • Stripe v2024</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Engineered by BarakahSoft LLC</span>
            <span>•</span>
            <span className="text-[var(--color-text-primary)] font-semibold">
              Shakil Ahmed (Lead Systems Architect)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
