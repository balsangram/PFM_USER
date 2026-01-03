import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import apiService from '../services/api.service.js';
import { API_CONFIG } from '../config/api.config.js';

export default function CategoryProducts() {
    // Our router sometimes uses :slug for the first param; normalize to one variable
    const { slug, category, subcategory } = useParams();
    const location = useLocation();
    const categoryParam = (category || slug || '').toString();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    // Use shared cart from localStorage (same as Dashboard)
    const [cart, setCart] = useState([]);
    const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);

    const normalizeImageUrl = (raw) => {
        if (typeof raw !== 'string') return '';
        const v = raw.trim();
        if (!v) return '';
        if (v.startsWith('http')) return v;
        // strip leading 'public/' if present
        const cleaned = v.replace(/^public\//, '');
        const path = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
        return `${API_CONFIG.BASE_URL}${path}`;
    };

    // Listen for cart changes from other pages
    useEffect(() => {
        const loadCart = () => {
            const data = localStorage.getItem('cart');
            if (data) {
                try { setCart(JSON.parse(data)); } catch {}
            }
        };
        loadCart();
        
        // Listen for storage changes
        const handleStorageChange = () => {
            loadCart();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Helpers to sync localStorage for header badge
    const syncLocalCart = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
        setCartUpdateTrigger(prev => prev + 1);
        window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }));
    };

    const getQty = (id) => cart.find(i => i.id === id)?.qty || 0;
    // Backend cart integration (requires user in localStorage)
    const getUserId = () => {
        try {
            const raw = localStorage.getItem('user');
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return parsed?._id || parsed?.id || null;
        } catch { return null; }
    };

    const addItem = async (p) => {
        const userId = getUserId();
        if (!userId) {
            // fall back to local-only cart if not logged in
            const newCart = [...cart];
            const idx = newCart.findIndex(i => i.id === p.id);
            if (idx > -1) newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + 1 };
            else newCart.push({ id: p.id, title: p.title, price: p.price, mrp: p.mrp, image: p.image, qty: 1 });
            syncLocalCart(newCart);
            return;
        }
        try {
            await apiService.addToCart(userId, p.id, 1);
            // reflect in local badge as well
            const newCart = [...cart];
            const idx = newCart.findIndex(i => i.id === p.id);
            if (idx > -1) newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + 1 };
            else newCart.push({ id: p.id, title: p.title, price: p.price, mrp: p.mrp, image: p.image, qty: 1 });
            syncLocalCart(newCart);
        } catch (e) {
            // fallback to local on API failure
            const newCart = [...cart];
            const idx = newCart.findIndex(i => i.id === p.id);
            if (idx > -1) newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + 1 };
            else newCart.push({ id: p.id, title: p.title, price: p.price, mrp: p.mrp, image: p.image, qty: 1 });
            syncLocalCart(newCart);
        }
    };

    const inc = async (id) => {
        const userId = getUserId();
        const current = cart.find(i => i.id === id)?.qty || 0;
        if (!userId) {
            const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
            syncLocalCart(newCart);
            return;
        }
        try {
            await apiService.updateCartItem(userId, id, current + 1);
            const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
            syncLocalCart(newCart);
        } catch {
            const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
            syncLocalCart(newCart);
        }
    };

    const dec = async (id) => {
        const userId = getUserId();
        const current = cart.find(i => i.id === id)?.qty || 0;
        if (current <= 1) {
            if (!userId) {
                const newCart = cart.filter(i => i.id !== id);
                syncLocalCart(newCart);
                return;
            }
            try {
                await apiService.deleteCartItem(userId, id);
                const newCart = cart.filter(i => i.id !== id);
                syncLocalCart(newCart);
            } catch {
                const newCart = cart.filter(i => i.id !== id);
                syncLocalCart(newCart);
            }
            return;
        }
        if (!userId) {
            const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
            syncLocalCart(newCart);
            return;
        }
        try {
            await apiService.updateCartItem(userId, id, current - 1);
            const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
            syncLocalCart(newCart);
        } catch {
            const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
            syncLocalCart(newCart);
        }
    };

    // Resolve backend category _id from slug
    useEffect(() => {
        let mounted = true;
        const run = async () => {
            try {
                setError(null);
                const data = await apiService.getAllCategories();
                if (mounted && data.success && Array.isArray(data.data)) {
                    const slugSafe = categoryParam.toLowerCase().trim()
                        .replace(/[&]/g, 'and')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '');
                    const match = data.data.find(c => (
                        (c.name || '').toLowerCase().trim()
                          .replace(/[&]/g, 'and')
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/^-|-$/g, '')
                    ) === slugSafe);
                    if (match?._id) setCategoryId(match._id);
                    else setError('Category not found');
                }
            } catch (e) {
                if (mounted) setError(e.message || 'Failed to load categories');
            }
        };
        run();
        return () => { mounted = false };
    }, [categoryParam]);

    // Fetch products based on typeCategoryId if provided; else fallback to all subcategories filtered by category
    useEffect(() => {
        const typeId = new URLSearchParams(location.search).get('typeId');
        if (typeId) {
            let mounted = true;
            const runType = async () => {
                try {
                    setLoading(true);
                    const res = await apiService.getTypeCategoryProducts(typeId);
                    if (!mounted) return;
                    const payload = res?.data || res;
                    const subCats = Array.isArray(payload?.subCategories) ? payload.subCategories : [];
                    const normalized = subCats.map(sc => ({
                        id: sc._id,
                        title: sc.name || 'Unnamed',
                        price: typeof sc.price === 'number' ? sc.price : 0,
                        mrp: typeof sc.discountPrice === 'number' && sc.discountPrice > 0 ? sc.discountPrice : (typeof sc.price === 'number' ? sc.price : 0),
                        weight: sc.weight || '',
                        pieces: sc.pieces || '',
                        serves: sc.serves || '',
                        image: normalizeImageUrl(sc.img),
                        available: Boolean(sc.available),
                        description: sc.description || ''
                    }));
                    setProducts(normalized);
                    setError(null);
                } catch (e) {
                    if (mounted) {
                        setProducts([]);
                        setError(e.message || 'Failed to load products');
                    }
                } finally {
                    if (mounted) setLoading(false);
                }
            };
            runType();
            return () => { mounted = false };
        }
        
        // If no typeId, fetch all subcategories and filter by category
        let mounted = true;
        const run = async () => {
            try {
                setLoading(true);
                const userId = getUserId();
                const res = await apiService.getAllSubCategories(userId);
                if (mounted) {
                    if (res.success && Array.isArray(res.data)) {
                        // Filter by category name if categoryId is available
                        let filteredData = res.data;
                        if (categoryId) {
                            // Get category name from the resolved categoryId
                            const categoriesRes = await apiService.getAllCategories();
                            if (categoriesRes.success && Array.isArray(categoriesRes.data)) {
                                const category = categoriesRes.data.find(c => c._id === categoryId);
                                if (category) {
                                    filteredData = res.data.filter(item => 
                                        item.category && item.category.name === category.name
                                    );
                                }
                            }
                        }
                        
                        const normalizedAll = filteredData.map(sc => {
                            const imgUrl = normalizeImageUrl(sc.img);
                            return ({
                            id: sc._id,
                            title: sc.name || 'Unnamed',
                            price: typeof sc.price === 'number' ? sc.price : 0,
                            mrp: typeof sc.discountPrice === 'number' && sc.discountPrice > 0 ? sc.discountPrice : (typeof sc.price === 'number' ? sc.price : 0),
                            weight: sc.weight || '',
                            pieces: sc.pieces || '',
                            serves: sc.serves || '',
                            image: imgUrl,
                            available: Boolean(sc.available),
                            description: sc.description || ''
                            })
                        });
                        
                        // Optional filter by subcategory slug from URL
                        const toSlug = (s='') => s.toString().toLowerCase().replace(/[&]/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
                        let filtered = normalizedAll;
                        if (subcategory) {
                            const target = toSlug(subcategory);
                            // First try exact slug match
                            filtered = normalizedAll.filter(p => toSlug(p.title) === target);
                            // If no exact matches, try partial includes
                            if (filtered.length === 0) {
                                filtered = normalizedAll.filter(p => toSlug(p.title).includes(target));
                            }
                            // If still empty, fall back to all items
                            if (filtered.length === 0) {
                                filtered = normalizedAll;
                            }
                        }
                        setProducts(filtered);
                    } else {
                        setProducts([]);
                    }
                }
            } catch (e) {
                if (mounted) {
                    setProducts([]);
                    setError(e.message || 'Failed to load subcategories');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };
        run();
        return () => { mounted = false };
    }, [categoryId, subcategory]);

    // Removed legacy mock-data loader; using backend exclusively above

    const subcategories = [
        'All',
        'Curry Cuts',
        'Boneless & Mince',
        'Speciality Cuts',
        'Offals',
        'Combos',
        'Premium Cuts'
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-2 text-sm">
                        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 capitalize">{categoryParam}</span>
                    </nav>
                </div>
            </div>

            {/* Category Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 capitalize mb-6">{categoryParam}</h1>
                
                {/* Safety Banner */}
                <div className="bg-red-600 text-white py-3 px-6 rounded-lg mb-8 flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <span className="font-medium">Tested & Inspected by Safety Experts</span>
                </div>

                {/* Subcategory thumbnail icons removed as requested */}

                {/* Filter Bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
                            <span className="text-lg">⚡</span>
                            Filters
                        </button>
                        <span className="text-sm text-gray-500">{products.length} items available</span>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                                <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 mb-4">
                                <img
                                    src={product.image || '/logo.png'}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { 
                                        e.currentTarget.src = '/logo.png';
                                        e.currentTarget.style.display = 'block';
                                    }}
                                />
                                    <div className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1 text-xs font-medium">
                                        Tomorrow 6AM - 8AM
                                    </div>
                                    {getQty(product.id) > 0 ? (
                                        <div className="absolute bottom-3 right-3 inline-flex items-center rounded-full bg-white/90 border border-gray-200 shadow-sm">
                                            <button onClick={() => dec(product.id)} className="px-3 py-1 text-lg leading-none">-</button>
                                            <span className="px-2 text-sm min-w-[20px] text-center">{getQty(product.id)}</span>
                                            <button onClick={() => inc(product.id)} className="px-3 py-1 text-lg leading-none">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => addItem(product)} className="absolute bottom-3 right-3 rounded-full bg-white/90 border border-gray-200 w-8 h-8 flex items-center justify-center text-gray-900 hover:bg-white">
                                            +
                                        </button>
                                    )}
                                </div>
                                <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">
                                    {product.weight} | {product.pieces} | {product.serves}
                                </p>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xl font-bold">₹{product.price}</span>
                                    <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                                    <span className="ml-auto text-sm text-emerald-600 font-medium">
                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                                    </span>
                                </div>
                                {getQty(product.id) > 0 ? (
                                <div className="w-full inline-flex items-center justify-between rounded-full border border-red-200 bg-red-50 text-red-700">
                                        <button onClick={() => dec(product.id)} className="px-4 py-2 text-lg">-</button>
                                        <span className="text-sm font-semibold">{getQty(product.id)} added</span>
                                        <button onClick={() => inc(product.id)} className="px-4 py-2 text-lg">+</button>
                                    </div>
                                ) : (
                                    <button onClick={() => addItem(product)} className="w-full bg-red-500 text-white rounded-full py-2 text-sm font-medium hover:bg-red-600 transition-colors">
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
