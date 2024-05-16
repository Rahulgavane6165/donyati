"use client";

import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import Link from 'next/link';
import { MdAccountCircle } from 'react-icons/md';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({toggleOpen}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const isAdmin = session?.user?.role === 'admin';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
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

    return (

        <>
        <div className='fixed z-40 top-0 left-0 w-full'>          
            <div className="w-full h-[2.625rem] flex flex-col items-center justify-center z-[0]">
                <div className="self-stretch flex-1 relative bg-darkslateblue-200 overflow-hidden" />
                <div className="self-stretch flex-1 relative [background:linear-gradient(90deg,_#505c2c,_#637721_42.08%,_#a7cb31)] overflow-hidden" />
            </div>
            <header className="w-full z-40 fixed  left-0 top-0  text-white  h-10 flex items-center justify-between px-4">
                <div className="flex pl-16 gap-3">
                    {isSmallScreen && (
                        <FontAwesomeIcon icon={faBars} onClick={toggleOpen} className="text-white cursor-pointer w-8 h-8" />
                    )}
                    <div className="flex items-center cursor-pointer" onClick={onLogoContainerClick}>
                        <Image  src="/assets/Donyati-Logo.svg" alt="Donyati Logo" width={90} height={90} priority />
                    </div>
                </div>

                <div className="relative flex items-center">
                    {!isSmallScreen && isAdmin && (
                        <Link href="/manageUsers" className="block w-full text-left px-4 py-1 hover:bg-slate-200 hover:underline border rounded-full  border-white bg-white text-black font-bold">Manage Users</Link>
                    )}

                    <div ref={dropdownRef}>
                        <MdAccountCircle
                            className="ml-2 h-10 w-10 cursor-pointer"
                            onMouseEnter={() => setShowDropdown(!showDropdown)}
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Profile</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700" onClick={handleLogout}>Logout</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Edit Profile</button>
                                {isAdmin && (
                                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700" onClick={onMuButtonClick}>Manage Users</button>
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
