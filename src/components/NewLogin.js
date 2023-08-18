import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from "../hooks/useAuth";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FRONTEND_API } from "./urls";
import './css/NewLogin.css';

import { Alert } from '@mui/material';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="#1e4ebd" align="center" {...props}>
      {'Copyright © '}
      <Link color="#1e4ebd" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function NewLogin() {

    const navigate = useNavigate();
    const {setAuth} = useAuth();
    const location = useLocation();

    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');


    const from = location.state?.from?.pathname || "/app_select";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validatePassword = (value) => value.length >= 6;

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    
    const handleEmailChange = (event) => {
      const newEmail = event.target.value;
      setEmail(newEmail);
      setEmailValid(validateEmail(newEmail));
    };
  
    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
      setPasswordValid(validatePassword(newPassword));
    };
  
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    var formdata = new FormData();
    formdata.append("email", data.get('email'));
    formdata.append("password", data.get('password'));

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(FRONTEND_API +"login", requestOptions)
      .then((response) => response.json())
      
      .then(result => {
        if(result.code != '400'){
          const roles_arr = [];
          localStorage.setItem("token", result.access_token)
          var roles = result.type;
          localStorage.setItem("roles", roles)
          var user_role = roles.split(" ")
          localStorage.setItem("userId", result.userId);
          console.log(result);
          console.log(user_role + "in login");
          setAuth({roles});
          navigate(from, { replace: true });
          setAlert(false);
          setAlertContent(" ")
        }else{
          setStatus("400");
          setAlertContent(result.message);
          setAlert(true);
        }

      })
      .catch((error) => {
        setAlertContent(error);
        setAlert(true);
        console.log("error", error)
      });
  };

  return (
    <div className='login_page_style'>
    <h1 className='heading_main'>Welcome to Tutorshive</h1>

    <Box 
      sx={{
       
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
      }}>


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{ width: "55vh" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                sx={{ color: emailValid ? 'initial' : 'red' }}
              />
              {!emailValid && <p>Invalid email format</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                sx={{ borderColor: passwordValid ? 'initial' : 'red' }}
              />
               {!passwordValid && <p>Password must be at least 6 characters</p>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {alert && status=="400" ? <Alert severity='error'>{alertContent}</Alert> : <></> }

            </Box>
          </Box>
        </Grid>
     
      </Box>
      </div>
  );
}
