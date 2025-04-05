
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
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
        </div>
        
        <div className="flex items-center gap-4">
          <NavLink to="/donate">
            <Button variant="outline" className="border-blood text-blood hover:bg-blood hover:text-white">
              Donate Now
            </Button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
