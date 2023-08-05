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
//import './css/NewLogin.css';



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
    const from = location.state?.from?.pathname || "/app_select";
   // const history = useHistory();

    const token = localStorage.getItem("token")
    /* const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        sessionStorage.removeItem("token")
        fetch(FRONTEND_API +'logout')
        .then(() => {
          window.location.href = '/home'; // Redirect to home page after logout
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
      };
     */
     /*  const InUser = () => {
      
        const roles = sessionStorage.getItem("roles").split(" ")
        console.log("roles in loggedIn", roles); 
    
        setAuth({roles});
    
        navigate("/app_select");
      
      } */

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

    fetch(FRONTEND_API +"test", requestOptions)
      .then((response) => 
        response.json()
      )
      
      .then(result => {
        //JSON.parse(response._bodyText)
        console.log("response data", result.type); 
        console.log("response token", result.access_token); 
        const roles_arr = [];
        localStorage.setItem("token", result.access_token)
        var roles = result.type;
        localStorage.setItem("roles", roles)
        var user_role = roles.split(" ")
        console.log(user_role + "in login");
        setAuth({roles});
        navigate(from, { replace: true });

      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box 
     
      sx={{
       
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 2,
        backgroundColor: '#e6eaf0'
      }}>


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{ marginTop: 10, width: "55vh" }}>
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Grid container>
                <Grid item xs>
                  <Button color='primary'>
                    <Link href="#">
                      Forgot password?
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='primary'>
                  
                    <Link href="#" >
                      Don't have an account? Sign Up
                    </Link>
                  </Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
     
      </Box>
  );
}
