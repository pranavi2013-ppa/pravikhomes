import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  const body = await req.json()
  const token = body.token
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  // set HTTP-only cookie
  res.headers.set("Set-Cookie", `admin_token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`)
  return res
}
