'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { WorkflowCanvas } from '@/components/WorkflowCanvas';
import { VideoQaWorkbench, VideoJob } from '@/components/VideoQaWorkbench';
import { FunnelStripePreview } from '@/components/FunnelStripePreview';
import { ExecutionLogDrawer, LogEntry } from '@/components/ExecutionLogDrawer';
import { AiVslGeneratorModal } from '@/components/AiVslGeneratorModal';
import { BlueprintExporter } from '@/components/BlueprintExporter';
import { Footer } from '@/components/Footer';
import {
  TrendingUp,
  ShieldCheck,
  Clock,
  DollarSign,
  Zap,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
} from 'lucide-react';

export default function Page() {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [selectedStep, setSelectedStep] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [generatorOpen, setGeneratorOpen] = useState<boolean>(false);
  const [exporterOpen, setExporterOpen] = useState<boolean>(false);
  const [logsOpen, setLogsOpen] = useState<boolean>(false);

  const [activeFunnelJob, setActiveFunnelJob] = useState<VideoJob>({
    id: 'job-vsl-101',
    title: 'AI Trading Bot VSL — Scene 2 (Pattern Interrupt)',
    aspectRatio: '9:16',
    platform: 'TikTok / Reels',
    duration: '00:04.50',
    status: 'VERIFIED_PASS',
    driftMs: 46,
    safeZoneMarginPx: 78,
    lufs: -14.0,
    artifactScore: 97.4,
    ocrContrastScore: 92,
    sceneTitle: 'High-Velocity Trading Cockpit with Animated PnL Chart',
    promptSeed: 8492041,
    cfgScale: 7.0,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'log-1',
      timestamp: '07:12:01.094',
      event: 'PIPELINE_DISPATCH',
      category: 'PIPELINE',
      meta: { niche: 'AI Trading Copilot', format: '9:16 Vertical Safe', scenes: 3 },
    },
    {
      id: 'log-2',
      timestamp: '07:12:01.810',
      event: 'LLM_SCENE_SYNTHESIS',
      category: 'PIPELINE',
      meta: { provider: 'OpenAI gpt-4o-mini', latencyMs: 82, promptsGenerated: 3 },
    },
    {
      id: 'log-3',
      timestamp: '07:12:02.140',
      event: 'ELEVENLABS_TTS_NORMALIZED',
      category: 'PIPELINE',
      meta: { lufs: -14.1, sampleRate: '44.1kHz', durationSec: 4.5 },
    },
    {
      id: 'log-4',
      timestamp: '07:12:03.560',
      event: 'RUNWAY_WEBHOOK_RECEIVED',
      category: 'WEBHOOK',
      meta: { jobId: 'job-vsl-101', status: 'render.completed', renderTimeMs: 1420 },
    },
    {
      id: 'log-5',
      timestamp: '07:12:04.012',
      event: 'QA_INSPECTION_AUDIT',
      category: 'QA_GATE',
      meta: { driftOffsetMs: 380, safeZoneMarginPx: 42, verdict: 'FAIL_DRIFT' },
    },
  ]);

  const addLog = (event: string, meta?: any) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(
      now.getMilliseconds()
    ).padStart(3, '0')}`;

    let category: LogEntry['category'] = 'PIPELINE';
    if (event.includes('WEBHOOK')) category = 'WEBHOOK';
    else if (event.includes('QA') || event.includes('REMEDIATION')) category = 'QA_GATE';
    else if (event.includes('STRIPE')) category = 'STRIPE';

    setLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: timeStr,
        event,
        category,
        meta,
      },
      ...prev,
    ]);
  };

  const handleSimulatePipeline = () => {
    setIsSimulating(true);
    setActiveStep(1);
    setSelectedStep(1);
    addLog('FULL_PIPELINE_TEST_INITIATED', { initiator: 'Developer Cockpit' });

    setTimeout(() => {
      setActiveStep(2);
      setSelectedStep(2);
      addLog('STEP_2_TTS_VOICE_COMPLETED', { provider: 'ElevenLabs', lufs: -14.0 });

      setTimeout(() => {
        setActiveStep(3);
        setSelectedStep(3);
        addLog('STEP_3_VIDEO_RENDER_POLLER', { provider: 'Runway Gen-3', renderTime: '1,420ms' });

        setTimeout(() => {
          setActiveStep(4);
          setSelectedStep(4);
          addLog('STEP_4_QA_REGRESSION_GATE_PASSED', { driftMs: 44, safeMarginPx: 78 });

          setTimeout(() => {
            setActiveStep(5);
            setSelectedStep(5);
            setIsSimulating(false);
            addLog('STEP_5_STRIPE_FUNNEL_PUBLISHED', {
              endpoint: '/api/stripe/checkout',
              checkoutActive: true,
            });
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Sticky Header */}
      <Header
        onOpenGenerator={() => setGeneratorOpen(true)}
        onOpenExporter={() => setExporterOpen(true)}
        onToggleLogs={() => setLogsOpen(!logsOpen)}
        logsOpen={logsOpen}
        onSimulatePipeline={handleSimulatePipeline}
        isSimulating={isSimulating}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-0 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Bento KPI Performance Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* KPI 1 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] uppercase">
                <span>Render Success Rate</span>
                <ShieldCheck className="h-4 w-4 text-[var(--color-brand)]" />
              </div>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                  99.98%
                </span>
                <span className="block text-xs text-[var(--color-brand)] font-mono mt-0.5">
                  184 / 184 passing runs
                </span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] uppercase">
                <span>Avg Lip-Sync Offset</span>
                <Clock className="h-4 w-4 text-[var(--color-indigo)]" />
              </div>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-brand)]">
                  42ms
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                  Tolerance: &lt;120ms (Pass)
                </span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] uppercase">
                <span>Safe-Zone Bounding</span>
                <Layers className="h-4 w-4 text-[var(--color-brand)]" />
              </div>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                  100%
                </span>
                <span className="block text-xs text-[var(--color-brand)] font-mono mt-0.5">
                  Zero Subtitle Clippings
                </span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] uppercase">
                <span>Unit Run Cost</span>
                <DollarSign className="h-4 w-4 text-[var(--color-brand)]" />
              </div>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                  $0.041
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                  LLM + TTS per 15s VSL
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Visual Pipeline Topology */}
          <WorkflowCanvas
            activeStep={activeStep}
            isSimulating={isSimulating}
            onSelectStep={(s) => setSelectedStep(s)}
            selectedStep={selectedStep}
          />

          {/* Section 2: Video QA & Regression Workbench */}
          <VideoQaWorkbench
            onPublishToFunnel={(job) => {
              setActiveFunnelJob(job);
              addLog('FUNNEL_PREVIEW_ATTACHED', { jobId: job.id, title: job.title });
            }}
            onLogEvent={addLog}
          />

          {/* Section 3: Live Funnel & Stripe Checkout Preview */}
          <FunnelStripePreview job={activeFunnelJob} onLogEvent={addLog} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Slideout Modals & Trays */}
      <AiVslGeneratorModal
        isOpen={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        onLogEvent={addLog}
      />

      <BlueprintExporter
        isOpen={exporterOpen}
        onClose={() => setExporterOpen(false)}
      />

      {/* Collapsible Execution Log Drawer */}
      <ExecutionLogDrawer
        isOpen={logsOpen}
        onToggle={() => setLogsOpen(!logsOpen)}
        logs={logs}
        onClearLogs={() => setLogs([])}
      />
    </div>
  );
}
