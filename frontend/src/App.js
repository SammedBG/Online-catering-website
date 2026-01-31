import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
import ScrollToTop from "./components/scrollToTop"
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main className="container">
            <Suspense fallback={<Loading />}>
              <Routes>
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
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/Services" element={<Services />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
