import React from "react"
import { useNavigate } from "react-router-dom"

const LoginDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const LoginRegister = () => {
    navigate("/login")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-4">You need to be logged in to make a booking. Would you like to log in now?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={LoginRegister} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginDialog

