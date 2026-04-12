import { NextResponse } from "next/server";
import { mockWorkflows } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ workflows: mockWorkflows });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, workflow: body });
}
