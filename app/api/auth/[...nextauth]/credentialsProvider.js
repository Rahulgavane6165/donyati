import { checkEmailExists, getUserByEmail, updateLastLoggedIn } from "../../model/user";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const credentialsProvider = CredentialsProvider({
  name: "credentials",
  credentials: {},

  async authorize(credentials) {
    const { email, password, remember } = credentials;

    try {
         
      const userExists =  await checkEmailExists(email);

      if (!userExists) {
        return null;
      }
      const user = await getUserByEmail(email);

      // Check if passwords match
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        return null;
      }

      // Update last logged in date for this user 
      try {
        await updateLastLoggedIn(email);
      } catch (updateError) {
        console.error("Error updating last_logged_in timestamp:", updateError);
        return null; 
      }
      // Return the user
      return user;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
});

export default credentialsProvider;
