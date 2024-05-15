import { signIn } from 'next-auth/react';

const MicrosoftButton = () => {
  const handleSignIn = () => {
    signIn('azure-ad', { callbackUrl: '/dashboard' }); 
  };

  return (
    <button
      onClick={handleSignIn}
     className="bg-black hover:bg-balck focus:bg-balck focus:ring-offset-red-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-full text-white py-2 px-3 rounded focus:shadow-outline self-end mt-3">
    Continue with Microsoft
    </button>
  );
};

export default MicrosoftButton;
