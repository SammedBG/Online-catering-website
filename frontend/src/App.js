import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
import ScrollToTop from "./components/scrollToTop"
import AdminLayout from "./components/AdminLayout"
import "./styles/global.css"

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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Admin Routes with separate Layout */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Public/User Routes with Main Layout */}
            <Route element={<MainLayout />}>
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
              <Route path="/Services" element={<Services />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

export default App
