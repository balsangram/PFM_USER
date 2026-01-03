import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthDrawer from './AuthDrawer'
import { IMAGE_ASSETS, getCategoryImage } from '../assets/images/imageAssets'

const categoriesMeta = {
  chicken: { title: 'Chicken', banner: 'Tested & inspected by safety experts', bg: 'bg-pink-50' },
  mutton: { title: 'Mutton', banner: 'Ideal blend of meat & fat for rich taste', bg: 'bg-pink-50' },
  fish: { title: 'Fish & Seafood', banner: 'No added chemicals', bg: 'bg-blue-50' },
}

const sampleSubcats = [
  'All', 'Curry Cuts', 'Boneless & Mince', 'Speciality Cuts', 'Offals', 'Combos', 'Premium Cuts'
]

export default function CategoryPage(){
  const params = useParams()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)
  const slug = (params.slug || 'chicken').toString().toLowerCase()
  const meta = categoriesMeta[slug] || categoriesMeta['chicken']

  return (
    <div className={`${meta.bg} min-h-screen`}> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-2">Home <span className="text-red-500">/ {meta.title}</span></nav>
          <h1 className="text-3xl font-bold text-gray-900">{meta.title}</h1>
        </div>

        {/* Large rounded banner + centered subcategories */}
        <div className="relative bg-pink-100 rounded-2xl py-6 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-gradient-to-r from-rose-400 to-red-400 h-28 flex items-center justify-center text-white font-semibold px-6">{meta.banner}</div>

            {/* arrows on right */}
            <div className="absolute right-6 top-10 flex flex-col gap-3">
              <button className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">❯</button>
              <button className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">❯</button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-center">
                <div className="flex gap-8 overflow-x-auto hide-scrollbar py-2">
                  {sampleSubcats.map((s,i)=> (
                    <div key={i} className="flex flex-col items-center gap-2 px-3 min-w-[110px]">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md border border-pink-50">
                        <img src={getCategoryImage(slug)} alt={s} className="w-full h-full object-cover" onError={(e)=>{e.target.src=IMAGE_ASSETS.placeholder}} />
                      </div>
                      <div className="text-sm text-gray-700 text-center">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters left, items count right */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm bg-white flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg> Filters</button>
          </div>
          <div className="text-sm text-gray-600">34 Items available</div>
        </div>

        <div className="border-t border-gray-100 mb-6"></div>

        {/* Larger product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i=> (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="relative" style={{paddingTop:'56%'}}>
                <img src={getCategoryImage(slug)} alt={`product-${i}`} className="absolute inset-0 w-full h-full object-cover" onError={(e)=>{e.target.src=IMAGE_ASSETS.placeholder}}/>
                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-emerald-600 border border-emerald-100">Today in 120 mins</div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Sample Product {i}</h3>
                <p className="text-sm text-gray-500">500 g | 12-18 Pieces | Serves 4</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold">₹160</span>
                  <button onClick={()=>setAuthOpen(true)} className="ml-auto inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-white text-sm">Add <span className="bg-white text-red-500 rounded-full px-2">+</span></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={() => {
          // after login you can perform add-to-cart or refresh UI
          setAuthOpen(false)
        }} />
      </div>
    </div>
  )
}
