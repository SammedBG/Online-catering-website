import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
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
import "./styles/global.css"

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
        <div className="app">
          <Header />
          <main className="container">
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
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
