import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IMAGE_ASSETS, getCategoryImage } from '../assets/images/imageAssets'
import apiService from '../services/api.service.js'

// Helper to slugify names consistently
const toSlug = (s='') => s.toString().toLowerCase().replace(/[&]/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

export default function CategoryLanding() {
    const navigate = useNavigate()
    const { slug = '' } = useParams()
    const key = slug.toLowerCase()

    // API-driven state
    const [title, setTitle] = useState(slug)
    const [categoryId, setCategoryId] = useState(null)
    const [subNames, setSubNames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Resolve category by slug, then fetch all subcategories via API
    useEffect(() => {
        let mounted = true
        const run = async () => {
            try {
                setLoading(true)
                setError(null)
                const catResp = await apiService.getAllCategories()
                if (!(catResp?.success && Array.isArray(catResp?.data))) throw new Error('Categories not found')
                const cats = catResp.data.map(c => ({...c, slug: toSlug(c.name)}))
                const found = cats.find(c => c.slug === key)
                if (!found) throw new Error('Category not found')
                if (!mounted) return
                setTitle(found.name)
                setCategoryId(found._id)

                const subResp = await apiService.getCategorySubProducts(found._id)
                if (!(subResp?.success && Array.isArray(subResp?.data))) throw new Error('Subcategories not found')
                if (!mounted) return
                // Unique subcategory names from API
                const uniqueNames = Array.from(new Set(subResp.data.map(s => s.name).filter(Boolean)))
                setSubNames(['All', ...uniqueNames])
            } catch (e) {
                if (!mounted) return
                setError(e.message)
                setSubNames([])
            } finally {
                if (mounted) setLoading(false)
            }
        }
        run()
        return () => { mounted = false }
    }, [key])

    const handleSubcategoryClick = (name) => {
        const categorySlug = key
        const subSlug = toSlug(name)
        navigate(`/categories/${categorySlug}/${subSlug}`)
    }

    const getIconFor = (name) => {
        // Use category image as fallback icon for pills
        return getCategoryImage(slug) || IMAGE_ASSETS.placeholder
    }

    return (
        <div className="min-h-screen bg-rose-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>

                <div className="mt-6 rounded-2xl bg-rose-200 text-rose-900 p-6 font-semibold">
                    Tested & inspected by safety experts
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md text-sm">{error}</div>
                )}
                {loading ? (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                        {Array.from({length:6}).map((_,i)=> (
                            <div key={i} className="flex flex-col items-center animate-pulse">
                                <div className="w-20 h-20 rounded-full bg-gray-200" />
                                <div className="mt-2 h-3 w-20 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                ) : (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {subNames.map((name) => (
                        <button key={name} onClick={() => handleSubcategoryClick(name)} className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                                <img src={getIconFor(name)} alt={name} className="w-16 h-16 object-contain" onError={(e)=>{e.target.src='/logo.png'}} />
                            </div>
                            <div className="mt-2 text-sm text-gray-800 text-center max-w-[120px]">{name}</div>
                        </button>
                    ))}
                </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm">
                    <div className="rounded-lg border px-3 py-2">Filters</div>
                    <div className="text-gray-500">Select a subcategory to view items</div>
                </div>
            </div>
        </div>
    )
}