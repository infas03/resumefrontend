import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const HeaderLeft = (props) => {
  const head = props.head || {}
  return(
    <Box>
      <Typography variant="h3" gutterBottom>{head.firstname}</Typography>
      <Typography variant="h3" gutterBottom mt={-3} mb={-0.2}>{head.lastname}</Typography>
      <Typography sx={{letterSpacing: 5, textTransform:'uppercase'}} ml={0.3}>{head.title}</Typography>
    </Box>
  );
}

export default HeaderLeft;
