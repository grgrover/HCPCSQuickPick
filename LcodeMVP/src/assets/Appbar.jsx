import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import FormData from 'form-data'
import CircularProgress from '@mui/material/CircularProgress';


const ButtonAppBar = ({setLCodes}) => {
  const [spinner, setSpinner] = useState(false)

  const onFileChange = (e) => {
    var file = e.target.files[0]
    setSpinner(true)
    const formData = new FormData();
    formData.append('file', file)
    axios.post('http://localhost:3005/data', formData, {
      headers: {
        'Content-Type': 'mulitpart/form-data'
      }
    })
      .then((data) => {
        setSpinner(false);
        setLCodes(data.data)
      })
      .catch((err) => {
        setSpinner(false)
        console.log(err)
      })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" justify="space-between" sx={{height: '75px'}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            <b> HCPCS Quick Pick</b>
          </Typography>

          <Button variant="contained" component="label" size="large" style={{ color: 'inherit', backgroundColor: 'inherit', width: '35%', justifyContent: 'space-around' }}>
            {spinner && <CircularProgress sx={{ color: "black", paddingRight: '2%' }} size={20} />}
            Update Fee Schedule (.csv)
            <input hidden type='file' name="currentCSVFile" onChange={onFileChange} onClick={e => { (e.target.value = null) }}></input>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;