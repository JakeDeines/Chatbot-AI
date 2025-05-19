import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react'; // ✅ Import provider
import Chatbot from './components/Chatbot';
import Login from './components/Login';

const App = () => {
  return (
    <Authenticator.Provider> {/* ✅ Wrap entire app */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
};

export default App;
// redeploy trigger