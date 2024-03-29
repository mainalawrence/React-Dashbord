import React,{useState,useEffect} from "react";
import { Box, useTheme,Button } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import CreateCustomerForm from "./CreateCustomerForm"
import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from "state/Axios";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);

  const columns = [
    {
      field: "uid",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.4,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 

  const handleNewCustomerClick =() => {
    setIsCreateModalOpen(true);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Button
          variant="primary"
          size="small"
          onClick={() => {
            handleNewCustomerClick();
          }}
        >
          New Customer
        </Button>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.uid}
          rows={data || []}
          columns={columns}
        />
      </Box>
      <CreateCustomerForm
            open={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onUpdate={handleNewCustomerClick}
          />
    </Box>
  );
};

export default Customers;
