import React,{useState, useEffect} from 'react';
import {InputLabel,Select,MenuItem, Typography, Grid, Button } from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './FormInput';
import {commerce} from '../../library/commerce';
import {Link }from 'react-router-dom';


// useForm is used to control the form

const AddressForm = ({checkoutToken, next}) => { 
     
    const methods = useForm();
  const [deliveryCountries,setDeliveryCountries] = useState([]);
  const [deliveryCountry,setDeliveryCountry] = useState('');
  const [deliverySubdivisions, setDeliverySubdivisions] = useState([]);
  const [deliverySubdivision,setDeliverySubdivision] = useState('');
  const [deliveryOptions,setDeliveryOpitions] = useState([]);
  const [deliveryOption,setDeliveryOption] = useState('');

const countries = Object.entries(deliveryCountries).map(([code, name]) => ({id:code, label: name}));
const subdivisions = Object.entries(deliverySubdivisions).map(([code, name]) => ({id:code, label: name}));
// const opitions = deliveryOptions.map((sO) => ({id:sO.id, label: `${sO.description} - (${sO.price.formatted_with_code})`}) )

const fetchShippingCountries = async (checkoutTokenId) => {
  const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);

  setDeliveryCountries(countries);
  setDeliveryCountry(Object.keys(countries)[0]);
}

const fetchSubdivisions = async (countryCode) => {
  const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

  setDeliverySubdivisions(subdivisions);
  setDeliverySubdivision(Object.keys(subdivisions)[0]);
}
 
// const fetchShippingOpitions = async (checkoutTokenId, country, region= null ) => {
//   const opitions = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
   
//   setDeliveryOpitions(opitions);
//   setDeliveryOption(opitions[0].id);
// }

useEffect(() => {
fetchShippingCountries(checkoutToken.id);
},[]);

useEffect(() => {
if (deliveryCountry) fetchSubdivisions(deliveryCountry);
},[deliveryCountry]);

// useEffect(() => {
// if (deliverySubdivision) fetchShippingOpitions(checkoutToken.id,deliveryCountry,deliverySubdivision);
// },[deliverySubdivision]);

  return (
    <>
    <div>
      <Typography variant="h6" gutterBottom>Delivery Address</Typography>
      <FormProvider {...methods} >
        {/* methods pass all props from useForm like onSubmit and onChange */}
        <form onSubmit={methods.handleSubmit((data) => next({...data, deliveryCountry,deliverySubdivision })) }>
          <Grid container spacing={3}>
            <FormInput required name='firstName' label='First name' />
            <FormInput required name='LastName' label='Last name' />
            <FormInput required name='address1' label='Address' />
            <FormInput required name='email' label='Email' />
            <FormInput required name='city' label='City' />
            <FormInput required name='postal Code' label='Postal Code' />
           <Grid item xs={12} sm={6}>
<InputLabel>Delivery Country</InputLabel>
<Select value={deliveryCountry} fullWidth onChange={(e) => setDeliveryCountry(e.target.value)}>
  {countries.map((country) => (
  <MenuItem key={country.id} value={country.id}>
  {country.label}
  </MenuItem>

  ))}
</Select>
           </Grid>
                      <Grid item xs={12} sm={6}>
<InputLabel>Delivery Subdivision</InputLabel>
<Select value={deliverySubdivision} fullWidth onChange={(e) => setDeliverySubdivision(e.target.value)}>
  {subdivisions.map((subdivision) => (
  <MenuItem key={subdivision.id} value={subdivision.id}>
  {subdivision.label}
  </MenuItem>

  ))}
</Select>
           </Grid>
                      {/* <Grid item xs={12} sm={6}>
<InputLabel>Delivery Opitions</InputLabel>
<Select value={deliveryOption} fullWidth onChange={(e) => setDeliveryOption(e.target.value)}>
  
  {opitions.map((opition) => (
  <MenuItem key={opition.id} value={opition.id}>
  {opition.label}
  </MenuItem>
  ))}
  
</Select>


           </Grid> */}
           
           </Grid>
          <br/>
<div style={{ display:'flex', justifyContent:'space-between'}}>
<Button component={Link} to='/cart' variant='outlined' color='inherit'>Back to Cart</Button>
<Button type='submit' variant='contained' color='primary'>Next</Button>

</div>
        </form>

      </FormProvider>
      </div>
    </>

    
   
  )
 
}

export default AddressForm;
