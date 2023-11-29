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
import { FormControl, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import './css/NewLogin.css';
// TODO remove, this demo shouldn't need to reset the theme.
import { Alert } from '@mui/material';
import { useState } from 'react';
import { FRONTEND_API } from "./urls";

const defaultTheme = createTheme();

export default function AddExpert() {
  const [user, setUser] = React.useState('');
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState('');
  const [alertContent, setAlertContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    event.target.reset();
    var formdata = new FormData();
    formdata.append("firstName", data.get('firstName'))
    formdata.append("lastName", data.get('lastName'))
    formdata.append("email", data.get('email'));
    formdata.append("password", data.get('password'));
    formdata.append("address", data.get('address'));
    formdata.append("contact", data.get('contact'))
    formdata.append("status", data.get('status'))


    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(FRONTEND_API + "register_expert", requestOptions)
      .then((response) => {
        if (response.status == 400) {
          setStatus("400")
          return response.json();
        } else if (response.status == 200) {
          setStatus("200")
          return response.json();
        }

      })

      .then(result => {
        //JSON.parse(response._bodyText)
        console.log("response data", result);
        setAlertContent(result.message);
        setAlert(true);
      })
      .catch((error) => {
        console.log("error", error)
        setAlertContent(error);
        setAlert(true);
      }
      );

  };

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid >
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <Grid sx={{ marginTop: 15 }}>
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
              Register Expert
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"

                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"

                    autoFocus
                  />
                </Grid>
              </Grid>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contact"
                label="contact"
                type="number"
                id="contact"

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="status"
                label="Status"
                type="text"
                id="status"

              />
              {/*  <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user}
                    label="user"
                    
                    onChange={handleChange}
                    sx={{
                        marginTop: 2
                    }}
                >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='otm'>Otm</MenuItem>
                    <MenuItem value='lead'>Team Lead</MenuItem>
                    <MenuItem value='expert'>Expert</MenuItem>
                </Select>
                </FormControl> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              {alert && status == "400" ? <Alert severity='error'>{alertContent}</Alert> : <></>}
              {alert && status == "200" ? <Alert severity='info'>{alertContent}</Alert> : <></>}
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" className='LinkColor'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" className='LinkColor'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
