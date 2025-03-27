import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Auth.css"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      console.log("Attempting to", isLogin ? "login" : "register")
      if (isLogin) {
        console.log("Login data:", { email, password })
        await login(email, password)
      } else {
        console.log("Register data:", { name, email, password })
        await register(name, email, password)
      }
      console.log("Authentication successful")
      navigate("/")
    } catch (error) {
      console.error("Authentication error:", error)
      setError(error.response?.data?.message || `An error occurred during ${isLogin ? "login" : "registration"}`)
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError("")
  }

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required={!isLogin} />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={toggleAuthMode} className="toggle-auth-mode">
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
      {isLogin && (
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      )}
    </div>
  )
}

export default AuthPage

