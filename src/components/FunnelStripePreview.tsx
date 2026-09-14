'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Sparkles,
  Play,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  X,
  AlertCircle,
} from 'lucide-react';
import { VideoJob } from './VideoQaWorkbench';

interface FunnelStripePreviewProps {
  job: VideoJob;
  onLogEvent: (event: string, meta?: any) => void;
}

export function FunnelStripePreview({ job, onLogEvent }: FunnelStripePreviewProps) {
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('123');
  const [customerEmail, setCustomerEmail] = useState<string>('growth@agency.com');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const priceAmount = job.aspectRatio === '9:16' ? 97 : 149;
  const productName = `${job.title.split('—')[0].trim()} Access License`;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    onLogEvent('STRIPE_CHECKOUT_SESSION_INITIATED', {
      amount: priceAmount * 100,
      currency: 'usd',
      email: customerEmail,
      product: productName,
    });

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      onLogEvent('STRIPE_CHECKOUT_SESSION_COMPLETED', {
        id: `cs_test_${Math.random().toString(36).substring(2, 11)}`,
        paymentIntent: `pi_${Math.random().toString(36).substring(2, 14)}`,
        customer: customerEmail,
        amountTotal: priceAmount,
        status: 'paid',
      });
    }, 1200);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm mt-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] font-mono">
              Live Funnel & Stripe Checkout Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-indigo-subtle)] text-[var(--color-indigo)] border border-[var(--color-indigo)]/20">
              Turnkey Revenue Bridge
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] tracking-tight mt-0.5">
            Verified VSL Embedded in High-Converting Landing Page
          </h2>
        </div>

        <button
          onClick={() => {
            setPaymentSuccess(false);
            setShowCheckoutModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--color-indigo)] hover:opacity-90 text-white shadow-md transition-all whitespace-nowrap"
        >
          <CreditCard className="h-3.5 w-3.5" />
          <span>Test Stripe Checkout Modal</span>
        </button>
      </div>

      {/* Landing Page Preview Container */}
      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-8 shadow-xs">
        {/* Mock Browser Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)] mb-6 text-xs text-[var(--color-text-muted)] font-mono">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 px-3 py-1 rounded bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
              https://vsl-funnel.live/c/{job.id}
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[var(--color-brand)]">
            <Lock className="h-3 w-3" /> SSL Secured • Stripe API v2024
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20 mb-3">
            <Sparkles className="h-3 w-3" />
            <span>High-Converting Video Sales Funnel</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
            Stop Wasting Engineering Hours on Manual Video Testing
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 max-w-xl mx-auto leading-relaxed">
            Automate video generation QA, eliminate audio drift, and publish high-converting ad funnels with instant Stripe payment collection.
          </p>

          {/* Embedded Video Box */}
          <div className="mt-6 mx-auto rounded-xl border border-[var(--color-border)] bg-slate-950 p-4 shadow-xl max-w-xl">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 shadow-lg">
                  <Play className="h-6 w-6 ml-0.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-white">
                  {job.title} ({job.aspectRatio})
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  QA Status: {job.status} • Duration: {job.duration}
                </span>
              </div>
            </div>
          </div>

          {/* CTA & Stripe Pricing Block */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setPaymentSuccess(false);
                setShowCheckoutModal(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white shadow-lg transition-all"
            >
              <span>Get Instant Access (${priceAmount})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              ⚡ Instant Digital Delivery • 30-Day Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Stripe Checkout Modal Simulator */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content */}
            {!paymentSuccess ? (
              <form onSubmit={handlePay} className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-indigo)] text-white shadow-sm">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                      Stripe Test Checkout
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] font-mono">
                      Pay ${priceAmount}.00 USD to {productName}
                    </p>
                  </div>
                </div>

                {/* Test Card Quick Fill Banner */}
                <div className="rounded-lg bg-[var(--color-indigo-subtle)]/60 border border-[var(--color-indigo)]/20 p-2.5 text-xs text-[var(--color-indigo)] flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>
                    Stripe Test Mode active. Test Card <strong>4242...</strong> is pre-filled for immediate webhook simulation.
                  </span>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-indigo)]"
                  />
                </div>

                {/* Card Number Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Card Information
                  </label>
                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2.5 flex flex-col gap-2">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-transparent text-xs font-mono text-[var(--color-text-primary)] focus:outline-hidden"
                    />
                    <div className="flex items-center gap-4 pt-2 border-t border-[var(--color-border-subtle)] text-xs font-mono">
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-16 bg-transparent text-[var(--color-text-primary)] focus:outline-hidden"
                      />
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-16 bg-transparent text-[var(--color-text-primary)] focus:outline-hidden"
                      />
                      <span className="text-[var(--color-text-muted)] ml-auto">33065 (FL)</span>
                    </div>
                  </div>
                </div>

                {/* Submit Pay Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white shadow-md transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming with Stripe API...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      <span>Pay ${priceAmount}.00 USD</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-4 gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  Payment Succeeded ($ {priceAmount}.00)
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono">
                  Event <code>stripe.checkout.session.completed</code> dispatched to webhook log.
                </p>
                <div className="w-full p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] text-xs font-mono text-left text-[var(--color-text-muted)] mt-2">
                  <div>Status: 200 OK</div>
                  <div>Customer: {customerEmail}</div>
                  <div>Receipt: Sent via Stripe Mail</div>
                </div>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-full mt-2 py-2 rounded-lg text-xs font-bold bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] border border-[var(--color-border)] transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
