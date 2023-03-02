import React, { useState } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/material";

const Header = () => {
  const user = JSON.parse(window.localStorage.getItem('data'));
  console.log(user)

  const signOut = () => {
    window.localStorage.setItem('data', JSON.stringify({email: '', result: false}));
    window.location.href='/login'
  }
  console.log(window.location.href != "http://localhost:3000/");
  return (
    <Toolbar
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        justifyContent: "space-between",
        display: "flex",
        backgroundColor:'white'
      }}
    >
      <Typography
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        HMI Resume Builder
      </Typography>

      {window.location.href === "http://localhost:3000/" || window.location.href === "http://localhost:3000/login" ? (
        <Box style={{ justifyContent: "end", display: "flex" }}>
          {/* <Button variant="outlined" sx={{ width: 120 }}>
            Sign in
          </Button> */}
        </Box>
      ) : (
        <Button onClick={signOut} variant="outlined" sx={{ width: 120 }}>
          Sign out
        </Button>
      )}
    </Toolbar>
  );
};

export default Header;
