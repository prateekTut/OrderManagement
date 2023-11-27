import React from 'react'
import { FormControl, MenuItem, InputLabel, BottomNavigation, BottomNavigationAction, TextField, Grid, Container, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FRONTEND_API } from "./urls";
import { event } from 'jquery';
import { DialogContentText, Alert } from '@mui/material';


function ReworkTaskConsole() {

    const [subjectValue, setSubjectValue] = React.useState('');
    const [bottomNavSub, setBottomNavSub] = useState('New Order');
    const [subjects, setSubjects] = useState([]);
    const [orders, setOrders] = useState([]);
    const [ordersId, setOrdersId] = useState([]);
    const [ordersIdEdit, setOrdersIdEdit] = useState([]);
    const [Vendor_budget, setVendor_budget] = useState("");

    const [userType, setUserType] = useState('');

    const [currentStatus, setCurrentStatus] = useState('New Order');
    const [prevStatus, setPrevStatus] = useState("");

    const token = localStorage.getItem("token")
    const roles = localStorage.getItem("roles")
    const userId = localStorage.getItem("userId")

    const today = new Date().toISOString().split('T')[0];

    const [Status, setStatus] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const [orderStatusValid, setOrderStatusValid] = useState(null);
    const [expertValid, setExpertValid] = useState(null);
    const [otmValid, setOtmValid] = useState(null);
    const [expertStartDateValid, setExpertStartDateValid] = useState(null);
    const [expertEndDateValid, setExpertEndDateValid] = useState(null);
    const [vendorBudgetValid, setVendorBudgetValid] = useState(null);

    const [expertPriceValid, setExpertPriceValid] = useState(null);
    const [wordCountValid, setWordCountValid] = useState(null);

    const [expertPrice, setExpertPrice] = useState("");
    const [wordCount, setWordCount] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const validateStatus = (value) => value != '';
    const validateExpert = (value) => value != '';
    const validateOtm = (value) => value != '';
    const validateExpertStartDate = (value) => value != '';
    const validateExpertEndDate = (value) => value != '';
    const validateVendorBudget = (value) => /^\d+$/.test(value);

    const validateExpertPrice = (value) => !isNaN(value) && value.length < 5;
    const validateWordCount = (value) => !isNaN(value) && value.length < 5;

    const [expert, setexpert] = useState([]);
    const [Expert_startDate, setExpert_startDate] = useState("");
    const [Expert_endDate, setExpert_endDate] = useState("");
    const [Qc_Expert_name, setQc_Expert_name] = useState("");
    const [otmMember, setOtmMember] = useState([]);

    const [otmUser, setOtmUser] = React.useState('');

    const resetFormFields = () => {
        setStatus("");
        setExpert_startDate("");
        setExpert_endDate("");
        setQc_Expert_name("");
        setOtmUser("");
        // Reset other form fields if needed
    };

    const resetValidationFields = () => {
        setOrderStatusValid(null);
        setExpertValid(null);
        setOtmValid(null);
        setExpertEndDateValid(null);
        setExpertStartDateValid(null);
    };


    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
        color: #007A78;
        &.Mui-selected {
        color: red;
        font-size: 22px;
        }
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2); /* Replace the shadow values with your desired elevation */
        background-color: #f5f5f5; 
        font-size: 20px !important;
        
    `);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const fetchDataForEdit = () => {
        var formdata = new FormData();

        formdata.append("type", "otm");


        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        fetch(FRONTEND_API + "getUsers", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                // do something with data
                console.log(data);
                setOtmMember(data);
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    };

    const handleVendorBudgetChange = (event) => {
        const { name, value } = event.target;
        setVendor_budget(value);
        setVendorBudgetValid(validateVendorBudget(value));
    };

    const handleChangeQc = (event) => {
        const value = event.target.value
        setQc_Expert_name(value);
        setExpertValid(validateExpert(value))
        console.log(event.target.value);

    };

    const onChangeExpertPrice = (event) => {
        const value = event.target.value
        setExpertPrice(value);
        setExpertPriceValid(validateExpertPrice(value))
        console.log(event.target.value);

    };

    const onChangeWordCount = (event) => {
        const value = event.target.value
        setWordCount(value);
        setWordCountValid(validateWordCount(value))
        console.log(event.target.value);

    };

    const handleChangeOtm = (event) => {
        const value = event.target.value
        setOtmUser(value);
        setOtmValid(validateOtm(value));
    };

    const handleChangeStatus = (event) => {
        const value = event.target.value
        setStatus(value);
        setOrderStatusValid(validateStatus(value))
        console.log(event.target.value);

    };

    const handleExpertStartDateChange = (event) => {
        const value = event.target.value
        setExpert_startDate(value);
        setExpertStartDateValid(validateExpertStartDate(value))
    };

    const handleExpertEndDateChange = (event) => {
        const value = event.target.value
        setExpert_endDate(value);
        setExpertEndDateValid(validateExpertEndDate(value))
    };

    const handleModalUpdate = (id, prevStat) => {
        setOpen(true);
        setOrdersId(id);
        setPrevStatus(prevStat);
    };

    const handleModalEdit = (id) => {
        fetchDataForEdit();

        setOrdersIdEdit(id);
        const filteredOrders = orders.filter(order => order.id == id);
        console.log("in modal edit", filteredOrders);
        console.log("in modal edit", filteredOrders[0].expert_price);
        //const formattedDate = dateObject;
        const dateEndObject = new Date(filteredOrders[0].expert_end_date);
        const dateStartObject = new Date(filteredOrders[0].expert_start_date);

        setExpert_endDate(dateEndObject.toISOString().split('T')[0]);
        setExpert_startDate(dateStartObject.toISOString().split('T')[0]);
        setWordCount(filteredOrders[0].word_count);
        setExpertPrice(filteredOrders[0].expert_price);
        setVendor_budget(filteredOrders[0].budget);
        setOpenEdit(true);
    };


    const handleCloseEdit = () => {
        setOpenEdit(false);
        //resetFormFields();
    };

    const handleClose = () => {
        setOpen(false);
        //resetFormFields();
        setUserType('');
        setexpert([''])
    };

    const handleUpdate = () => {
        console.log(orderStatusValid, expertValid);
        if (Status == "pass") {
            if (orderStatusValid) {
                updateStatusData();

            } else {
                setDialogOpen(true);
            }
        } else if (Status == "assigned") {
            if (orderStatusValid && expertValid && expertStartDateValid && expertEndDateValid) {
                updateStatusData();
            } else {
                setDialogOpen(true);
            }
        } else if (Status == "qc" || Status == "fail" || Status == "rework") {
            if (orderStatusValid && expertValid) {
                updateStatusData();
            } else {
                setDialogOpen(true);
            }
        } else {
            setDialogOpen(true);
        }
        setUserType('');
    }

    const updateStatusData = () => {

        var formdata = new FormData();
        formdata.append("status", Status)
        formdata.append("expert_id", Qc_Expert_name)
        formdata.append("expert_start_date", Expert_startDate)
        formdata.append("expert_end_date", Expert_endDate)

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        fetch(FRONTEND_API + "updateStatusWithId/".concat(ordersId), requestOptions)
            .then((res) => res.json())
            .then((data) => {
                // do something with data
                console.log("budget DATA", data);

                resetFormFields();
                resetValidationFields();
                setOrders(data);
                setOpen(false);

            })
            .catch((rejected) => {
                console.log(rejected);
            });
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleOrderUpdate = () => {
        if (wordCountValid || expertPriceValid || Expert_startDate != null) {
            var formdata = new FormData();

            formdata.append("Expert_startDate", Expert_startDate);
            formdata.append("Expert_endDate", Expert_endDate);
            formdata.append("word_count", wordCount);
            formdata.append("expert_price", expertPrice);
            formdata.append("budget", Vendor_budget)
            var requestOptions = {
                method: "POST",
                body: formdata,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            fetch(FRONTEND_API + "updateOrderWithId/".concat(ordersIdEdit), requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    // do something with data
                    console.log("budget DATA", data);
                    setOrders(data);
                    setOpenEdit(false);
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        }
    }


    const handleChange = (event) => {
        setSubjectValue(event.target.value);

        fetchDataForSubject(event.target.value, bottomNavSub);
    };

    const handleUserTypeChange = (event) => {
        //setSelectedRadio(event.target.value);
        console.log(event.target.value);
        setUserType(event.target.value);
        //fetchInitial(event.target.value);
        fetchExperts(event.target.value);
    };

    const handleDate = (expertDate) => {

        var formattedDate = null
        if (expertDate != null) {
            const dateObject = new Date(expertDate);
            formattedDate = dateObject.toDateString();
        }
        return formattedDate;
    }

    const handleBudget = (budget, currency) => {

        if (currency == 'GBP') {
            return "£" + budget
        } else if (currency == 'USD') {
            return "$" + budget
        } else {
            return "₹" + budget
        }

    }

    const fetchExperts = (type) => {

        var formdata = new FormData();
        formdata.append("user_type", type);

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        fetch(FRONTEND_API + "getexpert", requestOptions)
        .then((res) => res.json())
        .then((data) => {
            // do something with data
            console.log(data);
            setexpert(data);
        })
        .catch((rejected) => {
            console.log(rejected);
        });
    }

    const fetchDataForSubject = (subject, status) => {
        console.log(subject);
        console.log(status);

        var formdata = new FormData();
        formdata.append("subject", subject);
        formdata.append("status", 'rework'); //status

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        fetch(FRONTEND_API + "getOrdersBySubjectAndStatus", requestOptions)
            .then((res) => res.json())
            .then((rawData) => {
                console.log(rawData);
                console.log(currentStatus);
                if (roles == "admin") {
                    console.log("admin")
                    setOrders(rawData);
                } else if (roles == "expert") {
                    console.log("expert", userId)
                    /* rawData.map((order) => {
                        if(userId == order.expert_id){
                            setOrders(order);
                        }
                    }) */
                    console.log(rawData);
                    const filteredOrders = rawData.filter(order => order.expertId == userId);
                    console.log(filteredOrders);
                    setOrders(filteredOrders);
                } else {
                    setOrders(rawData);
                }
                console.log("orders set");
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    }



    useEffect(() => {
        fetchData();
    }, [currentStatus]);

    const fetchData = async () => {
        console.log(currentStatus);

        var formdata = new FormData();
        formdata.append("status", currentStatus);

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        /* fetch(FRONTEND_API + "getOrdersStatus", requestOptions)
          .then((res) => res.json())
          .then((rawData) => {
              console.log(rawData);
              setOrders(rawData)
          })
          .catch((rejected) => {
          console.log(rejected);
          }); */
    }



    useEffect(() => {
        const fetchInitial = async () => {
            fetch(FRONTEND_API + "getordersdata", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => res.json())
                .then((rawData) => {
                    console.log(rawData)
                    var dataSet = rawData;
                    const distinctSubjectsSet = new Set();
                    //setSubjects(rawData);
                    // Loop through the subjects array to add distinct subject names to the Set
                    dataSet.forEach((data) => {
                        distinctSubjectsSet.add(data.subject);
                    });

                    // Convert the Set back to an array to get the distinct subject names
                    const distinctSubjects = Array.from(distinctSubjectsSet);
                    setSubjects(distinctSubjects)
                    console.log(distinctSubjects)
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        };
       
        fetchInitial();
    }, []);

    /* const GMTtoIST = (gmtDate) => {
        // Create a new Date object from the provided GMT date string
        const dateObj = new Date(gmtDate);

        // Convert the GMT date to IST
        const istDate = new Date(dateObj.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
        }));
      
        // Format the IST date to display date with month name
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = istDate.toLocaleDateString('en-IN', options);
      
        return formattedDate;
    } */


    return (
        <Container>
            <Box>
                {/* Render your order data here based on your API response */console.log(roles)}
                {roles != "expert" && roles != 'lead' && roles != 'otm' ? (
                    <Box sx={{ marginTop: 10, marginBottom: 3 }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Button variant="contained" href="/addtask">Add Task</Button>
                            </Grid>
                            <Grid item xs={6}>

                            </Grid>

                        </Grid>

                        <FormControl sx={{ width: 250, marginTop: 2 }} >
                            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subjectValue}
                                label="subjects"
                                onChange={handleChange}
                            >
                                {subjects.map((data) => (

                                    <MenuItem value={data}>{data}</MenuItem>

                                ))}
                            </Select>
                        </FormControl>

                    </Box>
                ) : (
                    <Box sx={{ marginTop: 10 }}>
                    </Box>
                )
                }
                {roles == "lead" || roles == "otm" || roles == "expert" ? (
                    <FormControl sx={{ width: 250 }} >
                        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subjectValue}
                            label="subjects"
                            onChange={handleChange}
                        >
                            {subjects.map((data) => (

                                <MenuItem value={data}>{data}</MenuItem>

                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <Box sx={{ marginTop: 1 }}></Box>
                )

                }
                {orders && orders.Error ? (
                    <Box sx={{
                        width: 700,
                        height: 250
                    }}>
                        <p>No Orders to show</p>
                    </Box>
                ) : (

                    <div>


                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 5,
                            marginTop: 2
                        }}>

                            <TableContainer component={Paper} sx={{


                                marginRight: 2
                            }}
                                aria-label="customized table" >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Order ID</StyledTableCell>
                                            <StyledTableCell>Client</StyledTableCell>
                                            <StyledTableCell >Expert</StyledTableCell>
                                            <StyledTableCell >Start Date</StyledTableCell>
                                            <StyledTableCell >End Date</StyledTableCell>
                                            <StyledTableCell >Expert Start Date</StyledTableCell>
                                            <StyledTableCell >Expert End Date</StyledTableCell>

                                            <StyledTableCell >Order Status</StyledTableCell>
                                            <StyledTableCell >Word Count</StyledTableCell>
                                            {roles != 'expert' && (
                                                <StyledTableCell >Expert Price</StyledTableCell>


                                            )}
                                            {roles != 'expert' && (
                                                <StyledTableCell >Budget</StyledTableCell>


                                            )}

                                            <StyledTableCell >Description</StyledTableCell>
                                            <StyledTableCell >Operations</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>

                                    <TableBody>
                                        {console.log(orders)}
                                        {orders !== null && (
                                            orders.map((orderData) => (

                                                <StyledTableRow key={orderData.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    {console.log(orderData.budget)}

                                                    <StyledTableCell component="th" scope="row">{orderData.id}</StyledTableCell>
                                                    <StyledTableCell>{orderData.client_id} </StyledTableCell>
                                                    <StyledTableCell>{orderData.expert_id}</StyledTableCell>
                                                    <StyledTableCell>{handleDate(orderData.order_start_date)}</StyledTableCell>
                                                    <StyledTableCell>{handleDate(orderData.order_end_date)}</StyledTableCell>
                                                    <StyledTableCell>{handleDate(orderData.expert_start_date)}</StyledTableCell>
                                                    <StyledTableCell>{handleDate(orderData.expert_end_date)}</StyledTableCell>
                                                    <StyledTableCell>{orderData.order_status}</StyledTableCell>
                                                    <StyledTableCell>{orderData.word_count}</StyledTableCell>
                                                    {roles != 'expert' && (
                                                        <StyledTableCell>{handleBudget(orderData.expert_price, orderData.currency)}</StyledTableCell>
                                                    )}

                                                    {roles != 'expert' && (
                                                        <StyledTableCell>{handleBudget(orderData.budget, orderData.currency)}</StyledTableCell>
                                                    )}



                                                    <StyledTableCell>{orderData.description}</StyledTableCell>
                                                    <StyledTableCell>
                                                        {roles == "lead" && orderData.id != null && (
                                                            <Button variant="contained" type='submit' color="success"
                                                                onClick={() => handleModalUpdate(orderData.id, orderData.order_status)}
                                                                size="small"
                                                                sx={{ marginRight: 2 }}>
                                                                Update Status
                                                            </Button>
                                                        )
                                                        }
                                                        {roles == "admin" && orderData.id != null && (
                                                            <Box sx={{
                                                                marginTop: 5,
                                                                marginBottom: 5
                                                            }}>

                                                                <Button variant="contained" type='submit' color="success"
                                                                    onClick={() => handleModalUpdate(orderData.id, orderData.order_status)}
                                                                    size="small"
                                                                    sx={{ marginRight: 2 }}>
                                                                    Update Status
                                                                </Button>

                                                                <Button
                                                                    onClick={() => handleModalEdit(orderData.id)}
                                                                    variant="contained"
                                                                    color="success" size="small"
                                                                    sx={{ marginRight: 2, marginTop: 2 }}>
                                                                    Edit
                                                                </Button>
                                                                {/* <Button variant='contained' size='small' color='error'  
                                                onClick={() => deleteUser(orderData.id)}  sx={{marginTop: 2}}
                                                >Delete
                                            </Button> */}
                                                            </Box>
                                                        )}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                )}
                {orders == null && (
                    <Box sx={{
                        width: 700,
                        height: 250
                    }}>
                        <p>Select Subject First</p>
                    </Box>
                )}




                {/* Add more details you want to display */}
            </Box>


            {/* <BottomNavigation
                showLabels={true}
                value={bottomNavSub} //subject
                onChange={(event, newValue) => {
                    setBottomNavSub(newValue);
                    fetchDataForSubject(subjectValue, newValue);
                    //setOrders(null)
                }}
                sx={{ position: 'fixed', bottom: 0, marginBottom: 2, width: '100%', marginLeft: -10 }}

            >
                <BottomNavigationAction
                    label="New Order"
                    onClick={() => setCurrentStatus('New Order')}
                    value="new order"


                />
                <BottomNavigationAction
                    label="Assigned"
                    onClick={() => setCurrentStatus('Assigned')}
                    value="assigned"


                />
                <BottomNavigationAction
                    label="QC"
                    onClick={() => setCurrentStatus('QC')}
                    value="qc"


                />
                <BottomNavigationAction
                    label="Rework"
                    onClick={() => setCurrentStatus('Rework')}
                    value="rework"


                />
                <BottomNavigationAction
                    label="Pass"
                    onClick={() => setCurrentStatus('Pass')}
                    value="pass"


                />
                <BottomNavigationAction
                    label="Failed"
                    onClick={() => setCurrentStatus('Failed')}
                    value="fail"



                />

            </BottomNavigation> */}

            <Dialog
                open={open}
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Select status from the List to Update."}
                </DialogTitle>
                <DialogContent sx={{
                    marginTop: 2
                }}>
                    <FormControl fullWidth sx={{
                        marginTop: 2
                    }}>

                        {prevStatus != null && prevStatus != 'new order' && (

                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Status}
                                    label="Status"
                                    variant='outlined'
                                    error={orderStatusValid == false}
                                    helperText={orderStatusValid == false && 'Select Status'}
                                    onChange={handleChangeStatus}>
                                    <MenuItem value={'qc'}>QC</MenuItem>
                                    <MenuItem value={'pass'}>Pass</MenuItem>
                                    <MenuItem value={'fail'}>Failed</MenuItem>
                                    <MenuItem value={'rework'}>Rework</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        {Status != 'pass' && prevStatus != 'new order' && (
                            <Box>
                                <FormControl fullWidth sx={{ marginTop: 3 }}>
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

                                <FormControl fullWidth sx={{ marginTop: 3 }}>
                                <InputLabel >Expert</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Qc_Expert_name}
                                    label="Experts"
                                    variant='outlined'
                                    error={expertValid == false}
                                    helperText={expertValid == false && 'Select Expert'}
                                    onChange={handleChangeQc}

                                >
                                    {expert.map((data) => (

                                        <MenuItem value={data.id}>{data.Expert_firstname}</MenuItem>

                                    ))}
                                </Select>
                            </FormControl>
                            </Box>
                           

                        )}

                        {(Status === 'fail' || Status === 'rework') && prevStatus !== 'new order' && (
                            <FormControl fullWidth sx={{ marginTop: 3 }}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Comment"
                                    placeholder="Add Reason"
                                    multiline
                                />
                            </FormControl>
                        )}

                        {prevStatus != null && prevStatus == 'new order' && (
                            <Box>
                                <FormControl>
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

                                <Grid item xs={6}>
                                    <FormControl fullWidth sx={{ marginTop: 3 }}>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Status}
                                            label="Status"
                                            variant='outlined'
                                            error={orderStatusValid == false}
                                            helperText={orderStatusValid == false && 'Select Status'}
                                            onChange={handleChangeStatus} >

                                            <MenuItem value={'assigned'}>Assigned</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <FormControl fullWidth sx={{ marginTop: 3 }}>
                                        <InputLabel >Expert</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Qc_Expert_name}
                                            label="Experts"
                                            variant='outlined'
                                            error={expertValid == false}
                                            helperText={expertValid == false && 'Select Expert'}
                                            onChange={handleChangeQc}

                                        >
                                            {expert.map((data) => (

                                                <MenuItem value={data.id}>{data.Expert_firstname}</MenuItem>

                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth sx={{ marginTop: 3 }}>
                                        <TextField id="outlined-basic" type='date'
                                            value={Expert_startDate}
                                            variant='outlined'
                                            error={expertStartDateValid == false}
                                            helperText={expertStartDateValid == false && 'Select Start Date'}
                                            onChange={handleExpertStartDateChange}
                                            
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            label="Expert Start Date"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth sx={{ marginTop: 3 }}>
                                        <TextField id="outlined-basic" type='date'
                                            value={Expert_endDate}
                                            error={expertEndDateValid == false}
                                            helperText={expertEndDateValid == false && 'Select End Date'}
                                            onChange={handleExpertEndDateChange}
                                            inputProps={{
                                                min: Expert_startDate,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            label="Expert End Date"
                                            variant="outlined" />
                                    </FormControl>
                                </Grid>

                            </Box>
                        )}

                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* validation Dialog */}
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


            <Dialog
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit Order"}
                </DialogTitle>
                <DialogContent sx={{
                    marginTop: 2
                }}>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                            <TextField id="outlined-basic" type='date'
                                value={Expert_startDate}
                                onInput={(e) => {
                                    console.log(e.target.value);
                                    setExpert_startDate(e.target.value);
                                }}
                                inputProps={{ min: today }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Expert Start Date"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ m: 1, marginTop: 3 }}>
                            <TextField id="outlined-basic" type='date'
                                value={Expert_endDate}
                                onInput={(e) => {
                                    console.log(e.target.value);
                                    setExpert_endDate(e.target.value);
                                }}
                                inputProps={{ min: Expert_startDate }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Expert End Date"
                                variant="outlined" />
                        </FormControl>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{
                                marginTop: 3,
                                m: 1
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="wordCount"
                                    label="Word Count"
                                    name="wordCount"
                                    value={wordCount}
                                    onChange={onChangeWordCount}
                                    error={wordCountValid == false}
                                    helperText={wordCountValid == false && 'Invalid word count'}

                                />

                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{
                                marginTop: 3,
                                m: 1
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="expertPrice"
                                    label="Expert Price"
                                    name="expertPrice"
                                    value={expertPrice}
                                    onChange={onChangeExpertPrice}
                                    error={expertPriceValid == false}
                                    helperText={expertPriceValid == false && 'Invalid Price'}

                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{
                                marginTop: 3,
                                m: 1
                            }}>
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Close</Button>
                    <Button onClick={handleOrderUpdate} autoFocus>
                        Update Order
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    )
}

export default ReworkTaskConsole