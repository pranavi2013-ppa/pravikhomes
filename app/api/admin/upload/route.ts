import { NextResponse } from "next/server"
import formidable from "formidable"
import fs from "fs"
import { Octokit } from "octokit"
import { v2 as cloudinary } from "cloudinary"

export const runtime = "node"

export async function POST(req: Request) {
  const adminToken = process.env.ADMIN_TOKEN
  const headerToken = req.headers.get("x-admin-token")
  if (!adminToken || headerToken !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // parse multipart
  const form = new formidable.IncomingForm()
  const parsed: any = await new Promise((res, rej) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) return rej(err)
      res({ fields, files })
    })
  })

  const unitId = parsed.fields.unitId as string
  const file = parsed.files.file
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  // Upload to Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  })

  const uploadResult: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "pravik" }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
    fs.createReadStream(file.filepath).pipe(stream)
  })

  const publicUrl = uploadResult.secure_url

  // Now update the repo file (lib/rentals.ts) to add the new url to the rental's images array
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const owner = process.env.GITHUB_OWNER || "pranavi2013-ppa"
  const repo = process.env.GITHUB_REPO || "pravikhomes"
  const path = "lib/rentals.ts"
  const branch = process.env.GITHUB_BRANCH || "main"

  // 1) fetch the file so we can edit its content
  const contents = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", { owner, repo, path, ref: branch })
  const fileSha = (contents.data as any).sha
  const decoded = Buffer.from((contents.data as any).content, "base64").toString("utf8")

  // 2) Naively append the URL into the images array for the matching id
  const updated = decoded.replace(
    new RegExp(`(id:\s*"${unitId}"[\\s\\S]*?images:\s*\[)([\\s\\S]*?)(\])`),
    (_m, p1, p2, p3) => {
      if (p2.includes(publicUrl)) return p1 + p2 + p3
      const newList = p2.trim() ? p2 + `, "${publicUrl}"` : ` "${publicUrl}"`
      return p1 + newList + p3
    }
  )

  const updatedBase64 = Buffer.from(updated, "utf8").toString("base64")

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path,
    message: `Admin upload: add media to ${unitId}`,
    content: updatedBase64,
    sha: fileSha,
    branch,
  })

  return NextResponse.json({ url: publicUrl })
}
