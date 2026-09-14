import { NextResponse } from 'next/server';
import { diagnoseVideoError } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { issueType, runDetails } = body;

    const result = await diagnoseVideoError({
      issueType: issueType || 'DRIFT_DESYNC',
      runDetails: runDetails || {},
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/diagnose:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to diagnose video error' },
      { status: 500 }
    );
  }
}
