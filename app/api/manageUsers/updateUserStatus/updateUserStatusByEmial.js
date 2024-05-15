import { NextResponse } from "next/server";
import { pool } from "../../server/Lib/database";

export const updateUserStatusByEmail = async (req) => {
    const data = await req.json();
    const { email, status } = data;
  
    if (!email || !status) {
      return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
    }
  
    const query = `
      UPDATE users SET is_active = $1 WHERE email = ANY($2) RETURNING *`;
  
    try {
      const client = await pool.connect();
      const result = await client.query(query, [status, email]);
      client.release();
      console.log("Updated = ", result.rows)
      return result.rows;
    } catch (error) {
      console.error("Error updating user status:", error);
      return NextResponse.json({ message: 'Query fails' }, { status: 500 });
    }
  };
  