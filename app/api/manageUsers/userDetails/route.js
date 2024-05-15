// pages/api/adminDashboard/userDetails.js

import { NextResponse } from "next/server";
import { getAllUsers } from '../../model/user';
import isAdmin from '../middleware/isAdmin';

export const GET = async (req, res) => {

  const isAdminUser = await isAdmin(req);

  if (!isAdminUser) {
    return  NextResponse.json({ message: 'Unauthorized User' }, { status: 401 })
  }

  try {
    // Fetch user details from the database using your custom function
    const users = await getAllUsers();

    // Return user details as response
    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}
