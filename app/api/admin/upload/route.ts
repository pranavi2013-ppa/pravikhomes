export const runtime = "node"

export async function POST() {
  // This route was disabled/removed to avoid build-time module resolution errors.
  // It intentionally returns 404 to ensure the app build doesn't try to resolve
  // server-only dependencies from an unused upload handler.
  return new Response("Not Found", { status: 404 })
}
