import React from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '../styles/Login.css';

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
      <div className="flex h-screen overflow-hidden">
        
      <div className="login-page flex h-screen overflow-hidden">
  <div className="w-1/2 welcome-container gradient-border">
    <h1 className="text-4xl font-bold mb-4">Welcome to Your Chatbot!</h1>
    <p className="text-lg text-gray-400">
      Seamless conversations, powered by AI. Log in to get started!
    </p>
    <a href="/chatbot" className="guest-link">
      Continue as Guest →
    </a>
  </div>

  <div className="w-1/2 auth-container">
    <Authenticator />
  </div>
</div>

      </div>
    </ThemeProvider>
  );
};

export default Login;
