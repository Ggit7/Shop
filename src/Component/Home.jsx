import React from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { allitem } = useSelector((state) => state.productstore);

  // Assuming you want to display some featured products
  const featuredProducts = allitem.slice(0, 6); // Adjust the number of featured products as needed

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Online Shop!
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Discover the latest products and unbeatable deals.
        </Typography>
        <NavLink to="/store" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            Start Shopping
          </Button>
        </NavLink>
      </Box>

      {/* Featured Products Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ maxWidth: 345, boxShadow: '0 2px 10px rgba(0,0,0,0.2)', transition: '0.3s', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.2)', transform: 'scale(1.03)' } }}>
                <CardMedia
                  component="img"
                  height="140"
                  src={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
