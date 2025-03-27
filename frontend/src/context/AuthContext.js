import React, { createContext, useState, useContext, useEffect } from "react"
import * as api from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken")
      if (token) {
        try {
          const response = await api.getCurrentUser()
          setUser(response.data)
        } catch (error) {
          console.error("Error fetching user:", error)
          logout()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password })
      const { accessToken, refreshToken } = response.data
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      const userResponse = await api.getCurrentUser()
      setUser(userResponse.data)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.register({ name, email, password })
      const { accessToken, refreshToken } = response.data
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      const userResponse = await api.getCurrentUser()
      setUser(userResponse.data)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    api.logout()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

