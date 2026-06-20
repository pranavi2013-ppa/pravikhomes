"use client"
import { useEffect, useState } from "react"

export default function AdminPage() {
  const [token, setToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [rentals, setRentals] = useState<any[]>([])
  const [status, setStatus] = useState("")

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/rentals", { credentials: "include" })
      if (res.ok) {
        const json = await res.json()
        setRentals(json)
      }
    }
    load()
  }, [loggedIn])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setStatus("Logging in...")
    const res = await fetch("/api/admin/login", { method: "POST", body: JSON.stringify({ token }), headers: { "content-type": "application/json" }, credentials: "include" })
    if (res.ok) {
      setLoggedIn(true)
      setStatus("Logged in")
    } else {
      setStatus("Login failed")
    }
  }

  async function handleFile(unitId: string, file: File | null) {
    if (!file) return
    setStatus("Uploading to Cloudinary...")
    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "")
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body: form })
    const json = await res.json()
    if (!json.secure_url) {
      setStatus("Cloudinary upload failed")
      return
    }
    const publicUrl = json.secure_url
    setStatus("Registering media...")
    const reg = await fetch("/api/admin/register-media", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ unitId, url: publicUrl }), credentials: "include" })
    if (reg.ok) {
      setStatus("Media attached")
      setRentals((r) => r.map((u) => (u.id === unitId ? { ...u, images: [...u.images, publicUrl] } : u)))
    } else {
      const err = await reg.json()
      setStatus("Register failed: " + (err.error || reg.statusText))
    }
  }

  if (!loggedIn) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin login</h1>
        <form onSubmit={login} className="space-y-4">
          <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Admin token" className="border px-2 py-1 rounded w-full" />
          <button className="rounded bg-primary px-4 py-2 text-white">Login</button>
        </form>
        <p className="mt-4">{status}</p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin — Manage media</h1>
      <p className="mb-4">{status}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rentals.map((r) => (
          <div key={r.id} className="border p-3 rounded">
            <h2 className="font-medium">{r.name} ({r.id})</h2>
            <p className="text-sm text-muted-foreground">{r.status}</p>
            <div className="mt-2">
              <input type="file" accept="image/*,video/mp4" onChange={(e) => handleFile(r.id, e.target.files?.[0] ?? null)} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(r.images || []).map((img: string) => (
                <div key={img}>
                  <img src={img} alt="media" className="w-full h-24 object-cover rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
