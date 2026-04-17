import { getPlaces } from '../lib/api'

export default async function Page() {
  const places = await getPlaces()

  return (
    <div>
      <h1>Places</h1>
      {places.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  )
}
