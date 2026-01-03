import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CategoryLanding from './pages/CategoryLanding'
import CategoryPage from './pages/CategoryPage'
import CategoryProducts from './pages/CategoryProducts'
import SearchResults from './pages/SearchResults'
import Addresses from './pages/Addresses'
import Profile from './pages/Profile'
import Rewards from './pages/Rewards'
import Orders from './pages/Orders'
import Refer from './pages/Refer'
import Logout from './pages/Logout'
import Login from './pages/Login'
import Info from './pages/Info'
import './App.css'

function isAuthenticated() {
  try {
    const userRaw = localStorage.getItem('user')
    const user = userRaw ? JSON.parse(userRaw) : null
    const token = localStorage.getItem('accessToken') || localStorage.getItem('customerAccessToken')
    return Boolean(user && (user.id || user._id) && token)
  } catch { return false }
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Routes>
      {/* Main Dashboard/Home */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Category Routes (direct to products) */}
      <Route path="/categories/:slug" element={<CategoryProducts />} />
      <Route path="/categories/:slug/:subcategory" element={<CategoryProducts />} />
      
      {/* Search Results */}
      <Route path="/search" element={<SearchResults />} />
      
      {/* User Account Routes */}
      <Route path="/addresses" element={<Addresses />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/refer" element={<Refer />} />
      <Route path="/login" element={<Login />} />
      
      {/* Logout */}
      <Route path="/logout" element={<Logout />} />

      {/* Info pages from footer */}
      <Route path="/info/:slug" element={<Info />} />
      
      {/* Fallback route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
