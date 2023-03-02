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
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import { Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import Header from "../../components/header/header.js";


const EducationEdit = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));
  //console.log(user.email)

  // const navigate = useNavigate();
  const [inform, setInform] = useState([]); 
  const [open, setOpen] = React.useState({
    open:false,
    new: false,
    indx: 0
  });
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentValue, setCurrentValue] = useState(false)
  const handleClose = () => {setOpen({...open, open:false, indx:0})}

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
      setInform(data[0].education);
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

  const save = () => {
    const myInput =  {
      education:inform
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
  }

  const deleteCard = index => e =>{
    e.preventDefault();

    let newArr = [...inform];
    newArr = newArr.filter((ele, indx) => indx !== index )
    setInform(newArr);

    const myInput =  {
      education: newArr
    }
    console.log(myInput)

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
  //console.log(inform);
  return(
    <div>
    <Header/>
    <Box
      my={3}
      mx={30}
      py={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white' 
      }}
    >
      <Typography variant="h6">Education</Typography>
      <Button variant='outlined' onClick={()=> setOpen({...open, new: true})} style={{marginTop:16}}>New Education</Button>
      {inform.map((edu, index)=>{
        return(
          <Card key={edu._id} sx={{ minWidth: 275, mt:2, border: "1px solid #6800A7"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {edu.schoolName}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {edu.schoolLocation}
              </Typography>
              <Typography variant="h6" component="div">
              {edu.degree}: {edu.course}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {new Date(edu.start).getMonth()+1}/{new Date(edu.start).getFullYear()} -  {edu.end == null ? "Current" : `${new Date(edu.end).getMonth()+1}/${new Date(edu.end).getFullYear()}`}
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Current" checked= {edu.current === true ? true : false}/>
              </FormGroup>
            </CardContent>
            <Grid container>
              <Grid item>
                <CardActions>
                  <Button size="small" variant='outlined' onClick={()=>{setOpen({...open, open: true, indx: index})}}>Edit</Button>
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
          <Box sx={style}>
            <Box component="form" onSubmit={save} noValidate sx={{ m:1}}>
              <Grid container>
                <Grid item>
                  <TextField
                    margin="normal"
                    inputProps={{ "data-testid": "schoolName-input" }}     
                    id="schoolName"
                    label="Institute Name"
                    name="schoolName"
                    sx={{width:345}}
                    value={inform[open.indx].schoolName || ''}
                    onChange={updateFieldChanged(open.indx)}
                  />          
                </Grid>
                <Grid item ml={1}>
                  <TextField
                    margin="normal"
                    inputProps={{ "data-testid": "schoolLocation-input" }}                           
                    name="schoolLocation"
                    label="Institute Location"
                    id="schoolLocation"
                    sx={{width:230}}
                    value={inform[open.indx].schoolLocation || ''}
                    onChange={updateFieldChanged(open.indx)}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={{mt:2}}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Degree</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      inputProps={{ "data-testid": "degree-input" }}     
                      id="demo-simple-select"
                      value={inform[open.indx].degree}
                      label="Degree"
                      name="degree"
                      onChange={updateFieldChanged(open.indx)}
                    >
                      <MenuItem value={"Bachelor of Science"}>Bachelor of Science</MenuItem>
                      <MenuItem value={"High School Diploma"}>High School Diploma</MenuItem>
                      <MenuItem value={"Master of Science"}>Master of Science</MenuItem>
                    </Select>
                  </FormControl>         
                </Grid>
                <Grid item ml={1}>
                  <TextField
                    margin="normal"
                    required
                    name="course"
                    label="Field of Study"
                    id="course"
                    sx={{width:374}}
                    value={inform[open.indx].course || ''}
                    onChange={updateFieldChanged(open.indx)}
                  />
                </Grid>
              </Grid>
              <Grid container mt={2}>
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Graduation Start Date"
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
                        label="Graduation End Date"
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
              <Grid container mt={2}>
                <Grid item>
                  <Button type="submit" variant="contained" >
                    Save
                  </Button>       
                </Grid>
                <Grid item ml={1}>
                  <Button type="submit" onClick={handleClose} variant="contained" sx={{backgroundColor:'red'}}>
                    Back
                  </Button>       
                </Grid>
              </Grid>
            </Box>
          </Box>
          </Modal>
      )})}

      <Modal open={open.new} onClose={handleClose}>
          <Box sx={style}>
            <Box component="form" noValidate={false} sx={{ m:1}}>
              <Grid container>
                <Grid item>
                  <TextField
                    margin="normal"     
                    id="schoolName"
                    label="Institute Name"
                    name="schoolName"
                    sx={{width:345}}
                    onChange={createFieldChanged(inform.length)}
                    />          
                </Grid>
                <Grid item ml={1}>
                  <TextField
                    margin="normal"                      
                    name="schoolLocation"
                    label="Institute Location"
                    id="schoolLocation"
                    sx={{width:230}}
                    onChange={createFieldChanged(inform.length-1)}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={{mt:2}}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Degree</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Degree"
                      name="degree"
                      defaultValue={"Master of Science"}
                      onChange={createFieldChanged(inform.length-1)}
                      >
                      <MenuItem value={"Bachelor of Science"}>Bachelor of Science</MenuItem>
                      <MenuItem value={"High School Diploma"}>High School Diploma</MenuItem>
                      <MenuItem value={"Master of Science"}>Master of Science</MenuItem>
                    </Select>
                  </FormControl>         
                </Grid>
                <Grid item ml={1}>
                  <TextField
                    margin="normal"
                    required
                    name="course"
                    label="Field of Study"
                    id="course"
                    sx={{width:374}}
                    onChange={createFieldChanged(inform.length-1)}
                  />
                </Grid>
              </Grid>
              <Grid container mt={2}>
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Graduation Start Date"
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
                        label="Graduation End Date"
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
              <Grid container mt={2}>
                <Grid item>
                  <Button onClick={save} variant="contained" >
                    Save
                  </Button>       
                </Grid>
                <Grid item ml={1}>
                  <Button onClick={()=>{setOpen({...open, new:false})}} variant="contained" sx={{backgroundColor:'red'}} >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
        <Button sx={{mt:2}} onClick={()=> {window.location.href='/resume'}} variant="contained" >
          Back
        </Button> 
    </Box>
    </div>  
  );
}
export default EducationEdit;