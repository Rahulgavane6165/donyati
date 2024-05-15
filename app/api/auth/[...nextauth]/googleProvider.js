import {checkEmailExists, createssoUser, getUserByEmail, updateLastLoggedIn,} from "../../model/user";

import GoogleProvider from "next-auth/providers/google";

const googleProvider = GoogleProvider({
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
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});



export default googleProvider;
