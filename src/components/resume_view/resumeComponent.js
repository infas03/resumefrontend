import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Paper } from '@mui/material';
import { Grid } from "@mui/material";
import HeaderLeft from "./resumeHeaderLeft.js";
import HeaderRight from "./resumeHeaderRight.js";
import Summery from "./summery.js";
import { Divider } from '@mui/material';
import Experience from "./experience.js";
import Education from "./education.js";
import Skills from "./skills.js";
import Competencies from "./competencies.js";

const ResumeView = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));

  const [inform, setInform] = useState([]);
  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(`http://localhost:8080/api/info/view/${user.email}`);
      const data = await response.json();
      setInform(data[0]);
    }
  },[]);

  console.log(inform)
  return(
    <Box>
      <Paper elevation={4} sx={{paddingTop:2}}> 
        <Grid container spacing={2}>
          <Grid item xs={8} ml={2}>
            <div 
              style={{
                height: 10,
                backgroundColor:'#6800A7',
                marginLeft: -16                
              }}
            />
            <HeaderLeft head={inform.head}/>
            <Summery summery={inform.summery}/>
            <Divider sx={{background:'#6800A7'}}/>
            <Experience experience={inform.experience}/>
          </Grid>
          <Grid item xs={3.5}>
            <HeaderRight head={inform.head}/>
            <div 
              style={{
                marginTop:15,
                height: 10,
                backgroundColor:'#6800A7',
                marginRight:-9
              }}
            />
            <Education education={inform.education}/>
            <Divider sx={{background:'#6800A7'}}/>
            <Skills skills={inform.skills}/>
            <Divider sx={{background:'#6800A7'}}/>
            <Competencies competencies={inform.competencies}/>
          </Grid> 
        </Grid>
        <div 
          style={{
            height: 10,
            backgroundColor:'#6800A7'                
          }}
        />
      </Paper>
    </Box>
  );
}
export default ResumeView;