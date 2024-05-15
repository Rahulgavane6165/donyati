import LoginForm from './(components)/auth/LoginForm';
// pages/login.js
import React from 'react';
import VideoBackground from './(components)/common/VideoBackground';

const LoginPage = () => {
  return (
    <div className="relative">
      <VideoBackground />
      <div className="absolute right-0 top-2 transform  mr-8 z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
