import React, { useEffect, useState } from 'react'
import apiService from '../services/api.service'

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantities, setQuantities] = useState({});

    // get userId if logged in
    const getUserId = () => {
        try {
            const customerId = localStorage.getItem('customerId');
            if (customerId) return customerId;

            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                return user?._id || user?.id || null;
            }

            return null;
        } catch (err) {
            console.error('Error getting userId:', err);
            return null;
        }
    }
    const handleAddToCart = async (product) => {
        const userId = getUserId()
        if (!userId) {
            alert('Please login to add items to cart')
            return
        }

        const newCount = (quantities[product._id] || 0) + 1

        // Optimistic UI update
        setQuantities((prev) => ({
            ...prev,
            [product._id]: newCount,
        }))

        try {
            const res = await apiService.addToCart(
                userId,
                product._id, // subCategoryId
                newCount
            )
            console.log('🛒 Added to cart:', res)
        } catch (err) {
            console.error('Add to cart failed:', err)
        }
    }

 
    const increaseQty = (productId) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const decreaseQty = (productId) => {
        setQuantities((prev) => {
            const current = prev[productId] || 0;
            if (current <= 0) return prev;

            return {
                ...prev,
                [productId]: current - 1,
            };
        });
    };

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                setLoading(true)
                setError(null)

                const userId = getUserId()
                console.log('🆔 User ID for best sellers:', userId)

                const res = await apiService.getBestSellingProducts(userId)
                console.log('📦 API Response:', res)

                // Handle different response structures
                if (res && typeof res === 'object') {
                    if (res.success === true) {
                        // Case 1: { success: true, data: [], message: '' }
                        if (Array.isArray(res.data)) {
                            setProducts(res.data)
                        } else if (Array.isArray(res)) {
                            // Case 2: Direct array response
                            setProducts(res)
                        } else {
                            console.warn('Unexpected data format in response:', res)
                            setProducts([])
                            setError('Invalid data format received from server')
                        }
                    } else if (Array.isArray(res)) {
                        // Case 3: Direct array without success wrapper
                        setProducts(res)
                    } else {
                        console.warn('Unsuccessful response or unexpected format:', res)
                        setProducts([])
                        setError(res.message || 'Failed to load best sellers')
                    }
                } else if (Array.isArray(res)) {
                    // Case 4: Direct array
                    setProducts(res)
                } else {
                    console.warn('Invalid response:', res)
                    setProducts([])
                    setError('Invalid response from server')
                }
            } catch (err) {
                console.error('Error fetching best sellers:', err)
                setError(err.message || 'Failed to load best sellers. Please try again later.')
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        fetchBestSellers()
    }, [])

    // Format price with commas
    const formatPrice = (price) => {
        if (!price && price !== 0) return '₹0';
        return `₹${parseFloat(price).toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })}`;
    }

    // Calculate discount percentage
    const calculateDiscount = (price, discountPrice) => {
        if (!price || !discountPrice || price <= discountPrice) return 0;
        return Math.round(((price - discountPrice) / price) * 100);
    }

    // ---------------- RENDER STATES ----------------
    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bestsellers</h2>
                        <p className="text-sm text-gray-500">Most popular products near you!</p>
                    </div>
                    <div className="hidden sm:block">
                        <button className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">View all</button>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto pb-2">
                    <div className="flex gap-4 w-max">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group rounded-2xl border border-gray-100 bg-white w-56 min-w-[220px] animate-pulse">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-200"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bestsellers</h2>
                        <p className="text-sm text-gray-500">Most popular products near you!</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
                        <div className="text-red-600 mb-3">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-red-800 mb-2">Unable to Load Bestsellers</h3>
                        <p className="text-red-600 text-sm mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    if (!products.length) {
        return (
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bestsellers</h2>
                        <p className="text-sm text-gray-500">Most popular products near you!</p>
                    </div>
                    <div className="hidden sm:block">
                        <button className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">View all</button>
                    </div>
                </div>
                <div className="mt-6 text-center py-10">
                    <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Best Sellers Available</h3>
                    <p className="text-gray-500">Check back later for popular products</p>
                </div>
            </section>
        )
    }

    // ---------------- MAIN UI ----------------
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bestsellers</h2>
                    <p className="text-sm text-gray-500">Most popular products near you!</p>
                </div>
                <div className="hidden sm:block">
                    <button className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">View all</button>
                </div>
            </div>

            <div className="mt-6 overflow-x-auto pb-2">
                <div className="flex gap-4 w-max">
                    {products.map((product) => {
                        const discountPercent = calculateDiscount(product.price, product.discountPrice);
                        const finalPrice = product.discountPrice || product.price || 0;

                        return (
                            <div key={product._id} className="group rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-shadow w-56 min-w-[220px] flex flex-col">
                                {/* Product Image */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-50 flex-shrink-0">
                                    <img
                                        src={product.img || '/logo.png'}
                                        alt={product.name}
                                        className="h-full w-full object-contain p-4"
                                        onError={(e) => {
                                            e.target.src = '/logo.png';
                                            e.target.className = 'h-full w-full object-contain p-4';
                                        }}
                                    />

                                    {/* Badges */}
                                    <div className="absolute left-3 top-3 flex flex-col gap-1">
                                        <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-100 whitespace-nowrap">
                                            Today in 30 mins
                                        </span>
                                        {!product.available && (
                                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600 border border-red-200 whitespace-nowrap">
                                                Out of stock
                                            </span>
                                        )}
                                    </div>

                                    {discountPercent > 0 && (
                                        <div className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                            {discountPercent}% OFF
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-grow">
                                        {product.description || 'Premium quality product'}
                                    </p>

                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-lg font-bold text-gray-900">
                                            {formatPrice(finalPrice)}
                                        </span>
                                        {discountPercent > 0 && (
                                            <>
                                                <span className="text-xs text-gray-400 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <span>{product.weight || '500'}g</span>
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {product.quality || '4.0'}
                                        </span>
                                    </div>

                                    {/* <button 
                    className={`w-full rounded-full py-2.5 text-sm font-semibold transition-colors ${
                      product.available 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!product.available}
                    onClick={() => {
                      if (product.available) {
                        console.log('Add to cart:', product._id);
                        // Add your cart logic here
                      }
                    }}
                  >
                    {product.available ? 'Add to Cart' : 'Out of Stock'}
                  </button> */}

                                    {/* PLUS / MINUS */}
                                    <div className="flex items-center justify-between mt-auto">
                                        <button
                                            onClick={() => decreaseQty(product._id)}
                                            className="h-9 w-9 rounded-full border text-lg font-bold"
                                        >
                                            −
                                        </button>

                                        <span className="font-semibold">
                                            {quantities[product._id] || 0}
                                        </span>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="h-9 w-9 rounded-full bg-red-500 text-white text-lg font-bold"
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default BestSellers