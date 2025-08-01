import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import SessionDetails from './pages/SessionDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Removed py-8 padding to allow pages to manage their own spacing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/my-sessions" element={
            <PrivateRoute>
              <MySessions />
            </PrivateRoute>
          } />
          <Route path="/session/:id" element={
            <PrivateRoute>
              <SessionDetails />
            </PrivateRoute>
          } />
          <Route path="/editor" element={
            <PrivateRoute>
              <SessionEditor />
            </PrivateRoute>
          } />
          <Route path="/editor/:id" element={
            <PrivateRoute>
              <SessionEditor />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;