// Import required modules
import { NextResponse } from "next/server";
import OTPGenerator from "otp-generator";
import { sendRegisterOTPEmail } from "../server/utils/sendEmail";

// POST handler for /api/sendmail
export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.error(new Error("Method Not Allowed"), { status: 405 });
  }

  const { email } = await req.json();

  const otp = OTPGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  console.log(otp);

  try {
    await sendRegisterOTPEmail(email, otp);

    // Return the OTP in the response
    return NextResponse.json(
      { message: "OTP sent successfully", otp },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.error(new Error("Failed to send OTP"), { status: 500 });
  }
}
