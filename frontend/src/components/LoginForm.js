import React, { useState } from 'react';

const LoginForm = ({ onSwitchToSignup, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Please fill in both username and password fields.');
      return;
    }
    // Reset error message if no error
    setErrorMessage('');
    // Call the login handler function
    onLogin({ username, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <div style={{ marginBottom: '10px' }}>
        <span style={{ color: 'red', display: 'block', fontSize: '14px' }}>{errorMessage}</span>
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div>
        <button type="button" onClick={onSwitchToSignup}>Switch to Signup</button>
      </div>
    </form>
  );
};

export default LoginForm;


