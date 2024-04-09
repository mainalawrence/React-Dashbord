import React, { useState, useEffect } from 'react'
import { Paper, Typography, Grid, TextField, Select, MenuItem, Link, Box, ListItemIcon } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import FlexBetween from "components/FlexBetween";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CreateCustomerForm from 'scenes/customers/CreateCustomerForm';
import ItemsForm from '../ItemsForm';
import axiosInstance from 'state/Axios';

const InvoiceForm = () => {
  const [selectedIssuedDate, setSelectedIssuedDate] = useState(dayjs(new Date()));
  const [selectedDueDate, setSelectedDueDate] = useState(dayjs(new Date()));
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [lastInvoice, setLastInvoice] = useState("123456765");
  const [invoiceNote, setInvoiceNote] = useState("It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState({})
  const [companyInformation, setCompanyInformation] = useState(
    {
      "uid": "yhjiokpl[lkjh]",
      "name": "TechPut",
      "mobile": [
        ""
      ],
      "address": "your street",
      "logo": "techput.png",
      "email": "email.com",
      "bank": {
        "name": " Bank Name",
        "branch": " Branch Name",
        "accountnumber": "1234567898765"
      },
      "mobilemoney": [
        {
          "type": "Mpesa",
          "account": "account number",
          "paybill": "paybill number"
        }
      ],
      "date": "2024-02-05T18:57:07.354Z"
    }
  )

  useEffect(() => {
    axiosInstance.get("/invoices/last")
      .then((response) => {
        setLastInvoice(response.data[0]);
      });
    axiosInstance.get("/customer")
      .then((response) => {
        setData(response.data);
      });
    axiosInstance.get("/company")
      .then((response) => {
        setCompanyInformation(response.data[0]);
      });

  }, [])




  const handleSelectCustomerChange = (event) => {
    setCustomers(event.target.value)
    console.log(event.target.value); // Handle the selected value here
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewCustomerClick = () => {
    setIsCreateModalOpen(true);
  }
  return (
    <div className='print-container' id='invoice-content'>
      <button onClick={handlePrint}>print</button>
      <Paper elevation={2}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Set the background color to gray
          padding: '20px', // Add padding to the Paper component
        }}
      >
        <FlexBetween >
          <Box
            sx={
              { padding: '1%' }
            }
          >
            <img
              src="https://via.placeholder.com/100x50"
              alt="Company Logo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />

            <Grid item xs={8}
              sx={
                { paddingTop: '10%' }
              }
            >

              <Typography variant="h5">{companyInformation.name}</Typography>
              <Typography>{companyInformation.address}</Typography>
              <Typography>Email:{companyInformation.email}</Typography>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column', // Ensures components stack vertically
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
              gap: '10px', // Adds gap between components
              padding: '1%'
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center" // Center horizontally
            >
              <Grid item>
                <Typography>
                  <label>Invoice:</label>
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label={"Last invoice: " + lastInvoice}
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography>
                  <label>Date Issued:</label>
                </Typography>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs('2022-04-17')}
                    value={selectedIssuedDate}
                    onChange={(newDate) => setSelectedIssuedDate(newDate)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" justifyContent="center" // Center horizontally
            >
              <Grid item>
                <Typography>
                  <label>Due Date:</label>
                </Typography>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs('2022-04-17')}
                    value={selectedDueDate}
                    onChange={(newDate) => setSelectedDueDate(newDate)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </FlexBetween>
      </Paper>

      <Box
        sx={{
          display: "flex",
          gap: 10,
          paddingTop: '1%'
        }}
      >

        <Box
          sx={{
            flex: 0.5,
            flexDirection: "row"
          }}
        >
          <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
            <label>Invoice To:</label>
            <Select className='print-btn' onChange={handleSelectCustomerChange} sx={{ width: '60%', height: '10%' }}  >
              <MenuItem value="" sx={{ color: "green", '&:hover': { backgroundColor: 'lightgreen' } }}>
                <ListItemIcon><AddIcon sx={{ color: 'green' }} /></ListItemIcon>
                <Link color="inherit" sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                  onClick={() => {
                    handleNewCustomerClick();
                  }}>
                  <Typography>Create a new customer</Typography>

                </Link>
              </MenuItem>
              {
                data.map((item) => {
                  return <MenuItem value={item}>{item.name}</MenuItem>
                })
              }
            </Select>
          </Typography>
          <Box sx={{
            marginTop: '5%'
          }}>
            <Typography>{customers.name}</Typography>
            <Typography>{customers.company}</Typography>
            <Typography>{customers.phone}</Typography>
            <Typography>{customers.email}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 0.5,
            display: 'flex',
            flexDirection: 'column', // Ensures components stack vertically
            alignItems: 'center', // Centers content vertically
            paddingRight: '8%'
          }}
        >
          <Typography sx={{ width: '40%' }}>
            <h3 > Bill To:</h3>
          </Typography>
          <Box>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label>Company Name:</label></Typography>
              </Grid>
              <Grid item>{companyInformation.name}</Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label>Account Name :</label></Typography>
              </Grid>
              <Grid item>{companyInformation.bank.name}</Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label>Bank name:</label></Typography>
              </Grid>
              <Grid item>{companyInformation.bank.name}</Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label>Account No:</label></Typography>
              </Grid>
              <Grid item>{companyInformation.bank.accountnumber}</Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label>Branch Name:</label></Typography>
              </Grid>
              <Grid item>{companyInformation.bank.branch}</Grid>
            </Grid>
            <hr />
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label>Mpesa  Paybill:</label></Typography>
              </Grid>
              <Grid item>{companyInformation.mobilemoney.paybill}</Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography> <label> Account no:</label></Typography>
              </Grid>
              <Grid item>{companyInformation.mobilemoney.account}</Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <div className=''>
        <ItemsForm
          setDiscount={setDiscount}
          setSubTotal={setSubTotal}
          setTotal={setTotal}
          setTax={setTax}
        />
      </div>
      {/* Taxes */}
      <Box bx={{ backgroundColor: "green" }}>

      </Box>
      {/* Notes */}
      <Box>
        <Grid item>
          <Typography>
            <label>Note:</label>
          </Typography>
        </Grid>
        <Grid item>
          <textarea
            value={invoiceNote}

            onChange={(e) => setInvoiceNote(e.target.value)}
            rows={10} // Specify the number of rows you want to display
            cols={100} // Specify the number of columns
            style={{ width: '100% !important' }} // Optional: Prevent resizing of the textarea
          />
        </Grid>
      </Box>
      <CreateCustomerForm
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUpdate={handleNewCustomerClick}
      />

    </div>
  )
}

export default InvoiceForm;