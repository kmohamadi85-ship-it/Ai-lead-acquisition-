import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ campaigns: mockCampaigns });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, campaign: body });
}
