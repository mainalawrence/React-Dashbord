import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

const MoneyTextField = ({ value, onChange, ...rest }) => {
  // Function to format the money value
  const formatMoney = (value) => {
    // Check if the value is a number
    if (isNaN(value)) {
      return '';
    }

    // Format the number as a money value
    const formattedValue = parseFloat(value).toFixed(2); // Assuming 2 decimal places
    return formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands
  };

  // Function to handle changes in the input
  const handleChange = (e) => {
    // Remove non-numeric characters except for decimal point
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    // Update the state or trigger the onChange callback
    onChange(newValue);
  };

  return (
    <TextField
      value={formatMoney(value)}
      onChange={handleChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">Ksh</InputAdornment>,
      }}
    
    />
  );
};

export default MoneyTextField;
