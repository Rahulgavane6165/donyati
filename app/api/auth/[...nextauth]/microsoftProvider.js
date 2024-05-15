import { checkEmailExists, createssoUser, getUserByEmail, updateLastLoggedIn } from "../../model/user";

import AzureADProvider from "next-auth/providers/azure-ad";

const microsoftProvider =  AzureADProvider({
 
  async profile(profile) {
    try {
      console.log("getting")
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
  clientId: process.env.AZURE_AD_CLIENT_ID,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  tenantId: process.env.AZURE_AD_TENANT_ID,
});

export default microsoftProvider;
