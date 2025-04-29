import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Auth from './components/FirebaseLogin';
import AuthProvider from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot page accessible */}
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
