// pages/api/send-otp.js

import { checkEmailExists, isssoUser } from '../../model/user';

import { NextResponse } from "next/server";
import { setOTP } from '../../model/otpquery';

export const POST = async (req, res) => {

  const { email } = await req.json();

  // Check if email is provided
  if (!email) {
   
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
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
  const isssouser = await isssoUser(email);
  if (isssouser) {
    return NextResponse.json({ message: 'SSO user canot reset the password' }, { status: 400 });
  }

  try {
    // Send OTP email
    const result = await setOTP(email)
    if (result.message === "OTP sent successfully") {
      // Handle successful OTP verification
      return NextResponse.json({ message: 'OTP sent successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

  } catch (error) {
    // Handle email sending error
    console.error('Error sending OTP email:', error);
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}
