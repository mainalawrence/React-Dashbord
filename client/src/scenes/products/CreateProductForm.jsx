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
import axiosInstance from "state/Axios";

const ProductCreateForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description:"",
    category:"",
    supply:""
  

    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    // Call the onUpdate function with the updated data
  axiosInstance.post("products",formData)
  .then((response) => {
    console.log('Response:', response.data);
    onClose();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box m="1.5rem 2.5rem">
      <DialogTitle>Create Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        /> 
        <TextField
          label="supply"
          name="supply"
          type="number"
          value={formData.supply}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
      </Box>

    </Dialog>
  );
};

export default ProductCreateForm;
