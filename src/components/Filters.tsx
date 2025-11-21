import React, { useEffect, useState } from 'react'

export type FiltersState = {
  q: string
  min_price?: number
  max_price?: number
  bedrooms?: number
  bathrooms?: number
  city: string
  state: string
  property_type: string
}

const Filters: React.FC<{
  value: FiltersState
  onChange: (next: FiltersState) => void
  onSearch: () => void
}> = ({ value, onChange, onSearch }) => {
  const [local, setLocal] = useState<FiltersState>(value)

  useEffect(() => setLocal(value), [value])

  const update = (patch: Partial<FiltersState>) => {
    const next = { ...local, ...patch }
    setLocal(next)
    onChange(next)
  }

  return (
    <div className="mx-auto -mt-16 w-[94%] max-w-6xl rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 md:p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        <input
          className="col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="Search keyword (city, address, title)"
          value={local.q}
          onChange={(e) => update({ q: e.target.value })}
        />
        <input
          type="number"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="Min price"
          value={local.min_price ?? ''}
          onChange={(e) => update({ min_price: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input
          type="number"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="Max price"
          value={local.max_price ?? ''}
          onChange={(e) => update({ max_price: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input
          type="number"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="Bedrooms"
          value={local.bedrooms ?? ''}
          onChange={(e) => update({ bedrooms: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input
          type="number"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="Bathrooms"
          value={local.bathrooms ?? ''}
          onChange={(e) => update({ bathrooms: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="City"
          value={local.city}
          onChange={(e) => update({ city: e.target.value })}
        />
        <input
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          placeholder="State/Region"
          value={local.state}
          onChange={(e) => update({ state: e.target.value })}
        />
        <select
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          value={local.property_type}
          onChange={(e) => update({ property_type: e.target.value })}
        >
          <option value="">Any type</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="land">Land</option>
        </select>
        <button
          onClick={onSearch}
          className="col-span-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 md:col-span-1"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Filters
