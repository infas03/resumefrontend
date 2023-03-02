import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { List } from '@mui/material';
import { ListItem } from '@mui/material';

const Competencies = (props) => {
  const competencies = props.competencies || [];
  return(
    <Box maxWidth={170} mt={2} mb={2}>
      <Typography sx={{fontSize:13, fontWeight:'bold', letterSpacing: 1}}>COMPETENCIES</Typography>
      <List dense sx={{ listStyleType: 'disc', pl: 2, lineHeight:1,fontSize:12 }}>
        {competencies.map((competence, index) => {
          return(
            <ListItem key={index} sx={{ display: 'list-item' }}>{competence}</ListItem>
          );
        })}
      </List>
    </Box>
  );
}
export default Competencies;