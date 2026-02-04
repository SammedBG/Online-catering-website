import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <h2>Admin Panel</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/admin">Dashboard</Link></li>
                        {/* Add more admin links here later, e.g., Menu Management */}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="admin-content">
                <header className="admin-header">
                    <h3>Welcome, Admin</h3>
                    <div className="admin-profile">
                        <span className="admin-avatar">A</span>
                    </div>
                </header>
                <div className="admin-page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
