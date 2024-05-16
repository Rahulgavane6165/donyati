// components/GithubButton.js

import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react';

const GithubButton = () => {
  const handleSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <button
    onClick={handleSignIn}
    className=" bg-white p-2 relative inline-block items-center  justify-center  focus:outline-none  "
  >
    <div className="relative group">
      <div className="absolute top-full  left-1/2 transform text-black -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        GitHub
      </div>
      <FaGithub style={{ fontSize: "25px" }} />
    </div>
  </button>
  );
};

export default GithubButton;
