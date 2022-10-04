import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import HeightWeight from './HeightWeight'
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";


const Demographics = ({ setBillingZone, billingZone, setRight, right, setLeft, left, setKLevel, kLevel, discount, levelL, setLevelL, levelR, setLevelR, setDiscount, control }) => {

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
        color: '#FFFFFF',
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
      color: "#000000",
      textAlign: 'center'
    }
  }));

  var zones = ['AK_NR', 'AL_NR', 'AR_NR', 'AZ_NR', 'CA_NR', 'CO_NR',  'CT_NR',  'DC_NR', 'DE_NR', 'FL_NR', 'GA_NR', 'HI_NR',  'IA_NR',  'ID_NR',  'IL_NR',  'IN_NR',  'KS_NR','KY_NR',  'LA_NR',  'MA_NR', 'MD_NR',  'ME_NR',  'MI_NR', 'MN_NR',  'MO_NR',  'MS_NR', 'MT_NR', 'NC_NR',  'ND_NR',  'NE_NR',  'NH_NR',  'NJ_NR',  'NM_NR', 'NV_NR', 'NY_NR', 'OH_NR', 'OK_NR',  'OR_NR', 'PA_NR',  'PR_NR', 'RI_NR',  'SC_NR', 'SD_NR', 'TN_NR',  'TX_NR','UT_NR',  'VA_NR',  'VI_NR', 'VT_NR',  'WA_NR', 'WI_NR', 'WV_NR','WY_NR']

  const handleDiscount = (e) => {
    e.preventDefault()
    setDiscount(e.target.value)
  }

  return (
    <div >
      <Typography sx={{ color: 'black', paddingTop: '5%' }} variant="h5"><b>Demographics</b></Typography>
      <Stack spacing={8} direction="row" container="true" padding="2%" justifyContent="center" alignItems="center">
        <Stack spacing={0} direction="column" container="true" paddingTop="0%">
          <FormLabel id="Right-Level" sx={{ color: 'black', textAlign: 'center', textDecoration: 'underline' }}>Side</FormLabel>
          <Stack direction="row" spacing={2}>
            <Controller
              name="right"
              control={control}
              render={({ field }) => <FormControlLabel sx={{color: 'black'}}  {...field} control={<Checkbox sx={{ color: "white" }} />} label="Right" />}
            />
            <Controller
              name="left"
              control={control}
              render={({ field }) => <FormControlLabel  sx={{color: 'black'}} {...field} control={<Checkbox sx={{ color: "white" }} />} label="Left" /> }
        />
          </Stack>
          <FormControl>
            <FormLabel id="Right-Level" sx={{ color: 'black', textAlign: 'center', textDecoration: 'underline' }}>Right Amputation Level</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="right"
              value={levelR}
              onChange={(e) => { setLevelR(e.target.value) }}
            >
              <FormControlLabel value="HD" control={<Radio sx={{ color: 'white' }} />} label="Hip Disartic" sx={{color: 'black'}} />
              <FormControlLabel value="AK" control={<Radio sx={{ color: 'white' }} />} label="AK" sx={{color: 'black'}} />
              <FormControlLabel value="KD" control={<Radio sx={{ color: 'white' }} />} label="KD" sx={{color: 'black'}}/>
              <FormControlLabel value="BK" control={<Radio sx={{ color: 'white' }} />} label="BK" sx={{color: 'black'}}/>
              <FormControlLabel value="Symes" control={<Radio sx={{ color: 'white' }} />} label="Symes" sx={{color: 'black'}}/>
              <FormControlLabel value="PF" control={<Radio sx={{ color: 'white' }} />} label="Partial Foot" sx={{color: 'black'}}/>

            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="Left-label" sx={{ color: 'black', textAlign: 'center', textDecoration: 'underline' }}>Left Amputation Level</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="left"
              value={levelL}
              onChange={(e) => { setLevelL(e.target.value) }}
            >
              <FormControlLabel value="HD" control={<Radio sx={{ color: 'white' }} />} label="Hip Disartic" sx={{color: 'black'}}/>
              <FormControlLabel value="AK" control={<Radio sx={{ color: 'white' }} />} label="AK" sx={{color: 'black'}}/>
              <FormControlLabel value="KD" control={<Radio sx={{ color: 'white' }} />} label="KD" sx={{color: 'black'}}/>
              <FormControlLabel value="BK" control={<Radio sx={{ color: 'white' }} />} label="BK" sx={{color: 'black'}}/>
              <FormControlLabel value="Symes" control={<Radio sx={{ color: 'white' }} />} label="Symes" sx={{color: 'black'}}/>
              <FormControlLabel value="PF" control={<Radio sx={{ color: 'white' }} />} label="Partial Foot" sx={{color: 'black'}} />

            </RadioGroup>
          </FormControl>
          <Stack spacing={2} direction="row" container="true" padding="2%" justifyContent="center" alignItems="center">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color: 'black' }}>
              <InputLabel id="demo-simple-select-standard-label" sx={{ color: 'black' }}>K-level</InputLabel>
              <Controller
                name="kLevel"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => <CssSelect
                  labelId="demo-simple-select-standard-label"
                  value={value}
                  onChange={onChange}
                  id="demo-simple-select-standard"
                  label="k-level"
                  sx={{ color: 'black' }}
                >
                  <MenuItem value={'K1'} >K1</MenuItem>
                  <MenuItem value={'K2'}>K2</MenuItem>
                  <MenuItem value={'K3'}>K3</MenuItem>
                  <MenuItem value={'K4'}>K4</MenuItem>
                </CssSelect>} />
            </FormControl>
            <HeightWeight control={control} />
          </Stack>

        </Stack>
        <Stack spacing={2} direction="column" container="true" paddingTop="1%">
          <Typography sx={{ color: 'black' }}>Select your billing zone*</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color: 'black' }}>
            <Controller
              name="billingZone"
              control={control}
              render={({ field: { onChange, value } }) => <CssSelect
                labelId="demo-simple-select-standard-label"
                value={value}
                onChange={onChange}
                id="demo-simple-select-standard"
                sx={{ color: 'black' }} >
                {zones.map((zone, index) => (
                  <MenuItem value={zone} key={index}>{zone}</MenuItem>
                ))}
              </CssSelect>} />
          </FormControl>
          <Typography sx={{ color: 'black' }}>Enter your contract discount (%)*:</Typography>
          <Controller
            name="discount"
            control={control}
            render={({ field }) => <CssTextField {...field} id="standard-basic" variant="standard" endadornment={<InputAdornment position="end">%</InputAdornment>} InputLabelProps={{
              style: { color: '#000000' }
            }}  InputProps={{inputProps: { style: {textAlign: 'center'}}}} />}
          />
          <Button variant="contained" type='submit'>Create Quote</Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default Demographics;