import React from 'react'
import { Container, FormControl, TextField, InputLabel, Select, MenuItem, Grid, Button, FormLabel } from '@mui/material'
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FRONTEND_API } from "./urls";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Start, Subject } from '@mui/icons-material';
import { FormText } from 'react-bootstrap';
import dayjs from 'dayjs';
import { Circle, PartPaid, Paid, DueStatus, DateText, PaidAmt, ButtonContainer } from './styles/style';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateCalendar, DatePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputAdornment from '@mui/material/InputAdornment';

function AddTaskNew() {
    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'INR',
            label: '₹',
        },
        {
            value: 'GBP',
            label: '£',
        },
    ];
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const location = useLocation();
    //const today = new Date().toISOString().split('T')[0];

    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const [currencyValue, setCurrencyValue] = React.useState('');
    const [userClient, setUserClient] = React.useState('');
    const [client, setclient] = useState([]);
    const [Vendor_budget, setVendor_budget] = useState("");
    const [subject, setSubject] = useState("");

    const [orderId, setOrderId] = useState("");

    const today = dayjs();
    const nextDate = today.add(1, 'day');

    const [newSubject, setNewSubject] = useState("");
    const [Start_date, setStart_date] = useState(dayjs().startOf('day'));
    const [End_date, setEnd_date] = useState(dayjs().startOf('day'));
    const [Description, setDescription] = useState("");
    const [Word_count, setWord_count] = useState("");
    const [Expert_price, setExpert_price] = useState("");

    const [userClientType, setUserClientType] = useState('');
    const [userType, setUserType] = useState('');

    const [orderIdValid, setOrderIdValid] = useState(null);
    const [clientValid, setClientValid] = useState(null);
    const [subjectValid, setSubjectValid] = useState(null);

    const [vendorBudgetValid, setVendorBudgetValid] = useState(null);
    const [wordCountValid, setWordCountValid] = useState(null);
    const [expertPriceValid, setExpertPriceValid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const buttonRef = useRef(null);

    const resetFormFields = () => {
        setVendor_budget("");
        setNewSubject("");
        setOrderId("")
        //setclient([]);
        setDescription("");
        setWord_count("");
        setExpert_price("");
        // Reset other form fields if needed
    };

    const validateSubject = (value) => value != '';
    const validateClient = (value) => value != '';

    const validateOrderId = (value) => value != '';


    const validateVendorBudget = (value) => /^\d+$/.test(value); // Example validation for a numeric value
    const vaildateWordCount = (value) => /^\d+$/.test(value);
    const validateExpertPrice = (value) => {
        console.log(parseInt(Vendor_budget, 10));
        if (value < parseInt(Vendor_budget, 10)) {
            console.log(value);
            return true;
        } else {
            return false;
        }
    }

    const handleCurrencyChange = (event) => {
        setCurrencyValue(event.target.value);
    };

    const handleChangeSubject = (event) => {
        const { name, value } = event.target;
        setSubject(value);
        setSubjectValid(validateSubject(value));
        console.log(event.target);

    };

    const handleOrderIdChange = (event) => {
        setOrderId(event.target.value);
        setOrderIdValid(validateOrderId(event.target.value));
    };

    const handleNewSubject = (event) => {
        const { name, value } = event.target;
        setNewSubject(value);
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
        const { name, value } = event.target;
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

    const handleEndDateChange = (date) => {
        //const { name, value } = event.target;
        console.log(date);
        setEnd_date(date);
        setOpenDatePicker(false);

        console.log(End_date);
    };

    const handleRadioChange = (event) => {
        //setSelectedRadio(event.target.value);
        console.log(event.target.value);
        setUserClientType(event.target.value);
        fetchInitial(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        //setSelectedRadio(event.target.value);
        console.log(event.target.value);
        setUserType(event.target.value);
        //fetchInitial(event.target.value);
    };

    useEffect(() => {
        if (alert) {
            const timeoutId = setTimeout(() => {
                setAlert(false);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [alert]);

    const fetchInitial = (type) => {

        if (type === 'student') {
            fetch(FRONTEND_API + "getstudentclientdata", {
                headers: {
                    'Authorization': 'Bearer ' + token
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
        } else {
            fetch(FRONTEND_API + "getvendoreclientdata", {
                headers: {
                    'Authorization': 'Bearer ' + token
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
        }


    };


    const resetValidationFields = () => {
        setSubjectValid(null);
        setVendorBudgetValid(null);
        setWordCountValid(null);
        setExpertPriceValid(null);

    };

    const uploadData = (event) => {
        event.preventDefault();
        console.log(subjectValid);
        if (orderIdValid && subjectValid && currencyValue !== '') {
            // Proceed with form submission

            console.log('Form submitted');
            var formdata = new FormData();
            formdata.append("order_id", orderId);
            formdata.append("Task_Subject", newSubject);
            formdata.append("currency", currencyValue);
            formdata.append("Vendor_budget", Vendor_budget);
            formdata.append("client_id", userClient);
            formdata.append("Status", "new order");
            formdata.append("Start_date", today);
            formdata.append("End_date", End_date.format('YYYY-MM-DD'));
            formdata.append("Description", Description);
            formdata.append("Word_count", Word_count);
            if (userType == 'freelancer') {
                formdata.append("Expert_price", Expert_price);
            } else {
                formdata.append("Expert_price", 0);
            }


            console.log(formdata);

            var requestOptions = {
                method: "POST",
                body: formdata,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            fetch(FRONTEND_API + "addtask", requestOptions)
                .then((response) => {
                    if (response.status == 200) {
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

    const handleButtonClick = () => {
        if (openDatePicker) {
            setOpenDatePicker(false);
        } else {
            setOpenDatePicker(true);
        }
    }

    return (

        <Container maxWidth="sm" sx={{
            marginTop: 10,
            marginBottom: 10
        }}>
            <h1>Add Task </h1>
            <form autoComplete="off" onSubmit={uploadData}>
                <FormControl fullWidth sx={{ m: 1 }}>

                    <TextField id="outlined-basic"
                        value={orderId}
                        onChange={handleOrderIdChange}
                        variant="outlined"
                        error={orderIdValid == false}
                        helperText={orderIdValid == false && 'Cannot be left blank'}
                        label="Order ID" />

                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>

                    <TextField id="outlined-basic"
                        value={newSubject}
                        onChange={handleNewSubject}
                        variant="outlined"
                        error={subjectValid == false}
                        helperText={subjectValid == false && 'Cannot be left blank'}
                        label="Subject" />

                </FormControl>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    <Grid item xs={4}>
                        <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currencyValue}
                                label="currency"
                                onChange={handleCurrencyChange}
                                error={currencyValue === ''}
                                helperText={currencyValue === '' && 'Select Currency'}
                            >
                                {currencies.map((data) => (

                                    <MenuItem value={data.value}>{data.label}</MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                            <TextField id="outlined-basic"
                                value={Vendor_budget}
                                onChange={handleVendorBudgetChange}
                                variant="outlined"
                                error={vendorBudgetValid == false}
                                helperText={vendorBudgetValid == false && 'Invalid budget'}
                                label="Budget" />
                        </FormControl>
                    </Grid>
                </Grid>


                <FormLabel sx={{ m: 1, marginTop: 3 }} id="demo-row-radio-buttons-group-label">Task Deadline</FormLabel>
                <ButtonContainer
                    sx={{ m: 1 }}
                    role="button"
                    onClick={handleButtonClick}
                    size='small'
                    ref={buttonRef}
                >
                    <span style={{ marginLeft: '10px' }}>{End_date.format('YYYY-MM-DD')}</span>
                    <IconButton sx={{ display: 'flex', alignItems: 'end', alignContent: 'end' }}>
                        <CalendarTodayIcon />
                    </IconButton>
                </ButtonContainer>

                {openDatePicker && (
                    <div
                        style={{
                            position: 'absolute',
                            zIndex: 9999,
                            top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight + 'px',
                            left: buttonRef.current.offsetLeft + 'px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={End_date}

                                onChange={(newValue) => handleEndDateChange(newValue)}
                                renderInput={() => null} // Hide the input inside the calendar
                                PopperProps={{
                                    style: { zIndex: 9999, backgroundColor: '#fff' }, // Adjust z-index as needed
                                }}
                                minDate={today}
                                sx={{
                                    '.Mui-selected': {
                                        backgroundColor: 'red', // Customize the background color of selected days
                                    },
                                    '.MuiPickersDay-day': {
                                        color: 'green', // Customize the color of the calendar days
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                )}

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>

                        <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Client</FormLabel>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={userClientType}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="student" control={<Radio />} label="Student" />
                                <FormControlLabel value="vendor" control={<Radio />} label="Vendor" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                {userClientType != '' && (

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{
                                marginTop: 3,
                                m: 1
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

                                        <MenuItem value={data.id}>{data.name}</MenuItem>

                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}

                <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                    <TextField id="outlined-basic"
                        value={Description}
                        onInput={(e) => {
                            setDescription(e.target.value);
                        }}
                        label="Description" variant="outlined" />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                    <TextField id="outlined-basic"
                        value={Word_count}
                        error={wordCountValid == false}
                        onChange={handleWordCountChange}
                        helperText={wordCountValid == false && 'Invalid Word Count'}
                        label="Word Count"
                        variant="outlined" />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Assign Task</FormLabel>

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={userType}
                        onChange={handleUserTypeChange}
                    >
                        <FormControlLabel value="permanent" control={<Radio />} label="Permanent" />
                        <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                    </RadioGroup>
                </FormControl>
                {userType == 'freelancer' && (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>

                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currencyValue}
                                    disabled
                                    label="currency"
                                    onChange={handleCurrencyChange}

                                >
                                    {currencies.map((data) => (

                                        <MenuItem value={data.value}>{data.label}</MenuItem>

                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
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
                )}


                <Button variant="outlined" type='submit' sx={{ marginTop: 3 }}>Submit</Button>
            </form>
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
        </Container>
    )
}

export default AddTaskNew