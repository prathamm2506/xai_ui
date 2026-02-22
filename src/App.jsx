import React, { useEffect, useState } from 'react'
import Hero from './components/hero/Hero'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Profile from './components/profile/Profile'
import { LungAnalysisDashboard } from './components/dashboard/LungAnalysisDashboard'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <LungAnalysisDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
