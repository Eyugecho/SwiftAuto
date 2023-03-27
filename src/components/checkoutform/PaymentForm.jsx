import React from 'react';
import { Typography,Button, Divider } from '@material-ui/core';
import { Elements,CardElement,ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


// react stripe.js is a javascript library used to handle users credit card information
const PaymentForm = ({checkoutToken ,backStep,onCaptureCheckout,shippingData}) => {

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const handleSubmit = async (event, elements, stripe) => {
  
  event.preventDefault();

  if(!stripe || !elements) return;

  const CardElement = elements.getElement(CardElement);

  const {error, paymentMehod} = await  stripe.createPaymentMethod({type:'card', card: CardElement });

  if(error) {
    console.log(error);
  }else {
    const orderData ={
      list_items: checkoutToken.line_items,
      customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email:shippingData.email},
      shipping: {
        name: 'Primary' ,
         street: shippingData.address1 ,
         town_city: shippingData.city,
         county_state: shippingData.shippingSubdivision,
         postal_zip_code: shippingData.zip,
         country:shippingData.shippingCountry,            
    },
    payment: {
      gateway: 'stripe' ,
      stripe: {
        Payment_method_id: paymentMehod.id
      }
    }
    }
    onCaptureCheckout(checkoutToken.id, orderData);

  }
}


  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <br/>
      <Divider/>
      <Typography variant='h6' gutterBottom style={{margin:'20px 0'}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {( {elements, stripe}) => (
           <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement/>
            <br/> <br/>
            <div style={{display:"flex" , justifyContent: "space-between"}}>
<Button variant='outlined' onClick={backStep}>Back</Button>
<Button type='submit' variant='contained' color='primary' disabled={!stripe}>
  Pay {checkoutToken.subtotal.formatted_with_code}
  </Button>

            </div>
           </form>
        )}
      </ElementsConsumer>
      </Elements>
    </>
  );
}

export default PaymentForm;
