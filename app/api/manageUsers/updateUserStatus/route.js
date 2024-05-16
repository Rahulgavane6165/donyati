import { NextResponse } from "next/server";
import isAdmin from '../middleware/isAdmin';
import {updateUserStatusByEmail} from './updateUserStatusByEmial'

export const PATCH = async (req) => {

  const isAdminUser = await isAdmin(req);

  if (!isAdminUser) {
    console.log("here also we are in ")
    return  NextResponse.json({ message: 'Unauthorized User' }, { status: 401 })
  }


  try {
   
    const updatedValue = await updateUserStatusByEmail(req);
    if(updatedValue.length > 0){
        return NextResponse.json({ updatedValue }, { status: 200 });
    }else{
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }


  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
  }



}
