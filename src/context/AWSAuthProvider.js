import React, { createContext, useContext, useEffect, useState } from "react";
import { Amplify } from "aws-amplify"; 
import AWSConfig from "../config/AWSConfig"; // Ensure this path is correct

import {
  signIn as awsSignIn,
  signOut as awsSignOut,
  signUp,
  getCurrentUser,
} from "aws-amplify/auth";

// Configure AWS Amplify
Amplify.configure(AWSConfig);

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {  // ✅ Notice: `AuthProvider`, not `AWSAuthProvider`
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        setUser(authenticatedUser);
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  // Sign in method
  const signIn = async (username, password) => {
    try {
      const user = await awsSignIn({ username, password });
      setUser(user);
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  // Sign out method
  const signOut = async () => {
    await awsSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Correct Export
export default AuthProvider;
