// ProductDetails.jsx
import React from 'react';
import { Typography } from '@mui/material';

const ProductDetails = ({ name, price, description, category, rating, supply }) => {
  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <Typography>{description}</Typography>
      <Typography>Category: {category}</Typography>
      <Typography>Rating: {rating}</Typography>
      <Typography>Supply: {supply}</Typography>
      <Typography variant="h6">Price: ${price}</Typography>
    </div>
  );
};

export default ProductDetails;
