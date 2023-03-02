import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextField } from '@mui/material';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Header from "../../components/header/header.js";
import axios from "axios";

const HeadingEdit = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));

  // const navigate = useNavigate();  
  const [inform, setInform] = useState({});

  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(`http://localhost:8080/api/info/view/${user.email}`);
      const data = await response.json();
      setInform(data[0].head);
    }
  },[]);
  
  const save = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const myInput = {
      head:{
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        title: data.get("title"),
        city: data.get('city'),
        country: data.get('country'),
        zipcode: data.get("zipcode"),
        mobile: data.get('mobile'),
        email: data.get("email"),
        linkedin: data.get('linkedin')
      }
    };
    
    var config = {
      method: 'put',
      url: `http://localhost:8080/api/info/update/${user.email}`,
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
    <Header/>
    <Box
      mx={30}
      py={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white' 
      }}
    >
      <Typography variant="h6">Resume Heading</Typography>
      <Box component="form" onSubmit={save} noValidate sx={{ m:1}}>
        <Grid container>
          <Grid item>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "firstname-input" }}
              required
              id="firstname"
              label="First name"
              name="firstname"
              sx={{width:304}}
              value={inform.firstname || ''}
              onChange={(e)=> setInform(inform => ({...inform,firstname: e.target.value}))}
            />          
          </Grid>
          <Grid item ml={1}>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "lastname-input" }}
              required
              name="lastname"
              label="Last name"
              id="lastname"
              sx={{width:304}}
              value={inform.lastname || ''}
              onChange={(e)=> setInform(inform => ({...inform,lastname: e.target.value}))}
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          inputProps={{ "data-testid": "title-input" }}
          required
          fullWidth
          name="title"
          label="Profession"
          id="title"
          value={inform.title || ''}
          onChange={(e)=> setInform(inform => ({...inform,title: e.target.value}))}
        />
        <Grid container>
          <Grid item>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "city-input" }}
              required
              id="city"
              label="City"
              name="city"
              sx={{width:200}}
              value={inform.city || ''}
              onChange={(e)=> setInform(inform => ({...inform,city: e.target.value}))}
            />          
          </Grid>
          <Grid item ml={1}>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "country-input" }}
              required
              name="country"
              label="Country"
              id="country"
              sx={{width:200}}
              value={inform.country || ''}
              onChange={(e)=> setInform(inform => ({...inform,country: e.target.value}))}
            />
          </Grid>
          <Grid item ml={1}>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "zipcode-input" }}
              required
              name="zipcode"
              label="Postal Code"
              id="zipcode"
              sx={{width:200}}
              value={inform.zipcode || ''}
              onChange={(e)=> setInform(inform => ({...inform,zipcode: e.target.value}))}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "mobile-input" }}
              required
              id="mobile"
              label="Mobile"
              name="mobile"
              sx={{width:304}}
              value={inform.mobile || ''}
              onChange={(e)=> setInform(inform => ({...inform,mobile: e.target.value}))}
            />          
          </Grid>
          <Grid item ml={1}>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "email-input" }}
              required
              name="email"
              label="E-Mail"
              id="email"
              sx={{width:304}}
              value={inform.email || ''}
              onChange={(e)=> setInform(inform => ({...inform,email: e.target.value}))}
            />
          </Grid>
        </Grid>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "linkedin-input" }}
              required
              name="linkedin"
              label="Linkedin"
              id="linkedin"
              fullWidth
              value={inform.linkedin || ''}
              onChange={(e)=> setInform(inform => ({...inform,linkedin: e.target.value}))}
            />
        <Grid container>
          <Grid item>
            <Button data-testid='saveBtn' type="submit" variant="contained" >
              Save
            </Button>       
          </Grid>
          <Grid item ml={1}>
            <Button data-testid='backBtn' variant="contained" onClick={()=>{window.location.href='/resume'}} sx={{backgroundColor:'red'}} >
              Back
            </Button>
          </Grid>
        </Grid>        
      </Box>
    </Box>
    </div>
  );
};
export default HeadingEdit;
