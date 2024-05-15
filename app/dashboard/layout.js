"use client"

import Header from '../(components)/header/header';
import Sidebar from '../(components)/sidebar/sidebar';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen(){
    setIsOpen(!isOpen)
  }

  function closeSidebar() {
    setIsOpen(false);
  }
  return (
    <div className=" bg-gray-100">
      <Header  isOpen={isOpen} toggleOpen={toggleOpen}/>
      <div className='flex relative overflow-auto  mt-10'>
        <Sidebar isOpen={isOpen}/>
        <main className=" mx-auto md:ml-48 w-full  p-6 h-full">{children}</main>  
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50" onClick={closeSidebar}></div>}
    </div>
  );
};

export default Layout;



