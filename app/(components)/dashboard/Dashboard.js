"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && (!session || !session.user)) {
      router.push("/");
    }
  }, [router, session, status]);

  return (
    <div className="container mx-auto px-4 py-8">
      {session && session.user && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold mb-4">User Details:</p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {session.user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {session.user.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role:</span> {session.user.role}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Usertype:</span>{" "}
            {session.user.usertype}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Last Logged In:</span>{" "}
            {session.user.last_logged_in}
          </p>
          {session.user.access_type && (
            <div className="mt-4">
              <p className="font-semibold">Access Type:</p>
              <ul className="list-disc list-inside">
                {Object.entries(session.user.access_type).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key === "MODULE" && (
                        <ul className="list-disc list-inside">
                          {Object.entries(value).map(
                            ([moduleKey, moduleValue]) => (
                              <li key={moduleKey}>
                                {moduleKey}: {moduleValue.toString()}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
      {status === "loading" && (
        <p className="text-center text-lg font-semibold mt-8">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
