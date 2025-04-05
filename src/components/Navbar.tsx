
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Droplet, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (user?.userType === 'donor') {
      navigate('/donor-dashboard');
    } else if (user?.userType === 'bloodbank') {
      navigate('/bloodbank-dashboard');
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-blood">
          <Droplet className="h-6 w-6 fill-blood" />
          <span className="text-xl font-semibold">Life Share</span>
        </NavLink>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "font-medium text-blood" : "text-gray-600 hover:text-blood transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? "font-medium text-blood" : "text-gray-600 hover:text-blood transition-colors"
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/donate" 
            className={({ isActive }) => 
              isActive ? "font-medium text-blood" : "text-gray-600 hover:text-blood transition-colors"
            }
          >
            Donate
          </NavLink>
          <NavLink 
            to="/request" 
            className={({ isActive }) => 
              isActive ? "font-medium text-blood" : "text-gray-600 hover:text-blood transition-colors"
            }
          >
            Request Blood
          </NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-blood text-blood hover:bg-blood hover:text-white">
                  <User className="mr-2 h-4 w-4" /> {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDashboardClick}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/login">
              <Button variant="outline" className="border-blood text-blood hover:bg-blood hover:text-white">
                Login
              </Button>
            </NavLink>
          )}
          <NavLink to="/donate">
            <Button className="bg-blood hover:bg-blood/90 text-white">
              Donate Now
            </Button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
