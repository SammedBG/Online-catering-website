import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip token refresh if user is not logged in (no refreshToken)
    const refreshToken = localStorage.getItem("refreshToken");
    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // Clear tokens and redirect to login only if refresh fails for a logged-in user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    // If no refreshToken or refresh fails, propagate the error to the caller
    return Promise.reject(error);
  },
);

// Auth API calls
export const register = (userData) => api.post("/auth/register", userData);
export const login = (credentials) => api.post("/auth/login", credentials);
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
export const forgotPassword = (email) => api.post("/auth/forgot-password", { email });
export const resetPassword = (token, newPassword) =>
  api.post(`/auth/reset-password/${token}`, { password: newPassword });
export const getCurrentUser = () => api.get("/auth/user");

// Booking API calls
export const createBooking = (bookingData) => api.post("/bookings", bookingData);
export const getUserBookings = () => api.get("/bookings");
export const cancelBooking = (bookingId) => api.put(`/bookings/${bookingId}/cancel`);

// Admin API calls
export const getAdminBookings = () => api.get("/admin/bookings");
export const updateBookingStatus = (bookingId, status) =>
  api.put(`/admin/bookings/${bookingId}`, { status });

// Review API calls
export const getReviews = () => api.get("/reviews");
export const createReview = (reviewData) => api.post("/reviews", reviewData);

// Availability API calls
export const getUnavailableDates = () => api.get("/availability");
export const blockDate = (date, reason) => api.post("/availability/block", { date, reason });
export const unblockDate = (date) => api.delete(`/availability/unblock/${date}`);

export default api;