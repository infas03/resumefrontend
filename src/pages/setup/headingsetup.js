import React from "react";
import { Box } from "@mui/material";
import { TextField } from '@mui/material';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Header from "../../components/header/header.js";
import axios from "axios";

const HeadingSetup = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));
  console.log(user)
  //const navigate = useNavigate();  

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
      },
      email: user.email
    };
    console.log(myInput)
    
    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/info/create',
      headers: { 
        'Content-Type': 'application/json'
      },

      data : myInput
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));;
      window.location.href='/summerysetup'
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return(
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
              //value={inform.lastname || ''}
              //onChange={(e)=> setInform(inform => ({...inform,lastname: e.target.value}))}
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
            />
        <Grid container>
          <Grid item>
            <Button data-testid='nextBtn' type="submit" variant="contained" >
              Next
            </Button>       
          </Grid>
        </Grid>        
      </Box>
    </Box>
    </div>
  );
}
export default HeadingSetup;