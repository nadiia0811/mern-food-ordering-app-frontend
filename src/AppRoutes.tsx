import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from '@/components/pages/HomePage';
import AuthCallbackPage from "./components/pages/AuthCallbackPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";


const AppRoutes = () => {
  return (
   
    <Routes> 
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<Layout> <UserProfilePage /> </Layout>} /> 
        </Route>        
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
        <Route path="/" element = {<Layout showHero > <HomePage /> </Layout> } />  
     </Routes>   
  )
}

export default AppRoutes;