import React from 'react';

import { Typography,Button,Card,CardMedia,CardContent,CardActions } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({item,onRemoveFromCart,onUpdateCartQty}) => {

   const clasess = useStyles(); 
  return (
    <Card>
      <CardMedia image={item.image.url} className={clasess.media}/>
      <CardContent className={clasess.cardContent}>

        <Typography variant='h5'>{item.name}</Typography>
        <Typography variant='h6'>{Number((item.price).formatted_with_code.replace(",","").split(" ")[0])*item.quantity+" "+(item.price).formatted_with_code.split(" ")[1]}</Typography>
</CardContent>
        <CardActions className={clasess.cardActions}>
           <div className={clasess.buttons}>
          <Button type='button' size='small'  color='primary' onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>{item.quantity}</Typography>
           <Button type='button' size='small'  color='secondary' onClick={() => onUpdateCartQty(item.id,item.quantity + 1)}>+</Button> 
           <Button variant='contained' size='small' type='button'color='secondary' onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
           </div> 
        </CardActions>

      

    </Card>
    
  )
}

export default CartItem;
