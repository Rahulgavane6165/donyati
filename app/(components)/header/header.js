"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";

const Header = ({ toggleOpen }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLogoContainerClick = useCallback(() => {
    window.location.href = NEXTAUTH_URL;
  }, []);

  const onMuButtonClick = useCallback(() => {
    window.location.href = "/manageUsers";
  }, []);
  const renderAvatar = () => {
    const userNameInitial = session?.user?.email?.charAt(0).toUpperCase();
    return (
      <div
        className="w-8 h-8 flex items-center font-bold text-xl justify-center bg-gray-100 ml-4 text-gray-600 rounded-full cursor-pointer shadow-md"
        onMouseEnter={() => setShowDropdown(!showDropdown)}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {userNameInitial}
      </div>
    );
  };
  return (
    <>
      <div className="fixed z-40 top-0 left-0 w-full">
        <div className="w-full h-[2.625rem] flex flex-col items-center justify-center z-[0]">
          <div className="self-stretch flex-1 relative bg-darkslateblue-200 overflow-hidden" />
          <div className="self-stretch flex-1 relative [background:linear-gradient(90deg,_#505c2c,_#637721_42.08%,_#a7cb31)] overflow-hidden" />
        </div>
        <header className="w-full z-40 fixed  left-0 top-0  text-white  h-10 flex items-center justify-between px-4">
          <div className="flex pl-16 gap-3">
            {isSmallScreen && (
              <FontAwesomeIcon
                icon={faBars}
                onClick={toggleOpen}
                className="text-white cursor-pointer w-8 h-8"
              />
            )}
            <div
              className="flex items-center cursor-pointer"
              onClick={onLogoContainerClick}
            >
              <Image
                src="/assets/Donyati-Logo.svg"
                alt="Donyati Logo"
                width={90}
                height={90}
              />
            </div>
          </div>

          <div className="relative flex items-center">
            {!isSmallScreen && isAdmin && (
              <Link
                href="/manageUsers"
                className="block w-full text-left px-4 py-1 hover:bg-slate-200  border rounded-full border-white bg-white text-black font-bold "
              >
                Manage Users
              </Link>
            )}

            <div ref={dropdownRef}>
              {renderAvatar()}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                    <Link href="/dashboard"> Profile</Link>
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                    Edit Profile
                  </button>
                  {isAdmin && (
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                      <Link href="/manageUsers">Manage Users</Link>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
