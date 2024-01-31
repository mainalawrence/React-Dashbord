import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const ItemsForm = ({}) => {
  const [items, setItems] = useState([
    { productName: '', description: '', quantity: 1, unitCost: 0, discount: 0 }
  ]);

  const handleAddItem = () => {
    setItems([...items, { productName: '', description: '',price:1, quantity: 1, unitCost: 0, discount: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleProductNameChange = (index,field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'unitCost' || field === 'discount') {
      const quantity = parseFloat(newItems[index].quantity);
      const unitCost = parseFloat(newItems[index].unitCost);
      const discount = parseFloat(newItems[index].discount);

      newItems[index].price = (quantity * unitCost) - discount;
    }
    setItems(newItems);
  };

  // Implement similar functions for other TextField fields
// spoofing trades 
  return (
    <Box sx={{ marginTop: '2%', gap: 2 }}>
      <Box sx={{ display: "flex", gap: 14 }}>
        <Typography>Product Name</Typography>
        <Typography>Description</Typography>
        <Typography>Quantity</Typography>
        <Typography>Unit Cost</Typography>
        <Typography>Discount</Typography>
        <Typography>Price</Typography>

      </Box>
      {items.map((item, index) => (
        <Box sx={{ display: "flex", gap: 2 }} key={index}>
          <TextField
            type="text"
            value={item.productName}
            onChange={(e) => handleProductNameChange(index,'productName', e.target.value)}
            placeholder="Product Name"
          />
          <TextField
            type="text"
            value={item.description}
            onChange={(e) => handleProductNameChange(index,'description', e.target.value)}
            placeholder="Description"
          />
          <TextField
            type="number"
            value={item.quantity}
            onChange={(e) => handleProductNameChange(index,'quantity', e.target.value)}
            placeholder="Quantity"
          />
          <TextField
            type="text"
            value={item.unitCost}
            onChange={(e) => handleProductNameChange(index,'unitCost', e.target.value)}
            placeholder="Unit Cost"
          />
          <TextField
            type="text"
            value={item.discount}
            onChange={(e) => handleProductNameChange(index,'discount', e.target.value)}
            placeholder="Discount"
          />
            <TextField
            type="text"
            value={item.price}
            onChange={(e) => handleProductNameChange(index,'price', e.target.value)}
            placeholder="Price"
          />
          <IconButton onClick={() => handleRemoveItem(index)}><DeleteIcon /></IconButton>
        </Box>
      ))}
      <Button onClick={handleAddItem}>Add Item</Button>
    </Box>
  );
};

export default ItemsForm;
