import React from "react";
import { Box } from "@mui/material";
import { Typography }  from "@mui/material";
import { List } from '@mui/material';
import { ListItem } from '@mui/material';

const Skills = (props) => {
  const skills = props.skills || [];
  return(
    <Box maxWidth={170} mt={2} mb={2}>
      <Typography sx={{fontSize:13, fontWeight:'bold', letterSpacing: 1}}>TECHNICAL PROFILE</Typography>
      <List dense sx={{ listStyleType: 'disc', pl: 2, lineHeight:1,fontSize:12 }}>
        {skills.map((skill, index) => {
          return(
            <ListItem key={index} sx={{ display: 'list-item' }}>{skill}</ListItem>
          );
        })}
      </List>
    </Box>
  );
}
export default Skills;