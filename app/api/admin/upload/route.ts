import { NextResponse } from "next/server"

export const runtime = "node"

export async function POST(req: Request) {
  const adminToken = process.env.ADMIN_TOKEN
  const headerToken = req.headers.get("x-admin-token")

  if (!adminToken || headerToken !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Temporarily disable uploads to avoid build/runtime issues while we
  // stabilize the deployment. This endpoint intentionally returns 501.
  return NextResponse.json(
    {
      error: "Uploads disabled",
      message:
        "Uploads are temporarily disabled on this deployment to prevent runtime/build failures. To re-enable uploads, set CLOUDINARY_* and GITHUB_TOKEN environment variables and ask me to re-enable the upload API.",
    },
    { status: 501 },
  )
}
