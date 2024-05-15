import { NextResponse } from "next/server";
import { pool } from "../../server/Lib/database";

export const updateUserGroupAndAccessType = async (req) => {

  const data = await req.json();

  const { email, selectedGroups, groupSwitchStates, userRole } = data;

  if (!email || !Array.isArray(email) || email.length === 0 || !userRole || selectedGroups.length === 0 || !groupSwitchStates) {
    return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
  }

  const selectedGroupsInOrder = ['Cloud Assurance', 'KPI', 'Allocation'];
  const orderedSelectedGroups = selectedGroupsInOrder.filter(group => selectedGroups.includes(group));

  const group = orderedSelectedGroups.join(',');

  const accessType = {
    MODULE: {
      ...groupSwitchStates
    },
    Category: "MODULE"
  };

  const query = `
    UPDATE users SET "group" = $1, access_type = $2, role = $3 WHERE email = ANY($4) RETURNING *`;
  console.log(email, selectedGroups, groupSwitchStates, userRole, group, accessType, "=====================")
  try {
    const client = await pool.connect();
    const result = await client.query(query, [group, accessType, userRole, email]);
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error updating users:", error);
    return NextResponse.json({ message: 'Query fails' }, { status: 500 });
  }
};

