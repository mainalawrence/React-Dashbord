// ProductUpdateForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const ProductUpdateForm = ({ product, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Validate and perform the update
    // Call the onUpdate function to update the product in the parent component
    onUpdate(updatedProduct);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Update Product</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="name"
          label="Product Name"
          variant="outlined"
          fullWidth
          value={updatedProduct.name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="price"
          type="number"
          label="Price"
          variant="outlined"
          fullWidth
          value={updatedProduct.price}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={updatedProduct.description}
          onChange={handleInputChange}
        />
      </Grid>
      {/* Add other fields as needed */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Product
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductUpdateForm;
