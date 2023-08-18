import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import UseTextInput from "./UseTextInput";
import "./css/Resister.css";
import "./css/main.css";
import { FRONTEND_API } from "./urls";
import { Container, TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from "@mui/material";
function AddVendor() {
    
    const navigate = useNavigate();
    const [Client_name, setClient_name] = useState("");
    const [Client_contact, setClient_contact] = useState("");
    const [Client_email, setClient_email] = useState("");
    const [Client_status, setClient_status] = useState("");
    const [Business_name, setBusiness_name] = useState("");
    //const [emailError, setEmailError] = useState("");

    const token = localStorage.getItem("token")

    
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');


    const [clientNameValid, setClientNameValid] = useState(null);
    const [clientPhoneValid, setClientPhoneValid] = useState(null);
    const [clientEmailValid, setClientEmailValid] = useState(null);
    const [clientBusinessValid, setClientBusinessValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const validateName = (value) => value.length >= 4;
    const validatePhone = (value) =>  !isNaN(value) && value.length == 10;
    const validateEmail = (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validateBusiness = (value) => value.length >= 4;

    const resetFormFields = () => {
        setClient_name("");
        setClient_contact("");
        setClient_email("");
        setBusiness_name("");
    };

    const resetValidationFields = () => {
        setClientNameValid(null);
        setClientPhoneValid(null);
        setClientEmailValid(null);
        setClientBusinessValid(null);
    };


    const handleClientNameChange = (event) => {
        const newValue = event.target.value;
        setClient_name(newValue);
        setClientNameValid(validateName(newValue));
    }

    const handleClientPhoneChange = (event) => {
        const newValue = event.target.value;
        setClient_contact(newValue);
        setClientPhoneValid(validatePhone(newValue));
    }

    const handleClientEmailChange = (event) => {
        const newValue = event.target.value;
        setClient_email(newValue);
        setClientEmailValid(validateEmail(newValue));
    }

    const handleClientBusinessChange = (event) => {
        const newValue = event.target.value;
        setBusiness_name(newValue);
        setClientBusinessValid(validateBusiness(newValue));
    }

   
  const handleSubmit = (event) => {
    event.preventDefault();
    // Test the email against the pattern
    if (clientNameValid && clientPhoneValid && clientEmailValid && clientBusinessValid ) {
      
        var formdata = new FormData();
        formdata.append("Client_name", Client_name);
        formdata.append("Client_contact", Client_contact);
        formdata.append("Client_email", Client_email);
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
        } else {
        
            setDialogOpen(true);
        }
  };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

  // ====================   Email validetion function END  ==================


  return (
    <div>
        <div class='one'>
            <h1>Add Client</h1>
        </div>
        <Container maxWidth="sm" sx={{
        marginTop: 5,
        marginBottom: 10
        }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                <TextField id="outlined-basic"  
                    autoFocus
                    value={Client_name}
                    onChange={handleClientNameChange}
                    variant="outlined"
                    error={clientNameValid == false}
                    helperText={clientNameValid == false && 'Invalid Name'}
                    label="Name" />
            </FormControl>

            <FormControl fullWidth sx={{m:1, marginTop: 1}}>
                <TextField
                    margin="normal"
                    
                    fullWidth
                    value={Client_contact}
                    onChange={handleClientPhoneChange}
                    variant="outlined"
                    error={clientPhoneValid == false}
                    helperText={clientPhoneValid == false && 'Invalid Phone Number'}
                    id="phone"
                    label="Phone Number"
                    name="phone"
                  
                />
            </FormControl>

            <FormControl fullWidth sx={{m:1, marginTop: 1}}>
            <TextField
                margin="normal"
                
                fullWidth
                value={Client_email}
                onChange={handleClientEmailChange}
                variant="outlined"
                error={clientEmailValid == false}
                helperText={clientEmailValid == false && 'Invalid email'}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                
              />
              </FormControl>

              <FormControl fullWidth sx={{m:1, marginTop: 1}}>
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
              
             
              <Button
                type="submit"
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
           </form>
           {alert && status=="200" ? <Alert severity='success'>{alertContent}</Alert> : <></> }
           {alert && status=="400" ? <Alert severity='error'>{alertContent}</Alert> : <></> }
           </Container>
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
    </div>
  );
}

export default AddVendor;
