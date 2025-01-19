// import {React} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BundleNavbar from './components/BundleNavbar'

import ProductDetail from './BundlesPage/ProductDetail'
import BundlesPage from './BundlesPage/BundlesHome'

const Bundles = () => {
  return (
    <div className='bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen'>
      <BundleNavbar />
      <div className='container mx-auto'>
        <Routes>
          <Route path='/' element={<BundlesPage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default Bundles
