import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { styled } from "@mui/material";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from "react-hook-form";

const PrepSupply = ({ lCodes, control }) => {
  const CssSelect = styled(Select, {
    shouldForwardProp: (props) => props !== "focusColor"
  })((p) => ({
    // input label when focused
    "& label.Mui-focused": {
      color: '#FFFFFF'
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline": {
      borderBottomColor: '#FFFFFF'
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      borderBottomColor: '#FFFFFF'
    },
    "& .MuiSelect-icon": {
      fill: '#FFFFFF',
      color: '#FFFFFF'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFFFFF',
    },
  }));


  var currentCodes = [];
  lCodes.forEach(lCode => {
    if (lCode.hcpcs >= 'L5510' && lCode.hcpcs <= 'L5600') {
      currentCodes.push(lCode)
    }
  })


  return (
    <>
      <Stack spacing={1} direction="column" container="true" padding="2%" justifyContent="start" alignItems="center" width="100%">
        <Typography variant="h6" color="black">Supply, Prepatory Prosthesis L5510-L5600</Typography>
        {currentCodes.map((lCode, index) => (
          <FormControl variant="standard" sx={{ m: 1, width: '80%', color: 'black' }} key={index}>
     <Stack spacing={2} direction="row" padding="2%" justifyContent="space-between" width="100%">
            <InputLabel id="demo-simple-select-standard-label" sx={{ color: 'black' }}>{lCode.hcpcs}</InputLabel>
         <Controller
              name={`${lCode.hcpcs}`}
              control={control}
              defaultValue=''
              render={({ field: { onChange, value } }) => <CssSelect
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={value}
              onChange={onChange}
              sx={{ color: 'black', width: "250px" }}
            >
              <MenuItem value={'1'} >1</MenuItem>
              <MenuItem value={'2'} >2</MenuItem>
              <MenuItem value={'3'} >3</MenuItem>
              <MenuItem value={'4'} >4</MenuItem>
            </CssSelect> } />
            <Typography>{lCode.description}</Typography>
            </Stack>
          </FormControl>

        ))}
      </Stack>
    </>
  )
}
export default PrepSupply;