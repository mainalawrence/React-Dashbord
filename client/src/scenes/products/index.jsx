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
  Dialog,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import FlexBetween from "components/FlexBetween";


const Product = ({
  _id,
  name,
  description,
  price,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    // initialize the form data with existing values
    name,
    description,
    price,
  });
    const handleEditClick = () => {
      setIsEditing(true);
      setIsExpanded(false);
    };
    const handleSaveEdit = () => {
      // Perform the logic to save the edited data
      // You can make an API call or update the state accordingly
      console.log("Saving edited data:", editFormData);
      setIsEditing(false);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

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
           <EditIcon />
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
  stat:2,},
  { _id:'4567893334',
  name:'name',
  description:'description',
  price:'200',
  category:'',
  supply:'',
  stat:2,},
  { _id:'4567893336',
  name:'name',
  description:'description',
  price:'200',
  category:'',
  supply:'',
  stat:2,},
  { _id:'4567893337',
  name:'name',
  description:'description',
  price:'200',
  category:'',
  supply:'',
  stat:21,}
])
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PRODUCTS" subtitle="See your list of products." />
    <Button
          variant="secondary"
          size="small"
          onClick={() => {
return(
  <Dialog>
     <CardContent>
          <Typography>id: {"_id"}</Typography>
          <Typography>Supply Left: {"supply"}</Typography>
          <Typography>
            Yearly Sales This Year: {"stat.yearlySalesTotal"}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {"stat.yearlyTotalSoldUnits"}
          </Typography>
        </CardContent>
  </Dialog>
);
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
            />
          )
        )}
      </Box>
    ) : (
      <>Loading...</>
    )}
  </Box>
  );
};

export default Products;
