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
import { FormControl, MenuItem, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import './css/NewLogin.css';
// TODO remove, this demo shouldn't need to reset the theme.
import { Alert } from '@mui/material';
import { useState } from 'react';
import { FRONTEND_API } from "./urls";
import { event } from 'jquery';
import { MuiPhone } from './MuiPhone';

const defaultTheme = createTheme();

export default function AddFreelancers() {

    const [user, setUser] = React.useState('');
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const token = localStorage.getItem("token")


    const [clientFirstNameValid, setClientFirstNameValid] = useState(null);
    const [clientLastNameValid, setClientLastNameValid] = useState(null);
    const [clientPhoneValid, setClientPhoneValid] = useState(null);
    const [clientEmailValid, setClientEmailValid] = useState(null);
    const [clientUnivValid, setClientUnivValid] = useState(null);
    const [clientBusinessValid, setClientBusinessValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const validateFirstName = (value) => value.length >= 3;
    const validatePhone = (value) => !isNaN(value) && value.length == 13;
    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validateLastName = (value) => value.length >= 1;
    const validateUniv = (value) => value.length >= 4;
    const validateBusiness = (value) => value.length >= 4;

    const resetValidationFields = () => {
        setClientFirstNameValid(null);
        setClientLastNameValid(null)
        setClientPhoneValid(null);
        setClientEmailValid(null);

        setClientUnivValid(null);
        setClientBusinessValid(null);
    };


    const resetFormFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
       
    }

    const onFirstNameChange = (event) => {
        const newValue = event.target.value;
        setFirstName(newValue)
        setClientFirstNameValid(validateFirstName(newValue));
    }

    const onLastNameChange = (event) => {
        const newValue = event.target.value;
        setLastName(newValue)
        //setClientLastNameValid(validateLastName(newValue));
    }
    const onEmailChange = (event) => {
        const newValue = event.target.value;
        setEmail(newValue)
        setClientEmailValid(validateEmail(newValue));
    }

    const onPhoneChange = (event) => {
        const newValue = event.target.value;
        setPhone(newValue)
        setClientPhoneValid(validatePhone(newValue));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (clientFirstNameValid && clientLastNameValid && clientEmailValid ) {

            var formdata = new FormData();
            formdata.append("firstName", firstName)
            formdata.append("lastName", lastName)
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("contact", phone)
            formdata.append("role", 'expert');
            formdata.append("user_type", 'freelancer')

            var requestOptions = {
                method: "POST",
                body: formdata,
                headers: {
                    'Authorization': 'Bearer ' + token
                }

            };

            fetch(FRONTEND_API + "addUser", requestOptions)
                .then((response) => {
                    if (response.status == 200) {
                        setStatus("200")
                        return response.json();
                    } else {
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

        } else {
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
        <Container>
            <Grid >
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
                            Add Freelancers
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

                            <Grid container rowSpacing={1} sx={{ mt: 1 }}>

                                <FormControl fullWidth>
                                    <MuiPhone
                                        defaultCountry="ua"
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                    />
                                    {/* <TextField
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

                                    /> */}
                                </FormControl>

                            </Grid>
                           
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}

                            >
                                Register
                            </Button>
                            {alert && status == "400" ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                            {alert && status == "200" ? <Alert severity='success'>{alertContent}</Alert> : <></>}

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
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
