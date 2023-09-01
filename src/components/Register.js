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
import { FormControl, MenuItem, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import './css/NewLogin.css';
// TODO remove, this demo shouldn't need to reset the theme.
import { Alert } from '@mui/material';
import { useState } from 'react';
import { FRONTEND_API } from "./urls";
import { event } from 'jquery';

const defaultTheme = createTheme();

export default function Register() {
    const [user, setUser] = React.useState('');
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [University, setUniversity] = useState("");
    const [Business_name, setBusiness_name] = useState("");
    const token = localStorage.getItem("token")


    const [clientFirstNameValid, setClientFirstNameValid] = useState(null);
    const [clientPasswordValid, setClientPasswordValid] = useState(null);
    const [clientLastNameValid, setClientLastNameValid] = useState(null);
    const [clientPhoneValid, setClientPhoneValid] = useState(null);
    const [clientEmailValid, setClientEmailValid] = useState(null);
    const [clientUnivValid, setClientUnivValid] = useState(null);
    const [clientBusinessValid, setClientBusinessValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const validateFirstName = (value) => value.length >= 4;
    const validatePassword = (value) => value.length >= 6;
    const validatePhone = (value) =>  !isNaN(value) && value.length == 10;
    const validateEmail = (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validateLastName = (value) => value.length >= 4;
    const validateUniv = (value) => value.length >= 4;
    const validateBusiness = (value) => value.length >= 4;

    const resetValidationFields = () => {
      setClientFirstNameValid(null);
      setClientLastNameValid(null)
      setClientPhoneValid(null);
      setClientEmailValid(null);
      setClientPasswordValid(null);
      setClientUnivValid(null);
      setClientBusinessValid(null);
    };


    const resetFormFields = () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword(""); 
      setPhone("");
      setUniversity("");
      setBusiness_name("");
    }

    const onFirstNameChange = (event) =>{
      const newValue = event.target.value;
      setFirstName(newValue)
      setClientFirstNameValid(validateFirstName(newValue));
    }

    const onLastNameChange = (event) =>{
      const newValue = event.target.value;
      setLastName(newValue)
      setClientLastNameValid(validateLastName(newValue));
    }
    const onEmailChange = (event) =>{
      const newValue = event.target.value;
      setEmail(newValue)
      setClientEmailValid(validateEmail(newValue));
    }
    const onPasswordChange = (event) =>{
      const newValue = event.target.value;
      setPassword(newValue)
      setClientPasswordValid(validatePassword(newValue));
    }
    const onPhoneChange = (event) =>{
      const newValue = event.target.value;
      setPhone(newValue)
      setClientPhoneValid(validatePhone(newValue));
    }
    
    const handleClientUnivChange = (event) => {
      const newValue = event.target.value;
      setUniversity(newValue);
      setClientUnivValid(validateUniv(newValue));
    }

    const handleClientBusinessChange = (event) => {
      const newValue = event.target.value;
      setBusiness_name(newValue);
      setClientBusinessValid(validateBusiness(newValue));
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      if(clientFirstNameValid && clientLastNameValid && clientEmailValid && clientPasswordValid && clientPhoneValid){
        if(user == 'student'){
          var formdata = new FormData();
          formdata.append("Client_name", firstName + lastName);
          formdata.append("Client_contact", phone);
          formdata.append("Client_email", email);
          formdata.append("Client_status", "student");
          formdata.append("University", University);
          formdata.append("Student_login", email);
          formdata.append("Student_password", password);
    
          var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          
          };
    
          fetch(FRONTEND_API + "addclient", requestOptions)
            .then((response) =>  { 
                if(response.status == 200){
                  setStatus("200")
                  return response.json();
                }else{
                  setStatus("400")
                  return response.json();
                }
            })
            .then((result) => {
                /* alert("Data inserted");
                console.log(result);
                navigate("/UpdateClientdata"); */
                setAlertContent(result.message);
                setAlert(true);
                resetFormFields();
                resetValidationFields();
            })
            .catch((error) => alert("error", error));
        } else if(user == 'vendor'){
          var formdata = new FormData();
          formdata.append("Client_name", firstName + lastName);
          formdata.append("Client_contact", phone);
          formdata.append("Client_email", email);
          formdata.append("Client_status", "vendor");
          formdata.append("Business_name", Business_name);
          
          var requestOptions = {
              method: "POST",
              body: formdata,
              headers: {
              'Authorization' : 'Bearer ' + token
              }
          
          };
  
          fetch(FRONTEND_API + "addclient", requestOptions)
              .then((response) =>  { 
                  if(response.status == 200){
                      setStatus("200")
                      return response.json();
                  }
              })
              .then((result) => {
                  setAlertContent(result.message);
                  setAlert(true);
                  resetFormFields();
                  resetValidationFields();
              })
              .catch((error) => alert("error", error));
          }else if (user){
            console.log(user)
        const data = new FormData(event.currentTarget);
        event.target.reset();
        var formdata = new FormData();
        formdata.append("firstName", firstName)
        formdata.append("lastName", lastName)
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("contact", phone)
        formdata.append("type", user)

        formdata.append("University", University);


        var requestOptions = {
          method: "POST",
          body: formdata,
        };
    
        fetch(FRONTEND_API + "addUser", requestOptions)
          .then((response) => {
            if(response.status == 400){
              setStatus("400")
              return response.json();
            }else if(response.status == 200){
              setStatus("200")
              return response.json();
            }

          })
          
          .then(result => {
            //JSON.parse(response._bodyText)
            console.log("response data", result); 
            setAlertContent(result.message);
            resetFormFields();
            setAlert(true);
          })
          .catch((error) => {
            console.log("error", error)
            setAlertContent(error);
           
            setAlert(true);
            }
          );
      }
      }else{
        setDialogOpen(true);
      }
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
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
        <Grid sx={{marginTop: 15}}>
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
              Register User
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
                            value={firstName}
                            onChange={onFirstNameChange}
                            error={clientFirstNameValid == false}
                            helperText={clientFirstNameValid == false && 'Invalid First Name'}
                            
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
                            value={lastName}
                            onChange={onLastNameChange}
                            error={clientLastNameValid == false}
                            helperText={clientLastNameValid == false && 'Invalid Last Name'}
                            
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
                value={email}
                onChange={onEmailChange}
                error={clientEmailValid == false}
                helperText={clientEmailValid == false && 'Invalid Email'}
                
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
                value={password}
                onChange={onPasswordChange}
                error={clientPasswordValid == false}
                helperText={clientPasswordValid == false && 'Invalid Password. Must be greater than 6 characters.'}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contact"
                label="contact"
                type="number"
                id="contact"
                value={phone}
                onChange={onPhoneChange}
                error={clientPhoneValid == false}
                helperText={clientPhoneValid == false && 'Invalid Number. Must be 10 digit number'}
                
              />
                <FormControl fullWidth sx={{marginTop:2}}>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user}
                    label="user"
                    
                    onChange={handleChange}

                >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='otm'>Otm</MenuItem>
                    <MenuItem value='lead'>Team Lead</MenuItem>
                    <MenuItem value='expert'>Expert</MenuItem>
                    <MenuItem value='student'>Student</MenuItem>
                    <MenuItem value='vendor'>Vendor</MenuItem>
                </Select>
                {user ? (
                  <p>Selected user is: {user}</p>
                ) : (
                  <p>No user is selected</p>
                )}
                </FormControl>
                {user == 'student' &&
                <FormControl fullWidth sx={{marginTop: 1}}>
                <TextField
                    margin="normal"
                    
                    fullWidth
                    value={University}
                    onChange={handleClientUnivChange}
                    variant="outlined"
                    error={clientUnivValid == false}
                    helperText={clientUnivValid == false && 'Invalid University Name'}
                    id="university"
                    label="University"
                    name="text"
                
                   
                />
              </FormControl>
                } 
                { user == 'vendor' &&
                    <FormControl fullWidth sx={{marginTop: 1}}>
                  <TextField
                      margin="normal"
                      
                      fullWidth
                      value={Business_name}
                      onChange={handleClientBusinessChange}
                      variant="outlined"
                      error={clientBusinessValid == false}
                      helperText={clientBusinessValid == false && 'Invalid Business Name'}
                      id="business"
                      label="Business"
                      name="text"
                  
                    
                  />
              </FormControl>
                }
              <Button
                type="submit"
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              {alert && status=="400" ? <Alert severity='error'>{alertContent}</Alert> : <></> }
              {alert && status=="200" ? <Alert severity='success'>{alertContent}</Alert> : <></> }

               {/* Dialog */}
              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                  <DialogTitle>Form Validation Failed</DialogTitle>
                  <DialogContent>
                  <DialogContentText>Please fill in all required fields correctly.</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                      OK
                  </Button>
                  </DialogActions>
              </Dialog>
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
