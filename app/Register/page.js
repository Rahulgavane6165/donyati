// pages/register.js

import React from "react";
import RegisterForm from "../(components)/auth/RegisterForm";
import VideoBackground from "../(components)/common/VideoBackground";

const RegisterPage = () => {
  return (
    <>
      <VideoBackground />
      <div className="absolute right-0 top-5 transform  mr-8 z-10">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
