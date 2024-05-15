"use client";

import { useRef, useState } from "react";

import Loader from "../loader/loader";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [otplVerified, setEotpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const otpInputs = useRef([]);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isloader, setloader] = useState(false);

  const sendEmail = async () => {
    setError(null);
    setErrorMessage(""); 
    setloader(true);

    if (email.trim() === "") {
      setErrorMessage("Email is required");
      return;
    }

    try {
      const response = await fetch("/api/forgotPassword/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Check the response message to determine success or failure
        if (responseData.message === "OTP sent successfully") {
          setEmailSent(true);
          setErrorMessage("OTP is valid for 2 minutes");
          toast.success("  OTP sent your registered Email ID.");
        } else {
          setErrorMessage(responseData.message);
        }
      } else {
        // Handle different error messages from the server
        switch (response.status) {
          case 400:
            setErrorMessage(responseData.message);
            break;
          case 401:
            setErrorMessage(responseData.message);
            break;
          case 404:
            setErrorMessage(responseData.message);
            break;
          case 500:
            setErrorMessage(responseData.message);
            break;
          default:
            setErrorMessage("Unknown error occurred");
            break;
        }
      }
    } catch (error) {
      setErrorMessage("Failed to send email");
    } finally {
      setloader(false);
    }
  };

  const verifyOTP = async () => {
    setloader(true);
    if (otp.length !== 4 || !/^\d+$/.test(otp)) {
      console.error("Invalid OTP format");
      setErrorMessage("Invalid OTP");
      return;
    }

    try {
      const response = await fetch("/api/forgotPassword/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const responseData = await response.json();
      if (responseData.message === "OTP verified successfully") {
        toast.success("OTP verified");
        setEotpVerified(true);
        setErrorMessage("");
      } else {
        if (responseData.message === "Invalid OTP") {
          setErrorMessage("Invalid OTP entered");
        } else {
          setErrorMessage("An unexpected error occurred while validating OTP.");
        }
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    } finally {
      setloader(false);
    }
  };

  const resetpassword = async () => {
    setError(null);
    setErrorMessage(""); // Clear any previous error message
    setloader(true);

    if (password.trim() && confirmPassword.trim() === "") {
      setErrorMessage("password is required");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords not matching");
      return;
    }

    try {
      const response = await fetch("/api/forgotPassword/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Check the response message to determine success or failure
        if (response.ok && response.status === 201) {
          window.location.href = "/";
        } else {
          throw new Error("Something went wrong!");
        }
      } else {
        // Handle different error messages from the server
        switch (response.status) {
          case 400:
            setErrorMessage(responseData.message);
            break;
          case 401:
            setErrorMessage(responseData.message);
            break;
          case 404:
            setErrorMessage(responseData.message);
            break;
          case 500:
            setErrorMessage(responseData.message);
            break;
          default:
            setErrorMessage("Unknown error occurred");
            break;
        }
      }
    } catch (error) {
      setErrorMessage("Failed to update password");
    } finally {
      setloader(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(newOtp);

    if (value !== "" && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  return (
    <div className="w-96 bg-white p-8 pt-2 rounded shadow-md flex flex-col">
      {isloader && <Loader />}
      {true && (
        <>
          <h5 className="text mb-3">Forgot Password?</h5>
          <div className="flex flex-1 flex-col  space-y-5 -w-md mx-auto ">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-xl md:text-xl font-bold">
                Enter your email address below.
              </h2>
            </div>
            <div className="flex flex-col max-w-md space-y-5">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="flex px-3 py-1 md:px-4 md:py-2 border border-violet-400 rounded font-medium placeholder:font-normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailSent}
              />

              <button
                onClick={sendEmail}
                disabled={emailSent}
                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-2 border-2 rounded-lg font-medium bg-lime-400 hover:bg-lime-600 focus:bg-lime-900 text-white"
              >
                Confirm
              </button>
              <div className="text-green-900 font-bold">{errorMessage}*</div>
            </div>
          </div>
        </>
      )}
      {emailSent && !otplVerified && (
        <>
          <div>
            <div className="w-md mx-auto border max-w-sm mt-5 rounded">
              <form className="shadow-md px-4 py-6">
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      type="text"
                      maxLength="1"
                      pattern="[0-9]"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      required
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={verifyOTP}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Verify
                  </button>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-teal-500 border p-2 hover:text-teal-800 ml-4"
                    href="#"
                    onClick={sendEmail}
                  >
                    Resend OTP
                  </a>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {otplVerified && (
        <>
          <div className="flex mt-4 flex-col max-w-md space-y-5">
            <input
              type="password"
              placeholder="Enter new password"
              className="flex px-3 py-1 md:px-4 md:py-2 border border-lime-500 focus:border-violet-500 rounded font-medium placeholder:font-normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="flex px-3 py-1 md:px-4 md:py-2 border border-lime-500 focus:border-violet-500 rounded font-medium placeholder:font-normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={resetpassword}
              className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-2 border-2 rounded-lg font-medium bg-violet-400 hover:bg-violet-600 focus:bg-violet-900 text-white"
            >
              Reset Password
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default ForgotPasswordForm;
