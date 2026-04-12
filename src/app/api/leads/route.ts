import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let leads = [...mockLeads];

  if (status && status !== "all") {
    leads = leads.filter((l) => l.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.first_name.toLowerCase().includes(q) ||
        l.last_name.toLowerCase().includes(q) ||
        l.company_name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ leads, total: leads.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, lead: body });
}
