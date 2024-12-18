import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from '@/components/pages/HomePage';
import AuthCallbackPage from "./components/pages/AuthCallbackPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./components/pages/ManageRestaurantPage";
import SearchPage from "./components/pages/SearchPage";
import RestaurantDetailPage from "./components/pages/RestaurantDetailPage";
import OrderStatusPage from "./components/pages/OrderStatusPage";


const AppRoutes = () => {
  return (
   
    <Routes> 
        <Route element={<ProtectedRoute />}>
          <Route path="/order-status" element={<Layout> <OrderStatusPage /> </Layout>} /> 
        </Route> 
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<Layout> <UserProfilePage /> </Layout>} /> 
        </Route> 
        <Route path="/manage-restaurant" element={<Layout> <ManageRestaurantPage /> </Layout>} />        
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="/search/:city" element={<Layout><SearchPage /></Layout>}/>
        <Route path="/detail/:restaurantId" element={<Layout><RestaurantDetailPage /></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>} />
        <Route path="/" element = {<Layout showHero > <HomePage /> </Layout> } />  
     </Routes>   
  )
}

export default AppRoutes;