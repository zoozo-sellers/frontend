import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminProducts from "./components/admins/adminProducts";
import UpdateProduct from "./components/admins/updateProduct";
import AdminDashboard from "./components/admins/adminHome";
import AdminSettings from "./components/admins/adminSettings";
import AdminSales from "./components/admins/adminSales";
import UserDashboard from "./components/users/userDashboard";
import LoginPage from "./components/loginPage";
import RegistrationForm from "./components/registrationPage";
import UpdateUserForm from "./components/users/updateUser";
import Logout from "./components/logoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< LoginPage/>} />
        <Route path="/#/user-registration" element={< RegistrationForm/>} />
        <Route path="/#/admin-home" element={<AdminDashboard />} />
        <Route path="/#/sales" element={<AdminSales />} />
        <Route path="/#/products" element={<AdminProducts />} />
        <Route path="/#/settings" element={<AdminSettings />} />
        <Route path="/#/update-product/:productCode" element={<UpdateProduct />} />
        <Route path="/#/user-dashboard" element={<UserDashboard />} />
        <Route path="/#/user-settings" element={<UpdateUserForm />} />
        <Route path="/#/logout" element={<Logout />} />
      </Routes>
    </Router>
    
  );
}

export default App;
