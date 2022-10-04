import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material";
import { useForm, Controller } from "react-hook-form";


const HeightWeight = ({ control}) => {
  const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor"
  })((p) => ({
    '&label': {
      color: '#000000'
    },
    // input label when focused
    "& label.Mui-focused": {
      color: '#000000'
    },
    '& .MuiFilledInput-root': {
      borderColor: '#FFFFFF',
      '& fieldset': {
        color: '#000000',
        borderColor: '#FFFFFF'
      }
    },
    '&::placeholder': {
      color: '#000000'
    },
    // focused color for input with variant='standard'
    '& .MuiInput-underline:after': {
      borderBottomColor: "#FFFFFF"
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#FFFFFF"
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      borderColor: "#FFFFFF",
      "&.Mui-focused fieldset": {
        borderColor: "#FFFFFF"
      }
    },
    "& .MuiInputBase-root": {
      borderColor: "#FFFFFF",
      color: "#000000"
    }
  }));



  return (
    <>
      <Controller
        name="height"
        control={control}
        render={({ field }) => <CssTextField {...field} id="standard-basic" label="Height (inches)" variant="standard" key="height" name="height" InputLabelProps={{ style: { color: '#000000' } }}
        InputProps={{inputProps: { style: {textAlign: 'center'}}}} />}
      />
      <Controller
        name="weight"
        control={control}
        render={({ field }) => <CssTextField {...field} id="standard-basic" label="Weight (lbs)" name='weight' key="weight" InputLabelProps={{ style: { color: '#000000' } }} variant="standard"  InputProps={{inputProps: { style: {textAlign: 'center'}}}} />}
      />

    </>
  )
}
export default HeightWeight;