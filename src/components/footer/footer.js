import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "divider",
        justifyContent: 'flex-end', 
        display:'flex',
        marginTop:20
      }}
    >
      <Typography
        style={{
          fontSize: 12,
          marginTop: 40,
          marginRight:20
        }}
      >
        Developed by: <Link
                href="https://www.linkedin.com/in/hminfas"
                target={"_blank"}
              >
                HM Infas
              </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
