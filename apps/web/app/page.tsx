import { getPlaces } from '@/lib/api'

export default async function Home() {
  const places = await getPlaces()
  return (
    <div>
      <h1>Urbano SaaS</h1>
      {places.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  )
}
