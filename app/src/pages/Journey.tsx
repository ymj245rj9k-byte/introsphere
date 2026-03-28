import { useParams } from 'react-router-dom'

export function Journey() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Journey: {id}</h1>
        <p className="text-muted-foreground">
          Szczegóły journey będą tutaj
        </p>
      </div>
    </div>
  )
}
