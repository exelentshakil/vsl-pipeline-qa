'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Video,
  Play,
  Sun,
  Moon,
  Terminal,
  FileCode,
  ShieldCheck,
  Zap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  onOpenGenerator: () => void;
  onOpenExporter: () => void;
  onToggleLogs: () => void;
  logsOpen: boolean;
  onSimulatePipeline: () => void;
  isSimulating: boolean;
}

export function Header({
  onOpenGenerator,
  onOpenExporter,
  onToggleLogs,
  logsOpen,
  onSimulatePipeline,
  isSimulating,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur-md px-0 py-3 sm:py-3.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Workspace & Branding */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-indigo)] text-white shadow-sm">
              <Video className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight">
                  VSL Studio QA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
                  99.98% Pipeline SLA
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono truncate">
                <span>Enterprise Marketing Automation</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline text-[var(--color-text-secondary)]">Runway • Kling • ElevenLabs • Stripe</span>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onSimulatePipeline}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white shadow-sm transition-all whitespace-nowrap disabled:opacity-50"
            >
              <Play className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Testing Pipeline...' : 'Run Pipeline QA'}</span>
            </button>

            <button
              onClick={onOpenGenerator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-indigo)] hover:opacity-90 text-white shadow-sm transition-all whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>New VSL Prompt</span>
            </button>

            <button
              onClick={onOpenExporter}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] border border-[var(--color-border)] transition-all whitespace-nowrap"
              title="Download Python video worker and Stripe route blueprints"
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>Blueprints</span>
            </button>

            <button
              onClick={onToggleLogs}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border ${
                logsOpen
                  ? 'bg-[var(--color-indigo-subtle)] text-[var(--color-indigo)] border-[var(--color-indigo)]/30'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-border)]'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Telemetry</span>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
