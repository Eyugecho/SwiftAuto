import React from 'react'
import { Container,Button,Typography,Grid } from '@material-ui/core';
import useState from './styles';
import "./style.css";
import CartItem from './cartitem/CartItem';
import { Link } from 'react-router-dom';
const Cart = ({cart : carts, handleEmptyCart ,handleRemoveFromCart,handleUpdateCartQty}) => {
     
    const classes = useState();

    const EmptyCart = () => {
<Typography variant='subtitle1'>Your shopping cart is Empty,
{/* <Link to='/' className={classes.link}>Start Adding</Link>! */}
</Typography>
console.log(EmptyCart);
    };
    const FilledCart = ({cart}) => {
  return  <>
     <Grid container spacing={3}>
        {
    cart.line_items.map((item) =>(<Grid item key={item.id} xs={12} sm={4}><CartItem item = {item} onRemoveFromCart={handleRemoveFromCart} onUpdateCartQty={handleUpdateCartQty} cart ={carts}/></Grid>)) 
        }
    </Grid>
    <div className={classes.cardDetails}>
<Typography variant="h4">Subtotal:{cart.line_items.length > 0 ? cart.subtotal.formatted_with_code : 0}</Typography>
    <div>
    <Button className={classes.emptyButton} size="large" variant="contained" color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>
    <Button className={classes.checkoutButton} size="large" variant='contained' color='primary' component={Link} to='/Checkout' >Check Out</Button>
    </div>

    </div> 
    </>
    };
    
  return (
    <Container>
        <div className={classes.toolbar}/>
      <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
      {carts.id ? (carts.line_items.length > 0 ?   <FilledCart cart={carts}/> : <EmptyCart  /> ): <EmptyCart />}
    </Container>
  )
}

export default Cart;
