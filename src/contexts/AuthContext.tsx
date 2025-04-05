
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { authService } from "../services/api";
import { toast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  userType: "donor" | "bloodbank";
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  
  // Check for existing user session in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        userType: response.data.userType
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      return Promise.resolve();
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || 'Login failed. Please check your credentials.';
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
      
      return Promise.reject(error);
    }
  };

  const register = async (userData: any) => {
    try {
      await authService.register(userData);
      
      toast({
        title: "Registration successful",
        description: "You can now login with your credentials.",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || 'Registration failed. Please try again.';
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
      
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
