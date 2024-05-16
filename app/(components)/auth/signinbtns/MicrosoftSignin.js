import Image from "next/image";
import { signIn } from "next-auth/react";

const MicrosoftButton = () => {
  const handleSignIn = () => {
    signIn("azure-ad", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-white p-1 relative inline-block items-center justify-center focus:outline-none"
    >
      <div className="relative group">
        <div className="absolute top-full left-1/2 transform text-black -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Microsoft
        </div>
        <Image
          src="/assets/microsoft.png"
          alt="Microsoft"
          style={{ width: "25px", height: "25px" }}
          height={30}
          width={30}
        />
      </div>
    </button>
  );
};

export default MicrosoftButton;
