import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const Summery = (props) => {
  const summery = props.summery || ''
  return(
    <Box mt={3} mb={3}>
      <Typography sx={{fontSize:13, fontWeight:'bold', letterSpacing: 1}}>PROFESSIONAL SUMMERY</Typography>
      <Typography  align='justify' mt={1} gutterBottom sx={{lineHeight:1, fontSize:12}}>
        {summery}
      </Typography>
    </Box>
  );
}
export default Summery;
