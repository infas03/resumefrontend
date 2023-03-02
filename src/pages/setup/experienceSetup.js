import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextField } from '@mui/material';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { Checkbox } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Modal } from "@mui/material";
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import Header from "../../components/header/header.js";

const ExperienceSetup = () =>{
  const user = JSON.parse(window.localStorage.getItem('data'));
  // const navigate = useNavigate();
  const [inform, setInform] = useState([]);
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('') 
  const [currentValue, setCurrentValue] = useState(false)
  const [open, setOpen] = React.useState({
    open:false,
    indx: 0,
    new: false
  });
  const handleClose = () => {
    setOpen({...open, open:false, indx:0})
  }

  const style = { 
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #6800A7",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(`http://localhost:8080/api/info/view/${user.email}`);
      const data = await response.json();
      setInform(data[0].experience);
    }
  },[]);

  const updateFieldChanged = index => e => {
    let newArr = [...inform];
    let property = e.target.name 
    newArr[index][property] = e.target.value
    setInform(newArr);
  }

  const updateStartDatePickerChanged = index => e => {
    setStartDate(e.$d)
    let newArr = [...inform];

    newArr[index].start = e.$d
    setInform(newArr);
  }

  const updateEndDatePickerChanged = index => e => {
    setEndDate(e.$d)
    let newArr = [...inform];

    newArr[index].end = e.$d
    setInform(newArr);
  }

  const currentOnChangeHandle = index => e =>{
    let newArr = [...inform];
  
    newArr[index].current = e.target.checked
    newArr[index].end = null
    setInform(newArr);
    setCurrentValue(e.target.checked);

  }

  const createFieldChanged = index => e => {
    let newArr = [...inform];
    let property = e.target.name 
    newArr[index] = {...newArr[index], [property]:e.target.value}
    setInform(newArr);
  }

  const save = (event) =>{
    event.preventDefault();
    const myInput =  {
      experience:inform
    }

    console.log(myInput);

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
  };

  const deleteCard = index => e =>{
    e.preventDefault();

    let newArr = [...inform];
    newArr = newArr.filter((ele, indx) => indx !== index )
    setInform(newArr);

    const myInput =  {
      experience: newArr
    }

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
  };

  const newExperienceModal = () => {
    setOpen({...open, new: true})
    setStartDate('');
    setEndDate('')
    setCurrentValue(false)
  }
  return(
    <div>
    <Header/>
    <Box
      my={3}
      mx={20}
      py={5}
      px={10}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white' 
      }}
    >
      <Typography variant="h6">Experience</Typography>
      <Button variant='outlined' onClick={newExperienceModal} style={{marginTop:16}}>New Experience</Button> 
      {inform.map((exps,index) =>{
        return(
          <Card key={exps._id} sx={{ minWidth: 275, mt:2, border: "1px solid #6800A7"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {exps.employer}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {exps.city}, {exps.country}
              </Typography>
              <Typography variant="h6" component="div">
                {exps.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {new Date(exps.start).getMonth()+1}/{new Date(exps.start).getFullYear()} -  {exps.end == null ? "Current" : `${new Date(exps.end).getMonth()+1}/${new Date(exps.end).getFullYear()}`}
              </Typography>
              <List dense sx={{ listStyleType: 'disc', pl: 2, lineHeight:1,fontSize:12 }}>
                    <ListItem sx={{ display: 'list-item' }}>{exps.description}</ListItem>
              </List>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Current" checked= {exps.current === true ? true : false}/>
              </FormGroup>
            </CardContent>
            <Grid container>
              <Grid item>
                <CardActions>
                  <Button size="small" variant='outlined' onClick={()=>{setOpen({...open, open:true, indx:index})}}>Edit</Button>
                </CardActions>
              </Grid>
              <Grid item>
                <CardActions>
                  <Button size="small" variant='outlined' sx={{backgroundColor:"lightblue"}} onClick={deleteCard(index)}>Delete</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        );    
      })}
      {inform.map((exps, index) => {
        return(
          <Modal key={index} open={open.open} onClose={handleClose}>
            <Box  sx={style}>
              <Box component="form" onSubmit={save} noValidate sx={{ m:1}}>
                <Grid container>
                  <Grid item>
                    <TextField
                      margin="normal"     
                      id="employer"
                      label="Employer Name"
                      name="employer"
                      sx={{width:200}}
                      value={inform[open.indx].employer || ''}
                      onChange={updateFieldChanged(open.indx)}
                    />          
                  </Grid>
                  <Grid item ml={1}>
                    <TextField
                      margin="normal"                      
                      name="city"
                      label="City"
                      id="city"
                      sx={{width:184}}
                      value={inform[open.indx].city || ''}
                      onChange={updateFieldChanged(open.indx)}
                    />
                  </Grid>
                  <Grid item ml={1}>
                    <TextField
                      margin="normal"                      
                      name="country"
                      label="Country"
                      id="country"
                      sx={{width:184}}
                      value={inform[open.indx].country || ''}
                      onChange={updateFieldChanged(open.indx)}
                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"                      
                  name="title"
                  label="Title"
                  id="title"
                  fullWidth
                  value={inform[open.indx].title || ''}
                  onChange={updateFieldChanged(open.indx)}
                  />
                <Grid container mt={2}>
                  <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/YYYY"
                        value={inform[open.indx].start || ''}
                        onChange={updateStartDatePickerChanged(open.indx)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  </Grid>
                  <Grid item ml={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          disabled={inform[open.indx].current === true ? true : false}
                          label="End Date"
                          inputFormat="MM/YYYY"
                          value={inform[open.indx].current === true ? new Date("0000-00-00T00:00:00.000Z") : inform[open.indx].end || ''}
                          onChange={updateEndDatePickerChanged(open.indx)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Current" checked= {inform[open.indx].current === true ? true : false} onChange={currentOnChangeHandle(open.indx)}/>
                </FormGroup>
                <TextField
                  margin="normal"
                  id="description"
                  label="Enter some description"
                  name="description"
                  sx={{ width: 600 }}
                  value={inform[open.indx].description || ""}
                  multiline
                  rows={7}
                  onChange={updateFieldChanged(open.indx)}
                />
                <Grid container mt={2}>
                  <Grid item>
                    <Button type="submit" variant="contained" >
                      Save
                    </Button>       
                  </Grid>
                  <Grid item ml={1}>
                    <Button onClick={handleClose} variant="contained" sx={{backgroundColor:'red'}} >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Modal> 
        );   
      })}
          <Modal open={open.new} onClose={handleClose}>
            <Box  sx={style}>
              <Box component="form" onSubmit={save} noValidate sx={{ m:1}}>
                <Grid container>
                  <Grid item>
                    <TextField
                      margin="normal"     
                      id="employer"
                      label="Employer Name"
                      name="employer"
                      sx={{width:200}}
                      onChange={createFieldChanged(inform.length)}
                      />          
                  </Grid>
                  <Grid item ml={1}>
                    <TextField
                      margin="normal"                      
                      name="city"
                      label="City"
                      id="city"
                      sx={{width:184}}
                      onChange={createFieldChanged(inform.length-1)}
                      />
                  </Grid>
                  <Grid item ml={1}>
                    <TextField
                      margin="normal"                      
                      name="country"
                      label="Country"
                      id="country"
                      sx={{width:184}}
                      onChange={createFieldChanged(inform.length-1)}
                      />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"                      
                  name="title"
                  label="Title"
                  id="title"
                  fullWidth
                  onChange={createFieldChanged(inform.length-1)}
                  />
                <Grid container mt={2}>
                  <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/YYYY"
                        value={startDate}
                        onChange={updateStartDatePickerChanged(inform.length-1)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  </Grid>
                  <Grid item ml={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          disabled={currentValue === true ? true : false}
                          label="End Date"
                          inputFormat="MM/YYYY"
                          value={endDate}
                          onChange={updateEndDatePickerChanged(inform.length-1)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Current" onChange={currentOnChangeHandle(inform.length-1)}/>
                </FormGroup>
                <TextField
                  margin="normal"
                  id="description"
                  label="Enter some description"
                  name="description"
                  sx={{ width: 600 }}
                  multiline
                  rows={7}
                  onChange={createFieldChanged(inform.length-1)}
                  />
                <Grid container mt={2}>
                  <Grid item>
                    <Button type="submit" variant="contained" >
                      Save
                    </Button>       
                  </Grid>
                  <Grid item ml={1}>
                    <Button onClick={()=>{setOpen({...open, new: false}); setCurrentValue(false); }} variant="contained" sx={{backgroundColor:'red'}} >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Modal>
        <Button sx={{mt:2}} onClick={()=> {window.location.href='/skillssetup'}} variant="contained" >
          Next
        </Button>       
    </Box>
    </div>
  );
}
export default ExperienceSetup;