

import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

import Landing from "./pages/Landing";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Budgets from "./pages/Budgets";
import Savings from "./pages/Savings";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {

  return (

    <Routes>

      {/* Public */}

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

      </Route>

      {/* Protected */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/expenses" element={<Expenses />} />

          <Route path="/income" element={<Income />} />

          <Route path="/budgets" element={<Budgets />} />

          <Route path="/savings" element={<Savings />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            element={<AdminRoute />}
          >

            <Route path="/admin" element={<Admin />} />

          </Route>

        </Route>

      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>

  );

}