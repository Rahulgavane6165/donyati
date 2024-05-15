// components/GithubButton.js

import { signIn } from 'next-auth/react';

const GithubButton = () => {
  const handleSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-lime-400 hover:bg-lime-600 focus:bg-lime-900 focus:ring-offset-red-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-full text-white py-2 px-3 rounded focus:shadow-outline self-end mt-3">
      Continue with Github
    </button>
  );
};

export default GithubButton;
