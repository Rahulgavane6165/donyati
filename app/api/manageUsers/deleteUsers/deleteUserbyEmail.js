import { NextResponse } from "next/server";
import {pool} from '../../server/Lib/database'

export const deleteUserByEmail = async (req) => {
    const data = await req.json();
    const { email } = data;
  
    if (!email || (Array.isArray(email) && email.length === 0)) {
      return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
    }
    console.log("executing", email)
  
    const query = `
      DELETE FROM users WHERE email = ANY($1) RETURNING *`;
  
    try {
      const client = await pool.connect();
      const result = await client.query(query, [email]);
      client.release();
      console.log("deleted =", result.rows)
      return result.rows;
    } catch (error) {
      console.error("Error deleting users:", error);
      return NextResponse.json({ message: 'Query fails' }, { status: 500 });
    }
  };
  