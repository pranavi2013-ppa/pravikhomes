"use client"
import { useState } from "react"

export default function AdminPage() {
  const [unitId, setUnitId] = useState("402")
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState("")

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    setStatus("Uploading...")
    const params = new URLSearchParams(window.location.search)
    const token = params.get("admin")
    if (!token) {
      setStatus("Admin token missing in URL (use ?admin=YOUR_TOKEN)")
      return
    }
    if (!file) {
      setStatus("Pick a file first")
      return
    }
    const form = new FormData()
    form.append("unitId", unitId)
    form.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
        headers: { "x-admin-token": token },
      })
      const body = await res.json()
      if (res.ok) {
        setStatus("Upload successful: " + (body.url || "updated"))
      } else {
        setStatus("Upload failed: " + (body.error || res.statusText))
      }
    } catch (err: any) {
      setStatus("Upload error: " + (err?.message || String(err)))
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin uploads</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <label className="block">
          <span className="text-sm">Unit id</span>
          <input
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
            className="mt-1 block w-full rounded-md border px-2 py-1"
          />
        </label>
        <label className="block">
          <span className="text-sm">File (image or mp4)</span>
          <input
            className="mt-1"
            type="file"
            accept="image/*,video/mp4"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <div>
          <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
            Upload
          </button>
        </div>
      </form>
      <p className="mt-4">{status}</p>
      <p className="mt-4 text-sm text-muted-foreground">
        Note: visit this page with ?admin=YOUR_ADMIN_TOKEN in the URL so the server route accepts your request.
      </p>
    </main>
  )
}
