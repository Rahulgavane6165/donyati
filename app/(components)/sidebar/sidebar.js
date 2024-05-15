"use client"

import {GroupNames, colors} from '../common/constants'

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// import { useMediaQuery } from '@react-hook/media-query';


const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  // const isMediumScreen = useMediaQuery('(min-width: 768px)');

  const handleNavigation = (route) => {
    router.push(route);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // if (!isMediumScreen) {
  //   return null; // Return null to hide the component
  // }

  return (
    <div className={`bg-white mt-2 pr-3 z-50 fixed transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300 md:translate-x-0`}>

      <div className="w-[190px] z-40 h-[777px] flex flex-row items-start justify-start text-left text-[22px] text-white font-inter">
        {/* <div className="self-stretch w-[35px] [background:linear-gradient(90deg,_#453f63,_#453e63_50.49%,_#a1c13a_50.5%,_#a1c13a)] overflow-hidden shrink-0 max-w-[55px]" /> */}
        <div className="  self-stretch w-[35px] shrink-0 max-w-[55px] flex flex-row items-center z-80 ">
          <div className="self-stretch flex-1 relative bg-darkslateblue-200  z-20" style={{ marginTop: '-30px' }} />
          <div className="self-stretch flex-1 relative [background:linear-gradient(360deg,_#505c2c,_#637721_42.08%,_#a7cb31)] overflow-hidden"style={{ marginTop: '-6px' }} />
        </div>
        <div className={`w-[190px] z-20 flex flex-col items-end justify-center ml-[-35px] transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform ease-in-out duration-300 md:translate-y-0`}>
          <div className="flex flex-col items-end justify-center py-[42px] px-0">
            <div className="w-[190px] h-[60px] flex flex-col items-center justify-center py-0 pr-[29px] pl-3.5 box-border">
              <div
                className="  cursor-pointer bg-darkslateblue-200 overflow-hidden flex flex-row items-center justify-center py-1 pr-[65px] pl-[62px]"
                onClick={() => handleNavigation('/dashboard')}
              >
                <div className="w-5 flex flex-row items-center justify-center py-0 pr-0 pl-1 box-border">
                  <b className="relative text-base">Dashboard</b>
                </div>
              </div>
              {/* Vertical Lines */}
              <div className="flex flex-row items-center justify-center py-0 pr-0 pl-[92px] gap-[5px]">
                <div className="w-2 relative bg-darkslateblue-200 h-[25px] overflow-hidden shrink-0"/>
                <div className="w-2 relative bg-yellowgreen-200 h-[25px] overflow-hidden shrink-0"/>
              </div>
            </div>
            <div className="w-[140px] h-[140px] pt-0 flex flex-col items-center justify-center gap-[8px] text-base">
              <div
                className="self-stretch flex-1  rounded flex flex-row items-center justify-center py-[4px] px-0 hover:cursor-pointer
                hover:animate-[1s_ease-in_0s_infinite_alternate-reverse_none_shadow-pop-tr] hover:opacity-[1]"
                style={{ background: colors[GroupNames[0]]}}
                onClick={() => handleNavigation('/cloud-assurance')}
              >
                <b className="relative text-sm ">
                  Cloud Assurance
                </b>
              </div>
              <div
                className={`self-stretch flex-1 rounded flex flex-row items-center justify-center py-[4px] px-0 hover:cursor-pointer
                hover:animate-[1s_ease-in_0s_infinite_alternate-reverse_none_shadow-pop-tr] hover:opacity-[1]`}
                style={{ background: colors[GroupNames[1]] }}
                onClick={() => handleNavigation('/kpi')}
              >
                <b className="relative text-sm">KPI</b>
              </div>
              <div
                className="self-stretch flex-1 rounded flex flex-row items-center justify-center py-[4px] px-0 hover:cursor-pointer
                hover:animate-[1s_ease-in_0s_infinite_alternate-reverse_none_shadow-pop-tr] hover:opacity-[1]"
                style={{ background: colors[GroupNames[2]] }}
                onClick={() => handleNavigation('/allocation')}
              >
                <b className="relative text-sm">Allocation</b>
              </div>
              <div
                className="self-stretch flex-1 rounded flex flex-row items-center justify-center py-[4px] px-0 hover:cursor-pointer
                hover:animate-[1s_ease-in_0s_infinite_alternate-reverse_none_shadow-pop-tr] hover:opacity-[1]"
                style={{ background: colors['Signout']}}
                onClick={handleLogout}
              >
                <b className="relative text-sm">Signout</b>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
