// import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AuthDrawer from '../../../components/AuthDrawer'
// import { toast } from 'react-toastify'

// export default function UserDashboard() {
//     const navigate = useNavigate()
//     const [showCategoriesModal, setShowCategoriesModal] = useState(false)
//     const [showLocationModal, setShowLocationModal] = useState(false)
//     const [selectedLocation, setSelectedLocation] = useState('Bangalore')
//     const [selectedAddress, setSelectedAddress] = useState('N35, Varalaxmi Mansion, Jeevan Bima Nagar Main Rd')
//     const [selectedCategory, setSelectedCategory] = useState('Chicken')
//     const [selectedSubcategory, setSelectedSubcategory] = useState('')

//     const handleCategoryClick = (category: string) => {
//         setSelectedCategory(category)
//         setSelectedSubcategory('')
//     }

//     const handleSubcategoryClick = (subcategory: string) => {
//         setSelectedSubcategory(subcategory)
//         setShowCategoriesModal(false)
//         // Use a consistent URL format
//         const categorySlug = selectedCategory.toLowerCase().replace(/[&]/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//         const subcategorySlug = subcategory.toLowerCase().replace(/[&]/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//         navigate(`/categories/${categorySlug}/${subcategorySlug}`)
//     }

//     const [authOpen, setAuthOpen] = useState(false)
//     const [pendingProduct, setPendingProduct] = useState<any>(null)
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
//     const [userProfile, setUserProfile] = useState<any>(null)
//     const [profileOpen, setProfileOpen] = useState(false)
//     const profileRef = useRef<HTMLDivElement | null>(null)
//     // Cart state
//     type CartItem = { id: string; title: string; price: number; mrp?: number; image?: string; qty: number }
//     const [cart, setCart] = useState<CartItem[]>([])
//     const [cartOpen, setCartOpen] = useState(false)
//     const [showEmptyCartTip, setShowEmptyCartTip] = useState(false)

//     const handleAddToCart = (product?: any) => {
//         setPendingProduct(product || null)
//         setAuthOpen(true)
//     }

//     // Check if user is logged in on component mount
//     useEffect(() => {
//         const checkAuthStatus = () => {
//             const userData = localStorage.getItem('user')
//             if (userData) {
//                 try {
//                     const user = JSON.parse(userData)
//                     setIsLoggedIn(true)
//                     setUserProfile(user)
//                 } catch (error) {
//                     console.error('Error parsing user data:', error)
//                     setIsLoggedIn(false)
//                     setUserProfile(null)
//                 }
//             } else {
//                 setIsLoggedIn(false)
//                 setUserProfile(null)
//             }
//         }

//         checkAuthStatus()
        
//         // Listen for storage changes (login/logout from other tabs)
//         const handleStorageChange = (e: StorageEvent) => {
//             if (e.key === 'user') {
//                 checkAuthStatus()
//             }
//         }

//         window.addEventListener('storage', handleStorageChange)
//         return () => window.removeEventListener('storage', handleStorageChange)
//     }, [])

//     // Close profile dropdown on outside click
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//                 setProfileOpen(false)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     // Load cart from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('cart')
//         if (data) {
//             try { setCart(JSON.parse(data)) } catch {}
//         }
//     }, [])

//     // Listen for cart changes from other pages
//     useEffect(() => {
//         const handleStorageChange = (e: StorageEvent) => {
//             if (e.key === 'cart' && e.newValue) {
//                 try { setCart(JSON.parse(e.newValue)) } catch {}
//             }
//         }
//         window.addEventListener('storage', handleStorageChange)
//         return () => window.removeEventListener('storage', handleStorageChange)
//     }, [])

//     // Persist cart
//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cart))
//     }, [cart])

//     const getCartCount = () => cart.reduce((sum, i) => sum + i.qty, 0)
//     const getCartTotal = () => cart.reduce((sum, i) => sum + i.price * i.qty, 0)
//     const getItemQty = (id: string) => (cart.find(i => i.id === id)?.qty || 0)

//     const addItemToCart = (item: { id?: string; title: string; price: number; mrp?: number; image?: string }) => {
//         const id = item.id || item.title
//         setCart(prev => {
//             const idx = prev.findIndex(p => p.id === id)
//             if (idx > -1) {
//                 const next = [...prev]
//                 next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
//                 return next
//             }
//             return [{ id, title: item.title, price: item.price, mrp: item.mrp, image: item.image, qty: 1 }, ...prev]
//         })
//         // Do not auto-open cart; header Cart controls order summary visibility
//     }

//     const incrementItem = (id: string) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
//     const decrementItem = (id: string) => setCart(prev => prev.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))
//     const removeItem = (id: string) => setCart(prev => prev.filter(i => i.id !== id))

//     const handleCartClick = () => {
//         if (cart.length === 0) {
//             setShowEmptyCartTip(true)
//             setTimeout(() => setShowEmptyCartTip(false), 1600)
//             return
//         }
//         setCartOpen(true)
//     }

//     const handleLoginClick = () => {
//         if (isLoggedIn) {
//             // Show user profile menu or navigate to profile
//             navigate('/profile')
//         } else {
//             setAuthOpen(true)
//         }
//     }

//     const handleLogout = () => {
//         localStorage.removeItem('user')
//         setIsLoggedIn(false)
//         setUserProfile(null)
//         toast.success('Logged out successfully')
//     }

//     const [locationError, setLocationError] = useState<string | null>(null);

//     const handleUseCurrentLocation = () => {
//         setLocationError(null); // Clear any previous errors
        
//         if (!navigator.geolocation) {
//             setLocationError('Geolocation is not supported by your browser');
//             return;
//         }

//         // Show permission instructions
//         setLocationError('Please allow location access when prompted by your browser');

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setSelectedLocation('Current location');
//                 setSelectedAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
//                 setShowLocationModal(false);
//                 setLocationError(null);
//             },
//             (error) => {
//                 let errorMessage = 'Unable to access location';
                
//                 switch (error.code) {
//                     case error.PERMISSION_DENIED:
//                         errorMessage = 'Please enable location access in your browser settings to use this feature';
//                         break;
//                     case error.POSITION_UNAVAILABLE:
//                         errorMessage = 'Location information is unavailable. Please try again';
//                         break;
//                     case error.TIMEOUT:
//                         errorMessage = 'Location request timed out. Please try again';
//                         break;
//                     default:
//                         errorMessage = error.message || 'An error occurred while getting your location';
//                 }
                
//                 setLocationError(errorMessage);
//             },
//             {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//             }
//         );
//     };

//     const locations = [
//         { city: 'Bangalore', address: 'N35, Varalaxmi Mansion, Jeevan Bima Nagar Main Rd' },
//         { city: 'Mumbai', address: 'Andheri West, Mumbai' },
//         { city: 'Delhi', address: 'Connaught Place, New Delhi' },
//         { city: 'Chennai', address: 'T. Nagar, Chennai' },
//         { city: 'Hyderabad', address: 'Banjara Hills, Hyderabad' },
//         { city: 'Pune', address: 'Koregaon Park, Pune' },
//     ]

//     const categories = [
//         { name: 'Chicken', icon: '🐔', image: '/src/assets/images/chiecken.jpg', subcategories: ['Curry Cuts', 'Boneless & Mince', 'Speciality Cuts', 'Offals', 'Combos', 'Premium Cuts'] },
//         { name: 'Fish & Seafood', icon: '🐟', image: '/src/assets/images/fish.webp', subcategories: ['Fresh Fish', 'Prawns', 'Crabs', 'Lobster', 'Fish Fillet', 'Seafood Combos'] },
//         { name: 'Ready to cook', icon: '🍗', image: '/src/assets/images/Ready to cook.webp', subcategories: ['Marinated Chicken', 'Ready Mixes', 'Curry Pastes', 'Spice Blends', 'Marinades'] },
//         { name: 'Mutton', icon: '🐑', image: '/src/assets/images/Mutton.jpg', subcategories: ['Curry Cuts', 'Boneless', 'Chops', 'Mince', 'Speciality Cuts', 'Combos'] },
//         { name: 'Liver & More', icon: '🫀', image: '/src/assets/images/Liver&More.jpg', subcategories: ['Chicken Liver', 'Mutton Liver', 'Heart', 'Kidney', 'Offal Mix'] },
//         { name: 'Prawns & Crabs', icon: '🦐', image: '/src/assets/images/Prawns.webp', subcategories: ['Fresh Prawns', 'Crab Meat', 'Lobster', 'Shrimp', 'Seafood Mix'] },
//         { name: 'Eggs', icon: '🥚', image: '/src/assets/images/Eggs.jpg', subcategories: ['Farm Fresh Eggs', 'Organic Eggs', 'Free Range', 'Egg Combos'] },
//         { name: 'Crispy Snacks', icon: '🍤', image: '/src/assets/images/Crispy Snacks.png', subcategories: ['Chicken Nuggets', 'Fish Fingers', 'Prawn Tempura', 'Crispy Wings'] },
//         { name: 'Combos', icon: '🍽️', subcategories: ['Family Combos', 'Party Packs', 'Weekend Specials', 'Value Combos'] },
//     ]

//     const heroImages = [
//         'https://www.licious.in/img/default/licious-logo.svg',
//         'https://d2407na1z3fc0t.cloudfront.net/USP/Website/1697212560-chicken.png',
//         'https://d2407na1z3fc0t.cloudfront.net/USP/Website/1697212555-mutton.png',
//     ]

//     const productImages = [
//         'https://d2407na1z3fc0t.cloudfront.net/variants/040880a0-8b91-4497-b0a1-6d8b38f1b7b2/1200x1200.webp',
//         'https://d2407na1z3fc0t.cloudfront.net/variants/7a2b6f0a-f9a7-4820-8d6a-6b1a4c99cf9a/1200x1200.webp',
//         'https://d2407na1z3fc0t.cloudfront.net/variants/7a8b1d21-69d7-4c22-b13b-2dd9b3d3e0a3/1200x1200.webp',
//         'https://d2407na1z3fc0t.cloudfront.net/variants/2b4d8e71-34b5-4c98-8ff1-0f3f3f1e0e1f/1200x1200.webp',
//     ]

//     return (
//         <div className="min-h-screen bg-white text-gray-900">
//             {/* Header */}
//             <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         <div className="flex items-center gap-4">
//                             <img src={IMAGE_ASSETS.logo} alt="PFM" className="h-18 w-14 object-contain" />
//                             <div className="hidden md:flex items-center gap-2 text-sm">
//                                 <button onClick={() => setShowLocationModal(true)} className="flex items-center gap-1 font-semibold hover:text-red-600 transition-colors">
//                                     <span>{selectedLocation}</span>
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </button>
//                                 <span className="text-gray-400">·</span>
//                                 <span className="text-gray-600 max-w-[220px] truncate">{selectedAddress}</span>
//                             </div>
//                         </div>

//                         <div className="flex-1 max-w-2xl mx-4 hidden md:block">
//                             <div className="relative">
//                                 <input 
//                                     className="w-full rounded-full border border-gray-200 bg-gray-50/70 px-5 py-2.5 pr-12 text-sm focus:border-red-400 focus:bg-white focus:outline-none" 
//                                     placeholder="Search for any delicious product"
//                                     onKeyPress={(e) => {
//                                         if (e.key === 'Enter') {
//                                             const query = (e.target as HTMLInputElement).value.trim()
//                                             if (query) {
//                                                 navigate(`/search?q=${encodeURIComponent(query)}`)
//                                             }
//                                         }
//                                     }}
//                                 />
//                                 <button 
//                                     onClick={(e) => {
//                                         const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement
//                                         const query = input.value.trim()
//                                         if (query) {
//                                             navigate(`/search?q=${encodeURIComponent(query)}`)
//                                         }
//                                     }}
//                                     className="absolute right-1.5 top-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-white text-sm hover:bg-red-600"
//                                 >
//                                     Search
//                                 </button>
//                             </div>
//                         </div>

//                         <nav className="flex items-center gap-5 text-sm">
//                             <button onClick={() => setShowCategoriesModal(true)} className="hidden sm:inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
//                                 {/* Categories icon */}
//                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4z" />
//                                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 17l9 4 9-4" />
//                                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 4 9-4" />
//                                 </svg>
//                                 Categories
//                             </button>
//                             <button className="hidden md:inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
//                                 {/* Stores icon */}
//                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 9l1-5h16l1 5" />
//                                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v10H4z" />
//                                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 14h4v6H8z" />
//                                 </svg>
//                                 Stores
//                             </button>
                            
//                             {isLoggedIn ? (
//                                 <div className="relative" ref={profileRef}>
//                                     <button onClick={() => setProfileOpen(prev => !prev)} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
//                                         {/* Profile icon */}
//                                         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                                             <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
//                                             <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 22a8 8 0 1116 0" />
//                                         </svg>
//                                         <span className="hidden sm:inline">Profile</span>
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </button>
                                    
//                                     {/* Dropdown menu */}
//                                     {profileOpen && (
//                                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//                                             <div className="py-2">
//                                                 <button onClick={() => { setProfileOpen(false); navigate('/profile') }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                                                 Account
//                                                 </button>
//                                                 <button onClick={() => { setProfileOpen(false); toast.info('Rewards coming soon') }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                                                 My Rewards
//                                                 </button>
//                                                 <button onClick={() => { setProfileOpen(false); navigate('/orders') }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                                                 My Orders
//                                                 </button>
//                                                 <button onClick={() => { setProfileOpen(false); toast.info('Refer a friend coming soon') }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                                                 Refer a friend
//                                                 </button>
//                                                 <hr className="my-1" />
//                                                 <button onClick={() => { setProfileOpen(false); handleLogout() }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
//                                                 Logout
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <button onClick={handleLoginClick} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
//                                     {/* Profile icon */}
//                                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                                         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
//                                         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 22a8 8 0 1116 0" />
//                                     </svg>
//                                     Login
//                                 </button>
//                             )}
                            
//                             <div className="relative inline-flex items-center">
//                             <button onClick={handleCartClick} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
//                                 {/* Cart icon (refined) */}
//                                 <svg className="w-5 h-5 translate-y-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                                     <path d="M3 5h2l2.4 10.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 7H6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                                     <circle cx="9" cy="20" r="1.6" strokeWidth="1.8" />
//                                     <circle cx="18" cy="20" r="1.6" strokeWidth="1.8" />
//                                 </svg>
//                                 <span>Cart</span>
//                                 {getCartCount() > 0 && (
//                                     <div className="ml-2 hidden sm:flex items-center rounded-xl border border-red-300 bg-white px-3 py-1.5">
//                                         <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                                             <path d="M3 5h2l2.4 10.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 7H6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                                             <circle cx="9" cy="20" r="1.4" strokeWidth="1.6" />
//                                             <circle cx="18" cy="20" r="1.4" strokeWidth="1.6" />
//                                         </svg>
//                                         <div className="ml-2 leading-4">
//                                             <div className="text-xs font-bold text-red-700">{getCartCount()} items</div>
//                                             <div className="text-xs font-semibold text-red-600">₹{getCartTotal()}</div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </button>
//                             {showEmptyCartTip && (
//                                 <div className="absolute top-full mt-2 right-0 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-xl px-4 py-2 w-28 leading-5 text-left">
//                                     <span className="block">Cart</span>
//                                     <span className="block">is empty</span>
//                                     <span className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-slate-900"></span>
//                                 </div>
//                             )}
//                             </div>
//                         </nav>
//                     </div>
//                 </div>

//                 {showCategoriesModal && (
//                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[720px] z-50">
//                         <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
//                             <div className="grid grid-cols-2">
//                                 <div className="border-r border-gray-100 bg-white">
//                                     <div className="p-4">
//                                         <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
//                                         <div className="divide-y divide-gray-100">
//                                             {categories.map((category, idx) => (
//                                                 <button key={idx} onClick={() => setSelectedCategory(category.name)} className={`w-full text-left p-3 flex items-center gap-3 hover:bg-gray-50 ${selectedCategory === category.name ? 'bg-gray-50' : ''}`}>
//                                                     {category.image ? (
//                                                         <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//                                                     ) : (
//                                                         <span className="text-2xl">{category.icon}</span>
//                                                     )}
//                                                     <span className="text-sm font-medium text-gray-900">{category.name}</span>
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-gray-50">
//                                     <div className="p-6">
//                                         <h3 className="font-semibold text-gray-900 mb-6">{selectedCategory} Cuts</h3>
//                                         <div className="space-y-4">
//                                             {categories.find(c => c.name === selectedCategory)?.subcategories.map((subcategory, i) => (
//                                                 <div key={i} className="py-3 border-b border-gray-100 text-gray-700">{subcategory}</div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </header>

//             {/* Hero */}
//             <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
//                 <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
//                     <div className="grid md:grid-cols-2">
//                         <div className="p-8 md:p-12">
//                             <p className="text-rose-500 font-semibold">Welcome</p>
//                             <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">Chicken Curry Cut & more</h1>
//                             <p className="mt-2 text-sm text-gray-600">Starting at</p>
//                             <div className="mt-2 flex items-end gap-3">
//                                 <div className="text-3xl font-extrabold text-gray-900">₹160</div>
//                                 <div className="text-gray-400 line-through">₹193</div>
//                             </div>
//                             <div className="mt-6 flex items-center gap-3">
//                                 <button className="inline-flex items-center rounded-full bg-red-500 px-5 py-2 text-white text-sm font-semibold hover:bg-red-600">Shop now</button>
//                                 <img src="https://www.licious.in/img/default/licious-logo.svg" alt="Licious" className="h-5" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
//                             </div>
//                             <div className="mt-6 flex gap-2">
//                                 {['Chicken','Mutton','Fish & Seafood','Ready to Cook'].map((c)=> (
//                                     <span key={c} className="rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">{c}</span>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="relative p-6 md:p-0 flex items-center justify-center">
//                             <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
//                                 <div className="flex animate-[slide_18s_linear_infinite]" style={{gap:'0'}}>
//                                     {heroImages.map((src, i)=> (
//                                         <div key={i} className="min-w-full aspect-square bg-white/50 flex items-center justify-center">
//                                             <img src={src} alt="hero" className="h-64 md:h-80 object-contain" onError={(e)=>{(e.target as HTMLImageElement).src='/logo.png'}} />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Bestsellers */}
//             <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
//                 <div className="flex items-end justify-between">
//                     <div>
//                         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bestsellers</h2>
//                         <p className="text-sm text-gray-500">Most popular products near you!</p>
//                     </div>
//                     <div className="hidden sm:block">
//                         <button className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">View all</button>
//                     </div>
//                 </div>

//                 <div className="mt-6 overflow-x-auto pb-2">
//                     <div className="flex gap-4 w-max">
//                         {[
//                             { title: 'Fresh chicken liver', image: productImages[0], weight: '500 g | Serves 4', price: 199, mrp: 249 },
//                             { title: 'Raw Prawns', image: productImages[1], weight: '400 g | Serves 3', price: 199, mrp: 249 },
//                             { title: 'Chicken Curry Cut', image: productImages[2], weight: '500 g | Serves 4', price: 199, mrp: 249 },
//                             { title: 'Boneless Breast', image: productImages[3], weight: '450 g | Serves 4', price: 199, mrp: 249 },
//                         ].map((p, idx) => (
//                             <div key={idx} className="group rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-shadow w-56 min-w-[220px]">
//                                 <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-50">
//                                     <img src={p.image || '/logo.png'} alt={p.title} className="h-full w-full object-contain p-6 group-hover:scale-[1.03] transition" onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png' }} />
//                                     <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-100">Today in 30 mins</div>
//                                     {getItemQty(p.title) > 0 ? (
//                                         <div className="absolute bottom-3 right-3 inline-flex items-center rounded-full bg-white/90 border border-gray-200 shadow-sm">
//                                             <button onClick={() => decrementItem(p.title)} className="px-3 py-1 text-lg leading-none">-</button>
//                                             <span className="px-2 text-sm min-w-[20px] text-center">{getItemQty(p.title)}</span>
//                                             <button onClick={() => incrementItem(p.title)} className="px-3 py-1 text-lg leading-none">+</button>
//                                         </div>
//                                     ) : (
//                                         <button onClick={() => addItemToCart({ id: p.title, title: p.title, price: p.price, mrp: p.mrp, image: p.image })} className="absolute bottom-3 right-3 rounded-full bg-white/90 border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-900 hover:bg-white">+
//                                         </button>
//                                     )}
//                                 </div>
//                                 <div className="p-4">
//                                     <h3 className="line-clamp-2 font-semibold text-gray-900 text-sm">{p.title}</h3>
//                                     <p className="mt-1 text-xs text-gray-500">{p.weight}</p>
//                                     <div className="mt-3 flex items-baseline gap-2">
//                                         <span className="text-lg font-bold">₹{p.price}</span>
//                                         <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
//                                         <span className="ml-auto text-xs text-emerald-600 font-semibold">{Math.max(0, Math.round(((p.mrp - p.price) / p.mrp) * 100))}% off</span>
//                                     </div>
//                                     {getItemQty(p.title) > 0 ? (
//                                         <div className="mt-3 w-full inline-flex items-center justify-between rounded-full border border-red-200 bg-red-50 text-red-700">
//                                             <button onClick={() => decrementItem(p.title)} className="px-4 py-2 text-lg">-</button>
//                                             <span className="text-sm font-semibold">{getItemQty(p.title)} added</span>
//                                             <button onClick={() => incrementItem(p.title)} className="px-4 py-2 text-lg">+</button>
//                                         </div>
//                                     ) : (
//                                         <button onClick={() => addItemToCart({ id: p.title, title: p.title, price: p.price, mrp: p.mrp, image: p.image })} className="mt-3 w-full rounded-full bg-red-500 py-2 text-white text-sm font-semibold hover:bg-red-600">Add to Cart</button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Categories Grid */}
//             <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
//                 <div className="text-center mb-8">
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by categories</h2>
//                     <p className="text-gray-600 mt-2">Freshest meats and much more!</p>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                     {[
//                         { name: 'Chicken', icon: '🐔', image: '/src/assets/images/chiecken.jpg' },
//                         { name: 'Fish & Seafood', icon: '🐟', image: '/src/assets/images/fish.webp' },
//                         { name: 'Ready to cook', icon: '🍗', image: '/src/assets/images/Ready to cook.webp' },
//                         { name: 'Mutton', icon: '🐑', image: '/src/assets/images/Mutton.jpg' },
//                         { name: 'Liver & More', icon: '🫀', image: '/src/assets/images/Liver&More.jpg' },
//                         { name: 'Prawns & Crabs', icon: '🦐', image: '/src/assets/images/Prawns.webp' },
//                         { name: 'Eggs', icon: '🥚', image: '/src/assets/images/Eggs.jpg' },
//                         { name: 'Crispy Snacks', icon: '🍤', image: '/src/assets/images/Crispy Snacks.png' },
//                         { name: 'Meat Masala', icon: '🌶️', image: '/src/assets/images/Meat Masala.jpg' },
//                         { name: 'Spreads & Cold Cuts', icon: '🧀', image: '/src/assets/images/Spread &Cold Cut.webp' },
//                         { name: 'Kebab & Biryani', icon: '🍢', image: '/src/assets/images/Kabab.avif' },
//                         { name: 'Kids Favourites', icon: '👶', image: '/src/assets/images/Kids favourites.jpg' },
//                     ].map((category, index) => (
//                         <div key={index} className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-100" onClick={() => navigate(`/categories/${(category.name || '').toString().toLowerCase().replace(/\s+/g, '-')}`)}>
//                             <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-xl">
//                                 {category.image ? (
//                                     <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//                                 ) : (
//                                     <span className="text-4xl">{category.icon}</span>
//                                 )}
//                             </div>
//                             <p className="text-center text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">{category.name}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Info tiles */}
//             <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-16">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-red-100 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                         <div className="relative">
//                             <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"><span className="text-2xl text-white">🥩</span></div>
//                             <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Quality</h3>
//                             <p className="text-sm text-gray-600">Hand-selected, finest cuts</p>
//                         </div>
//                     </div>
//                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                         <div className="relative">
//                             <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"><span className="text-2xl text-white">🧊</span></div>
//                             <h3 className="text-lg font-bold text-gray-900 mb-2">Hygienic & Fresh</h3>
//                             <p className="text-sm text-gray-600">Always fresh, always safe</p>
//                         </div>
//                     </div>
//                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                         <div className="relative">
//                             <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"><span className="text-2xl text-white">🚚</span></div>
//                             <h3 className="text-lg font-bold text-gray-900 mb-2">30-min Delivery</h3>
//                             <p className="text-sm text-gray-600">Lightning fast delivery</p>
//                         </div>
//                     </div>
//                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                         <div className="relative">
//                             <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"><span className="text-2xl text-white">⭐</span></div>
//                             <h3 className="text-lg font-bold text-gray-900 mb-2">Top Rated Service</h3>
//                             <p className="text-sm text-gray-600">5-star customer satisfaction</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="border-t border-gray-100">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-500 flex items-center justify-between">
//                     <span>© 2024 Priya Fresh Meats</span>
//                     <span>Made with ❤️ for great food</span>
//                 </div>
//             </footer>

//             {/* Categories Modal */}
//             {showCategoriesModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//                     <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 flex h-[80vh]">
//                         <div className="w-1/3 border-r border-gray-100 pr-4 overflow-y-auto">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="text-lg font-semibold">Categories</h3>
//                                 <button onClick={() => setShowCategoriesModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
//                             </div>
//                             <div className="space-y-2">
//                                 {categories.map((category, idx) => (
//                                     <button
//                                         key={idx}
//                                         onClick={() => handleCategoryClick(category.name)}
//                                         className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${selectedCategory === category.name ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'}`}
//                                     >
//                                         {category.image ? (
//                                             <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//                                         ) : (
//                                             <span className="text-2xl">{category.icon}</span>
//                                         )}
//                                         <span className="text-sm font-medium">{category.name}</span>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="w-2/3 pl-4 overflow-y-auto">
//                             <div className="mb-4">
//                                 <h3 className="text-lg font-semibold">{selectedCategory || 'Select a category'}</h3>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 {selectedCategory && categories.find(c => c.name === selectedCategory)?.subcategories.map((subcategory, idx) => (
//                                     <button
//                                         key={idx}
//                                         onClick={() => handleSubcategoryClick(subcategory)}
//                                         className="text-left p-4 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
//                                     >
//                                         <h4 className="font-medium">{subcategory}</h4>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Cart Drawer */}
//             {cartOpen && (
//                 <div className="fixed inset-0 z-50 flex">
//                     <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
//                     <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
//                         <div className="p-4 border-b flex items-center justify-between">
//                             <h3 className="text-lg font-semibold">Order Summary</h3>
//                             <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
//                         </div>
//                         <div className="p-4 space-y-4 overflow-y-auto flex-1">
//                             {cart.length === 0 ? (
//                                 <div className="text-sm text-gray-500">Your cart is empty</div>
//                             ) : (
//                                 cart.map(item => (
//                                     <div key={item.id} className="flex gap-3 border rounded-lg p-3">
//                                         <img src={item.image || '/logo.png'} alt={item.title} className="w-16 h-16 object-contain rounded" />
//                                         <div className="flex-1">
//                                             <div className="font-medium text-sm">{item.title}</div>
//                                             <div className="mt-1 flex items-center gap-2">
//                                                 <span className="text-red-600 font-semibold">₹{item.price}</span>
//                                                 {item.mrp && <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>}
//                                             </div>
//                                             <div className="mt-2 inline-flex items-center rounded-full border px-2">
//                                                 <button onClick={() => decrementItem(item.id)} className="px-2 text-lg">-</button>
//                                                 <span className="px-2 text-sm">{item.qty}</span>
//                                                 <button onClick={() => incrementItem(item.id)} className="px-2 text-lg">+</button>
//                                             </div>
//                                         </div>
//                                         <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600">✕</button>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                         <div className="border-t p-4 space-y-2">
//                             <div className="flex items-center justify-between text-sm">
//                                 <span>Subtotal</span>
//                                 <span>₹{getCartTotal()}</span>
//                             </div>
//                             <div className="rounded-lg bg-green-50 text-green-700 text-sm p-3">
//                                 Congratulations, Your delivery charge is waived off!!!
//                             </div>
//                             <button onClick={() => { localStorage.setItem('cartTotal', String(getCartTotal())); setCartOpen(false); navigate('/addresses') }} className="w-full mt-2 rounded-lg bg-red-600 text-white py-3 font-semibold hover:bg-red-700">Proceed</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <AuthDrawer open={authOpen} onClose={() => { setAuthOpen(false); setPendingProduct(null); }} onLoginSuccess={() => {
//                 // Check for user data in localStorage after login
//                 const userData = localStorage.getItem('user')
//                 if (userData) {
//                     try {
//                         const user = JSON.parse(userData)
//                         setIsLoggedIn(true)
//                         setUserProfile(user)
//                         if (pendingProduct) {
//                             // add pending product once logged in
//                             addItemToCart(pendingProduct)
//                             setPendingProduct(null)
//                         }
//                     } catch (error) {
//                         console.error('Error parsing user data:', error)
//                     }
//                 }
//                 setAuthOpen(false)
//             }} />

//             {/* Location Modal */}
//             {showLocationModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//                     <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-semibold">Select Location</h3>
//                             <button 
//                                 onClick={() => {
//                                     setShowLocationModal(false);
//                                     setLocationError(null);
//                                 }} 
//                                 className="text-gray-400 hover:text-gray-600"
//                             >
//                                 ✕
//                             </button>
//                         </div>
                        
//                         {/* Search location */}
//                         <div className="relative">
//                             <input 
//                                 type="text" 
//                                 placeholder="Search for your location"
//                                 className="w-full rounded-lg border border-gray-200 pl-10 pr-32 py-2.5 text-sm focus:border-red-400 focus:outline-none"
//                                 autoFocus
//                             />
//                             <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                             <button 
//                                 onClick={handleUseCurrentLocation}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-700"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                                 Use current location
//                             </button>
//                 </div>

//                         {/* Location Error Message */}
//                         {locationError && (
//                             <div className="mt-4">
//                                 {locationError === 'Please allow location access when prompted by your browser' ? (
//                                     <div className="rounded-lg bg-blue-50 p-4">
//                                         <div className="flex items-start">
//                                             <div className="flex-shrink-0">
//                                                 <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//                                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                                                 </svg>
//                                             </div>
//                                             <div className="ml-3">
//                                                 <h3 className="text-sm font-medium text-blue-800">Location Permission Required</h3>
//                                                 <div className="mt-2 text-sm text-blue-700">
//                                                     <p>{locationError}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="rounded-lg bg-red-50 p-4">
//                                         <div className="flex items-start">
//                                             <div className="flex-shrink-0">
//                                                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                                 </svg>
//                                             </div>
//                                             <div className="ml-3">
//                                                 <h3 className="text-sm font-medium text-red-800">Location Error</h3>
//                                                 <div className="mt-2 text-sm text-red-700">
//                                                     <p>{locationError}</p>
//                                                     {locationError.includes('enable location access') && (
//                                                         <p className="mt-2">
//                                                             To enable location: <br />
//                                                             1. Click the lock/info icon in your browser's address bar <br />
//                                                             2. Allow location access for this site <br />
//                                                             3. Refresh the page and try again
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                 </div>
//             </div>
//             )}
//         </div>
//     )
// }








import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthDrawer from './AuthDrawer';
import Footer from '../components/Footer';
import { IMAGE_ASSETS, getProductImage } from '../assets/images/imageAssets';
import { toast } from 'react-toastify';
import apiService from '../services/api.service.js';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const [selectedAddress, setSelectedAddress] = useState('N35, Varalaxmi Mansion, Jeevan Bima Nagar Main Rd');
  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showEmptyCartTip, setShowEmptyCartTip] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [apiCategories, setApiCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categorySubcategories, setCategorySubcategories] = useState({});
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [bestSellingLoading, setBestSellingLoading] = useState(true);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesWithTypes, setCategoriesWithTypes] = useState([]);
  const [categoriesTypesLoading, setCategoriesTypesLoading] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowCategoriesModal(false);
    const categorySlug = selectedCategory.toLowerCase().replace(/[&]/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const subcategorySlug = subcategory.toLowerCase().replace(/[&]/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    navigate(`/categories/${categorySlug}/${subcategorySlug}`);
  };

  // Helper function to get category icon
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'chicken': '🐔',
      'mutton': '🐑',
      'fish': '🐟',
      'fish & seafood': '🐟',
      'prawns': '🦐',
      'prawns & crabs': '🦐',
      'eggs': '🥚',
      'ready to cook': '🍗',
      'liver & more': '🫀',
      'crispy snacks': '🍤',
      'combos': '🍽️'
    };
    return iconMap[categoryName.toLowerCase()] || '🍽️';
  };

  const handleAddToCart = (product = null) => {
    setPendingProduct(product);
    setAuthOpen(true);
  };

  // Load Categories + TypeCategories when Categories modal opens
  useEffect(() => {
    const loadCategoriesTypes = async () => {
      if (!showCategoriesModal || categoriesWithTypes.length > 0) return;
      try {
        setCategoriesTypesLoading(true);
        const res = await apiService.getCategoriesWithTypes();
        if (res && res.success && Array.isArray(res.data)) {
          setCategoriesWithTypes(res.data);
          if (res.data.length > 0) {
            const names = new Set(res.data.map(c => c.name));
            if (!selectedCategory || !names.has(selectedCategory)) {
              setSelectedCategory(res.data[0].name);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load categories-types:', e);
      } finally {
        setCategoriesTypesLoading(false);
      }
    };
    loadCategoriesTypes();
  }, [showCategoriesModal]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        console.log('🔄 Fetching categories from API...');
        
        const data = await apiService.getAllCategories();
        console.log('📊 API Response:', data);
        
        if (data && data.success && data.data && Array.isArray(data.data)) {
          // Do not filter out categories without image; fall back to icon when image is missing
          const transformedCategories = data.data.map(category => ({
            ...category,
            slug: category.name.toLowerCase().replace(/[&]/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            image: typeof category.img === 'string' ? category.img : '',
            icon: getCategoryIcon(category.name)
          }));
          
          console.log('✅ Transformed categories:', transformedCategories);
          setApiCategories(transformedCategories);
          
          // Set first category as default selected
          if (transformedCategories.length > 0) {
            setSelectedCategory(transformedCategories[0].name);
            console.log('🎯 Default category selected:', transformedCategories[0].name);
          }
        } else {
          console.warn('⚠️ API response not successful or no data:', data);
          // Use fallback categories
          const fallbackCategories = [
            { _id: '1', name: 'Chicken', icon: '🐔', slug: 'chicken' },
            { _id: '2', name: 'Mutton', icon: '🐑', slug: 'mutton' },
            { _id: '3', name: 'Fish & Seafood', icon: '🐟', slug: 'fish-seafood' },
            { _id: '4', name: 'Eggs', icon: '🥚', slug: 'eggs' },
            { _id: '5', name: 'Ready to Cook', icon: '🍗', slug: 'ready-to-cook' },
            { _id: '6', name: 'Snacks', icon: '🍤', slug: 'snacks' }
          ];
          setApiCategories(fallbackCategories);
          setSelectedCategory(fallbackCategories[0].name);
        }
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        // Fallback to hardcoded categories if API fails
        console.log('🔄 Using fallback categories due to error');
        const fallbackCategories = [
          { _id: '1', name: 'Chicken', icon: '🐔', slug: 'chicken' },
          { _id: '2', name: 'Mutton', icon: '🐑', slug: 'mutton' },
          { _id: '3', name: 'Fish & Seafood', icon: '🐟', slug: 'fish-seafood' },
          { _id: '4', name: 'Eggs', icon: '🥚', slug: 'eggs' },
          { _id: '5', name: 'Ready to Cook', icon: '🍗', slug: 'ready-to-cook' },
          { _id: '6', name: 'Snacks', icon: '🍤', slug: 'snacks' }
        ];
        setApiCategories(fallbackCategories);
        setSelectedCategory(fallbackCategories[0].name);
      } finally {
        setCategoriesLoading(false);
        console.log('✅ Categories loading completed');
      }
    };

    fetchCategories();
  }, []);

  // Fetch best-selling products from API
  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        setBestSellingLoading(true);
        console.log('🔄 Fetching best-selling products from API...');
        
        const data = await apiService.getBestSellingProducts();
        console.log('📊 Best-selling API Response:', data);
        
        if (data && Array.isArray(data)) {
          console.log('✅ Best-selling products loaded:', data.length, 'products');
          setBestSellingProducts(data);
        } else {
          console.warn('⚠️ No best-selling products data received');
          setBestSellingProducts([]);
        }
      } catch (error) {
        console.error('❌ Error fetching best-selling products:', error);
        setBestSellingProducts([]);
      } finally {
        setBestSellingLoading(false);
        console.log('✅ Best-selling products loading completed');
      }
    };

    fetchBestSellingProducts();
  }, []);

  // Fetch subcategories when selected category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory || !apiCategories.length) return;
      
      const category = apiCategories.find(c => c.name === selectedCategory);
      if (!category || !category._id) return;
      
      try {
        const data = await apiService.getCategorySubProducts(category._id);
        if (data.success && data.data) {
          setCategorySubcategories(prev => ({
            ...prev,
            [selectedCategory]: data.data
          }));
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [selectedCategory, apiCategories]);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setIsLoggedIn(true);
          setUserProfile(user);
          setUserId(user._id || user.id || null);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsLoggedIn(false);
          setUserProfile(null);
          setUserId(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
        setUserId(null);
      }
    };

    checkAuthStatus();

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load cart from backend if logged-in; fallback to localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const raw = localStorage.getItem('user');
        if (raw) {
          const user = JSON.parse(raw);
          const userId = user?._id || user?.id;
          if (userId) {
            const res = await apiService.getCart(userId);
            if (res?.success && Array.isArray(res.data)) {
              const mapped = res.data.map(o => ({
                id: (o.subCategory?._id || o.subCategory || '').toString(),
                title: o.subCategory?.name || 'Item',
                price: o.subCategory?.discountPrice ?? o.subCategory?.price ?? 0,
                image: o.subCategory?.img || '/logo.png',
                qty: o.count || 1,
              }));
              setCart(mapped);
              localStorage.setItem('cart', JSON.stringify(mapped));
              return;
            }
          }
        }
      } catch {}
      const data = localStorage.getItem('cart');
      if (data) {
        try { setCart(JSON.parse(data)); } catch {}
    }
    };
    loadCart();
  }, []);

  // Listen for cart changes from other pages
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart' && e.newValue) {
        try {
          setCart(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getCartCount = () => cart.reduce((sum, i) => sum + i.qty, 0);
  const getCartTotal = () => cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const getItemQty = (id) => (cart.find(i => i.id === id)?.qty || 0);

  // Helper
  const isObjectId = (value) => typeof value === 'string' && /^[a-f\d]{24}$/i.test(value);

  // Load backend cart when logged in
  useEffect(() => {
    const loadBackendCart = async () => {
      if (!userId) return;
      try {
        const res = await apiService.getCart(userId);
        const orders = res?.data || res; // ApiResponse wraps in data
        if (Array.isArray(orders)) {
          const mapped = orders.map(o => ({
            id: o?.subCategory?._id || o?.subCategory,
            title: o?.subCategory?.name || 'Item',
            price: o?.subCategory?.price || 0,
            mrp: o?.subCategory?.discountPrice,
            image: o?.subCategory?.img,
            qty: o?.count || 0
          })).filter(i => i.id && i.qty > 0);
          setCart(mapped);
        }
      } catch (e) {
        console.error('Error loading backend cart:', e);
      }
    };
    loadBackendCart();
  }, [userId]);

  const addItemToCart = async (item) => {
    const id = item.id || item.title;
    if (userId && isObjectId(id)) {
      try {
        const res = await apiService.addToCart(userId, id, 1);
        const orders = res?.data || res;
        if (Array.isArray(orders)) {
          const mapped = orders.map(o => ({
            id: o?.subCategory?._id || o?.subCategory,
            title: o?.subCategory?.name || 'Item',
            price: o?.subCategory?.price || 0,
            mrp: o?.subCategory?.discountPrice,
            image: o?.subCategory?.img,
            qty: o?.count || 0
          })).filter(i => i.id && i.qty > 0);
          setCart(mapped);
          return;
        }
      } catch (e) {
        console.error('API addToCart failed, falling back to local:', e);
      }
    }
    // Fallback local
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [{ id, title: item.title, price: item.price, mrp: item.mrp, image: item.image, qty: 1 }, ...prev];
    });
  };

  const incrementItem = async (id) => {
    if (userId && isObjectId(id)) {
      try {
        const currentQty = getItemQty(id);
        const res = await apiService.updateCartItem(userId, id, currentQty + 1);
        if (res) {
          setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
          return;
        }
      } catch (e) { console.error('API increment failed:', e); }
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decrementItem = async (id) => {
    if (userId && isObjectId(id)) {
      try {
        const currentQty = getItemQty(id);
        if (currentQty > 1) {
          const res = await apiService.updateCartItem(userId, id, currentQty - 1);
          if (res) {
            setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i));
            return;
          }
        } else {
          const res = await apiService.deleteCartItem(userId, id);
          if (res) {
            setCart(prev => prev.filter(i => i.id !== id));
            return;
          }
        }
      } catch (e) { console.error('API decrement/remove failed:', e); }
    }
    setCart(prev => prev.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]));
  };

  const removeItem = async (id) => {
    if (userId && isObjectId(id)) {
      try {
        const res = await apiService.deleteCartItem(userId, id);
        if (res) {
          setCart(prev => prev.filter(i => i.id !== id));
          return;
        }
      } catch (e) { console.error('API remove failed:', e); }
    }
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleCartClick = () => {
    if (cart.length === 0) {
      setShowEmptyCartTip(true);
      setTimeout(() => setShowEmptyCartTip(false), 1600);
      return;
    }
    setCartOpen(true);
  };

  const handleLoginClick = async () => {
    if (isLoggedIn) {
      try {
        // Resolve userId freshly from localStorage to avoid stale state
        const raw = localStorage.getItem('user');
        const parsed = (() => { try { return JSON.parse(raw) || {}; } catch { return {}; } })();
        // Try alternate storage keys
        const altUserRaw = localStorage.getItem('customer') || localStorage.getItem('profile') || null;
        const altUser = (() => { try { return altUserRaw ? JSON.parse(altUserRaw) : {}; } catch { return {}; } })();
        const storedCustomerId = localStorage.getItem('customerId') || null;
        // Try to decode JWT for id if present
        const token = (localStorage.getItem('accessToken')
          || localStorage.getItem('token')
          || localStorage.getItem('customerAccessToken')) || null;
        const decoded = (() => {
          try {
            if (!token) return {};
            const payload = token.split('.')[1];
            if (!payload) return {};
            const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            return json || {};
          } catch { return {}; }
        })();
        const uid = (
          parsed._id || parsed.id ||
          altUser._id || altUser.id ||
          userId || userProfile?._id || userProfile?.id ||
          storedCustomerId || decoded.userId || decoded._id || decoded.id || decoded.uid || null
        );
        if (uid) {
          // Refresh cached profile then navigate to Profile
          apiService
            .getCustomerProfile(uid)
            .then((res) => {
              const data = res?.data || res;
              localStorage.setItem('customerProfile', JSON.stringify(data));
            })
            .catch((e) => console.error('Failed to fetch profile:', e))
            .finally(() => {
              navigate('/profile', { state: { userId: uid } });
            });
          return;
        }
        // Fallback navigate even if userId missing; Profile will handle load
        navigate('/profile');
      } catch (e) {
        console.error('Failed to fetch profile:', e);
        navigate('/profile');
      }
    } else {
      setAuthOpen(true);
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    navigate('/logout');
  };

  const handleUseCurrentLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setLocationError('Please allow location access when prompted by your browser');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation('Current location');
        setSelectedAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        setShowLocationModal(false);
        setLocationError(null);
      },
      (error) => {
        let errorMessage = 'Unable to access location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Please enable location access in your browser settings to use this feature';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again';
            break;
          default:
            errorMessage = error.message || 'An error occurred while getting your location';
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const locations = [
    { city: 'Bangalore', address: 'N35, Varalaxmi Mansion, Jeevan Bima Nagar Main Rd' },
    { city: 'Mumbai', address: 'Andheri West, Mumbai' },
    { city: 'Delhi', address: 'Connaught Place, New Delhi' },
    { city: 'Chennai', address: 'T. Nagar, Chennai' },
    { city: 'Hyderabad', address: 'Banjara Hills, Hyderabad' },
    { city: 'Pune', address: 'Koregaon Park, Pune' },
  ];

  const categories = [
        { name: 'Chicken', icon: '🐔', subcategories: ['Curry Cuts', 'Boneless & Mince', 'Speciality Cuts', 'Offals', 'Combos', 'Premium Cuts'] },
        { name: 'Fish & Seafood', icon: '🐟', subcategories: ['Fresh Fish', 'Prawns', 'Crabs', 'Lobster', 'Fish Fillet', 'Seafood Combos'] },
        { name: 'Ready to cook', icon: '🍗', subcategories: ['Marinated Chicken', 'Ready Mixes', 'Curry Pastes', 'Spice Blends', 'Marinades'] },
        { name: 'Mutton', icon: '🐑', subcategories: ['Curry Cuts', 'Boneless', 'Chops', 'Mince', 'Speciality Cuts', 'Combos'] },
        { name: 'Liver & More', icon: '🫀', subcategories: ['Chicken Liver', 'Mutton Liver', 'Heart', 'Kidney', 'Offal Mix'] },
        { name: 'Prawns & Crabs', icon: '🦐', subcategories: ['Fresh Prawns', 'Crab Meat', 'Lobster', 'Shrimp', 'Seafood Mix'] },
        { name: 'Eggs', icon: '🥚', subcategories: ['Farm Fresh Eggs', 'Organic Eggs', 'Free Range', 'Egg Combos'] },
        { name: 'Crispy Snacks', icon: '🍤', subcategories: ['Chicken Nuggets', 'Fish Fingers', 'Prawn Tempura', 'Crispy Wings'] },
        { name: 'Combos', icon: '🍽️', subcategories: ['Family Combos', 'Party Packs', 'Weekend Specials', 'Value Combos'] },
    ];

  const heroImages = IMAGE_ASSETS.hero;

  const productImages = IMAGE_ASSETS.bestsellers;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src={IMAGE_ASSETS.logo} alt="PFM" className="h-18 w-14 object-contain" />
              <div className="hidden md:flex items-center gap-2 text-sm">
                <button onClick={() => setShowLocationModal(true)} className="flex items-center gap-1 font-semibold hover:text-red-600 transition-colors">
                  <span>{selectedLocation}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600 max-w-[220px] truncate">{selectedAddress}</span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <input
                  className="w-full rounded-full border border-gray-200 bg-gray-50/70 px-5 py-2.5 pr-12 text-sm focus:border-red-400 focus:bg-white focus:outline-none"
                  placeholder="Search for any delicious product"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const query = e.target.value.trim();
                      if (query) {
                        navigate(`/search?q=${encodeURIComponent(query)}`);
                      }
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    const query = input.value.trim();
                    if (query) {
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }
                  }}
                  className="absolute right-1.5 top-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-white text-sm hover:bg-red-600"
                >
                  Search
                </button>
              </div>
            </div>

            <nav className="flex items-center gap-5 text-sm">
              <button onClick={() => setShowCategoriesModal(true)} className="hidden sm:inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4z" />
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 17l9 4 9-4" />
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 4 9-4" />
                </svg>
                Categories
              </button>
              <button className="hidden md:inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 9l1-5h16l1 5" />
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v10H4z" />
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 14h4v6H8z" />
                </svg>
                Stores
              </button>

              <div className="relative" ref={profileRef}>
                <button onClick={handleLoginClick} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 22a8 8 0 1116 0" />
                  </svg>
                  <span className="hidden sm:inline">{isLoggedIn ? 'User' : 'Login'}</span>
                  {isLoggedIn && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* User Profile Dropdown - Only show when logged in and profile is open */}
                {isLoggedIn && profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        <div className="font-medium">Welcome!1212</div>
                        <div className="text-xs">{userProfile?.phone ? `+91 ${userProfile.phone}` : 'User'}</div>
                      </div>
                      <button onClick={() => { setProfileOpen(false); navigate('/profile'); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Account
                      </button>
                      <button onClick={() => { setProfileOpen(false); navigate('/rewards'); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        My Rewards
                      </button>
                      <button onClick={() => { setProfileOpen(false); navigate('/orders'); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        My Orders
                      </button>
                      <button onClick={() => { setProfileOpen(false); navigate('/refer'); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Refer a friend
                      </button>
                      <hr className="my-1" />
                      <button onClick={() => { setProfileOpen(false); handleLogout(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative inline-flex items-center">
                <button onClick={handleCartClick} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <svg className="w-5 h-5 translate-y-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 5h2l2.4 10.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 7H6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="20" r="1.6" strokeWidth="1.8" />
                    <circle cx="18" cy="20" r="1.6" strokeWidth="1.8" />
                  </svg>
                  <span>Cart</span>
                  {getCartCount() > 0 && (
                    <div className="ml-2 hidden sm:flex items-center rounded-xl border border-red-300 bg-white px-3 py-1.5">
                      <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 5h2l2.4 10.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 7H6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="20" r="1.4" strokeWidth="1.6" />
                        <circle cx="18" cy="20" r="1.4" strokeWidth="1.6" />
                      </svg>
                      <div className="ml-2 leading-4">
                        <div className="text-xs font-bold text-red-700">{getCartCount()} items</div>
                        <div className="text-xs font-semibold text-red-600">₹{getCartTotal()}</div>
                      </div>
                    </div>
                  )}
                </button>
                {showEmptyCartTip && (
                  <div className="absolute top-full mt-2 right-0 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-xl px-4 py-2 w-28 leading-5 text-left">
                    <span className="block">Cart</span>
                    <span className="block">is empty</span>
                    <span className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-slate-900"></span>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {showCategoriesModal && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[720px] z-50">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="border-r border-gray-100 bg-white">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="divide-y divide-gray-100">
                      {categoriesTypesLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                          <span className="ml-2 text-sm text-gray-600">Loading categories...</span>
                        </div>
                      ) : categoriesWithTypes.length > 0 ? (
                        categoriesWithTypes.map((category, idx) => (
                          <button
                            key={category._id || idx}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`w-full text-left p-3 flex items-center gap-3 hover:bg-gray-50 ${selectedCategory === category.name ? 'bg-gray-50' : ''}`}
                          >
                            <span className="text-2xl">{getCategoryIcon(category.name)}</span>
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </button>
                        ))
                      ) : (
                        <div className="py-6 text-sm text-gray-500">No categories available</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50">
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-6">{selectedCategory} Types</h3>
                    <div className="space-y-2">
                      {(() => {
                        const selected = categoriesWithTypes.find(c => c.name === selectedCategory);
                        const list = selected?.typeCategories || [];
                        if (list.length === 0) {
                          return <div className="text-gray-500 text-sm">No types available</div>;
                        }
                        return list.map((tc, i) => (
                          <button
                            key={tc._id || i}
                            onClick={() => navigate(`/categories/${(selectedCategory || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}/${(tc.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}?typeId=${tc._id || ''}`)}
                            className="w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded px-2 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center border border-gray-100">
                                <span className="text-sm font-semibold text-gray-700">{(tc.name || 'Type').slice(0,2)}</span>
                    </div>
                              <span className="text-sm font-medium">{tc.name}</span>
                            </div>
                          </button>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <p className="text-rose-500 font-semibold">Welcome</p>
              <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">Chicken Curry Cut & more</h1>
              <p className="mt-2 text-sm text-gray-600">Starting at</p>
              <div className="mt-2 flex items-end gap-3">
                <div className="text-3xl font-extrabold text-gray-900">₹160</div>
                <div className="text-gray-400 line-through">₹193</div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button className="inline-flex items-center rounded-full bg-red-500 px-5 py-2 text-white text-sm font-semibold hover:bg-red-600">Shop now</button>
                <img src="https://www.licious.in/img/default/licious-logo.svg" alt="Licious" className="h-5" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            </div>
            <div className="relative p-6 md:p-0 flex items-center justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
                <div className="flex animate-[slide_18s_linear_infinite]" style={{ gap: '0' }}>
                  {heroImages.map((src, i) => (
                    <div key={i} className="min-w-full aspect-square bg-white/50 flex items-center justify-center">
                      <img src={src} alt="hero" className="h-64 md:h-80 object-contain" onError={(e) => { e.target.src = '/logo.png'; }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers (images removed, cards retained) */}
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
          {bestSellingLoading ? (
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
          ) : (
            <div className="flex gap-4 w-max">
              {bestSellingProducts.length > 0 ? (
                bestSellingProducts.map((product, idx) => (
              <div key={idx} className="group rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-shadow w-56 min-w-[220px]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-50">
                      {product.image && (
                        <img src={product.image} alt={product.title} className="h-full w-full object-contain p-6" onError={(e) => { e.target.style.display = 'none'; }} />
                      )}
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-100">Today in 30 mins</div>
                      {getItemQty(product.title) > 0 ? (
                    <div className="absolute bottom-3 right-3 inline-flex items-center rounded-full bg-white/90 border border-gray-200 shadow-sm">
                          <button onClick={() => decrementItem(product.title)} className="px-3 py-1 text-lg leading-none">-</button>
                          <span className="px-2 text-sm min-w-[20px] text-center">{getItemQty(product.title)}</span>
                          <button onClick={() => incrementItem(product.title)} className="px-3 py-1 text-lg leading-none">+</button>
                    </div>
                  ) : (
                        <button onClick={() => addItemToCart({ id: product.title, title: product.title, price: product.price, mrp: product.mrp })} className="absolute bottom-3 right-3 rounded-full bg-white/90 border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-900 hover:bg-white">+</button>
                  )}
                </div>
                <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-gray-900 text-sm">{product.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">{product.weight}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                        <span className="ml-auto text-xs text-emerald-600 font-semibold">{Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100))}% off</span>
                  </div>
                      {getItemQty(product.title) > 0 ? (
                    <div className="mt-3 w-full inline-flex items-center justify-between rounded-full border border-red-200 bg-red-50 text-red-700">
                          <button onClick={() => decrementItem(product.title)} className="px-4 py-2 text-lg">-</button>
                          <span className="text-sm font-semibold">{getItemQty(product.title)} added</span>
                          <button onClick={() => incrementItem(product.title)} className="px-4 py-2 text-lg">+</button>
                    </div>
                  ) : (
                        <button onClick={() => addItemToCart({ id: product.title, title: product.title, price: product.price, mrp: product.mrp })} className="mt-3 w-full rounded-full bg-red-500 py-2 text-white text-sm font-semibold hover:bg-red-600">Add to Cart</button>
                  )}
                </div>
              </div>
                ))
              ) : null}
          </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by categories</h2>
          <p className="text-gray-600 mt-2">Freshest meats and much more!</p>
        </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categoriesLoading ? (
                      // Loading skeleton
                      Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="aspect-square bg-gray-200 rounded-full mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        </div>
                      ))
                    ) : (
                      (apiCategories.length > 0 ? apiCategories : categories).map((category, index) => (
            <div key={category._id || index} className="cursor-pointer" onClick={() => {
              const safeSlug = (category?.slug
                || (category?.name || '')).toString()
                  .toLowerCase()
                  .replace(/[&]/g, 'and')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '');
              if (safeSlug) navigate(`/categories/${safeSlug}`);
            }}>
              <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center mb-3 shadow-none overflow-hidden">
                {category.img || category.image ? (
                  <img src={(category.img || category.image)} alt={category.name} className="w-full h-full object-cover rounded-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                ) : null}
              </div>
              <p className="text-center text-sm font-medium text-gray-900">{category.name}</p>
            </div>
                      ))
                    )}
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-500 flex items-center justify-between">
        </div>
      </footer>

      {/* Categories Modal (full) */}
      {showCategoriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 flex h-[80vh]">
            <div className="w-1/3 border-r border-gray-100 pr-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <button onClick={() => setShowCategoriesModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="space-y-2">
                {categoriesTypesLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                    <span className="ml-2 text-sm text-gray-600">Loading categories...</span>
                  </div>
                ) : (
                  (categoriesWithTypes || []).map((category, idx) => (
                  <button
                      key={category._id || idx}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${selectedCategory === category.name ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'}`}
                  >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-100">
                        {(category.img || category.image) ? (
                          <img src={(category.img || category.image)} alt={category.name} className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
                    ) : null}
                      </span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                  ))
                )}
              </div>
            </div>
            <div className="w-2/3 pl-4 overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{selectedCategory || 'Select a category'}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(() => {
                  const selected = categoriesWithTypes.find(c => c.name === selectedCategory);
                  const list = selected?.typeCategories || [];
                  if (list.length === 0) {
                    return <div className="text-gray-500 text-sm">No types available</div>;
                  }
                  return list.map((tc, idx) => (
                  <button
                      key={tc._id || idx}
                      onClick={() => navigate(`/categories/${(selectedCategory || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}/${(tc.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}?typeId=${tc._id || ''}`)}
                      className="text-left p-4 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-3"
                    >
                      <span className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center border border-gray-100">
                        {tc.img ? (
                          <img src={tc.img} alt={tc.name} className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.src='/logo.png'; }} />
                        ) : (
                          <span className="text-sm font-semibold text-gray-700">{(tc.name || 'T').slice(0,2)}</span>
                        )}
                      </span>
                      <h4 className="font-medium">{tc.name}</h4>
                  </button>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <div className="text-sm text-gray-500">Your cart is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-3 border rounded-lg p-3">
                    <img src={item.image || '/logo.png'} alt={item.title} className="w-16 h-16 object-contain rounded" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-red-600 font-semibold">₹{item.price}</span>
                        {item.mrp && <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>}
                      </div>
                      <div className="mt-2 inline-flex items-center rounded-full border px-2">
                        <button onClick={() => decrementItem(item.id)} className="px-2 text-lg">-</button>
                        <span className="px-2 text-sm">{item.qty}</span>
                        <button onClick={() => incrementItem(item.id)} className="px-2 text-lg">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600">✕</button>
                  </div>
                ))
              )}
            </div>
            <div className="border-t p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="rounded-lg bg-green-50 text-green-700 text-sm p-3">
                Congratulations, Your delivery charge is waived off!!!
              </div>
              <button onClick={() => { localStorage.setItem('cartTotal', String(getCartTotal())); setCartOpen(false); navigate('/addresses'); }} className="w-full mt-2 rounded-lg bg-red-600 text-white py-3 font-semibold hover:bg-red-700">Proceed</button>
            </div>
          </div>
        </div>
      )}

      <AuthDrawer open={authOpen} onClose={() => { setAuthOpen(false); setPendingProduct(null); }} onLoginSuccess={() => {
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            setIsLoggedIn(true);
            setUserProfile(user);
            if (pendingProduct) {
              addItemToCart(pendingProduct);
              setPendingProduct(null);
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
        setAuthOpen(false);
      }} />

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Location</h3>
              <button
                onClick={() => {
                  setShowLocationModal(false);
                  setLocationError(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search for your location"
                className="w-full rounded-lg border border-gray-200 pl-10 pr-32 py-2.5 text-sm focus:border-red-400 focus:outline-none"
                autoFocus
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                onClick={handleUseCurrentLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use current location
              </button>
            </div>

            {locationError && (
              <div className="mt-4">
                {locationError === 'Please allow location access when prompted by your browser' ? (
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Location Permission Required</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>{locationError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-red-50 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Location Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{locationError}</p>
                          {locationError.includes('enable location access') && (
                            <p className="mt-2">
                              To enable location: <br />
                              1. Click the lock/info icon in your browser's address bar <br />
                              2. Allow location access for this site <br />
                              3. Refresh the page and try again
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}