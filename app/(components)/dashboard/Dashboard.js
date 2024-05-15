"use client"

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
    <div>
      {session && session.user && (
        <div>
          <p>Email: {session.user.email}</p>
          <p>Name: {session.user.name}</p>
          <p>Role: {session.user.role}</p>
          <p>usertype: {session.user.usertype}</p>
          <p>last_logged_in: {session.user.last_logged_in}</p>
          {session.user.acces_type && (
            <div>
              <p>Access Type:</p>
              <ul>
                {Object.entries(session.user.acces_type).map(([key, value]) => (
                  <li key={key}>
                    {key === "MODULE" && (
                      <ul>
                        {Object.entries(value).map(([moduleKey, moduleValue]) => (
                          <li key={moduleKey}>{moduleKey}: {moduleValue.toString()}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

            </div>
          )}


        </div>
      )}
      {!session && <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
