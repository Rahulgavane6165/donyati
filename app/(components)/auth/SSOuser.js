import GithubButton from "./signinbtns/GithubSignin";
import GoogleButton from "./signinbtns/GoggleSignin";
import MicrosoftButton from "./signinbtns/MicrosoftSignin";
import React from "react";

function SSOUser({ handleBackButton }) {
  return (
    <div className="w-72  bg-white p-8 pt-4 rounded shadow-md flex flex-col">
      <div className="flex mb-2 justify-between">
        <h5 className="text mb-3">Sign up with</h5>
        {/* <p onClick={flipcard}> Go back</p> */}
        <p onClick={handleBackButton} class="relative hover:cursor-pointer inline-flex items-center justify-center p-1 px-6 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
            <svg class="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span class="flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease-in-out">Go Back</span>
        </p>
      </div>
      <GoogleButton />
      <GithubButton />
      <MicrosoftButton />
    </div>
  );
}

export default SSOUser;
