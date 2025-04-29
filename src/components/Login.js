import React from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '../styles/Login.css'; // Make sure this path is correct for you

const customTheme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      background: { primary: '#121212' },
      brand: { primary: { '10': '#ffcc00' } },
      font: { primary: '#ffffff', secondary: '#aaaaaa' },
    },
    components: {
      authenticator: {
        backgroundColor: { value: '#1e1e1e' },
        borderRadius: { value: '8px' },
        padding: { value: '2rem' },
        boxShadow: { value: '0px 4px 10px rgba(255, 255, 255, 0.1)' },
      },
      button: {
        backgroundColor: { value: '#ffcc00' },
        color: { value: '#121212' },
        _hover: { backgroundColor: { value: '#ffdd44' } },
      },
      input: {
        backgroundColor: { value: '#333' },
        color: { value: '#fff' },
        borderColor: { value: '#ffcc00' },
      },
      label: {
        color: { value: '#ffcc00' },
      },
    },
  },
};

const Login = () => {
  return (
    <ThemeProvider theme={customTheme}>
     <div className="login-page flex flex-col lg:flex-row h-screen overflow-hidden">
        
        {/* Welcome Section */}
        <div className="welcome-container gradient-border p-6 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Your Chatbot!</h1>
          <p className="text-base md:text-lg text-gray-400 mb-6">
            Seamless conversations, powered by AI. Log in to get started!
          </p>
          <a href="/chatbot" className="guest-link">
            Continue as Guest →
          </a>
        </div>

        {/* Authenticator Section */}
        <div className="auth-container p-6 flex items-center justify-center">
          <Authenticator />
        </div>

      </div>
    </ThemeProvider>
  );
};

export default Login;
