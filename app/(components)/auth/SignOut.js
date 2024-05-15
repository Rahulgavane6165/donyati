// components/SignOut.js
"use client"

import { signOut } from 'next-auth/react'

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }) // Redirect to the home page after sign out
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  )
}

export default SignOut
