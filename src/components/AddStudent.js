import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import UseTextInput from "./UseTextInput";
import "./css/Resister.css";
import "./css/main.css";
import { FRONTEND_API } from "./urls";
import { Container, TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from "@mui/material";

function AddStudent() {
    const navigate = useNavigate();
  
    const [Client_name, setClient_name] = useState("");
    const [Client_contact, setClient_contact] = useState("");
    const [Client_email, setClient_email] = useState("");
    const [University, setUniversity] = useState("");
    const [Student_login, setStudent_login] = useState("");
    const [Student_password, setStudent_password] = useState("");
   
    const token = localStorage.getItem("token")

    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');


    const [clientNameValid, setClientNameValid] = useState(null);
    const [clientPhoneValid, setClientPhoneValid] = useState(null);
    const [clientEmailValid, setClientEmailValid] = useState(null);
    const [clientUnivValid, setClientUnivValid] = useState(null);
    const [clientLoginValid, setClientLoginValid] = useState(null);
    const [clientPassValid, setClientPassValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const validateName = (value) => value.length >= 4;
    const validatePhone = (value) =>  !isNaN(value) && value.length == 10;
    const validateEmail = (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validateUniv = (value) => value.length >= 4;
    const validateLogin = (value) => value.length >= 4;
    const validatePassword = (value) => value.length >= 6;

    const resetFormFields = () => {
        setClient_name("");
        setClient_contact("");
        setClient_email("");
        setUniversity("");
        setStudent_login("");
        setStudent_password("");
    };

    const resetValidationFields = () => {
        setClientNameValid(null);
        setClientPhoneValid(null);
        setClientEmailValid(null);
        setClientUnivValid(null);
        setClientLoginValid(null);
        setClientPassValid(null);
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

    const handleClientUnivChange = (event) => {
        const newValue = event.target.value;
        setUniversity(newValue);
        setClientUnivValid(validateUniv(newValue));
    }

    const handleClientLoginChange = (event) => {
        const newValue = event.target.value;
        setStudent_login(newValue);
        setClientLoginValid(validateLogin(newValue));
    }

    const handleClientPassChange = (event) => {
        const newValue = event.target.value;
        setStudent_password(newValue);
        setClientPassValid(validatePassword(newValue));
    }

  // ====================   Email validetion function ==================
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (clientNameValid && clientPhoneValid && clientEmailValid && clientLoginValid && clientPassValid && clientUnivValid) {
      
      var formdata = new FormData();
      formdata.append("Client_name", Client_name);
      formdata.append("Client_contact", Client_contact);
      formdata.append("Client_email", Client_email);
      formdata.append("Client_status", "student");
      formdata.append("University", University);
      formdata.append("Student_login", Student_login);
      formdata.append("Student_password", Student_password);

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
              <FormControl fullWidth sx={{m:1, marginTop: 1}}>
                <TextField
                    margin="normal"
                    
                    fullWidth
                    value={Student_login}
                    onChange={handleClientLoginChange}
                    variant="outlined"
                    error={clientLoginValid == false}
                    helperText={clientLoginValid == false && 'Invalid login'}
                    id="login"
                    label="Student Login"
                    name="text"
                />
              </FormControl>
              <FormControl fullWidth sx={{m:1, marginTop: 1}}>
                <TextField
                    margin="normal"
                    
                    fullWidth
                    value={Student_password}
                    onChange={handleClientPassChange}
                    variant="outlined"
                    error={clientPassValid == false}
                    helperText={clientPassValid == false && 'Invalid password'}
                    id="password"
                    label="Student Password"
                    name="password"
                    
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

export default AddStudent;
