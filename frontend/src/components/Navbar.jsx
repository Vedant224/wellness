import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HiOutlineMenu, HiOutlineX, HiOutlineViewGrid, HiOutlineCollection, HiOutlineLogout, HiOutlineLogin, HiOutlineUserAdd } from 'react-icons/hi';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300 flex items-center">
          Wellness Sessions
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`font-medium transition-colors flex items-center ${isActive('/dashboard') ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-300'}`}
              >
                <HiOutlineViewGrid className="mr-1 h-5 w-5" />
                Dashboard
              </Link>
              <Link 
                to="/my-sessions" 
                className={`font-medium transition-colors flex items-center ${isActive('/my-sessions') ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-300'}`}
              >
                <HiOutlineCollection className="mr-1 h-5 w-5" />
                My Sessions
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-1 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors flex items-center"
              >
                <HiOutlineLogout className="mr-1 h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login link with correct active/inactive styling */}
              <Link 
                to="/login" 
                className={`px-4 py-1 flex items-center rounded transition-colors ${
                  isActive('/login') 
                    ? 'bg-purple-700 text-white' 
                    : 'border border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <HiOutlineLogin className="mr-1 h-5 w-5" />
                Login
              </Link>

              {/* Register link with correct active/inactive styling */}
              <Link 
                to="/register" 
                className={`px-4 py-1 flex items-center rounded transition-colors ${
                  isActive('/register') 
                    ? 'bg-purple-700 text-white' 
                    : 'border border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <HiOutlineUserAdd className="mr-1 h-5 w-5" />
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-indigo-300 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 
              <HiOutlineX className="h-6 w-6" /> : 
              <HiOutlineMenu className="h-6 w-6" />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-2">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3 py-3">
                <Link 
                  to="/dashboard" 
                  className={`font-medium py-2 px-3 rounded-md flex items-center ${isActive('/dashboard') ? 'bg-indigo-900/30 text-indigo-300' : 'text-gray-300'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HiOutlineViewGrid className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
                <Link 
                  to="/my-sessions" 
                  className={`font-medium py-2 px-3 rounded-md flex items-center ${isActive('/my-sessions') ? 'bg-indigo-900/30 text-indigo-300' : 'text-gray-300'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HiOutlineCollection className="mr-2 h-5 w-5" />
                  My Sessions
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-medium py-2 px-3 rounded-md text-gray-300 flex items-center"
                >
                  <HiOutlineLogout className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 py-3">
                {/* Mobile Login with correct active/inactive styling */}
                <Link 
                  to="/login" 
                  className={`font-medium py-2 px-3 rounded-md flex items-center ${
                    isActive('/login') 
                      ? 'bg-purple-700 text-white' 
                      : 'border border-gray-700 text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HiOutlineLogin className="mr-2 h-5 w-5" />
                  Login
                </Link>
                
                {/* Mobile Register with correct active/inactive styling */}
                <Link 
                  to="/register" 
                  className={`font-medium py-2 px-3 rounded-md flex items-center ${
                    isActive('/register') 
                      ? 'bg-purple-700 text-white' 
                      : 'border border-gray-700 text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HiOutlineUserAdd className="mr-2 h-5 w-5" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;