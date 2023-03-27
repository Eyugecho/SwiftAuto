import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  //  control is object that obtained by invoking useFormContext

  return (
    <Grid item xs={12} sm={6}>
      {/* controller is used to create reusable inputs */}
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
        
      />
    </Grid>
  );
}

export default FormInput;