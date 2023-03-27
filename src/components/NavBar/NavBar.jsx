import React from 'react'
import { AppBar,Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import { Link,useLocation } from 'react-router-dom';

import useStyles from './styles';

const NavBar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
  return (
    <div>
      <AppBar className={classes.appBar} position="fixed" >
           <Toolbar >
            <Typography component={Link} to='/' variant="h6" color="inherit" className={classes.title}>
<img src='images/logo2 3.png' alt='logo' height='50px' className={classes.image}/>

              </Typography>

              <div className='classes.grow'/>
             {location.pathname === '/' ? (<IconButton  component={Link} to='/cart' color='inherit'>
                   <Badge badgeContent={totalItems} color='primary'>

                           <ShoppingCart/>

                      </Badge>

              </IconButton>):null}
              
           </Toolbar>

         

      </AppBar>
    </div>
  )
}

export default NavBar;
