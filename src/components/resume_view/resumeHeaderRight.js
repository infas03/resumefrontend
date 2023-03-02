import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "@mui/material";

const HeaderRight = (props) => {
  const head = props.head || {}
  return(
    <Box maxWidth={170}>
      <Typography sx={{fontSize:12}}>
        {head.city}, {head.country} {head.zipcode} <br/>
        {head.mobile}<br/>
        {head.email}<br/>
        <span style={{fontWeight:'bold'}}>Linkedin: 
        <Link
          href={head.linkedin}
          target={"_blank"}
          sx={{wordWrap:'break-word', color: 'black', fontWeight:'normal'}}
        >
          {head.linkedin}
        </Link>
        </span>
      </Typography>
    </Box>
  );
}

export default HeaderRight;
