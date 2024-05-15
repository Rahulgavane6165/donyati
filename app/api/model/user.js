// lib/userQueries.js

import bcrypt from "bcrypt";
import { pool } from "../server/Lib/database";

const createUser = async (
  name,email,password,checkbox1, checkbox2,checkbox3,usertype) => {
  const role = "user";
  let group = "";
  if (checkbox1) {
    group += "Cloud Assurance,";
  }
  if (checkbox2) {
    group += "KPI,";
  }
  if (checkbox3) {
    group += "Allocation,";
  }
  group = group.slice(0, -1); // Remove the trailing comma

  const hashedPassword = await bcrypt.hash(password, 10);

  let accessType = {
    Category: "MODULE",
  };
  
  // Initialize an empty object for MODULE properties
  accessType.MODULE = {};
  
  if (checkbox1) {
    accessType.MODULE["Cloud Assurance"] = false; 
  }
  if (checkbox2) {
    accessType.MODULE.KPI = false; 
  }
  if (checkbox3) {
    accessType.MODULE.Allocation = false; 
  }
  

  const query = `
    INSERT INTO users (id, name, email, role, "group", access_type, password, usertype)
    VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(query, [
      name,email,role,group,accessType,hashedPassword,usertype, ]);
    console.log("User created successfully:", result.rows[0]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const createssoUser = async (user) => {
  const role = "user";
  let group = "";
  if (true) {
    group += "Cloud Assurance,";
  }
  if (true) {
    group += "KPI,";
  }
  if (true) {
    group += "Allocation,";
  }
  group = group.slice(0, -1); // Remove the trailing comma

  let accessType = {
    Category: "MODULE",
  };
  
  // Initialize an empty object for MODULE properties
  accessType.MODULE = {};
  
  if (true) {
    accessType.MODULE["Cloud Assurance"] = false; 
  }
  if (true) {
    accessType.MODULE.KPI = false; 
  }
  if (true) {
    accessType.MODULE.Allocation = false; 
  }

  const query = `
    INSERT INTO users (id, name, email, role, "group", access_type, password, usertype)
    VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(query, [
      user.name,
      user.email,
      role,
      group,
      accessType,
      null,
      "SSO user",
    ]);
    console.log("User created successfully:", result.rows[0]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(query, [email]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  const query = `SELECT * FROM users ORDER BY email`;

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();    
     return result.rows;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};


const checkEmailExists = async (email) => {
  const query = `
    SELECT COUNT(*) as count FROM users
    WHERE email = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(query, [email]);
    client.release();
    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    throw error;
  }
};

const updateLastLoggedIn = async (email) => {
  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const query = `UPDATE users SET last_logged_in = $1 WHERE email = $2 RETURNING * `;

  try {
    const client = await pool.connect();
    const result = await client.query(query, [formattedDate, email]);
    console.log("Last logged in timestamp updated for user:", result.rows[0]);
    client.release();
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error updating last logged in timestamp:", error);
    // Consider throwing a custom error for handling at a higher level
    throw new Error("Failed to update last logged in timestamp");
  }
};

const updatePassword = async (email, password) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      UPDATE users
      SET password = $1
      WHERE email = $2
    `;

    const client = await pool.connect();
    const result = await client.query(query, [hashedPassword, email]);
    console.log("Password updated for user:", result.rowCount);
    client.release();
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Failed to update password");
  }
};

const isssoUser = async (email) => {
  const query = `
    SELECT usertype FROM users
    WHERE email = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(query, [email]);
    client.release();
    console.log(result.rows[0].usertype)
    console.log(result.rows[0].usertype === "SSO user")
    return result.rows[0].usertype === "SSO user";
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
};


export {
  createUser,
  getUserByEmail,
  checkEmailExists,
  updateLastLoggedIn,
  createssoUser,
  updatePassword,
  isssoUser,
  getAllUsers,
};
