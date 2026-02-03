<<<<<<< HEAD
import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
=======
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
>>>>>>> parent of a32b659 (Merge pull request #4 from SammedBG/master)
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import About from "./pages/About"
import Gallary from "./pages/Gallary"
import Location from "./pages/Location"
import Booking from "./pages/Booking"
import LoginRegister from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Services from './pages/Services';
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import AdminDashboard from "./pages/AdminDashboard"
import { AuthProvider } from "./context/AuthContext"
import ScrollToTop from "./components/scrollToTop"
import AdminLayout from "./components/AdminLayout"
import "./styles/global.css"

<<<<<<< HEAD
// Lazy load pages
const Home = lazy(() => import("./pages/Home"))
const Menu = lazy(() => import("./pages/Menu"))
const About = lazy(() => import("./pages/About"))
const Gallary = lazy(() => import("./pages/Gallary"))
const Location = lazy(() => import("./pages/Location"))
const Booking = lazy(() => import("./pages/Booking"))
const LoginRegister = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Services = lazy(() => import("./pages/Services"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const ResetPassword = lazy(() => import("./pages/ResetPassword"))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"))

const Loading = () => <div className="loading">Loading...</div>

// Layout component for regular pages
const MainLayout = () => (
  <div className="app">
    <Header />
    <main className="container">
      <Outlet />
    </main>
    <Footer />
  </div>
);

=======
>>>>>>> parent of a32b659 (Merge pull request #4 from SammedBG/master)
const App = () => {
  return (
    <AuthProvider>
      <Router>
<<<<<<< HEAD
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Admin Routes with separate Layout */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Public/User Routes with Main Layout */}
            <Route element={<MainLayout />}>
=======
      <ScrollToTop />
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
>>>>>>> parent of a32b659 (Merge pull request #4 from SammedBG/master)
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallary" element={<Gallary />} />
              <Route path="/location" element={<Location />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
<<<<<<< HEAD
              <Route path="/Services" element={<Services />} />
            </Route>
          </Routes>
        </Suspense>
=======
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/Services" element={<Services />} />
            </Routes>
          </main>
          <Footer />
        </div>
>>>>>>> parent of a32b659 (Merge pull request #4 from SammedBG/master)
      </Router>
    </AuthProvider>
  )
}

export default App
