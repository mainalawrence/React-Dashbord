// src/sales/invoice/InvoiceForm.jsx
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Container,
  Typography,
  CardContent
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const InvoiceForm = () => {
  // Sample data for contacts dropdown
  const contacts = [
    { id: 1, name: "Contact 1" },
    { id: 2, name: "Contact 2" },
    { id: 3, name: "Contact 3" },
  ];

  // Sample data for currencies dropdown
  const currencies = [
    { code: "KES", name: "Kenyan Shilling" },
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    // Add more currencies as needed
  ];

  const [selectedContact, setSelectedContact] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [lastInvoice, setLastInvoice] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [dueIn, setDueIn] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  return (
    <Container>
        <CardContent>
      <Box mt={2}>
        <FlexBetween gap={1}>

          <Box display="flex"  flexDirection="column" gap={2}>
          <Box  display="" >
          <FlexBetween gap={2} >
                <label>Contact</label>
                <TextField
                select
                label="Select Contact"
                value={selectedContact}
                onChange={(e) => setSelectedContact(e.target.value)}
                sx={{ width: '75%' }}
                >
                {contacts.map((contact) => (
                    <MenuItem key={contact.id} value={contact.id}>
                    {contact.name}
                    </MenuItem>
                ))}
                </TextField>
            </FlexBetween>
          </Box>
            <Button variant="outlined" color="primary">
              New Contact
            </Button>
          <TextField
              label="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Invoice"
              value={lastInvoice}
              onChange={(e) => setLastInvoice(e.target.value)}
              fullWidth
            />
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  // label="Basic date picker"
                  defaultValue={dayjs('2022-04-17')}
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                 />
              </DemoContainer>
           </LocalizationProvider>
           <TextField
              label="Ref Number"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              fullWidth
            />
            <TextField
              label="Due In"
              value={dueIn}
              onChange={(e) => setDueIn(e.target.value)}
              fullWidth
            />
          
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
            <FlexBetween>
            <label>Location</label>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
            </FlexBetween>
            <TextField
              select
              label="Currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              fullWidth
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.code} value={currency.code}>
                  {currency.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

        </FlexBetween>

      </Box>
      </CardContent>
    </Container>
  );
};

export default InvoiceForm;
