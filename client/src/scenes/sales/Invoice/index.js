import React, { } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
// import { ResponsiveLine } from "@nivo/line";
// import { useGetSalesQuery } from "state/api";
import Invoice1 from './invoice1'; // Adjust the path ba
import CompactInvoice from './CompactInvoice'; 
import EnhancedInvoice from './EnhancedInvoice'; 
import InvoiceForm from './InvoiceForm/InvoiceForm'; 

const CreateInvoice = () => {
    const sampleInvoiceData = {
        customerName: 'John Doe',
        customerAddress: '456 Avenue, City',
        customerEmail: 'john@example.com',
        items: [
          { description: 'Product 1', quantity: 2, unitPrice: 30 },
          { description: 'Product 2', quantity: 1, unitPrice: 50 },
          { description: 'Product 2', quantity: 1, unitPrice: 50 },
          { description: 'Product 2', quantity: 1, unitPrice: 50 },
          // Add more items as needed
        ],
      };
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Create Invoice" subtitle="" />
      {/* <Invoice1 invoiceData={sampleInvoiceData} />
      <CompactInvoice invoiceData={sampleInvoiceData}/>
      <EnhancedInvoice invoiceData={sampleInvoiceData}/> */}
    <InvoiceForm/>
      

    </Box>
  );
};

export default CreateInvoice;
