// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/Auth/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import BudgetList from './components/Dashboard/BudgetList';
import BudgetChart from './components/Dashboard/BudgetChart';
import ConfigureBudget from './components/Dashboard/ConfigureBudget';
import AddBudget from './components/Dashboard/AddBudget';
import authService from './components/services/authService';
import TokenRefreshModal from './components/TokenRefreshModal';
import './styles/style.css';

const Home = () => (
  <div>
    <h1>Welcome to the Budget App</h1>
    <h2>Your personalized budget management solution.</h2>
    <Link to="/login">
      <button>Login</button>
    </Link>
    <Link to="/signup">
      <button>Signup</button>
    </Link>
  </div>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isTokenRefreshModalOpen, setTokenRefreshModalOpen] = useState(false);

  // Function to set login status
  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (authService.checkTokenExpiration()) {
        // Token is about to expire, show the modal
        setTokenRefreshModalOpen(true);
      }
    };

    checkTokenExpiration();
  }, []);

  const handleRefreshToken = async () => {
    try {
      // Call the refresh token function from authService
      await authService.refreshAccessToken();
      // Close the modal after refreshing the token
      setTokenRefreshModalOpen(false);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard token={token} /> : <Navigate to="/login" />}
          />
          {isLoggedIn && (
            <>
              <Route path="/dashboard/budget-list" element={<BudgetList />} />
              <Route path="/dashboard/budget-chart" element={<BudgetChart />} />
              <Route path="/dashboard/configure-budget" element={<ConfigureBudget />} />
              <Route path="/dashboard/add-budget" element={<AddBudget token={token} />} />
            </>
          )}
        </Routes>
        <ToastContainer />
        <TokenRefreshModal
          isOpen={isTokenRefreshModalOpen}
          onRefresh={handleRefreshToken}
          onClose={() => setTokenRefreshModalOpen(false)}
        />
      </AuthProvider>
    </Router>
  );
};

export default App;
