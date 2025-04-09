
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white border-b laravel-shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="font-bold text-laravel text-xl">Laravel-inspired</div>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:flex ml-10 space-x-4">
                <Link
                  to="/dashboard"
                  className={`text-gray-700 hover:text-laravel px-3 py-2 rounded-md ${
                    location.pathname === "/dashboard" ? "text-laravel" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className={`text-gray-700 hover:text-laravel px-3 py-2 rounded-md ${
                    location.pathname === "/settings" ? "text-laravel" : ""
                  }`}
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <span className="text-gray-700">Welcome, {user?.name}</span>
                </div>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
