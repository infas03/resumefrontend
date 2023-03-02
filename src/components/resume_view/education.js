import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Education = (props) => {
  const education = props.education || [];
  return(
    <Box maxWidth={170} mt={2} mb={2}>
      <Typography sx={{fontSize:13, fontWeight:'bold', letterSpacing: 1}}>EDUCATION</Typography>
      {education.map((edu) => {
        return(
          <Box key={edu._id}>
            <Typography mt={1} sx={{fontSize:12}}>
              <span style={{fontStyle:'italic'}}>{new Date(edu.start).getMonth()+1}/{new Date(edu.start).getFullYear()} -  {edu.end == null ? "Current" : `${new Date(edu.end).getMonth()+1}/${new Date(edu.end).getFullYear()}`}</span><br/>
              <span style={{fontWeight:'bold'}}>{edu.schoolName}</span><br/> 
              {edu.schoolLocation}
            </Typography>
            <Typography mt={1} sx={{fontSize:12}}>
              <span style={{fontWeight:'bold'}}>{edu.degree}:</span> {edu.course}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default Education;
