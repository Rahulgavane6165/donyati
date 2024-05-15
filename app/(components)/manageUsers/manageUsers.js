"use client"

import { deleteUserByEmail, fetchUsers, updateUserStatusByEmail } from './apirequestmathods'
import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import Loader from "../loader/loader";
import Popup from "./popUp/popup";
import UserTable from "./userTable";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { userStatusMap } from "../common/constants";

const ManageUsers = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedButton, setSelectedButton] = useState("All");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState(null);
  const [selectedEmailProps, setSelectedEmailProps] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (status !== "loading" && (!session || !session.user || session.user.role !== 'admin')) {
      router.push("/");
    }
    setSelectedEmails([])
    setSelectedEmailProps([])
    fetchUsers(setUsers, setLoading);

  }, [router, session, status]);

  
  const handleRowSelect = (email) => {
    setSelectedEmails((prevSelectedRows) => {
      if (prevSelectedRows.includes(email)) {
        const updatedSelectedRows = prevSelectedRows.filter(
          (selectedEmail) => selectedEmail !== email
        );
        if (updatedSelectedRows.length === 0) {
          setSelectedRoles(null);
        }
        return updatedSelectedRows;
      } else {
        return [...prevSelectedRows, email];
      }
    });
  };


  const handleuserFilter = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const handleSelectAll = () => {
    setSelectedEmails(prevSelectedEmails =>
      prevSelectedEmails.length === users.length ? [] : users.map(user => user.email)
    );
  };

  const handleBulkEdit = () => {
    setSelectedEmailProps([]);
    setSelectedEmailProps(selectedEmails)
    openPopup();
  };

  const handlesingleEdit = (email, role) => {
    setSelectedEmailProps([]);
    setSelectedEmailProps([...[], email]);
    setSelectedRoles(role);
    openPopup();
  };

  const handlesingleselect = (email, action) => {
    if (action === 'delete') {
      deleteUserByEmail([email]);
      fetchUsers(setUsers, setLoading);
    }
    else {
      const Status = users.find(user => user.email === email).is_active === userStatusMap.Active ? userStatusMap.InActive : userStatusMap.Active;
      updateUserStatusByEmail([email], Status);
      fetchUsers(setUsers, setLoading);
    }
  };

  const handleBulkDelete = () => {
    deleteUserByEmail(selectedEmails);
    fetchUsers(setUsers, setLoading);
  };

  
  const handleSearchIconHover = () => {
    setIsSearchBarVisible(true);
  };

  const handleSearchBarMouseLeave = () => {
    if (!document.activeElement.classList.contains("search-input")) {
      setIsSearchBarVisible(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (selectedButton !== "All") {
      return user.is_active === userStatusMap[selectedButton];
    }

    if (searchValue.trim() === "") {
      return true; 
    }

    const search = searchValue.toLowerCase();
    return (
      (user.firstName?.toLowerCase()?.includes(search) || false) ||
      user.email.toLowerCase().includes(search) ||
      user.usertype.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search) ||
      user.group.toLowerCase().includes(search) ||
      user.is_active.toLowerCase().includes(search) ||
      (user.last_logged_in &&
        user.last_logged_in.toLowerCase().includes(search))
    );
  });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEmailProps([])
    setSelectedRoles(null)
    fetchUsers(setUsers, setLoading);
  };

  
  return (
    <div className="bg-white w-full p-4">
      <div className="flex justify-between items-center mb-2">
        {loading && <Loader />}{" "}
        <h1 className="text-lg font-bold text-gray-500">Manage User Table</h1>
        <div
          className="flex items-center min-h-11 rounded-lg px-2 py-1"
          onMouseEnter={handleSearchIconHover} onMouseLeave={handleSearchBarMouseLeave}
        >
          {isSearchBarVisible && (
            <input type="text" placeholder="Search..."
              className="outline-none ml-2 transition-opacity duration-500 p-1 border border-gray-500 opacity-100 search-input"
              value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          )}
          <FaSearch className="ml-2 cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <div>
          <button className={` px-8 border border-blue-700 ${selectedButton === "All" ? "bg-blue-700 text-white" : ""} min-w-[80px]`}
            onClick={() => handleuserFilter("All")}> All
          </button>

          <button className={` px-8 border border-blue-700 ${selectedButton === "Active" ? "bg-blue-700 text-white" : ""} min-w-[80px]`}
            onClick={() => handleuserFilter("Active")}> Active
          </button>

          <button className={` px-8 border border-blue-700 ${selectedButton === "Registered" ? "bg-blue-700 text-white" : ""} min-w-[80px]`}
            onClick={() => handleuserFilter("Registered")}>Registered
          </button>
        </div>
        <div>
          {selectedEmails.length > 1 && (
            <>
            <button className={` px-8 border border-blue-700  min-w-[80px]`}
              onClick={() => handleBulkEdit()}>Edit
            </button>
            <button className={` px-8 border border-blue-700  min-w-[80px]`}
              onClick={() => handleBulkDelete()}>Delete
            </button>
            </>
          )}
        </div>

      </div>
      <div className="overflow-x-auto pb-20 min-w-full">

        <UserTable className="min-w-full divide-y border border-slate-300 divide-gray-200"
          users={filteredUsers} selectedEmails={selectedEmails} handleRowSelect={handleRowSelect} handlesingleEdit={handlesingleEdit} handleSelectAll={handleSelectAll} handlesingleselect={handlesingleselect}
        />
        {selectedEmailProps.length > 0 && (
          <Popup isOpen={isPopupOpen} onClose={closePopup} email={selectedEmailProps} userRole={selectedRoles} />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
