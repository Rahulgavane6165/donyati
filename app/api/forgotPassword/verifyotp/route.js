// pages/api/send-otp.js

import { NextResponse } from "next/server";
import { checkEmailExists } from '../../model/user';
import { verifyOTP } from '../../model/otpquery';

export const POST = async (req, res) => {

  const { email , otp} = await req.json();

  // Check if email is provided
  if (!email || !otp) {

    return NextResponse.json({ message: 'Email and otp are  required' }, { status: 400 });
  }

  // Check if email format is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
  }

  // Check if email exists in database (replace this with your own database check)
  const emailExists = await checkEmailExists(email); // Replace this with your database check

  if (!emailExists) {
    return NextResponse.json({ message: 'Email Does not exists in databse' }, { status: 400 });
  }

    try {
    // Send OTP email
    const result =  await verifyOTP(email, otp)
    console.log(result);
    if (result.message === "OTP verified successfully") {
      // Handle successful OTP verification
      return NextResponse.json({ message: 'OTP verified successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }
        
  } catch (error) {
    // Handle email sending error
    console.error('Error sending OTP email:', error);
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}
