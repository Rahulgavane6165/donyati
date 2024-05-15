import { toast } from "react-toastify";

// apiRequests.js

const fetchUsers = async (setUsers, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch("/api/manageUsers/userDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data.users);
    } else {
      console.error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    setLoading(false);
  }
};

const deleteUserByEmail = async (email) => {
  try {
    const response = await fetch('/api/manageUsers/deleteUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    toast.success("User deleted")
  } catch (error) {
    toast.error("failed to delete User")
    console.error('Error deleting user:', error);
    // Handle error
    alert('Failed to delete user');
  }
};

const updateUserStatusByEmail = async (email, status) => {
  try {
    const response = await fetch('/api/manageUsers/updateUserStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, status })
    });

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }
    toast.success("updated successfully")
  } catch (error) {
    toast.error("Failed to update")
    console.error('Error updating user status:', error);
  }
};

export { fetchUsers, deleteUserByEmail, updateUserStatusByEmail };
