import GithubButton from "./signinbtns/GithubSignin";
import GoogleButton from "./signinbtns/GoggleSignin";
import MicrosoftButton from "./signinbtns/MicrosoftSignin";
import React from "react";

function SSOUser() {
  return (
    <div className="w-72  bg-white p-8 pt-4 rounded shadow-md flex flex-col">
      <h3 className=" text-xl mb-5">Sign up with</h3>

      <GoogleButton />
      <GithubButton />
      <MicrosoftButton />
    </div>
  );
}

export default SSOUser;
