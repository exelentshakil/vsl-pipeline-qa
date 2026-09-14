'use client';

import React, { useState } from 'react';
import {
  Terminal,
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle2,
  Trash2,
  Code,
  Zap,
} from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  category: 'PIPELINE' | 'WEBHOOK' | 'QA_GATE' | 'STRIPE';
  meta?: any;
}

interface ExecutionLogDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  logs: LogEntry[];
  onClearLogs: () => void;
}

export function ExecutionLogDrawer({
  isOpen,
  onToggle,
  logs,
  onClearLogs,
}: ExecutionLogDrawerProps) {
  const [filter, setFilter] = useState<'ALL' | 'WEBHOOK' | 'QA_GATE' | 'STRIPE'>('ALL');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredLogs = logs.filter((l) => {
    if (filter === 'ALL') return true;
    return l.category === filter;
  });

  const copyCurl = () => {
    const curl = `curl -X POST https://vsl-pipeline-qa.vercel.app/api/webhooks/video-render \\
  -H "Content-Type: application/json" \\
  -H "X-Runway-Signature: sha256=9f82..." \\
  -d '{"event":"render.completed","jobId":"job-vsl-101","durationMs":4500,"driftOffsetMs":42}'`;
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur-md shadow-2xl transition-all duration-300">
      {/* Minimized / Header Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggle}
              className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] font-mono hover:text-[var(--color-indigo)]"
            >
              <Terminal className="h-4 w-4 text-[var(--color-indigo)]" />
              <span>Live Execution & Webhook Telemetry</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-normal">
                {logs.length} Events
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyCurl}
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)]"
              title="Copy cURL command to simulate video webhook"
            >
              {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Code className="h-3 w-3" />}
              <span>{copied ? 'Copied' : 'Copy cURL'}</span>
            </button>

            <button
              onClick={onToggle}
              className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]"
            >
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Logs Panel */}
      {isOpen && (
        <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            {/* Filter Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-subtle)] text-xs">
              <div className="flex items-center gap-1">
                {(['ALL', 'WEBHOOK', 'QA_GATE', 'STRIPE'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-2.5 py-1 rounded font-mono font-semibold transition-all ${
                      filter === cat
                        ? 'bg-[var(--color-indigo)] text-white'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={onClearLogs}
                className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] font-mono"
              >
                <Trash2 className="h-3 w-3" />
                <span>Clear</span>
              </button>
            </div>

            {/* Terminal Output Area */}
            <div className="mt-2 h-48 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-slate-950 p-3 font-mono text-xs text-slate-300 flex flex-col gap-1.5 shadow-inner">
              {filteredLogs.length === 0 ? (
                <div className="text-slate-500 py-8 text-center">No telemetry events logged yet.</div>
              ) : (
                filteredLogs.map((log) => {
                  const isFail = log.event.includes('FAIL') || log.event.includes('ERROR');
                  const isPass = log.event.includes('PASS') || log.event.includes('SUCCESS') || log.event.includes('COMPLETED');
                  const isStripe = log.category === 'STRIPE';

                  return (
                    <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
                      <span
                        className={`font-semibold shrink-0 ${
                          isFail
                            ? 'text-red-400'
                            : isPass
                            ? 'text-emerald-400'
                            : isStripe
                            ? 'text-indigo-400'
                            : 'text-cyan-400'
                        }`}
                      >
                        {log.event}:
                      </span>
                      <span className="text-slate-300 break-all">
                        {log.meta ? JSON.stringify(log.meta) : 'Dispatched successfully'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
