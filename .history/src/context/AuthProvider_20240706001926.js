import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //unsubscribe (cancel from user)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    if (!auth.currentUser) {
      signInAnonymously(auth).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 6000); // Clear error message after 6 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, error, signInWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
