import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Invoice from "./Invoice";
import CustomerOrder from "./CustomerOrder";
import Quotations from "./Quotations";
import Receipt from "./Receipt";
import PrintInvoice from './Invoice/InvoiceForm/printInvoice/printInvoice'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Invoice" {...a11yProps(0)} />
          <Tab label="Customer Order" {...a11yProps(1)} />
          <Tab label="Quotations" {...a11yProps(2)} />
          <Tab label="Receipt" {...a11yProps(3)} />
          <Tab label="Review" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Invoice />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomerOrder />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Quotations />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Receipt />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <PrintInvoice />
      </CustomTabPanel>
    </Box>
  );
}
