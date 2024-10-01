import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { additem, product } from '../Redux/CartSlice';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const { allitem } = useSelector((s) => s.productstore);
  const [prodcat, setProdcat] = useState([]);
  const [catfilter, setCatFilter] = useState("all");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategory = (e) => {
    setCatFilter(e.target.value);
  };

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(product()).then((res) => {
      getCategory(res?.payload);
    });
  }, [dispatch]);

  const getCategory = (data) => {
    const catArray = data.map((prod) => prod?.category);
    const uniqueCat = [...new Set(catArray)];
    setProdcat(uniqueCat);
  };

  const addproduct = (item) => {
    dispatch(additem(item));
    navigate("/cart");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Products
      </Typography>

      {/* Search and Category Filter */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          id="outlined-basic"
          label="Search by name"
          variant="outlined"
          fullWidth
          onChange={handlesearch}
          sx={{ borderRadius: '8px' }} // Rounded corners for the search bar
        />
        <Box sx={{ minWidth: 120, ml: 2 }}>
          <InputLabel id="demo-simple-select-label">Filter by Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={catfilter}
            onChange={handleCategory}
            sx={{ borderRadius: '8px' }} // Rounded corners for the select
          >
            <MenuItem value="all">All</MenuItem>
            {prodcat.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4}>
        {allitem
          ?.filter((item) => (catfilter === "all" || item.category === catfilter))
          .filter((item) => !search || item.title.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <Grid item lg={4} md={6} xs={12} sm={6} key={item.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: 450,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transform: 'scale(1.03)', // Scale effect on hover
                  },
                }}
              >
                <CardActionArea>
                  <Typography gutterBottom variant="h6" mt={2} component="div" sx={{ fontWeight: 'bold' }}>
                    {item.category}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="140"
                    src={item?.image}
                    alt={item.title}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {item?.title}
                    </Typography>
                    <Typography sx={{ fontSize: "17px", mt: 3, fontWeight: 'bold', marginBottom: "10px" }}>
                      Price: ${item?.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Button
                      variant='contained'
                      onClick={() => addproduct(item)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#3f51b5',
                        '&:hover': { backgroundColor: '#303f9f' },
                      }} 
                    >
                      <AddShoppingCartIcon sx={{ mr: 1 }} />
                      Add to cart
                    </Button>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Store;
