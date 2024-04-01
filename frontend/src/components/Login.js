import React from 'react';
import Header from './Header'; // Assuming you have imported the Header component
import Footer from './Footer'; // Import the Footer component

const Login = () => {
  return (
    <div>
      <Header />
      {/* Your login page content goes here */}
      <h1>Login Page</h1>
      {/* Other login page content */}
      <Footer /> {/* Place the Footer component at the bottom */}
    </div>
  );
};

export default Login;
