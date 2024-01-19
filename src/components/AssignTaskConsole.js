import React from 'react'
import { FormControl, MenuItem, InputLabel, BottomNavigation, BottomNavigationAction, TextField, Grid, Container, FormLabel, FormControlLabel, Radio, RadioGroup, Fab } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FRONTEND_API } from "./urls";
import { event } from 'jquery';
import { DialogContentText, Alert } from '@mui/material';

import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import "./css/invoices.css"
import { ButtonContainer } from './styles/style';

import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateCalendar, DatePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import UpdateSharpIcon from '@mui/icons-material/UpdateSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';

import { StyledTableCell, StyledTableRow } from './styles/TableStyles';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
    color: #ffff;
    &.Mui-selected {
        background-color: #F34C19;
        font-size: 24px;
        color: #ffff;
    }
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2); /* Replace the shadow values with your desired elevation */
    background-color: #343F71; 
    font-size: 20px !important;
    margin-right: 13px;
    border-radius: 5px;
`;

function AssignTaskConsole() {


    const [orders, setOrders] = useState([]);
    const [ordersId, setOrdersId] = useState([]);
    const [ordersIdEdit, setOrdersIdEdit] = useState([]);
    const [Vendor_budget, setVendor_budget] = useState("");

    const [userType, setUserType] = useState('');

    const [bottomNavSub, setBottomNavSub] = useState('New Order');
    const [currentStatus, setCurrentStatus] = useState('New Order');

    const [prevStatus, setPrevStatus] = useState("");

    const token = localStorage.getItem("token")
    const roles = localStorage.getItem("roles")
    const userId = localStorage.getItem("userId")

    const today = dayjs();

    const [Status, setStatus] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const [orderStatusValid, setOrderStatusValid] = useState(null);
    const [expertValid, setExpertValid] = useState(null);
    const [otmValid, setOtmValid] = useState(null);
    const [vendorBudgetValid, setVendorBudgetValid] = useState(null);

    const [expertPriceValid, setExpertPriceValid] = useState(null);
    const [wordCountValid, setWordCountValid] = useState(null);

    const [expertPrice, setExpertPrice] = useState("");
    const [wordCount, setWordCount] = useState("");
    const [subject, setSubject] = useState("");
    const [endDate, setEndDate] = useState(dayjs().startOf('day'));

    const [dialogOpen, setDialogOpen] = useState(false);

    const validateStatus = (value) => value != '';
    const validateExpert = (value) => value != '';
    const validateOtm = (value) => value != '';
    const validateVendorBudget = (value) => /^\d+$/.test(value);

    const validateExpertPrice = (value) => !isNaN(value) && value.length < 5;
    const validateWordCount = (value) => !isNaN(value) && value.length < 5;

    const [expert, setexpert] = useState([]);
    const [Qc_Expert_name, setQc_Expert_name] = useState("");
    const [otmMember, setOtmMember] = useState([]);

    const [otmUser, setOtmUser] = React.useState('');

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const resetFormFields = () => {
        setStatus("");
        setQc_Expert_name("");
        setOtmUser("");
        // Reset other form fields if needed
    };

    const resetValidationFields = () => {
        setOrderStatusValid(null);
        setExpertValid(null);
        setOtmValid(null);

    };

    useEffect(() => {
        //fetchData();
        fetchDataForSubject(currentStatus);
        setBottomNavSub("New Order");
    }, []);


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

    const handleChangeStatus = (event) => {
        const value = event.target.value
        setStatus(value);
        setOrderStatusValid(validateStatus(value))
        console.log(event.target.value);

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
        setWordCount(filteredOrders[0].word_count);
        setExpertPrice(filteredOrders[0].expert_price);
        setVendor_budget(filteredOrders[0].budget);
        setSubject(filteredOrders[0].subject);
        const dateString = filteredOrders[0].order_end_date; // Assuming it's a string
        const dateObject = dayjs(dateString);
        setEndDate(dateObject);
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
            if (orderStatusValid && expertValid) {
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
                //setOrders(data);
                fetchDataForSubject(currentStatus);
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
        console.log("In edit")
        if (wordCountValid || endDate) {
            console.log("In edit cond valid")
            var formdata = new FormData();
            formdata.append("word_count", wordCount);
            formdata.append("expert_price", expertPrice);
            formdata.append("budget", Vendor_budget);
            formdata.append("subject", subject);
            formdata.append("deadline", endDate.format("YYYY-MM-DD"))
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
                    fetchDataForSubject(currentStatus);
                    setOpenEdit(false);
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        }
    }


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

        fetch(FRONTEND_API + "getExpertToAssign", requestOptions)
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

    const fetchDataForSubject = (status) => {
        //console.log(subject);
        console.log(status);

        var formdata = new FormData();
        formdata.append("status", status); //status

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

                if (roles == "admin") {
                    const sortedOrdersByDate = rawData.sort((a, b) => {
                        return new Date(b.order_end_date) - new Date(a.order_end_date);
                    });
                    setOrders(sortedOrdersByDate);
                } else if (roles == "expert") {
                    const filteredOrders = rawData.filter(order => order.expertId == userId);
                    setOrders(filteredOrders);
                } else {
                    setOrders(rawData);
                }
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    }


    const handleButtonClick = () => {
        if (openDatePicker) {
            setOpenDatePicker(false);
        } else {
            setOpenDatePicker(true);
        }
    }

    const handleEndDateChange = (date) => {
        //const { name, value } = event.target;
        console.log(date);
        setEndDate(date);
        setOpenDatePicker(false);


    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value)
    }


    const [openWarn, setOpenWarn] = React.useState(false);
    const [deleteId, setDeleteId] = useState("");

    const handleClickOpenWarn = (id) => {
        setOpenWarn(true);
        setDeleteId(id);
    };

    const handleCloseWarn = () => {
        setOpenWarn(false);
    };

    const handleDeleteOrder = () => {
        var requestOptions = {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        fetch(FRONTEND_API + "deleteOrder/".concat(deleteId), requestOptions)
            .then((res) => res.json())
            .then((data) => {
                fetchDataForSubject(currentStatus);
                setOpenWarn(false);
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    }
    const [page, setPage] = useState(0);
    const itemsPerPage = 6;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleFabClick = () => {
        // Navigate to the /addtask route
        navigate('/addtask');
    };
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const serachedOrders = orders.filter((order) =>
        order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isSingleRow = orders.length === 1;
    return (
        <div>
            <Box sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                marginBottom: 2,
                marginTop: 4,
                marginRight: 2
            }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Box>
            <Box sx={{ marginTop: 2, marginBottom: 10 }}>
                {roles != "expert" && roles != 'lead' && roles != 'otm' && (
                    <Box sx={{
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        margin: '25px',
                        zIndex: 1
                    }}>
                        <Fab color="secondary" aria-label="add" onClick={handleFabClick} >
                            <AddIcon />
                        </Fab>
                    </Box>
                )}

                {orders && orders[0] && orders[0].Error ? (
                    <Box sx={{
                        width: "100vh",
                        height: "100vh",
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
                                marginRight: 2,
                            }}
                                aria-label="customized table" >
                                <TablePagination
                                    className='table-page'
                                    rowsPerPageOptions={[itemsPerPage]}
                                    component="div"
                                    count={orders.length}
                                    rowsPerPage={itemsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    labelRowsPerPage="Orders per page:"
                                    labelDisplayedRows={({ from, to, count }) => `Showing ${from} to ${to} Order of ${count} Order(s)`}
                                />
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Order ID</StyledTableCell>
                                            <StyledTableCell>Subject</StyledTableCell>
                                            <StyledTableCell >Expert</StyledTableCell>
                                            <StyledTableCell >Deadline</StyledTableCell>
                                            <StyledTableCell >Order Status</StyledTableCell>
                                            <StyledTableCell >Operations</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>

                                    <TableBody>
                                        {console.log(orders)}
                                        {
                                            serachedOrders.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((orderData) => (

                                                <StyledTableRow key={orderData.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                    <StyledTableCell component="th" scope="row">
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            {orderData.id}
                                                            <div role='button' style={{ marginLeft: '4px' }}>
                                                                <InfoSharpIcon color='secondary' fontSize='small' />
                                                            </div>
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell>{orderData.subject} </StyledTableCell>
                                                    <StyledTableCell>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            {orderData.expert_id == "" ? (
                                                                <span style={{ marginRight: '5px' }}>
                                                                    Unassigned
                                                                </span>
                                                            ) : (
                                                                <span style={{ marginRight: '5px' }}>

                                                                    {orderData.expert_id}

                                                                </span>
                                                            )

                                                            }

                                                            <div role='button' onClick={() => handleModalUpdate(orderData.id, orderData.order_status)}>
                                                                <UpdateSharpIcon />
                                                            </div>
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell>{handleDate(orderData.order_end_date)}</StyledTableCell>
                                                    <StyledTableCell>{orderData.order_status}</StyledTableCell>
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
                                                            <div className="container-in">
                                                                <div className="container-icon" role='button' onClick={() => handleModalEdit(orderData.id)}>
                                                                    <DriveFileRenameOutlineOutlinedIcon fontSize='small' />
                                                                    <div className="text">Edit</div>
                                                                </div>
                                                                <div className="container-icon" role='button' onClick={() => handleClickOpenWarn(orderData.id)} >
                                                                    <DeleteForeverOutlinedIcon fontSize='small' />
                                                                    <div className="text">Delete</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                )}

            </Box>


            <BottomNavigation
                showLabels={true}
                value={bottomNavSub} //subject
                onChange={(event, newValue) => {
                    setBottomNavSub(newValue);
                    fetchDataForSubject(newValue);
                }}
                sx={{
                    position: 'fixed', bottom: 0, marginBottom: 2,
                    display: 'inline-flex',
                    width: '100%',
                    left: 0, // Center the navigation horizontally
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                }}>

                <StyledBottomNavigationAction
                    label="New Order"
                    onClick={() => setCurrentStatus('New Order')}
                    value="new order"


                />
                <StyledBottomNavigationAction
                    label="Assigned"
                    onClick={() => setCurrentStatus('Assigned')}
                    value="assigned"


                />
                <StyledBottomNavigationAction
                    label="QC"
                    onClick={() => setCurrentStatus('QC')}
                    value="qc"


                />
                <StyledBottomNavigationAction
                    label="Rework"
                    onClick={() => setCurrentStatus('Rework')}
                    value="rework"


                />
                <StyledBottomNavigationAction
                    label="Completed"
                    onClick={() => setCurrentStatus('Completed')}
                    value="pass"


                />
                <StyledBottomNavigationAction
                    label="Failed"
                    onClick={() => setCurrentStatus('Failed')}
                    value="fail"



                />

            </BottomNavigation>

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
                                    <MenuItem value={'pass'}>Completed</MenuItem>
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

                                            <MenuItem value={data.id}>{data.firstname}</MenuItem>

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

                                                <MenuItem value={data.id}>{data.firstname}</MenuItem>

                                            ))}
                                        </Select>
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

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{
                                marginTop: 3,
                                m: 1
                            }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Subject</FormLabel>
                                <TextField id="outlined-basic"
                                    value={subject}
                                    onChange={handleSubjectChange}
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl sx={{ m: 1 }} fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">Task Deadline</FormLabel>
                                <ButtonContainer

                                    role="button"
                                    onClick={handleButtonClick}
                                    size='small'
                                    ref={buttonRef}
                                >
                                    <span style={{ marginLeft: '10px' }}>

                                        {endDate.format('YYYY-MM-DD')}

                                    </span>
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
                                            backgroundColor: '#fff', // Set a background color for the calendar container
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateCalendar
                                                value={endDate}

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

            <Dialog
                open={openWarn}
                onClose={handleCloseWarn}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this order?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After selecting this step this order will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseWarn}>Close</Button>
                    <Button onClick={handleDeleteOrder} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AssignTaskConsole