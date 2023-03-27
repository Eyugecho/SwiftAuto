import React, { useEffect } from 'react';
import {Grid} from '@material-ui/core';
import Product from './product/Product';
import useStyles from './styles';


const Products1 = ({products, onAddToCart}) => {

  const classes = useStyles(); 

  return ( 
  <main className={classes.content}>
    <div className={classes.toolbar}/>
<Grid container justify='center' spacing={4}>
{products.map((product) => {
    return <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
       <Product product={product} onAddToCart ={ onAddToCart }/>
           </Grid>
})}
  


</Grid>
    </main>
  )
}

export default Products1;
