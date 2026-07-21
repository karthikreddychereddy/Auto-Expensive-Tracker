import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./components/common/ProtectedRoute";

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
import Goals from "./pages/Goals";
import AIAdvisor from "./pages/AIAdvisor";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Insights from "./pages/Insights";
import ModalContainer from "./components/common/ModalContainer";

export default function App() {

  return (

    <>

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

            <Route path="/insights" element={<Insights />} />

            <Route path="/savings" element={<Savings />} />

            <Route path="/categories" element={<Categories />} />

            <Route path="/goals" element={<Goals />} />

            <Route path="/ai-advisor" element={<AIAdvisor />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/profile" element={<Profile />} />

          </Route>

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

      {/* Global Modals */}

      <ModalContainer />

    </>

  );

}