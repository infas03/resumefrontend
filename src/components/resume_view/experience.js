import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { List } from '@mui/material';
import { ListItem } from '@mui/material';

const Experience = (props) => {
  const experience = props.experience || [];
  return(
    <Box mt={3} mb={3}>
      <Typography sx={{fontSize:13, fontWeight:'bold', letterSpacing: 1}}>WORK HISTORY</Typography>
      {experience.map((exp) => {
        return(
        <Box key={exp._id}>
          <Typography mt={1} sx={{lineHeight:1.5, fontSize:12}}>
            <span style={{fontWeight:'bold'}}>{exp.employer} - {exp.title}</span><br/> 
            <span style={{fontStyle:'italic'}}>{exp.city}, {exp.country}</span><br/>
            <span style={{fontStyle:'italic'}}>{new Date(exp.start).getMonth()+1}/{new Date(exp.start).getFullYear()} - {exp.end == null ? "Current" : `${new Date(exp.end).getMonth()+1}/${new Date(exp.end).getFullYear()}`}</span><br/>
          </Typography>
          <List dense sx={{ listStyleType: 'disc', pl: 2, lineHeight:1,fontSize:12 }}>
                <ListItem sx={{ display: 'list-item' }}>{exp.description}</ListItem>
          </List>
        </Box>
        );
      })}
    </Box>
  );
}
export default Experience;

// {exp.end.month}/{exp.end.year}