import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from '@mui/material';
import axios from "axios";
// import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/header.js";

const SummerySetup = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));

  const [inform, setInform] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(`https://resume-builder-backend-aa75.onrender.com/api/info/view/${user.email}`);
      const data = await response.json();
      setInform(data[0]);
    }
  },[]);

  const save = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const myInput =  {summery: data.get('summery')}

    var config = {
      method: 'put',
      url: `https://localhost:8080/api/info/update/${user.email}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : myInput
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
    <Header />
    <Box
      mx={30}
      py={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6">Professional Summery</Typography>
      <Box component="form" onSubmit={save} noValidate sx={{ m: 1 }}>
        <TextField
          margin="normal"
          id="summery"
          label="Add Summery"
          name="summery"
          sx={{ width: 600 }}
          multiline
          rows={7}
          value={inform.summery}
          onChange={(e) =>
            setInform((inform) => ({ ...inform, summery: e.target.value }))
          }
        />
        <Grid container>
          <Grid item>
            <Button type="submit" variant="contained" >
              Save
            </Button>       
          </Grid>
          <Grid item ml={1}>
            <Button variant="contained" onClick={()=>{window.location.href='/educationsetup'}} sx={{backgroundColor:'red'}} >
              Next
            </Button>
          </Grid>
        </Grid>        
      </Box>
    </Box>
    </div>
  );
};
export default SummerySetup;
