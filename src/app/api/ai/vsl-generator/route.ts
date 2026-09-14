import { NextResponse } from 'next/server';
import { generateVslCampaign } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { niche, targetAudience, format, productGoal } = body;

    const result = await generateVslCampaign({
      niche: niche || 'AI Marketing Automation & Video Funnels',
      targetAudience,
      format: format || '9:16',
      productGoal,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/vsl-generator:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate VSL pipeline' },
      { status: 500 }
    );
  }
}
