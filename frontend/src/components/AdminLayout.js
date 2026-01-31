import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin Panel</h2>
                </div>
                <nav className="admin-nav">
                    <ul>
                        <li><Link to="/admin" className="active">Dashboard</Link></li>
                        {/* Future admin links can go here, e.g., Users, Menu Management */}
                        <li><Link to="/">View Site</Link></li>
                    </ul>
                </nav>
                <div className="admin-footer">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </aside>
            <main className="admin-content">
                <header className="admin-header">
                    <h3>Overview</h3>
                    <div className="admin-profile">
                        <span>Admin</span>
                        <div className="avatar">A</div>
                    </div>
                </header>
                <div className="admin-page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
