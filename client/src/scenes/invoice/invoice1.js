// Invoice.jsx
import React from 'react';
import { Paper, Typography, Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Invoice1 = ({ invoiceData }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', width: '80%', margin: '20px auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Invoice
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">From:</Typography>
          <Typography>Your Company Name</Typography>
          <Typography>123 Street, City</Typography>
          <Typography>Email: your@email.com</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography variant="h6">To:</Typography>
          <Typography>{invoiceData.customerName}</Typography>
          <Typography>{invoiceData.customerAddress}</Typography>
          <Typography>Email: {invoiceData.customerEmail}</Typography>
        </Grid>
      </Grid>
      <TableContainer style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.unitPrice}</TableCell>
                <TableCell>${item.quantity * item.unitPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
        <Typography variant="h6">Total: ${calculateTotal(invoiceData.items)}</Typography>
      </Grid>
    </Paper>
  );
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0).toFixed(2);
};

export default Invoice1;
