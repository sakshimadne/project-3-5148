import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import Login from './Authpage/Login'
import Register from './Authpage/Register'
import AddCart from './pages/Addcart'
import Navbar from './pages/Navbar'
import Dashboard from './pages/Dashboard'
import Feedback from './pages/Feedback'
import BundleOffers from './pages/bundleOffer'
import StudentDiscount from './pages/StudentDiscount'
import Footer from './pages/footer'
import Bundles from './pages/Category/Category'
// import Home from './pages/Home';
// import ProductDetail from './pages/ProductDetail';
const AppLayout = () => {
  const location = useLocation()

  const hideNavbar =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/Feedback' element={<Feedback />} />
        <Route path='/explore-bundle' element={<BundleOffers />} />
        <Route path='/student-discount' element={<StudentDiscount />} />
        <Route path='/Category' element={<Bundles />} />
        <Route path="/Addcart" element={<AddCart />} />
      </Routes>
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
