import React from 'react'
import { Container, FormControl, TextField, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FRONTEND_API } from "./urls";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert} from '@mui/material';

function AddTaskNew() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const location = useLocation();
    const today = new Date().toISOString().split('T')[0];

    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const [userClient, setUserClient] = React.useState('');
    const [client, setclient] = useState([]);
    const [Vendor_budget, setVendor_budget] = useState("");
    const [subject, setSubject] = useState("");
    const [Start_date, setStart_date] = useState("");
    const [End_date, setEnd_date] = useState("");
    const [Description, setDescription] = useState("");
    const [Word_count, setWord_count] = useState("");
    const [Expert_price, setExpert_price] = useState("");

    const [clientValid, setClientValid] = useState(null);
    const [subjectValid, setSubjectValid] = useState(null);
    const [startDateValid, setStartDateValid] = useState(null);
    const [endDateValid, setEndDateValid] = useState(null);
    const [vendorBudgetValid, setVendorBudgetValid] = useState(null);
    const [wordCountValid, setWordCountValid] = useState(null);
    const [expertPriceValid, setExpertPriceValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
 
    const resetFormFields = () => {
        setVendor_budget("");
        setSubject("");
        setStart_date("");
        setEnd_date("");
        //setclient([]);
        setDescription("");
        setWord_count("");
        setExpert_price("");
        // Reset other form fields if needed
    };

    const validateSubject = (value) => value != '';
    const validateClient = (value) => value != '';
    const validateStartDate = (value) => value != '';
    const validateEndDate = (value) => value != '';

    const validateVendorBudget = (value) => /^\d+$/.test(value); // Example validation for a numeric value
    const vaildateWordCount = (value) => /^\d+$/.test(value);
    const validateExpertPrice = (value) => /^\d+$/.test(value);

    const handleChangeSubject = (event) => {
        const {name, value} = event.target;
        setSubject(value); 
        setSubjectValid(validateSubject(value));
        console.log(event.target);
        
    };

    const handleChangeClient = (event) => {
        const newValue = event.target.value;
        setUserClient(newValue);
        setClientValid(validateClient(newValue))
        console.log(event.target.value);
    };

    const handleVendorBudgetChange = (event) => {
        const {name, value} = event.target;
        setVendor_budget(value);
        setVendorBudgetValid(validateVendorBudget(value));
    };

    const handleWordCountChange = (event) => {
        const newValue = event.target.value;
        setWord_count(newValue);
        setWordCountValid(vaildateWordCount(newValue));
    };

    const handleExpertPriceChange = (event) => {
        const newValue = event.target.value;
        setExpert_price(newValue);
        setExpertPriceValid(validateExpertPrice(newValue));
    };

    const handleStartDateChange = (event) => {
        const {name, value} = event.target;
        setStart_date(value);
        setStartDateValid(validateStartDate(value));
    };

    const handleEndDateChange = (event) => {
        const {name, value} = event.target;
        setEnd_date(value);
        setEndDateValid(validateEndDate(value));
    };
 
    useEffect(() => {
        const fetchInitial = async () =>{
            fetch(FRONTEND_API + "getclientdata", {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
                })
                .then((res) => res.json())
                .then((data) => {
                    // do something with data
                    console.log(data);
                    setclient(data);
                })
                .catch((rejected) => {
                    console.log(rejected);
                }
            );
         
        };
        fetchInitial();
    }, []);
    
    const resetValidationFields = () => {
        setSubjectValid(null);
        setVendorBudgetValid(null);
        setWordCountValid(null);
        setExpertPriceValid(null);
        setStartDateValid(null);
        setEndDateValid(null);
    };

    const uploadData = (event) => {
        event.preventDefault();
        console.log(subjectValid);
        if (subjectValid && vendorBudgetValid && wordCountValid && expertPriceValid && startDateValid && endDateValid) {
            // Proceed with form submission
            
            console.log('Form submitted');
            var formdata = new FormData();
            formdata.append("Task_Subject", subject);
            formdata.append("Vendor_budget", Vendor_budget);
            formdata.append("client_id", userClient);
            formdata.append("Status", "new order");
            formdata.append("Start_date", Start_date);
            formdata.append("End_date", End_date);
            formdata.append("Description", Description);
            formdata.append("Word_count", Word_count);
            formdata.append("Expert_price", Expert_price);
    
            console.log(formdata);
            var requestOptions = {
                method: "POST",
                body: formdata,
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            };
    
            fetch(FRONTEND_API + "addtask", requestOptions)
                .then((response) => { 
                    if(response.status == 200){
                        setStatus("200")
                        return response.json();
                    }
                })
                .then((result) => {
                    
                    setAlertContent(result.message);
                    setAlert(true);
                    console.log(result);
                    resetFormFields();
                    resetValidationFields();
                    //navigate('/Assingntask');
                })
                .catch((error) => console.log(error));
        } else {
            setDialogOpen(true);
        }
       
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

  return (
    
    <Container maxWidth="sm" sx={{
        marginTop: 10,
        marginBottom: 10
    }}>
        <h1>Add Task </h1>
        <form autoComplete="off" onSubmit={uploadData}>
            <FormControl fullWidth sx={{m:1}}>

                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subject}
                    label="Subject"
                    name='Subject'
                    onChange={handleChangeSubject}
                    error={subjectValid == false}
                    helperText={subjectValid == false && 'Cannot be left blank'}>

                    <MenuItem value={'mathematics'}>Mathematics</MenuItem>
                    <MenuItem value={'science'}>Science</MenuItem>
                    <MenuItem value={'english'}>English</MenuItem>
                    <MenuItem value={'data science'}>Data Science</MenuItem>
                </Select>

            </FormControl>
            <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                <TextField id="outlined-basic"  
                    value={Vendor_budget}
                    onChange={handleVendorBudgetChange}
                    variant="outlined"
                    error={vendorBudgetValid == false}
                    helperText={vendorBudgetValid == false && 'Invalid budget'}
                    label="Budget" />
            </FormControl>
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                    <TextField id="outlined-basic" 
                        type='date' 
                        value={Start_date}
                        onChange={handleStartDateChange}
                        inputProps={{ min: today }} // Set the minimum allowed date
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Task Start Date"
                        variant="outlined" />
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                    <TextField id="outlined-basic"  type='date' 
                        value={End_date}
                        onChange={handleEndDateChange}
                        inputProps={{ min: today }} 
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Task End Date"
                         variant="outlined" />
                </FormControl>
                </Grid>
            </Grid>
        
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{
                        marginTop: 3,
                        m:1
                    }}>
                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userClient}
                        label="Experts"
                        error={clientValid == false}
                        helperText={clientValid == false && 'Invalid Client'}
                        variant='outlined'
                        onChange={handleChangeClient}
                    >
                    {client.map((data) => ( 
                        
                        <MenuItem value={data.id}>{data.Client_name}</MenuItem>
                        
                    ))}
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                <TextField id="outlined-basic" 
                    value={Description}
                        onInput={(e) => {
                        setDescription(e.target.value);
                    }}
                    label="Description" variant="outlined" />
            </FormControl>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                    <TextField id="outlined-basic" 
                        value={Word_count}
                        error={wordCountValid  == false}
                        onChange={handleWordCountChange}
                        helperText={wordCountValid == false && 'Invalid Word Count'}
                        label="Word Count" 
                        variant="outlined" />
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                    <TextField id="outlined-basic"  
                        value={Expert_price}
                        label="Expert Price" 
                        variant="outlined"
                        error={expertPriceValid == false}
                        onChange={handleExpertPriceChange}
                        helperText={expertPriceValid == false && 'Invalid Price'}
                        />
                </FormControl>
                </Grid>
            </Grid>
            <Button variant="outlined" type='submit' sx={{marginTop:3}}>Submit</Button>
        </form>
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
    </Container>
  )
}

export default AddTaskNew