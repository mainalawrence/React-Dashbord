// ProductUpdateForm.js

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField
} from "@mui/material";
import FlexBetween from "components/FlexBetween";

const CreateCustomerForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Call the onUpdate function with the updated data
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}  maxWidth="md" fullWidth>
      <Box m="1.5rem 2.5rem">
      <DialogTitle>Create Product</DialogTitle>
      <DialogContent>
      <FlexBetween gap={10} >
        <Box>
        <TextField
          label="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Box>
        <Box>
         <TextField
          label="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
            <TextField
          label="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        /> 
           <TextField
          label="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Box>
      </FlexBetween>

        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
      </Box>

    </Dialog>
  );
};

export default CreateCustomerForm;
