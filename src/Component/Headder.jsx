import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from '@mui/icons-material/Close';
import CartIcon from "./CartItem";
import { NavLink } from "react-router-dom";
import './Headder.css'
const Headder = () => {
  const { cart } = useSelector((state) => state.productstore);
  const navigate = useNavigate();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const [menuopen, setMenuopen] = useState(false);
  const handlechange = () => {
    setMenuopen(!menuopen);
  };
  const drawer = (
    <Box onClick={handlechange}sx={{ textAlign: "center" }}>
      <Typography
        sx={{ color: "gold", fontSize: "25px", bgcolor: "black", p: 0.8 }}
      >
        Store
      </Typography>
      {/* <Divider/> */}

      <div className="slide">
        <ul className="nav-manu">
          <li>
            <NavLink to={"/store"}>
              <a className="nav-link">Store</a>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>
              <a className="nav-link">cart</a>
            </NavLink>
          </li>
        </ul>
      </div>
    </Box>
  );
  return (
    <div>
      <Box>
        <AppBar sx={{ bgcolor: "black"}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open-drawer"
              edge="start"
              sx={{ display: {xs:'block',sm:'block',md:'none',lg:'none'}, mr: 2 }}
              onClick={handlechange}
            >
              <MenuOpenIcon />
            </IconButton>
            <NavLink to={'/'} style={{textDecoration:'none'}}>
            <Typography sx={{ color: "gold", fontSize: "30px" }}>
              store
            </Typography>
            </NavLink>
            <Box sx={{ display: { xs: "none", sm: "none" ,md:'block',lg:'block'}, ml: "auto" }}>
              <ul className="nav-item">
                <li>
                  <NavLink to={"/store"}>
                    <a className="nav-link">Store</a>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/cart"}>
                    <Button>
                    <Badge badgeContent={totalQuantity} color="secondary">
        <ShoppingCartIcon/>
      </Badge>
                    </Button>
                  </NavLink>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={menuopen}
            // onClose={handlechange}
            sx={{
              display: { xs: "block", sm: "block",md:'none' ,lg:'none'},
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "190px",
              },
            }}
          >
           
            {drawer}
          </Drawer>
          {menuopen && (
          <Box
            sx={{
              position: "fixed",
              top: 7,
              left: 200,
              zIndex: 1300, 
            }}
          >
            <IconButton
              onClick={handlechange}
              sx={{
                color: "white",
                bgcolor: "black",
                "&:hover": {
                  color: "gold",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        </Box>
        <Toolbar />
      </Box>
    </div>
  );
};

export default Headder;
