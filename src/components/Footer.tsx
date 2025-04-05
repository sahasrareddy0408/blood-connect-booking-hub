
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Droplet, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-blood mb-4">
              <Droplet className="h-6 w-6 fill-blood" />
              <span className="text-xl font-semibold">Life Share</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your blood donation can save up to three lives. Join our community of donors and make a difference today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blood-accent hover:text-blood transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blood-accent hover:text-blood transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blood-accent hover:text-blood transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-600 hover:text-blood transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-600 hover:text-blood transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/donate" className="text-gray-600 hover:text-blood transition-colors">
                  Donate Blood
                </NavLink>
              </li>
              <li>
                <NavLink to="/request" className="text-gray-600 hover:text-blood transition-colors">
                  Request Blood
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blood shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Blood Center Street, Medical City, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blood" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blood" />
                <span className="text-gray-600">contact@lifeshare.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Life Share. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
