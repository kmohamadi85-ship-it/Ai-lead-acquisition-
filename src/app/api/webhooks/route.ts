import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { type, data } = body;

  switch (type) {
    case "email.replied":
      console.log("Email reply received:", data);
      break;
    case "meeting.booked":
      console.log("Meeting booked:", data);
      break;
    case "lead.created":
      console.log("New lead created:", data);
      break;
    default:
      console.log("Unknown webhook type:", type);
  }

  return NextResponse.json({ received: true });
}
