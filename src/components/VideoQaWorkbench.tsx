'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  Sparkles,
  Layers,
  Volume2,
  Maximize2,
  CheckCircle2,
  ArrowUpRight,
  RefreshCw,
  Wand2,
  Cpu,
  Tv,
} from 'lucide-react';

export interface VideoJob {
  id: string;
  title: string;
  aspectRatio: '9:16' | '16:9';
  platform: 'TikTok / Reels' | 'YouTube / Desktop VSL';
  duration: string;
  status: 'FAIL_DRIFT' | 'VERIFIED_PASS' | 'AUTO_FIXED' | 'RENDERING';
  driftMs: number;
  safeZoneMarginPx: number;
  lufs: number;
  artifactScore: number;
  ocrContrastScore: number;
  failureReason?: string;
  remedyAction?: string;
  sceneTitle: string;
  promptSeed: number;
  cfgScale: number;
}

interface VideoQaWorkbenchProps {
  onPublishToFunnel: (job: VideoJob) => void;
  onLogEvent: (event: string, meta?: any) => void;
}

export function VideoQaWorkbench({
  onPublishToFunnel,
  onLogEvent,
}: VideoQaWorkbenchProps) {
  const [jobs, setJobs] = useState<VideoJob[]>([
    {
      id: 'job-vsl-101',
      title: 'AI Trading Bot VSL — Scene 2 (Pattern Interrupt)',
      aspectRatio: '9:16',
      platform: 'TikTok / Reels',
      duration: '00:04.50',
      status: 'FAIL_DRIFT',
      driftMs: 380,
      safeZoneMarginPx: 42,
      lufs: -14.1,
      artifactScore: 96.2,
      ocrContrastScore: 84,
      failureReason:
        'ElevenLabs audio packet had 240ms unpadded lead silence, creating 380ms lip-sync drift on Runway Gen-3 anchor frame. Subtitles overlap TikTok bottom UI buttons.',
      remedyAction:
        'Trim 240ms audio lead silence, clamp CFG scale to 7.0, lock seed to #8492041, and bump subtitle bottom padding +34px.',
      sceneTitle: 'High-Velocity Trading Cockpit with Animated PnL Chart',
      promptSeed: 4819024,
      cfgScale: 8.5,
    },
    {
      id: 'job-vsl-102',
      title: 'SaaS Onboarding Demo VSL — Full Walkthrough',
      aspectRatio: '16:9',
      platform: 'YouTube / Desktop VSL',
      duration: '00:15.00',
      status: 'VERIFIED_PASS',
      driftMs: 44,
      safeZoneMarginPx: 96,
      lufs: -13.9,
      artifactScore: 98.4,
      ocrContrastScore: 95,
      sceneTitle: 'Interactive Workflow Builder & Instant Stripe Checkout',
      promptSeed: 7391024,
      cfgScale: 7.2,
    },
    {
      id: 'job-vsl-103',
      title: 'E-Commerce ROAS Hook Ad — Scene 1',
      aspectRatio: '9:16',
      platform: 'TikTok / Reels',
      duration: '00:03.00',
      status: 'AUTO_FIXED',
      driftMs: 52,
      safeZoneMarginPx: 78,
      lufs: -14.0,
      artifactScore: 97.1,
      ocrContrastScore: 91,
      remedyAction: 'Auto-remediated via automated seed lock #8492041 & -180ms TTS offset.',
      sceneTitle: 'Unboxing Pattern Interrupt with Kinetic Text Overlays',
      promptSeed: 8492041,
      cfgScale: 7.0,
    },
    {
      id: 'job-vsl-104',
      title: 'Real Estate Investor Magnet — Scene 3',
      aspectRatio: '16:9',
      platform: 'YouTube / Desktop VSL',
      duration: '00:05.20',
      status: 'RENDERING',
      driftMs: 0,
      safeZoneMarginPx: 80,
      lufs: -14.2,
      artifactScore: 94.0,
      ocrContrastScore: 89,
      sceneTitle: 'Luxury Architectural Aerial Pan with Voiceover Call-To-Action',
      promptSeed: 1928374,
      cfgScale: 7.5,
    },
  ]);

  const [selectedJobId, setSelectedJobId] = useState<string>('job-vsl-101');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);
  const [showDriftWaveform, setShowDriftWaveform] = useState<boolean>(true);
  const [isRemediating, setIsRemediating] = useState<boolean>(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Auto-Remedy Action Handler
  const handleAutoRemedy = () => {
    setIsRemediating(true);
    onLogEvent('QA_REMEDIATION_TRIGGERED', {
      jobId: selectedJob.id,
      remedy: selectedJob.remedyAction,
      originalDriftMs: selectedJob.driftMs,
    });

    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) => {
          if (j.id === selectedJob.id) {
            return {
              ...j,
              status: 'VERIFIED_PASS',
              driftMs: 46,
              safeZoneMarginPx: 78,
              cfgScale: 7.0,
              promptSeed: 8492041,
              failureReason: undefined,
            };
          }
          return j;
        })
      );
      setIsRemediating(false);
      onLogEvent('QA_REMEDIATION_RESOLVED', {
        jobId: selectedJob.id,
        newDriftMs: 46,
        safeZoneStatus: 'SAFE_MARGIN_VERIFIED_78PX',
        status: 'VERIFIED_PASS',
      });
    }, 1200);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm mt-6">
      {/* Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-indigo)] font-mono">
              Regression QA & Video Test Bench
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              5-Point Algorithmic Guardrails
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] tracking-tight mt-0.5">
            Real-Time Video Output Verification & Auto-Remediation
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showSafeZone
                ? 'bg-[var(--color-indigo-subtle)] text-[var(--color-indigo)] border-[var(--color-indigo)]/30'
                : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Safe-Zone Overlay</span>
          </button>

          <button
            onClick={() => setShowDriftWaveform(!showDriftWaveform)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showDriftWaveform
                ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border-[var(--color-brand)]/30'
                : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]'
            }`}
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>Lip-Sync Telemetry</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Layout: Left Jobs Queue, Right Video Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Job Queue & Selection (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] font-mono uppercase px-1">
            <span>Video Render Runs ({jobs.length})</span>
            <span>QA Status</span>
          </div>

          <div className="flex flex-col gap-2">
            {jobs.map((job) => {
              const isSelected = job.id === selectedJob.id;
              const isFail = job.status === 'FAIL_DRIFT';
              const isPass = job.status === 'VERIFIED_PASS' || job.status === 'AUTO_FIXED';

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[var(--color-indigo)] bg-[var(--color-indigo-subtle)]/30 ring-2 ring-[var(--color-indigo)]/20 shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-panel)] hover:border-[var(--color-text-muted)]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)]">
                      {job.id} • {job.aspectRatio}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 ${
                        isFail
                          ? 'bg-[var(--color-danger-subtle)] text-[var(--color-danger)]'
                          : isPass
                          ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)]'
                          : 'bg-[var(--color-amber-subtle)] text-[var(--color-amber)]'
                      }`}
                    >
                      {job.status === 'FAIL_DRIFT'
                        ? 'DRIFT 380MS'
                        : job.status === 'AUTO_FIXED'
                        ? 'AUTO-FIXED'
                        : job.status === 'VERIFIED_PASS'
                        ? 'PASS'
                        : 'RENDERING'}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] mt-1 line-clamp-1">
                    {job.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mt-2 pt-2 border-t border-[var(--color-border-subtle)] font-mono">
                    <span>{job.platform}</span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{job.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Summary Banner */}
          <div className="mt-2 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] p-3 text-xs text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)] mb-1">
              <Cpu className="h-3.5 w-3.5 text-[var(--color-indigo)]" />
              <span>Automated QA Ingestion Engine</span>
            </div>
            <p className="leading-relaxed">
              Catches video render defects before they enter marketing funnels or waste ad spend.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Video Player & 5-Point QA Inspector (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Top Frame: Video Screen Simulator */}
          <div className="relative rounded-xl border border-[var(--color-border)] bg-slate-950 overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[340px] sm:min-h-[400px]">
            {/* Aspect Ratio Bounding Container */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 ${
                selectedJob.aspectRatio === '9:16'
                  ? 'w-[220px] sm:w-[260px] h-[340px] sm:h-[400px] border-x border-slate-800 bg-slate-900 shadow-2xl'
                  : 'w-full h-[260px] sm:h-[320px] bg-slate-900'
              }`}
            >
              {/* Simulated Video Canvas Rendering */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none">
                {/* Background video gradient simulation */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-indigo-950/40 opacity-90" />

                {/* Video Scene Content Simulation */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 shadow-lg">
                    <Tv className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                      {selectedJob.aspectRatio} Scene Render • Seed #{selectedJob.promptSeed}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white max-w-[280px] mt-1">
                      {selectedJob.sceneTitle}
                    </h3>
                  </div>
                </div>

                {/* Subtitle OCR Simulation Overlaid at Bottom */}
                <div
                  className={`absolute z-20 px-3 py-1.5 rounded bg-black/80 text-yellow-300 text-xs font-bold tracking-wide transition-all ${
                    selectedJob.status === 'FAIL_DRIFT'
                      ? 'bottom-[20px] ring-2 ring-red-500 animate-pulse'
                      : 'bottom-[76px] ring-1 ring-emerald-500/50'
                  }`}
                >
                  "Stop wasting 4 hours every afternoon waiting on renders..."
                  {selectedJob.status === 'FAIL_DRIFT' && (
                    <span className="block text-red-400 text-xs font-mono font-normal mt-0.5">
                      ⚠️ Overlap: Blocked by TikTok UI icons (Margin: 42px)
                    </span>
                  )}
                </div>

                {/* TikTok 9:16 Safe-Zone Overlay Elements (Simulated TikTok UI) */}
                {showSafeZone && selectedJob.aspectRatio === '9:16' && (
                  <div className="absolute inset-0 pointer-events-none z-15 border border-dashed border-cyan-400/40">
                    {/* Right-side TikTok buttons simulation */}
                    <div className="absolute right-2 bottom-16 flex flex-col gap-3 items-center opacity-60">
                      <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-red-400/60 flex items-center justify-center text-xs text-red-400 font-mono">
                        ❤️
                      </div>
                      <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-yellow-400/60 flex items-center justify-center text-xs text-yellow-400 font-mono">
                        💬
                      </div>
                      <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-blue-400/60 flex items-center justify-center text-xs text-blue-400 font-mono">
                        ↗️
                      </div>
                    </div>
                    {/* Bottom soundbar safe margin boundary */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-red-500/40 bg-red-500/5 flex items-center justify-center">
                      <span className="text-xs font-mono text-red-400 font-semibold">
                        Banned Subtitle Zone (Bottom 68px)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Scrubber and Media Control Bar */}
              <div className="absolute bottom-2 left-2 right-2 z-30 flex items-center justify-between rounded-lg bg-slate-900/90 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded hover:bg-slate-800 text-white"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                  <span>{selectedJob.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400">CFG {selectedJob.cfgScale}</span>
                  <span>•</span>
                  <span>{selectedJob.aspectRatio}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Point Automated QA Metric Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* 1. Lip Sync Drift */}
            <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                Lip-Sync Drift
              </span>
              <div className="mt-1">
                <span
                  className={`text-lg sm:text-xl font-bold font-mono ${
                    selectedJob.driftMs > 120 ? 'text-[var(--color-danger)]' : 'text-[var(--color-brand)]'
                  }`}
                >
                  {selectedJob.driftMs}ms
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono">
                  {selectedJob.driftMs > 120 ? 'Max: 120ms (FAIL)' : 'Within Spec (PASS)'}
                </span>
              </div>
            </div>

            {/* 2. Safe-Zone Margin */}
            <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                Safe Margin
              </span>
              <div className="mt-1">
                <span
                  className={`text-lg sm:text-xl font-bold font-mono ${
                    selectedJob.safeZoneMarginPx < 68 ? 'text-[var(--color-amber)]' : 'text-[var(--color-brand)]'
                  }`}
                >
                  {selectedJob.safeZoneMarginPx}px
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono">
                  {selectedJob.safeZoneMarginPx < 68 ? 'UI Overlap (WARN)' : 'Clear of UI (PASS)'}
                </span>
              </div>
            </div>

            {/* 3. Audio LUFS */}
            <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                Audio LUFS
              </span>
              <div className="mt-1">
                <span className="text-lg sm:text-xl font-bold font-mono text-[var(--color-brand)]">
                  {selectedJob.lufs}
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono">
                  Target: -14.0 ±0.5
                </span>
              </div>
            </div>

            {/* 4. Visual Artifacts */}
            <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                Artifact Score
              </span>
              <div className="mt-1">
                <span className="text-lg sm:text-xl font-bold font-mono text-[var(--color-brand)]">
                  {selectedJob.artifactScore}%
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono">
                  Zero Glitches (PASS)
                </span>
              </div>
            </div>

            {/* 5. Subtitle OCR */}
            <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col justify-between col-span-2 sm:col-span-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                OCR Contrast
              </span>
              <div className="mt-1">
                <span className="text-lg sm:text-xl font-bold font-mono text-[var(--color-brand)]">
                  {selectedJob.ocrContrastScore}%
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono">
                  WCAG AA Legible
                </span>
              </div>
            </div>
          </div>

          {/* Diagnostic Alert & One-Click Auto-Remedy Action Card */}
          {selectedJob.status === 'FAIL_DRIFT' && (
            <div className="rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-subtle)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <ShieldAlert className="h-5 w-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                      Regression Failure: Audio-Video Lip Drift & Safe-Zone Margin Breach
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                      {selectedJob.failureReason}
                    </p>
                    <div className="mt-2 text-xs font-mono font-medium text-[var(--color-danger)] bg-white/70 dark:bg-black/30 px-2.5 py-1 rounded-md border border-[var(--color-danger)]/20">
                      Remedy Plan: {selectedJob.remedyAction}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAutoRemedy}
                  disabled={isRemediating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--color-danger)] hover:opacity-90 text-white shadow-md transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
                >
                  <Wand2 className={`h-3.5 w-3.5 ${isRemediating ? 'animate-spin' : ''}`} />
                  <span>{isRemediating ? 'Applying Fix & Re-Rendering...' : '1-Click Auto-Remedy & Re-Queue'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Pass Status Card with Direct Funnel Publisher Action */}
          {(selectedJob.status === 'VERIFIED_PASS' || selectedJob.status === 'AUTO_FIXED') && (
            <div className="rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand-subtle)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <ShieldCheck className="h-5 w-5 text-[var(--color-brand)] shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                      Video QA Verified • 100% Quality & Compliance Cleared
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      Drift: {selectedJob.driftMs}ms • Safe Margin: {selectedJob.safeZoneMarginPx}px • LUFS: {selectedJob.lufs} • Ready for live deployment.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onPublishToFunnel(selectedJob)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white shadow-md transition-all whitespace-nowrap shrink-0"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Deploy to Landing Page & Stripe Funnel</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
