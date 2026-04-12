import { NextResponse } from "next/server";
import { mockAgents } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ agents: mockAgents });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    message: "Agent action received",
    data: body,
  });
}
