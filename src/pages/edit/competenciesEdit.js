import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextField } from '@mui/material';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Stack } from "@mui/material";
import { Chip } from "@mui/material";
import axios from "axios";
import { Grid } from "@mui/material";
import Header from "../../components/header/header.js";
// import {useNavigate} from 'react-router-dom';

const CompetenciesEdit = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));

  // const navigate = useNavigate();
  const [inform, setInform] = useState([]); 
  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(`https://resume-builder-backend-aa75.onrender.com/api/info/view/${user.email}`);
      const data = await response.json();
      setInform(data[0].competencies);
    }
  },[]);

  const save = (event) =>{
    event.preventDefault();
    const myInput =  {
      competencies:inform
    }

    console.log(myInput);

    var config = {
      method: 'put',
      url: `https://resume-builder-backend-aa75.onrender.com/api/info/update/${user.email}`,
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
  };

  return(
    <div>
    <Header />
    <Box
      my={3}
      mx={50}
      py={5}
      px={10}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white' 
      }}
    >
      <Typography variant="h6">Competencies</Typography>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple = {true}
          id="tags-filled"
          options={[]}
          defaultValue={inform}
          value={inform}
          onChange={(e, newValue) => {setInform(newValue)}}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Competencies"
              placeholder="add some competencies"
            />
          )}
        />                
      </Stack>
      <Grid container mt={2}>
        <Grid item>
          <Button onClick={save} variant="contained" >
            Save
          </Button>       
        </Grid>
        <Grid item ml={1}>
          <Button onClick={()=>{window.location.href='/resume'}} variant="contained" sx={{backgroundColor:'red'}} >
            Back
          </Button>
        </Grid>
      </Grid>                                 
    </Box>
    </div>
  );
}
export default CompetenciesEdit;