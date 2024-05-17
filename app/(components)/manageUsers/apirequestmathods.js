import { toast } from "react-toastify";

// apiRequests.js

const fetchUsers = async (setUsers, setLoading) => {
  alert("Im called")
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
      if (data && data.users) {
        setUsers(data.users);
      } else {
        throw new Error("Invalid response format: users not found");
      }
    } else {
      console.error("Failed to fetch users");
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users");
  } finally {
    setLoading(false);
  }
};

const deleteUserByEmail = async (email) => {
  try {
    const response = await fetch('/api/manageUsers/deleteUsers', {
      method: 'DELETE',
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
      method: 'PATCH',
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
