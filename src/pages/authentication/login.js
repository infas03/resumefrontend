import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import {Lock} from '@mui/icons-material';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import { LockOutlinedIcon } from '@mui/icons-material';
import axios from "axios";
//import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/header/header.js";
import { Link } from "@mui/material";

const Login = () => {

  //const navigate = useNavigate();
  
  const invalidNotify = () => toast.error("Invalid Username or Password!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const loginSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const myInput = {
        email: data.get('email'),
        password: data.get('password'),
    };

    var config = {
      method: "post",
      url: "http://localhost:8080/api/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: myInput,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.email))
        window.localStorage.setItem('data', JSON.stringify(response.data));
        window.location.href='/resume';
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
  return(
    <div>
      <Header/>
      <Box
          sx={{
            mx:40,
            p:10,
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={loginSubmit} noValidate={false} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "email-input" }}
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              color="secondary"
            />
            <TextField
              margin="normal"
              inputProps={{ "data-testid": "password-input" }}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="secondary"
            />
            <Button
              type="submit"
              data-testid='loginBtn'
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2, backgroundColor:'#6800A7' }}
            >
              Login
            </Button>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Box>
          <Link onClick={()=>{window.location.href='/'}}>I do not have an account</Link>
        </Box>
    </div>
  )

}

export default Login;