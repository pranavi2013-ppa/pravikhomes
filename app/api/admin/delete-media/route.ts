import { NextResponse } from "next/server"

export const runtime = "node"

export async function POST(req: Request) {
  const headerToken = req.headers.get("x-admin-token")
  const cookie = req.headers.get("cookie") || ""
  const adminToken = process.env.ADMIN_TOKEN
  const isAdmin = (cookie.includes(`admin_token=${adminToken}`) || (adminToken && headerToken === adminToken))
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { unitId, url } = await req.json()
  if (!unitId || !url) return NextResponse.json({ error: "Missing unitId or url" }, { status: 400 })

  const { Octokit } = await import("octokit")
  const owner = process.env.GITHUB_OWNER || "pranavi2013-ppa"
  const repo = process.env.GITHUB_REPO || "pravikhomes"
  const branch = process.env.GITHUB_BRANCH || "main"
  const token = process.env.GITHUB_TOKEN
  if (!token) return NextResponse.json({ error: "Server not configured (GITHUB_TOKEN)" }, { status: 500 })

  const octokit = new Octokit({ auth: token })
  const getRes = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", { owner, repo, path: "data/rentals.json", ref: branch })
  const sha = (getRes.data as any).sha
  const content = Buffer.from((getRes.data as any).content, "base64").toString("utf8")
  const data = JSON.parse(content)

  const updated = data.map((u: any) => (u.id === unitId ? { ...u, images: [...(u.images || []), url] } : u))
  const updatedStr = JSON.stringify(updated, null, 2)
  const updatedBase64 = Buffer.from(updatedStr, "utf8").toString("base64")

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path: "data/rentals.json",
    message: `Admin: add media for ${unitId}`,
    content: updatedBase64,
    sha,
    branch,
  })

  return NextResponse.json({ ok: true, url })
}
