import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/registex'
import AdminLayout from './components/admin/layout'
import AdminOrders from './pages/admin/order'
import AdminProducts from './pages/admin/products'
import AdminFeatures from './pages/admin/features'
import AdminDashboard from './pages/admin/dashboard'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/commom/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'


const App = () => {

  const {isAuthenticated,user, isLoading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if (isLoading) {
    return(
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        
        {/* Loading Text */}
        <div className="text-lg font-medium text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* common component */}
      <Routes>

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>


        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth> 
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        <Route path="*" element={<NotFound />} />


        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
        }>
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='home' element={<ShoppingHome />} />
          <Route path='account' element={<ShoppingAccount />} />
        </Route>


        <Route path='/unauth-page' element={<UnauthPage />} />

      </Routes>
    </div>
  )
}

export default App