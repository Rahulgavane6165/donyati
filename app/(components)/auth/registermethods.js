import { decryptData, encryptData } from "../../api/server/utils/Crypto";

import { toast } from "react-toastify";

const storeOTP = (otp) => {
    console.log(otp);
    const encryptedOTP = encryptData(otp);

    localStorage.setItem("otp", encryptedOTP);
  };


  const retrieveOTP = () => {
    const encryptedOTP = localStorage.getItem("otp");
    if (encryptedOTP) {
      const decryptedotp = decryptData(encryptedOTP);
      return decryptedotp;
    }
    return null;
  };

const handleVerifyEmail = async (email, setOtpSent, setError, setIsSubmitting ) => {
  setIsSubmitting(true)
    try {
      const responseEmail = await fetch(`/api/checkUserExists?email=${email}`, {
        method: "GET",
      });
      const { emailExists } = await responseEmail.json();

      if (emailExists) {
        setError("Email already Exits")
        return
      }

      const response = await fetch("/api/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const otp = responseData.otp;
        storeOTP(otp);
        setOtpSent(true);
        toast.success("OTP sent")
        setError("");
      } else {
        throw new Error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);

      setError(error.message || "Error sending OTP. Please try again later.");
    }finally{
      setIsSubmitting(false)
    }
  };

  const handleValidateOTP = async (setError,setOtpVerified, otp) => {
    try {
      const storedEncryptedOTP = retrieveOTP();

      if (storedEncryptedOTP) {
        if (otp === storedEncryptedOTP) {
          setOtpVerified(true);
          localStorage.removeItem("otp");
          setError("")
          toast.success("OTP verified");
        } else {
            setError("Invalid OTP");
        }
      } else {
        toast.error("no otp in storage");
      }
    } catch (error) {
      setError("Error validating OTP. Please try again later.");
      console.error("Error validating OTP:", error);
    }
  };

//   const handleSubmit = async (setIsSubmitting, otpVerified, isSSOUser, email,password,checkbox1,checkbox2, checkbox3, setError) => {
//     alert("handleSubmit")
//     setIsSubmitting(true);
    
//     try {
//       if (!otpVerified) {
//         setError("Varify you emial")
//         // setIsSubmitting(false);
//         return
//       }
      
//       const userType = isSSOUser ? "SSO user" : "native user";
//       const response = await fetch("/api/Register", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ email,password,checkbox1,checkbox2, checkbox3, userType,}),
//       });

//       const data = await response.json();
//       if (!response.ok) {throw new Error(data.message);}

//       toast.success("Registered");
//       router.push("/");
//     } catch (error) {
//       setError(error.message);
//       console.error("Registration error:", error);
//     }

//     finally{}
//     setIsSubmitting(false);
//   };

  export{storeOTP, retrieveOTP, handleVerifyEmail, handleValidateOTP};