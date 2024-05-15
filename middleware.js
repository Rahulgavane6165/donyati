import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("requesting here",req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.user?.role === "admin",
    },
  },
)

export const config = { matcher: ["/Register"] }