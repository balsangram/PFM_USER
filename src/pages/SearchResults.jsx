// import React, { useState, useEffect } from 'react'
// import { useSearchParams, useNavigate } from 'react-router-dom'

// // Mock search results data
// const allProducts = [
//     { id: 'chicken-1', title: 'Chicken Curry Cut - Small Pieces', category: 'chicken', price: 160, mrp: 189, image: 'https://d2407na1z3fc0t.cloudfront.net/products/pr_5jmsmhfqn4c/534x534/pr_5jmsmhfqn4c-1.jpeg' },
//     { id: 'chicken-2', title: 'Chicken Breast Boneless', category: 'chicken', price: 229, mrp: 269, image: 'https://d2407na1z3fc0t.cloudfront.net/products/pr_5jmsmhfqn4c/534x534/pr_5jmsmhfqn4c-2.jpeg' },
//     { id: 'mutton-1', title: 'Mutton Curry Cut', category: 'mutton', price: 699, mrp: 799, image: 'https://d2407na1z3fc0t.cloudfront.net/products/pr_5jmsmhfqn4c/534x534/mutton-curry.jpeg' },
//     { id: 'fish-1', title: 'Premium Fresh Rohu', category: 'fish', price: 199, mrp: 249, image: 'https://d2407na1z3fc0t.cloudfront.net/products/pr_5jmsmhfqn4c/534x534/rohu-fish.jpeg' },
//     { id: 'prawns-1', title: 'Large Prawns', category: 'seafood', price: 499, mrp: 599, image: 'https://d2407na1z3fc0t.cloudfront.net/products/pr_5jmsmhfqn4c/534x534/prawns-large.jpeg' },
// ]

// export default function SearchResults() {
//     const [searchParams] = useSearchParams()
//     const navigate = useNavigate()
//     const query = searchParams.get('q') || ''
//     const [results, setResults] = useState(allProducts)
//     const [cart, setCart] = useState<any[]>([])

//     // Load cart from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('cart')
//         if (data) {
//             try { setCart(JSON.parse(data)) } catch {}
//         }
//     }, [])

//     // Filter results based on search query
//     useEffect(() => {
//         if (query.trim()) {
//             const filtered = allProducts.filter(product =>
//                 product.title.toLowerCase().includes(query.toLowerCase()) ||
//                 product.category.toLowerCase().includes(query.toLowerCase())
//             )
//             setResults(filtered)
//         } else {
//             setResults(allProducts)
//         }
//     }, [query])

//     const getQty = (id: string) => cart.find(i => i.id === id)?.qty || 0

//     const addItem = (product: any) => {
//         const newCart = [...cart]
//         const idx = newCart.findIndex(i => i.id === product.id)
//         if (idx > -1) {
//             newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + 1 }
//         } else {
//             newCart.push({ id: product.id, title: product.title, price: product.price, mrp: product.mrp, image: product.image, qty: 1 })
//         }
//         localStorage.setItem('cart', JSON.stringify(newCart))
//         setCart(newCart)
//         window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }))
//     }

//     const inc = (id: string) => {
//         const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
//         localStorage.setItem('cart', JSON.stringify(newCart))
//         setCart(newCart)
//         window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }))
//     }

//     const dec = (id: string) => {
//         const newCart = cart.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])
//         localStorage.setItem('cart', JSON.stringify(newCart))
//         setCart(newCart)
//         window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }))
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="mb-6">
//                     <h1 className="text-2xl font-bold text-gray-900">
//                         {query ? `Search results for "${query}"` : 'Search Results'}
//                     </h1>
//                     <p className="text-gray-600 mt-2">
//                         {results.length} {results.length === 1 ? 'product' : 'products'} found
//                     </p>
//                 </div>

//                 {results.length === 0 ? (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500 text-lg">No products found for "{query}"</p>
//                         <p className="text-gray-400 mt-2">Try searching for chicken, mutton, fish, or seafood</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {results.map((product) => (
//                             <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
//                                 <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 mb-4">
//                                     <img
//                                         src={product.image}
//                                         alt={product.title}
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => {
//                                             (e.target as HTMLImageElement).src = '/logo.png'
//                                         }}
//                                     />
//                                     <div className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1 text-xs font-medium">
//                                         Today in 30 mins
//                                     </div>
//                                     {getQty(product.id) > 0 ? (
//                                         <div className="absolute bottom-3 right-3 inline-flex items-center rounded-full bg-white/90 border border-gray-200 shadow-sm">
//                                             <button onClick={() => dec(product.id)} className="px-3 py-1 text-lg leading-none">-</button>
//                                             <span className="px-2 text-sm min-w-[20px] text-center">{getQty(product.id)}</span>
//                                             <button onClick={() => inc(product.id)} className="px-3 py-1 text-lg leading-none">+</button>
//                                         </div>
//                                     ) : (
//                                         <button onClick={() => addItem(product)} className="absolute bottom-3 right-3 rounded-full bg-white/90 border border-gray-200 w-8 h-8 flex items-center justify-center text-gray-900 hover:bg-white">
//                                             +
//                                         </button>
//                                     )}
//                                 </div>
//                                 <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
//                                 <p className="text-sm text-gray-500 mb-3 capitalize">{product.category}</p>
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <span className="text-xl font-bold">₹{product.price}</span>
//                                     <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
//                                     <span className="ml-auto text-sm text-emerald-600 font-medium">
//                                         {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
//                                     </span>
//                                 </div>
//                                 {getQty(product.id) > 0 ? (
//                                     <div className="w-full inline-flex items-center justify-between rounded-full border border-red-200 bg-red-50 text-red-700">
//                                         <button onClick={() => dec(product.id)} className="px-4 py-2 text-lg">-</button>
//                                         <span className="text-sm font-semibold">{getQty(product.id)} added</span>
//                                         <button onClick={() => inc(product.id)} className="px-4 py-2 text-lg">+</button>
//                                     </div>
//                                 ) : (
//                                     <button onClick={() => addItem(product)} className="w-full bg-red-500 text-white rounded-full py-2 text-sm font-medium hover:bg-red-600 transition-colors">
//                                         Add to Cart
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }





import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';

const normalizeImageUrl = (raw) => {
  if (typeof raw !== 'string') return '';
  const v = raw.trim();
  if (!v) return '';
  if (v.startsWith('http')) return v;
  const cleaned = v.replace(/^public\//, '');
  const path = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return `${apiService.baseURL}${path}`;
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const data = localStorage.getItem('cart');
    if (data) {
      try {
        setCart(JSON.parse(data));
      } catch {}
    }
  }, []);

  // Fetch all subcategories from API and filter by search query
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        // optional userId from localStorage
        let userId = null;
        try {
          const raw = localStorage.getItem('user');
          if (raw) {
            const u = JSON.parse(raw);
            userId = u?._id || u?.id || null;
          }
        } catch {}
        const res = await apiService.getAllSubCategories(userId);
        const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        const mapped = list.map(sc => ({
          id: sc._id,
          title: sc.name || 'Unnamed',
          category: sc.category?.name || '',
          price: typeof sc.price === 'number' ? sc.price : 0,
          mrp: typeof sc.discountPrice === 'number' && sc.discountPrice > 0 ? sc.discountPrice : (typeof sc.price === 'number' ? sc.price : 0),
          image: normalizeImageUrl(sc.img)
        }));
        const filtered = query.trim()
          ? mapped.filter(p => (p.title || '').toLowerCase().includes(query.toLowerCase()))
          : mapped;
        if (mounted) setResults(filtered);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to search');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [query]);

  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0;

  const addItem = (product) => {
    const newCart = [...cart];
    const idx = newCart.findIndex(i => i.id === product.id);
    if (idx > -1) {
      newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + 1 };
    } else {
      newCart.push({ id: product.id, title: product.title, price: product.price, mrp: product.mrp, image: product.image, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }));
  };

  const inc = (id) => {
    const newCart = cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }));
  };

  const dec = (id) => {
    const newCart = cart.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: JSON.stringify(newCart) }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Search results for "${query}"` : 'Search Results'}
          </h1>
          <p className="text-gray-600 mt-2">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        {loading ? (
          <div className="text-gray-500">Searching...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found for "{query}"</p>
            <p className="text-gray-400 mt-2">Try searching for chicken, mutton, fish, or seafood</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1 text-xs font-medium">
                    Today in 30 mins
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
                <p className="text-sm text-gray-500 mb-3 capitalize">{product.category}</p>
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