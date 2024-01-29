import React,{useState,useEffect} from 'react'
import {
    Paper,
    Typography,
    Grid,
  TextField,
  Select, 
  MenuItem,
    Link,
    Box,
    ListItemIcon,
  } from '@mui/material';
  import AddIcon from '@mui/icons-material/Add';
  import FlexBetween from "components/FlexBetween";
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import dayjs from 'dayjs';
import CreateCustomerForm from 'scenes/customers/CreateCustomerForm';
import ItemsForm from '../ItemsForm';

const InvoiceForm2=() =>{
  const [selectedIssuedDate, setSelectedIssuedDate] = useState(dayjs(new Date()));
  const [selectedDueDate, setSelectedDueDate] = useState(dayjs(new Date()));
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [lastInvoice, setLastInvoice] = useState("123456765");
  const [invoiceNote, setInvoiceNote] = useState("It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


  useEffect(() => {
    setLastInvoice("inv2029");
 
  }, [])
  
  const handleSelectCustomerChange = (event) => {
    console.log(event.target.value); // Handle the selected value here
  };



  const handleNewCustomerClick =() => {
    setIsCreateModalOpen(true);
  }
  return (
    <div>
        <Paper  elevation={2}
         sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Set the background color to gray
          padding: '20px', // Add padding to the Paper component
        }}
        >
          <FlexBetween >
          <Box
          sx={
           { padding: '1%'}
          }
        >
        <img
             src="https://via.placeholder.com/100x50"
             alt="Company Logo"
             style={{ maxWidth: '100%', height: 'auto' }}
        />

        <Grid item xs={8}
          sx={
            { paddingTop: '10%'}
           }
        >
            <Typography variant="h5">Your Company Name</Typography>
            <Typography>123 Street, City</Typography>
            <Typography>Email:mainalawrence32@email.com</Typography>
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
            label={"Last invoice: "+lastInvoice}
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
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

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center" // Center horizontally
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
            display:"flex",
            gap:10,
            paddingTop:'1%'
          }}
        >
     
           <Box 
           sx={{
            flex:0.5,
            flexDirection:"row"
           }}
           >
           <Typography sx={{display:'flex',flexDirection:'column'}}>
              <label>Invoice To:</label>
              <Select onChange={handleSelectCustomerChange} sx={{width: '60%' ,height:'10%'}}  >
                <MenuItem value="" sx={{ color:"green",'&:hover': { backgroundColor: 'lightgreen'}}}>
                  <ListItemIcon><AddIcon  sx={{color:'green'}}/></ListItemIcon>
                  <Link color="inherit" sx={{ fontWeight: 'bold',textDecoration: 'none'}}  
                      onClick={() => {
                      handleNewCustomerClick();
                  }}>
                    <Typography>Create a new customer</Typography>

                  </Link>
                </MenuItem>
                <MenuItem value={10}>lawrence 1</MenuItem>
                <MenuItem value={20}>maina 2</MenuItem>
                <MenuItem value={3}>faith 3</MenuItem>
                <MenuItem value={4}>zack 3</MenuItem>
                <MenuItem value={5}>James 3</MenuItem>
                <MenuItem value={6}>charles 3</MenuItem>
                <MenuItem value={61}>charles 2</MenuItem>
                <MenuItem value={62}>charles 4</MenuItem>
                <MenuItem value={7}>mareck 3</MenuItem>
                <MenuItem value={8}>kong 3</MenuItem>
                <MenuItem value={9}>judas 3</MenuItem>
                <MenuItem value={10}>pam 3</MenuItem>
                

              </Select>
            </Typography>
           </Box>
           <Box
            sx={{
              flex:0.5,
              display: 'flex',
              flexDirection: 'column', // Ensures components stack vertically
              alignItems: 'center', // Centers content vertically
              paddingRight:'8%'
            }}
           >
            <Typography sx={{width:'40%'}}>
              <h3 > Bill To:</h3>
            </Typography>
            <Box
            
            >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Total Due:</label></Typography>
            </Grid>
            <Grid item>$12,110.55</Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Bank name:</label></Typography>
            </Grid>
            <Grid item>American Bank</Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Country:</label></Typography>
            </Grid>
            <Grid item>United States</Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>IBAN:</label></Typography>
            </Grid>
            <Grid item>ETD95476213874685</Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>SWIFT code:</label></Typography>
            </Grid>
            <Grid item>BR91905</Grid>
          </Grid>
            </Box>
           </Box>
        </Box>
        
        <div>
           <ItemsForm/>
        </div>
{/* Taxes */}
        <Box>
        <Grid  container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Subtotal:</label></Typography>
            </Grid>
            <Grid item>$1800</Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Discount:</label></Typography>
            </Grid>
            <Grid item>$28</Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Tax:</label></Typography>
            </Grid>
            <Grid item>16%</Grid>
          </Grid>
          <hr/>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography> <label>Total:</label></Typography>
            </Grid>
            <Grid item>$1690</Grid>
          </Grid>
        </Box>
        {/* Notes */}
        <Box>
            <Grid item>
              <Typography>
                <label>Note:</label>
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Note"
                type='text'
                value={invoiceNote}
                onChange={(e) => setInvoiceNote(e.target.value)}
                fullWidth
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

export default InvoiceForm2;