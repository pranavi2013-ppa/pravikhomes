import { NextResponse } from "next/server"

export const runtime = "node"

async function fetchFromRepo(owner: string, repo: string, path: string, branch: string, token?: string) {
  // If there is no GitHub token available, read the local file directly (useful for local dev)
  if (!token) {
    const fs = await import("fs")
    const data = fs.readFileSync(`./data/${path}`, "utf8")
    return JSON.parse(data)
  }

  // Use Octokit only when a token is present — import dynamically so Next.js doesn't try to bundle it at build time
  const { Octokit } = await import("octokit")
  const octokit = new Octokit({ auth: token })
  const res = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", { owner, repo, path: `data/${path}`, ref: branch })
  const content = (res.data as any).content
  const decoded = Buffer.from(content, "base64").toString("utf8")
  return JSON.parse(decoded)
}

export async function GET(req: Request) {
  const owner = process.env.GITHUB_OWNER || "pranavi2013-ppa"
  const repo = process.env.GITHUB_REPO || "pravikhomes"
  const branch = process.env.GITHUB_BRANCH || "main"
  const token = process.env.GITHUB_TOKEN

  let rentals
  try {
    rentals = await fetchFromRepo(owner, repo, "rentals.json", branch, token)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }

  // Determine admin access from cookie or header
  const cookie = req.headers.get("cookie") || ""
  const headerToken = req.headers.get("x-admin-token")
  const adminToken = process.env.ADMIN_TOKEN
  const isAdmin = (cookie.includes(`admin_token=${adminToken}`) || (adminToken && headerToken === adminToken))

  const visible = isAdmin ? rentals : rentals.filter((r: any) => r.status === "available")

  return NextResponse.json(visible)
}
