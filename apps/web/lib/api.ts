const API = process.env.NEXT_PUBLIC_API_URL!

export async function getPlaces() {
  const res = await fetch(`${API}/places`, { cache: 'no-store' })
  return res.json()
}

export async function createPlace(data: any) {
  const res = await fetch(`${API}/places`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
