const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function request(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export const getPlaces = () => request('/places')

export const createPlace = (data: any) =>
  request('/places', {
    method: 'POST',
    body: JSON.stringify(data)
  })
