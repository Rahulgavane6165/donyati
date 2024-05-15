import {checkEmailExists, createssoUser, getUserByEmail, updateLastLoggedIn,} from "../../model/user";

import GitHubProvider from "next-auth/providers/github";

const githubProvider = GitHubProvider({
  async profile(profile) {
    try {
      const userExists = await checkEmailExists(profile.email);

      if (!userExists) {
        const newUser = await createssoUser(profile);
        await updateLastLoggedIn(newUser.email);
        return newUser;
      }

      await updateLastLoggedIn(profile.email);
      return await getUserByEmail(profile.email);
    } catch (err) {
      return null;
    } 
  },
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
});


// const createUser = async (user) => {
//   const query = `
//       INSERT INTO users (id, name, email, role, "group", access_type, password, usertype)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//     `;

//   try {
//     const client = await pool.connect();
//     await client.query(query, [
//       user.id,
//       user.name,
//       user.email,
//       user.role,
//       user.group,
//       user.access_type,
//       user.password,
//       user.usertype,
//     ]);
//     console.log("User created successfully");
//     client.release();
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

export default githubProvider;
