import { NextResponse } from "next/server";
import isAdmin from '../middleware/isAdmin';
import {updateUserGroupAndAccessType} from './updateByEmail'

export const POST = async (req) => {

  const isAdminUser = await isAdmin(req);

  if (!isAdminUser) {
    console.log("here also we are in ")
    return  NextResponse.json({ message: 'Unauthorized User' }, { status: 401 })
  }


  try {
   
    const updatedValue = await updateUserGroupAndAccessType(req);

    // Return user details as response
    return NextResponse.json({ updatedValue }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
  }



}
