"use client"

import { Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { GroupNames, groupColors } from '../../common/constants';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CustomAdminSwitch from './customadminSwitch';
import CustomSwitch from './customSwitch';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Popup({ isOpen, onClose, email, userRole }) {

  const [selectedIndex, setSelectedIndex] = useState([]);
  const [toggleStates, setToggleStates] = useState(Object.fromEntries(GroupNames.map(item => [item, false])));
  const [toggleadminStates, setToggleadminStates] = useState(userRole && (userRole.toLowerCase() === "admin"));
  const [isUserAdmin, setIsUserAdmin] = useState(userRole && (userRole.toLowerCase() === "admin"));
  const [error, setError] = useState('');
  const emails = email;

  const handleSelect = (event) => {
    setSelectedIndex(event.target.value);
  };
  
  const handleToggleChange = (itemName) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName]
    }));
  };
  const handleAdminToggleChange = () => {
    setToggleadminStates(!toggleadminStates);
    setIsUserAdmin(!isUserAdmin);
  };


  const renderEmailChips = () => {
    return emails.map((email, index) => (
      <Chip
        key={index}
        label={email}
        variant="outlined"
        sx={{ borderColor: '#ddd', marginRight: 1, marginBottom: 1, }}
      />
    ));
  };

  const handleUpdate = async () => {
    try {
      // Input validation
      if (!emails || !Array.isArray(emails) || emails.length === 0 || selectedIndex.length === 0 || !toggleStates ) {
        setError("**Input value should not be empty")
        throw new Error('Invalid input data');
      }
      setError('')
      // Prepare data for update
      const selectedGroupsStates = Object.fromEntries(
        GroupNames.filter((item) => selectedIndex.includes(item)).map((item) => [item, toggleStates[item]])
      );

      const data = {
        email: emails,
        selectedGroups: selectedIndex,
        groupSwitchStates: selectedGroupsStates,
        userRole: isUserAdmin ? 'admin' : 'user' // Assuming isUserAdmin is a boolean
      };

      // Send update request to API
      const response = await fetch("/api/manageUsers/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user role: ${response.statusText}`);
      }
      toast.success("Updated successfully!")
      console.log("User role updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating user role:", error.message);
      // Optionally, handle the error and provide feedback to the user
    }
  };



  return (
    <DialogContent >
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="responsive-dialog-title" sx={{ "& .MuiDialog-container": { "& .MuiPaper-root": { width: "100%", maxWidth: "600px", marginTop: '10%' }, }, }}>
        <DialogTitle id="responsive-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Select Groups
          </Typography>
          <Typography sx={{ color: 'red', }} variant="h6" component="div">
            {error}
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{ px: 4 }}>
          <Box className='no-scrollbar' sx={{ width: '100%', border: '1px solid #ddd', borderRadius: 2, py: 0, mt: 2, overflowX: 'auto' }}>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1, mt: 1 }}>
              {renderEmailChips()}
            </Box>
          </Box>
        </Box>

        <DialogTitle id="responsive-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', pr: 9 }}>
          <Typography variant="body2" sx={{ color: 'gray-500', fontWeight: 'lighter' }}>
            User Role
          </Typography>
          <CustomAdminSwitch checked={toggleadminStates} onChange={handleAdminToggleChange} />

        </DialogTitle>

        <Box sx={{ px: 4, width: '100%' }} >
          <FormControl sx={{ my: 1, width: '100%' }} >
            <InputLabel sx={{ p: 0 }} id="demo-multiple-chip-label">Choose Groups</InputLabel>
            <Select labelId="demo-multiple-chip-label" id="demo-multiple-chip" multiple
              value={selectedIndex} onChange={handleSelect}
              input={<OutlinedInput id="select-multiple-chip" label="Select an option" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={{
                      border: groupColors[value]?.border || 'none',
                      backgroundColor: groupColors[value]?.backgroundColor || 'white',
                    }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {GroupNames.map((item) => (
                <MenuItem key={item} value={item}>  {item} </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, px: 2, py: 0, mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, fontWeight: 'bold', borderBottom: '1px solid #ddd', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
              <div>Group Name</div>
              <div sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div>Action</div>
                <div className='font-thin text-black'>Read / Write</div>
              </div>
            </Box>

            {GroupNames.map((item) => (
              <Box key={item} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, pr: 4, borderBottom: '1px solid #ddd', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                <div className='font-thin'>{item}</div>
                <CustomSwitch checked={toggleStates[item]} onChange={() => handleToggleChange(item)} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ px: 4, py: 3, mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
          <Button variant="outlined" onClick={onClose} sx={{ ml: 1 }}>Cancel</Button>
        </Box>
      </Dialog>
    </DialogContent>

  );
}

export default Popup;


// font-family: "Roboto", "Helvetica", "Arial", sans-serif;
// font-weight: 400;
// font-size: 0.875rem;