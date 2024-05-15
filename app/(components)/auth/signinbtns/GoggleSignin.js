// components/GoogleButton.js

import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation"; // Import the useRouter hook

const GoogleButton = () => {
  const router = useRouter(); // Initialize the router
  const session = useSession();

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // Specify the callbackUrl to navigate to Dashboard
  };
  if (session.status === "loading") {
    return <p>Loading.....</p>;
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-violet-500 hover:bg-violet-600 focus:ring-violet-700 focus:ring-offset-red-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-full text-white py-2  rounded focus:shadow-outline"
    >
           Continue with Google
    </button>
  );
};

export default GoogleButton;
