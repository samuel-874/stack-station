import { NextRequest, NextResponse } from "next/server";

// Placeholder for BetterAuth Google OAuth start.
// In production, integrate BetterAuth to handle the OAuth flow.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const cb = url.searchParams.get("callbackUrl") || "/";
  // TODO: initiate Google OAuth with BetterAuth and redirect accordingly
  return NextResponse.redirect(cb);
}
