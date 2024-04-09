import React, { useState } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from './Footer';

const LoginPage = ({onLogin}) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleSwitchToSignup = () => {
    setShowLoginForm(false);
  };

  const handleSwitchToLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        {showLoginForm && <h2>Login</h2>}
        {!showLoginForm && <h2>Signup</h2>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start' }}>
        {showLoginForm ? (
          <LoginForm onSwitchToSignup={handleSwitchToSignup} onLogin={onLogin}/>
        ) : (
          <SignupForm onSwitchToLogin={handleSwitchToLogin}/>
        )}
        <div style={{ marginLeft: '20px' }}>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;