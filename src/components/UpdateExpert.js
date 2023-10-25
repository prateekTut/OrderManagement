import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { useState, useEffect } from 'react';
import { FRONTEND_API } from "./urls";
import { event } from 'jquery';
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';

const defaultTheme = createTheme();


export default function EditClientsDetails() {

    let params = useParams();
    console.log(params, params.expertId);

    const [expertStatus, setexpertStatus] = React.useState('');
    
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const token = localStorage.getItem("token")
    const [designation, setDesignation] = useState("");

    const [clientAddressValid, setClientAddressValid] = useState(null);
    const [clientPhoneValid, setClientPhoneValid] = useState(null);
    const [clientEmailValid, setClientEmailValid] = useState(null);
    const [dobValid, setDobValid] = useState(null);
    const [clientPasswordValid, setClientPasswordValid] = useState(null);
    const [designationValid, setDesignationValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);


    const validateAddress = (value) => value.length >= 6;
    const validatePhone = (value) => !isNaN(value) && value.length == 10;
    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validateDob = (value) => value.length > 0;
    const validatePassword = (value) => value.length >= 6;
    const validateDesignation = (value) => value.length >= 3

    const resetValidationFields = () => {

        setClientPhoneValid(null);
        setClientEmailValid(null);
        setClientAddressValid(null);
        setDobValid(null);
        setClientPasswordValid(null);
    };

    const resetFormFields = () => {
        setFirstName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setLastName("");
        setDob("");
        setPassword(""); 
    }

    useEffect(() => {
        fetchDataForUpdate(params.expertId);
    }, []);

    const fetchDataForUpdate = (expertId) => {
        var requestOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        fetch(FRONTEND_API + "getExpertById/".concat(expertId), requestOptions)
            .then((response) => {
                if (response) {
                    //setStatus("200")
                    return response.json();
                }
            })
            .then((result) => {
                const client = result[0];

                console.log(result);
                setFirstName(client.firstname)
                setLastName(client.lastname)
                setEmail(client.email)
                setAddress(client.address)
                setPhone(client.contact)
                setDob(client.DOB)
                setPassword(client.password)
                setDesignation(client.designation)
            })
            .catch((error) => console.log(error));
    };


    const onEmailChange = (event) => {
        const newValue = event.target.value;
        setEmail(newValue)
        setClientEmailValid(validateEmail(newValue));
    }
    const onAddressChange = (event) => {
        const newValue = event.target.value;
        setAddress(newValue)
        setClientAddressValid(validateAddress(newValue));
    }
    const onDesignationChange = (event) => {
        const newValue = event.target.value;
        setDesignation(newValue)
        setDesignationValid(validateDesignation(newValue));
    }
    
    const onPhoneChange = (event) => {
        const newValue = event.target.value;
        setPhone(newValue)
        setClientPhoneValid(validatePhone(newValue));
    }
    const onPasswordChange = (event) =>{
        const newValue = event.target.value;
        setPassword(newValue)
        setClientPasswordValid(validatePassword(newValue));
      }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (clientEmailValid || clientAddressValid || clientPhoneValid || dobValid || clientPasswordValid || designationValid) {

            var formdata = new FormData();
            formdata.append("contact", phone);
            formdata.append("email", email);
            formdata.append("status", expertStatus);
            formdata.append("address", address);
            formdata.append("dob", dob);
            formdata.append("password", password);
            formdata.append("designation", designation);

            var requestOptions = {
                method: "POST",
                body: formdata,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            fetch(FRONTEND_API + "updateUsersDetails/".concat(params.expertId), requestOptions)
                .then((response) => {
                    if (response.status == 200) {
                        setStatus("200")
                        return response.json();
                    }
                })
                .then((result) => {
                    /* alert("Data inserted");
                    console.log(result);
                    navigate("/UpdateClientdata"); */
                    setAlertContent(result.message);
                    setAlert(true);

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
    const handleStartDateChange = (event) => {
        const { name, value } = event.target;
        setDob(value);
        setDobValid(validateDob(value));
    };


    return (
        <Container>
            <Grid paddingLeft="100px" paddingRight="100px" paddingBottom='20px'>
                <CssBaseline />
                <Grid sx={{ marginTop: 10 }}>
                    <Box
                        sx={{
                          
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Update Client
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
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
                                        disabled
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
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="text"
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
                                name="contact"
                                label="contact"
                                type="number"
                                id="contact"
                                value={phone}
                                onChange={onPhoneChange}
                                error={clientPhoneValid == false}
                                helperText={clientPhoneValid == false && 'Invalid Number. Must be 10 digit number'}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Address"
                                type="text"
                                id="address"
                                value={address}
                                onChange={onAddressChange}
                                error={clientAddressValid == false}
                                helperText={clientAddressValid == false && 'Invalid Address.'}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="designation"
                                label="Designation"
                                type="text"
                                id="designation"
                                value={designation}
                                onChange={onDesignationChange}
                                error={designationValid == false}
                                helperText={designationValid == false && 'Invalid Designation.'}
                            />
                            <TextField id="outlined-basic"
                                type='date'
                                value={dob}
                                onChange={handleStartDateChange}
                                sx={{ marginTop: 4 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Date of Birth"
                                variant="outlined" />
                            <FormControl fullWidth/>
                            <Button variant='contained'
                            type="submit">
                                Submit
                            </Button>
                            {alert && status == "400" ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                            {alert && status == "200" ? <Alert severity='success'>{alertContent}</Alert> : <></>}

                            {/* Dialog */}
                            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                                <DialogTitle>Nothing Updated</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>You have not updated anything or Some mandatory field is blank.</DialogContentText>
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
