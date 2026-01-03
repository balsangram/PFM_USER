import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/api.service.js'

export default function Categories(){
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false)
  const [subcategoriesError, setSubcategoriesError] = useState(null)
  const [subcategories, setSubcategories] = useState([])

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAllCategories()

        if (data && data.data) {
          const { API_CONFIG } = await import('../config/api.config.js')
          const toAbs = (raw='') => {
            const v = raw.trim()
            if (!v) return ''
            // strip leading public/
            const cleaned = v.replace(/^public\//, '')
            return cleaned.startsWith('http') ? cleaned : `${API_CONFIG.BASE_URL}${cleaned.startsWith('/') ? '' : '/'}${cleaned}`
          }
          const transformed = data.data
            .map(category => ({
              ...category,
              slug: (category.name || '').toLowerCase().replace(/[&]/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
              image: toAbs(category.img || '')
            }))
          setCategories(transformed)
        } else {
          throw new Error(data?.message || 'Failed to fetch categories')
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err.message)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategoryId) {
        setSubcategories([])
        return
      }
      try {
        setSubcategoriesLoading(true)
        setSubcategoriesError(null)
        const data = await apiService.getCategorySubProducts(selectedCategoryId)
        if (data && data.data) {
          setSubcategories(data.data)
        } else {
          throw new Error(data?.message || 'Failed to fetch subcategories')
        }
      } catch (err) {
        console.error('Error fetching subcategories:', err)
        setSubcategoriesError(err.message)
        setSubcategories([])
      } finally {
        setSubcategoriesLoading(false)
      }
    }
    fetchSubcategories()
  }, [selectedCategoryId])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-2">Home <span className="text-red-500">/ Categories</span></nav>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          {error && (
            <div className="mt-2 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
              <p className="text-sm">⚠️ API Error: {error}. Showing fallback data.</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Loading categories...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map(category => (
              <div
                key={category._id || category.slug}
                onClick={() => {
                  setSelectedCategoryId(category._id || null)
                  setSelectedCategoryName(category.name || '')
                }}
                className="cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center mb-3 transition-shadow duration-200">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-200"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : null}
                </div>
                <div className="text-center text-sm font-medium text-gray-900 transition-colors duration-200">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No categories found</div>
            <p className="text-gray-400 mt-2">Please try refreshing the page or check your connection.</p>
          </div>
        )}

        {selectedCategoryId && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCategoryName} Subcategories</h2>
              <button onClick={() => { setSelectedCategoryId(null); setSelectedCategoryName(''); setSubcategories([]); }} className="text-red-600 hover:text-red-800 text-sm font-medium">
                Clear selection
              </button>
            </div>

            {subcategoriesLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <span className="ml-3 text-gray-600">Loading subcategories...</span>
              </div>
            ) : subcategoriesError ? (
              <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p className="text-sm">❌ Error fetching subcategories: {subcategoriesError}</p>
              </div>
            ) : subcategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {subcategories.map(sub => (
                  <div key={sub._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    {sub.img ? (
                      <img src={sub.img} alt={sub.name} className="w-full h-32 object-cover rounded-md mb-3" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded-md mb-3" />
                    )}
                    <h3 className="font-medium text-gray-900 mb-1">{sub.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {sub.weight} {sub.weight && (sub.pieces || sub.serves) ? '|' : ''} {sub.pieces} {sub.pieces && sub.serves ? '|' : ''} {sub.serves}
                    </p>
                    <div className="flex items-center gap-2">
                      {typeof sub.price === 'number' && (
                        <span className="text-lg font-bold">₹{sub.price}</span>
                      )}
                      {typeof sub.discountPrice === 'number' && sub.discountPrice !== sub.price && (
                        <span className="text-sm text-gray-400 line-through">₹{sub.discountPrice}</span>
                      )}
                      {typeof sub.discount === 'number' && sub.discount > 0 && (
                        <span className="ml-auto text-sm text-emerald-600 font-medium">{sub.discount}% off</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">No subcategories found for {selectedCategoryName}</div>
                <p className="text-gray-400 mt-2">Please select another category or check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
