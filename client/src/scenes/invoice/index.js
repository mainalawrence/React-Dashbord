import React, { useMemo,useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
// import { ResponsiveLine } from "@nivo/line";
// import { useGetSalesQuery } from "state/api";
import Invoice1 from './invoice1'; // Adjust the path ba
import CompactInvoice from './CompactInvoice'; 
import EnhancedInvoice from './EnhancedInvoice'; 
const CreateInvoice = () => {
    const [editedPrice, setEditedPrice] = useState(100); // Initial price, you can set it based on your requirement

    // Sample product details (replace with your actual product details)
    const productDetails = {
      name: 'Sample Product',
      price: editedPrice,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Electronics',
      rating: 4,
      supply: 50,
    };
  
    const handlePriceChange = (event) => {
      setEditedPrice(event.target.value);
    };
    const sampleInvoiceData = {
        customerName: 'John Doe',
        customerAddress: '456 Avenue, City',
        customerEmail: 'john@example.com',
        items: [
          { description: 'Product 1', quantity: 2, unitPrice: 30 },
          { description: 'Product 2', quantity: 1, unitPrice: 50 },
          // Add more items as needed
        ],
      };
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Create Invoice" subtitle="" />
      <Invoice1 invoiceData={sampleInvoiceData} />
      <CompactInvoice invoiceData={sampleInvoiceData}/>
      <EnhancedInvoice invoiceData={sampleInvoiceData}/>
      

    </Box>
  );
};

export default CreateInvoice;
