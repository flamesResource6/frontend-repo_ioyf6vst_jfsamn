import React, { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Filters, { type FiltersState } from './components/Filters'
import PropertyCard, { type Property } from './components/PropertyCard'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [filters, setFilters] = useState<FiltersState>({
    q: '',
    min_price: undefined,
    max_price: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    city: '',
    state: '',
    property_type: ''
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Property[]>([])
  const [error, setError] = useState<string | null>(null)

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (filters.q) params.set('q', filters.q)
    if (filters.min_price != null) params.set('min_price', String(filters.min_price))
    if (filters.max_price != null) params.set('max_price', String(filters.max_price))
    if (filters.bedrooms != null) params.set('bedrooms', String(filters.bedrooms))
    if (filters.bathrooms != null) params.set('bathrooms', String(filters.bathrooms))
    if (filters.city) params.set('city', filters.city)
    if (filters.state) params.set('state', filters.state)
    if (filters.property_type) params.set('property_type', filters.property_type)
    params.set('status', 'sale')
    return params.toString()
  }, [filters])

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${backend}/properties?${query}`)
      if (!res.ok) throw new Error('Failed to load properties')
      const json = await res.json()
      setData(json)
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <Hero />
      <Filters value={filters} onChange={setFilters} onSearch={load} />

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white/90">Properties for sale</h2>
          {loading ? <div className="text-sm text-white/60">Loading…</div> : <div className="text-sm text-white/60">{data.length} results</div>}
        </div>

        {error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <PropertyCard key={p.id} data={p} />
            ))}
          </div>
        )}
      </section>

      <footer className="mx-auto mt-16 max-w-6xl px-6 pb-12 text-xs text-white/50">
        Pricing shown in currency provided by the listing. Always verify details with the seller or agent.
      </footer>
    </div>
  )
}

export default App
