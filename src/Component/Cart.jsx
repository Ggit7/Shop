import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Container,
    Box,
  } from '@mui/material';
  import React from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { deleteitem, decrementQnty, incrementQnty } from '../Redux/CartSlice';
  import { NavLink } from 'react-router-dom';
  
  const Cart = () => {
    const { cart, totalPrice } = useSelector((state) => state.productstore);
    const dispatch = useDispatch();
  
    const increment = (id) => {
      dispatch(incrementQnty(id));
    };
  
    const handledelete = (id) => {
      dispatch(deleteitem(id));
    };
  
    const decrement = (id) => {
      dispatch(decrementQnty(id));
    };
  
    return (
      <>
      {cart.length>0 ?(
        <Container maxWidth="lg">
          <TableContainer component={Paper}>
            <Table aria-label="cart table" >
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100px', objectFit: 'contain' }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => increment(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        variant="contained"
                        onClick={
                          item.quantity === 1
                            ? () => handledelete(item.id)
                            : () => decrement(item.id)
                        }
                        sx={{ml: 2}}
                      >
                        -
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handledelete(item.id)}
                        sx={{ml: 2}}
                      >
                        Del
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{border:1}}>
          <Typography variant="h4">
          Total Price=<span>  {totalPrice}</span>
        </Typography>
        </Box>
        </Container>):(
          <>
 <img src="https://img.freepik.com/free-vector/empty-shopping-basket-concept-illustration_114360-22411.jpg?t=st=1727096732~exp=1727100332~hmac=8e94ccda2b690bba058bb29365681f586d7c4d7d3dbacca04b5d23d536a278fe&w=740" alt="" height="230px"/>
<NavLink to={'/store'} style={{textDecoration: 'none'}}>
<Button 
 variant="contained" 
 color="primary" 
 onClick={() => {
   // Add your navigation or action here
 }}
 sx={{ display: 'block', margin: '0 auto' }} // Centers the button
>
 Continue Shopping
</Button>
</NavLink>
</>
)}
      </>
    );
  };
  
  export default Cart;
  