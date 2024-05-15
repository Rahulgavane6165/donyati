import credentialsProvider from "./credentialsProvider";
import githubProvider from "./githubProvider";
import googleProvider from "./googleProvider";
import microsoftProvider from "./microsoftProvider";

export const options = {
  providers: [credentialsProvider, githubProvider, googleProvider, microsoftProvider],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signOut({ url, baseUrl }) {
      return baseUrl 
    },
    
    async jwt({ token, user, remember, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; 
        token.group = user.group;
        token.access_type = user.access_type;
        token.usertype = user.usertype
        token.last_logged_in = user.last_logged_in
        
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user = {
          role: token.role,
          group: token.group,
          id: token.id,
          email: token.email,
          acces_type: token.access_type,
          usertype: token.usertype,
          last_logged_in: token.last_logged_in
        };
      }
      return session;
    },
  },
};

