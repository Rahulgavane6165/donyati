"use client";

import { handleValidateOTP, handleVerifyEmail } from './registermethods'
import {useRef, useState} from "react";

import Checkbox from "../common/Checkbox";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Loader from "../loader/loader";
import ReactCardFlip from "react-card-flip";
import SSOUser from "./SSOuser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// import { decryptData, encryptData } from "../../api/server/utils/Crypto";

const RegisterForm = () => {
  const router = useRouter();
  const checkboxRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSSOUser, setIsSSOUser] = useState(false);
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(true);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session && session.user) {
    router.replace("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!otpVerified) {
        setError("Please verify your email")
        setIsSubmitting(false);
        return
      }

      const userType = isSSOUser ? "SSO user" : "native user";
      const response = await fetch("/api/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, checkbox1, checkbox2, checkbox3, userType, }),
      });

      const data = await response.json();
      if (!response.ok) { throw new Error(data.message); }

      toast.success("Registered");
      router.push("/");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }

    finally { }
    setIsSubmitting(false);
  };

  const handleToggle = (event) => {
    setIsSSOUser(event.target.checked);
  };

  const handleBackButton = () => {
    setIsSSOUser(false); // Set isSSOUser to false when back button is clicked
    checkboxRef.current.checked = false;
  };

  return (
    <>
      <ReactCardFlip
        flipDirection="vertical"
        isFlipped={!isSSOUser}
        className={`flex align-middle justify-center ${!isSSOUser ? "flip-slow" : "flip-fast"
          }`}
      >
        <SSOUser handleBackButton={handleBackButton} />

        <div className="w-80 bg-white px-8 pt-2 pb-6 rounded shadow-md flex flex-col">
          {isSubmitting && (<Loader />)}
          <form onSubmit={handleSubmit}>
            <div className='flex justify-between px-2 '>
              <h3 className="font-bold text-2xl mb-3">Sign up </h3>
              <div className="flex items-center mb-1">
                <label
                  className="block text-gray-700 text-sm font-bold mr-2"
                  htmlFor="isSSOUser"
                >
                  Native
                </label>
                <label
                  htmlFor="AcceptConditions"
                  className="relative h-8 w-12 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
                >
                  <input
                    type="checkbox"
                    ref={checkboxRef}
                    id="AcceptConditions"
                    className="peer sr-only"
                    autoComplete="one-time-checkbox"
                    onChange={handleToggle}
                  />
                  <span className="absolute inset-0 m-auto h-3 rounded-full bg-violet-300"></span>
                  <span className="absolute inset-y-0 start-0 m-auto size-6 rounded-full bg-violet-500 transition-all peer-checked:start-6 peer-checked:[&_>_*]:scale-0">
                    <span className="absolute inset-0 m-auto size-4 rounded-full bg-gray-200 transition">
                      {" "}
                    </span>
                  </span>
                </label>
                <label
                  className="block text-gray-700 text-sm font-bold ml-2"
                  htmlFor="isSSOUser"
                >
                  SSO
                </label>
              </div>
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border border-lime-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            {otpSent ? (
            <div className="flex pb-2 flex-row">
              <input
                className="shadow appearance-none border border-lime-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                type="text"
                label="Enter OTP"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                size="small"
                disabled={otpVerified}
              />
              <button
                variant="contained"
                type='button'
                onClick={() => handleValidateOTP(setError, setOtpVerified, otp)}
                className={`p-1 my-auto ml-2 rounded-full  ${otpVerified ? "bg-green-500" : "bg-lime-400"
                  }`}
              >
                <FaCheckCircle
                  style={{ height: "1.5em", width: "1.5em" }}
                  className="text-white"
                />
              </button>
            </div>
          ) : (
            email && (
              <button
                variant="contained"
                type='button'
                onClick={() => handleVerifyEmail(email, setOtpSent, setError)}
                className="bg-white text-sm text-lime-400 px-2 py-1 font-semibold hover:text-blue-500 ml-40  "
              >
                Verify Email
              </button>
            )
          )}

            <div className="mb-4">
              <input
                className="shadow appearance-none border border-lime-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {/* ==================== */}
            <Checkbox
              id="checkbox1"
              checked={checkbox1}
              onChange={(e) => setCheckbox1(e.target.checked)}
              label="Cloud Assurance"
            />
            <Checkbox
              id="checkbox2"
              checked={checkbox2}
              onChange={(e) => setCheckbox2(e.target.checked)}
              label="KPI"
            />
            <Checkbox
              id="checkbox3"
              checked={checkbox3}
              onChange={(e) => setCheckbox3(e.target.checked)}
              label="Allocation"
            />
            {/* ==================== */}

            <button
              className="bg-lime-500 w-full mt-3 hover:bg-lime-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline self-end"
              type="submit"
            >
              Register
            </button>
          </form>
          {error &&             
                <div className=" text-red-600 font-bold px-2 py-1 text-sm my-2 rounded-md">
                  {error}
                </div>
              }
          
          <p className="mt-3">
            Have an account?{" "}
            <strong>
              <Link className="text-blue-700 ml-3 underline" href="/">
                Sign in{" "}
              </Link>
            </strong>{" "}
          </p>
        </div>
      </ReactCardFlip>
    </>
  );
};

export default RegisterForm;
