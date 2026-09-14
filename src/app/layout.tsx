import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'VSL Studio QA — Autonomous AI Video Pipeline & Regression Engine',
  description:
    'Production-grade video generation pipeline, algorithmic lip-sync drift detection, safe-zone OCR enforcement, and turnkey Stripe funnel deployment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Centralized zero-overhead traffic tracker */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=vsl-pipeline-qa"
          alt=""
          width={1}
          height={1}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
      </body>
    </html>
  );
}
