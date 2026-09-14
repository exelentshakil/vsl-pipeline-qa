'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Clapperboard,
  Mic,
  Video,
  Layers,
  Zap,
  CheckCircle2,
  Copy,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AiVslGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogEvent: (event: string, meta?: any) => void;
}

export function AiVslGeneratorModal({
  isOpen,
  onClose,
  onLogEvent,
}: AiVslGeneratorModalProps) {
  const [niche, setNiche] = useState<string>('AI Cold Outreach & Automated Lead Gen');
  const [targetAudience, setTargetAudience] = useState<string>('B2B Founders & Sales Leaders');
  const [format, setFormat] = useState<'9:16' | '16:9'>('9:16');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setResult(null);

    onLogEvent('AI_VSL_GENERATION_STARTED', { niche, targetAudience, format });

    try {
      const res = await fetch('/api/ai/vsl-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, targetAudience, format }),
      });

      if (!res.ok) throw new Error('Generation failed');
      const data = await res.json();
      setResult(data);

      onLogEvent('AI_VSL_GENERATION_COMPLETED', {
        provider: data?.aiMetadata?.provider,
        model: data?.aiMetadata?.model,
        latencyMs: data?.aiMetadata?.latencyMs,
        scenesGenerated: data?.scenes?.length || 0,
      });
    } catch (err: any) {
      console.error('Error generating VSL:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
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
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              AI Video Pipeline & VSL Prompt Architect
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono">
              Generates scene-by-scene Runway/Kling visual prompts & ElevenLabs audio
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                Campaign Niche / Product
              </label>
              <input
                type="text"
                required
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. AI Marketing Automation, Real Estate, E-com"
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-indigo)]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                Target Audience
              </label>
              <input
                type="text"
                required
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Growth Marketers, Media Buyers"
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-indigo)]"
              />
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
              Output Aspect Ratio:
            </span>
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
              <button
                type="button"
                onClick={() => setFormat('9:16')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  format === '9:16'
                    ? 'bg-[var(--color-panel)] text-[var(--color-indigo)] shadow-xs border border-[var(--color-border)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                9:16 (TikTok / Reels)
              </button>
              <button
                type="button"
                onClick={() => setFormat('16:9')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  format === '16:9'
                    ? 'bg-[var(--color-panel)] text-[var(--color-indigo)] shadow-xs border border-[var(--color-border)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                16:9 (YouTube / VSL)
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[var(--color-indigo)] hover:opacity-90 text-white shadow-md transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Multi-Scene VSL Pipeline...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate Video Pipeline Package</span>
              </>
            )}
          </button>
        </form>

        {/* Results Display */}
        {result && (
          <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex flex-col gap-4">
            {/* Telemetry Badge */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] text-xs font-mono">
              <span className="text-[var(--color-brand)] font-semibold">
                ● Live AI Response: {result.aiMetadata?.provider} ({result.aiMetadata?.model})
              </span>
              <span className="text-[var(--color-text-muted)]">
                Latency: {result.aiMetadata?.latencyMs}ms
              </span>
            </div>

            {/* Campaign Summary */}
            <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
              <span className="text-xs font-mono font-semibold text-[var(--color-indigo)] uppercase">
                Campaign Concept
              </span>
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                {result.campaignTitle}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                <strong>Primary Hook:</strong> "{result.primaryHook}"
              </p>
            </div>

            {/* 3 Scenes Preview */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[var(--color-text-muted)] font-mono uppercase">
                Generated Scenes & Video Generation API Payloads ({result.scenes?.length || 0})
              </span>

              {(result.scenes || []).map((scene: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[var(--color-indigo)]">
                      Scene {scene.sceneNumber} • {scene.durationSec}s • {scene.safeZoneCompliance}
                    </span>
                    <button
                      onClick={() => copyPrompt(scene.visualPrompt, idx)}
                      className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] font-mono"
                    >
                      {copiedIndex === idx ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy Prompt'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed bg-[var(--color-panel-subtle)] p-2 rounded-lg border border-[var(--color-border-subtle)] font-mono">
                    <strong className="text-[var(--color-text-primary)]">Runway Gen-3 Prompt:</strong> {scene.visualPrompt}
                  </div>

                  <div className="text-xs text-[var(--color-text-secondary)]">
                    <strong className="text-[var(--color-text-primary)]">ElevenLabs Voiceover:</strong> "{scene.voiceoverScript}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
