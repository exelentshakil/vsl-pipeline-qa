'use client';

import React from 'react';
import {
  FileText,
  Mic,
  Clapperboard,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface WorkflowCanvasProps {
  activeStep: number;
  isSimulating: boolean;
  onSelectStep: (stepIndex: number) => void;
  selectedStep: number;
}

export function WorkflowCanvas({
  activeStep,
  isSimulating,
  onSelectStep,
  selectedStep,
}: WorkflowCanvasProps) {
  const steps = [
    {
      id: 1,
      title: '1. Script & Prompts',
      subtitle: 'OpenAI + Gemini Fallback',
      icon: FileText,
      metric: '3 Scenes • 9:16 Safe',
      status: activeStep >= 1 ? 'COMPLETE' : 'ARMED',
      latency: '82ms',
      color: 'var(--color-indigo)',
    },
    {
      id: 2,
      title: '2. Voice Synthesis',
      subtitle: 'ElevenLabs TTS Engine',
      icon: Mic,
      metric: '-14.0 LUFS Normalized',
      status: activeStep >= 2 ? 'COMPLETE' : activeStep === 1 ? 'PROCESSING' : 'STANDBY',
      latency: '340ms',
      color: 'var(--color-brand)',
    },
    {
      id: 3,
      title: '3. Video Render Worker',
      subtitle: 'Runway Gen-3 / Kling',
      icon: Clapperboard,
      metric: 'Async Webhook Poller',
      status: activeStep >= 3 ? 'COMPLETE' : activeStep === 2 ? 'PROCESSING' : 'STANDBY',
      latency: '1,420ms',
      color: 'var(--color-indigo)',
    },
    {
      id: 4,
      title: '4. Video QA Inspector',
      subtitle: '5-Point Regression Gate',
      icon: ShieldCheck,
      metric: 'Drift <120ms • Safe OCR',
      status: activeStep >= 4 ? 'COMPLETE' : activeStep === 3 ? 'INSPECTING' : 'STANDBY',
      latency: '210ms',
      color: 'var(--color-brand)',
    },
    {
      id: 5,
      title: '5. Stripe & Funnel',
      subtitle: 'Live Checkout Engine',
      icon: CreditCard,
      metric: 'Webhooks Ready • $149/mo',
      status: activeStep >= 5 ? 'COMPLETE' : activeStep === 4 ? 'PUBLISHING' : 'STANDBY',
      latency: '95ms',
      color: 'var(--color-brand)',
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm">
      {/* Header bar of the pipeline */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-indigo)] font-mono">
              Visual Pipeline Topology
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
              Event-Driven Asynchronous Mesh
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] tracking-tight mt-0.5">
            End-to-End VSL Generation & Automated QA Architecture
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
            Status:{' '}
            <strong className="text-[var(--color-text-primary)]">
              {isSimulating ? `Active at Step ${activeStep}/5` : 'Armed & Ready'}
            </strong>
          </span>
          <div className="h-2 w-24 bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-brand)] transition-all duration-500 rounded-full"
              style={{ width: `${(Math.max(1, activeStep) / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pipeline Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;
          const isCurrent = activeStep === step.id;
          const isDone = activeStep > step.id || (activeStep === 5 && step.id === 5);

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`group relative flex flex-col justify-between rounded-xl border p-3.5 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--color-indigo)] bg-[var(--color-indigo-subtle)]/30 ring-2 ring-[var(--color-indigo)]/20 shadow-sm'
                  : isDone
                  ? 'border-[var(--color-brand)]/40 bg-[var(--color-panel-subtle)] hover:border-[var(--color-brand)]'
                  : isCurrent
                  ? 'border-[var(--color-indigo)] bg-[var(--color-panel)] ring-2 ring-[var(--color-indigo)]/30 shadow-md animate-pulse-glow'
                  : 'border-[var(--color-border)] bg-[var(--color-panel)] hover:border-[var(--color-text-muted)]/40'
              }`}
            >
              {/* Node Top info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isDone
                        ? 'bg-[var(--color-brand)] text-white'
                        : isCurrent
                        ? 'bg-[var(--color-indigo)] text-white animate-pulse'
                        : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
                      isDone
                        ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)]'
                        : isCurrent
                        ? 'bg-[var(--color-indigo-subtle)] text-[var(--color-indigo)] animate-pulse'
                        : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    {isDone ? 'PASS' : isCurrent ? 'BUSY' : 'READY'}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                  {step.subtitle}
                </p>
              </div>

              {/* Node Bottom metrics */}
              <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--color-text-muted)] truncate max-w-[110px]">
                  {step.metric}
                </span>
                <span className="text-[var(--color-brand)] font-semibold shrink-0">
                  {step.latency}
                </span>
              </div>

              {/* Arrow indicator between nodes on large screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-muted)] shadow-xs">
                    <ArrowRight className="h-2.5 w-2.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Node Deep-Dive Drawer Summary */}
      <div className="mt-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] p-3 sm:p-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-[var(--color-indigo)] shrink-0" />
            <span className="font-semibold text-[var(--color-text-primary)]">
              {selectedStep === 1 && 'Step 1: Multi-Model Prompt & Scene Decomposition'}
              {selectedStep === 2 && 'Step 2: Voiceover Pacing, LUFS Normalization & SSML'}
              {selectedStep === 3 && 'Step 3: Asynchronous Render Dispatch with Idempotent Callback Tokens'}
              {selectedStep === 4 && 'Step 4: Algorithmic Video QA Regression & Drift Inspection'}
              {selectedStep === 5 && 'Step 5: Automated Funnel Deployment & Stripe Checkout Sync'}
            </span>
          </div>
          <span className="text-[var(--color-text-muted)] font-mono">
            {selectedStep === 1 && 'Dual Engine: OpenAI gpt-4o-mini (Primary) + Gemini 2.0 Flash (Failover)'}
            {selectedStep === 2 && 'Target: -14 LUFS • Zero Unpadded Lead Silence • 44.1kHz WAV'}
            {selectedStep === 3 && 'Providers: Runway Gen-3 Alpha • Kling 1.5 Pro • Replicate / Fal.ai'}
            {selectedStep === 4 && 'Tolerances: Lip-Sync Drift <120ms • Safe-Zone Margin >68px from UI'}
            {selectedStep === 5 && 'Endpoints: /api/stripe/checkout • Supabase Webhook Dispatcher'}
          </span>
        </div>
      </div>
    </div>
  );
}
