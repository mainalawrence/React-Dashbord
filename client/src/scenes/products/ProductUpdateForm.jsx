// ProductUpdateForm.js

import React, { useEffect,useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ProductUpdateForm = ({ open, onClose, onUpdate,products }) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    // Add other fields as needed
  });
  useEffect(() => {
    if(products!==null){
      setFormData(products);

    }
   },[products]);

 
  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Call the onUpdate function with the updated data
    onUpdate(formData);
    // Reset the form data and close the modal
    setFormData({
      name: "",
      description: "",
      price: "",
    });
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Product</DialogTitle>
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
        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductUpdateForm;
