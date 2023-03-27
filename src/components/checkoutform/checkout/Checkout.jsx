import React, {useState,useEffect} from 'react';
import { Paper,Stepper,Step,Typography,CircularProgress,Divider,Button, StepLabel } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyles from './styles';  
import { commerce } from '../../../library/commerce';

const steps = [ "Delivery Address","Payment Details"]

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
const [activeStep, setActiveStep] = useState(0);
const [checkoutToken, setCheckoutToken] = useState(null);
const [shippingData, setShippingData] = useState({});

const classes = useStyles();


useEffect (() =>{
const generateToken = async () => {
  try {
    const token = await commerce.checkout.generateToken(cart.id,{type: 'cart'});
    
    setCheckoutToken(token);
  } catch (error) {
    
  }
}
generateToken(); 
},[cart]);

const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep -1)

const next = (data) => {
setShippingData(data);
nextStep();
}

const Confirmation = () => (
<div>Confirmation</div>
);

const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>;

  return (
    <>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>

        <Paper className={classes.paper}>
<Typography variant='h6' align='center'>CheckOut</Typography>
<Stepper activeStep={activeStep} className={classes.stepper}>

{steps.map((step) => (
<Step key={step}>
    <StepLabel>{step}</StepLabel>
</Step>
))}

</Stepper>
{activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}

        </Paper>

      </main>
    </>
  )
}

export default Checkout;
