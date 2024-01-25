// EnhancedInvoice.jsx
import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import FlexBetween from "components/FlexBetween";

const EnhancedInvoice = ({ invoiceData }) => {

    return (
    <Paper elevation={3} style={{ padding: '20px', width: '80%', margin: '20px auto' }}>
      <FlexBetween container spacing={10}>
        <Grid item xs={4}>
          {/* Company Logo (Replace with your company logo) */}
          <img
            src="https://via.placeholder.com/150x50"
            alt="Company Logo"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={8}>
          {/* Company Details (Replace with your company details) */}
          <Typography variant="h5">Your Company Name</Typography>
          <Typography>123 Street, City</Typography>
          <Typography>Email:mainalawrence32@email.com</Typography>
        </Grid>
      </FlexBetween>
      {/* Recipient Company Information */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        To:
      </Typography>
      <Typography>{invoiceData.customerName}</Typography>
      <Typography>{invoiceData.customerAddress}</Typography>
      <Typography>Email: {invoiceData.customerEmail}</Typography>
      {/* Invoice Details */}
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Invoice
      </Typography>
      <Grid container spacing={3}>
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
      </Grid>
      {/* Footer */}
      <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
        Payment Details
      </Typography>
      <Typography>Bank: Your Bank Name</Typography>
      <Typography>Account Name: Your Company Name</Typography>
      <Typography>Account Number: XXXXXXXXXX</Typography>
      <Typography>Mpesa Pay Bill: 123456</Typography>
      <Typography>
      <ul>
        <li>Terms and Conditions: Lorem ipsum dolor sit amet.</li>
        <li>Terms and Conditions: Lorem ipsum dolor sit amet.</li>
        <li>Terms and Conditions: Lorem ipsum dolor sit amet.</li>
        <li>Terms and Conditions: Lorem ipsum dolor sit amet.</li>
      </ul>

      </Typography>
    </Paper>
  );
};

export default EnhancedInvoice;
