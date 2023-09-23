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
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from "../hooks/useAuth";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FRONTEND_API } from "./urls";

import { Alert, Container } from '@mui/material';
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

const AppContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100vh',
  // Align items with space between them
}));

const BrandingBox = styled(Box)(({ theme }) => ({

  alignItems: 'center',
  gap: theme.spacing(2), // Add some spacing between logo and text
  padding: theme.spacing(2), // Add padding for spacing

}));

const Logo = styled('img')({
  width: '220px', // Set the width of the logo
  height: '120px', // Set the height of the logo
  objectFit: 'contain', // Ensure the logo scales without distortion
});

const BrandName = styled(Typography)({
  fontWeight: 'bold', // Apply a bold font weight to the brand name
  color: '#333', // Set the text color
});

const RightBox = styled(Box)({
  flex: 1, // Take up available space
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end', // Align content to the right
  padding: '16px',

  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});


// TODO remove, this demo shouldn't need to reset the theme.

export default function NewLogin() {

  const navigate = useNavigate();
  const { setAuth } = useAuth();
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

    fetch(FRONTEND_API + "login", requestOptions)
      .then((response) => response.json())

      .then(result => {
        if (result.code != '400') {
          const roles_arr = [];
          localStorage.setItem("token", result.access_token)
          var roles = result.type;
          localStorage.setItem("roles", roles);
          localStorage.setItem("email", data.get('email'));
          var user_role = roles.split(" ")
          localStorage.setItem("userId", result.userId);
          console.log(result);
          console.log(user_role + "in login");
          setAuth({ roles });
          navigate(from, { replace: true });
          setAlert(false);
          setAlertContent(" ")
        } else {
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
    <Box sx={{bgcolor: "#E9D8E4", height: '100vh'}}>
    <Container sx={{ padding: 4,}}>
      <Grid container component="main" >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}>
          <Logo src="logo1.png" alt="TutorsHive" />
          <BrandingBox>
            <BrandName variant="h6">Welcome to TutorsHive</BrandName>
          </BrandingBox>
        </Grid>
        <RightBox item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                id="email"
                label="Email Address"
                name="email"
                fullWidth
                autoFocus
                value={email}
                onChange={handleEmailChange}
                sx={{ color: emailValid ? 'initial' : 'red' }}
              />
              <TextField
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                sx={{ borderColor: passwordValid ? 'initial' : 'red' }}
              />


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
              {alert && status == "400" ? <Alert severity='error'>{alertContent}</Alert> : <></>}

            </Box>
          </Box>
        </RightBox>
      </Grid>
    </Container>
    </Box>
  );
}
