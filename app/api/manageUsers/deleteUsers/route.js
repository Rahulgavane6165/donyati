import { NextResponse } from "next/server";
import {deleteUserByEmail} from './deleteUserbyEmail'
import isAdmin from '../middleware/isAdmin';

export const POST = async (req) => {

  const isAdminUser = await isAdmin(req);
  console.log("Got req", isAdmin)

  if (!isAdminUser) {
    console.log("here also we are in ")
    return  NextResponse.json({ message: 'Unauthorized User' }, { status: 401 })
  }


  try {
   
    const deletedValue = await deleteUserByEmail(req);
    if(deletedValue.lentgh > 0){
        return NextResponse.json({ deletedValue }, { status: 200 });
    }
    else{
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }   

  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
  }



}
