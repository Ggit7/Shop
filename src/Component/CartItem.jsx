import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { cart } = useSelector((state) => state.productstore);
  const navigate = useNavigate();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <IconButton onClick={() => navigate('/cart')}>
      <Badge badgeContent={totalQuantity} color="secondary">
        <ShoppingCartIcon/>
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
