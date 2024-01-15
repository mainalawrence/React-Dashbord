import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import FlexBetween from "components/FlexBetween";
import ProductUpdateForm from "./ProductUpdateForm";
import CreateProductForm from "./CreateProductForm";

const Product = ({
  _id,
  name,
  description,
  price,
  category,
  supply,
  stat,
  onEditClick
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <FlexBetween>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <IconButton >
           <EditIcon
           onClick={onEditClick}
           />
           
        </IconButton>
        </FlexBetween>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ksh{Number(price).toFixed(2)}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded?"SEE MORE":"SEE LESS"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

  );
};

const Products = () => {
  const { isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const handleNewProductClick =() => {
    setIsCreateModalOpen(true);
  }

  const handleUpdate = (updatedData) => {
    // Logic to update the product, e.g., make an API call
    console.log("Updating product:", updatedData);
    // Update the state with the new data
    setData((prevData) =>
      prevData.map((product) =>
        product._id === selectedProduct._id ? { ...product, ...updatedData } : product
      )
    );
    // Close the modal
    setIsUpdateModalOpen(false);
    // setSelectedProduct(null);
  };


const [data, setData] = useState([
 { _id:'456789333',
  name:'name',
  description:'description',
  price:'200',
  category:'',
  supply:'',
  stat:2,},
  { _id:'4567893335',
  name:'name',
  description:'description',
  price:'200',
  rating:5,
  category:'',
  supply:'',
  stat:2,}
])
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PRODUCTS" subtitle="See your list of products." />
    <Button
          variant="secondary"
          size="small"
          onClick={() => {
            handleNewProductClick();
          }}
        >
           New Product
        </Button>
    {data || !isLoading ? (
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
     
        {data.map(
          ({
            _id,
            name,
            description,
            price,
            category,
            supply,
            stat,
          }) => (
            <Product
              key={_id}
              _id={_id}
              name={name}
              description={description}
              price={price}
              category={category}
              supply={supply}
              stat={stat}
              onEditClick={() => handleEditClick({ _id, name, description, price, category, supply, stat })}
            />
          )
        )}
        <ProductUpdateForm
            open={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            onUpdate={handleUpdate}
            products={selectedProduct}
          />
           <CreateProductForm
            open={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onUpdate={handleUpdate}
          />
      </Box>
    ) : (
      <>Loading...</>
    )}
  </Box>
  );
};

export default Products;
