import React from 'react'

export type Property = {
  id: string
  title: string
  status: string
  price: number
  currency: string
  address: string
  city: string
  state?: string
  country: string
  bedrooms: number
  bathrooms: number
  property_type: string
  area_sqft?: number
  lot_size_sqft?: number
  year_built?: number
  parking_spaces?: number
  hoa_fee?: number
  description?: string
  images: string[]
  features: string[]
}

const currency = (code: string, amount: number) => {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(amount)
  } catch {
    return `$${amount.toLocaleString()}`
  }
}

const PropertyCard: React.FC<{ data: Property }> = ({ data }) => {
  const image = data.images?.[0] || `https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop`
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition hover:shadow-emerald-500/10">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img src={image} alt={data.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <div className="absolute left-3 top-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-slate-950">
          For {data.status}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-base font-semibold text-white">{data.title}</h3>
          <div className="text-sm font-semibold text-emerald-400">{currency(data.currency, data.price)}</div>
        </div>
        <div className="text-sm text-white/70">{data.address}, {data.city}{data.state ? `, ${data.state}` : ''}</div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
          <span>{data.bedrooms} bd</span>
          <span>{data.bathrooms} ba</span>
          {data.area_sqft ? <span>{data.area_sqft.toLocaleString()} sqft</span> : null}
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">{data.property_type}</span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
