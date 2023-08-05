import React from 'react'
import { FormControl, MenuItem, InputLabel, BottomNavigation, BottomNavigationAction, TextField, Grid } from '@mui/material';
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
import './css/style.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FRONTEND_API } from "./urls";

function AssignTaskConsole() {

    const [subjectValue, setSubjectValue] = React.useState('');
    const [bottomNavSub, setBottomNavSub] = useState('New Order');
    const [subjects, setSubjects] = useState([]);
    const [orders, setOrders] = useState([]);
    const [ordersId, setOrdersId] = useState([]);
    const [ordersIdEdit, setOrdersIdEdit] = useState([]);

    const [currentStatus, setCurrentStatus] = useState('New Order');
    const [prevStatus, setPrevStatus] = useState("");

    const token = localStorage.getItem("token")
    const roles = localStorage.getItem("roles")
    const [Status, setStatus] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    

    const [expert, setexpert] = useState([]);
    const [Expert_startDate, setExpert_startDate] = useState("");
    const [Expert_endDate, setExpert_endDate] = useState("");
    const [Qc_Expert_name, setQc_Expert_name] = useState("");
    const [otmMember, setOtmMember] = useState([]);
    const [otmUser, setOtmUser] = React.useState('');

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

    const handleChangeQc = (event) => {
        setQc_Expert_name(event.target.value);
        console.log(event.target.value);
        
    };
    
    const handleChangeOtm = (event) => {
        setOtmUser(event.target.value);
    };

    const fetchDataForEdit = () =>{
        /* fetch(FRONTEND_API + "getexpert", {
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          })
            .then((res) => res.json())
            .then((data) => {
              // do something with data
              console.log(data);   
              setexpert(data);
            })
            .catch((rejected) => {
              console.log(rejected);
            }); */
       
        fetch(FRONTEND_API + "getotm1", {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
            })
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

    const handleChangeStatus = (event) => {
        setStatus(event.target.value); 
        console.log(event.target.value);
        
    };

    const handleModalUpdate = (id, prevStat) => {
        setOpen(true);
        setOrdersId(id);
        setPrevStatus(prevStat);
    };

    const handleModalEdit = (id) => {
        fetchDataForEdit();
        setOpenEdit(true);
        setOrdersIdEdit(id);
    };

    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleUpdate = () =>{
        var formdata = new FormData();
        console.log("Status in handle update", Status);
        console.log("ID in handle update", ordersId);
        formdata.append("status", Status)
        formdata.append("expert_id", Qc_Expert_name)
        console.log("id ep", Qc_Expert_name);
        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization' : 'Bearer ' + token
            }
          };
        fetch(FRONTEND_API + "updateStatusWithId/".concat(ordersId), requestOptions)
        .then((res) => res.json())
        .then((data) => {
            // do something with data
            console.log("budget DATA", data);
            /* handlestatusShow();
            console.log("budget DATA", data);
            setforstatususers(data); */
            setOrders(data);
            setOpen(false);
            // navigate("/Budgetform");
        })
        .catch((rejected) => {
            console.log(rejected);
        });
    }

    const handleOrderUpdate = () => {

        var formdata = new FormData();
       
        formdata.append("Expert_startDate", Expert_startDate);
        formdata.append("Expert_endDate", Expert_endDate);
        formdata.append("Qc_Expert_name", Qc_Expert_name);
        formdata.append("Otm_username", otmUser);
        
        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization' : 'Bearer ' + token
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


    const handleChange = (event) => {
        setSubjectValue(event.target.value);
        
        fetchDataForSubject(event.target.value, bottomNavSub);
    };

    const fetchDataForSubject = (subject, status) => {
        console.log(subject);
        console.log(status);
        
        var formdata = new FormData();
        formdata.append("subject", subject);
        formdata.append("status", status); //status
        
        var requestOptions = {
          method: "POST",
          body: formdata,
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        };

        fetch(FRONTEND_API + "getOrdersBySubjectAndStatus", requestOptions)
          .then((res) => res.json())
          .then((rawData) => {
            console.log(rawData);
            console.log(currentStatus);
            setOrders(rawData);
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
            'Authorization' : 'Bearer ' + token
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
    const deleteUser = (userId) => {
        console.log("Del", userId);
        fetch(FRONTEND_API + "deleteorders/".concat(userId), {
          method: "DELETE",
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
          .then((res) => res.text())
          .then((data) => {
            console.log(data);
            window.location.reload()
          })
          .catch((rejected) => {
            console.log(rejected);
          })
          .finally(() => {
            fetchData();
          });
      };


    useEffect(() => {
        const fetchInitial = async () =>{
            fetch(FRONTEND_API + "getordersdata", {
            headers: {
                'Authorization' : 'Bearer ' + token
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
        fetch(FRONTEND_API + "getexpert", {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
            })
            .then((res) => res.json())
            .then((data) => {
                // do something with data
                console.log(data);
                setexpert(data);
            })
            .catch((rejected) => {
                console.log(rejected);
        });
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
    <div className='header'>
        <Box>
            {/* Render your order data here based on your API response */console.log(roles)}
            {roles != "expert" && (
                <Box sx={{ marginTop: 10, marginBottom: 3}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Button variant="contained" href="/addtask">Add Task</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{width: 250}} >
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
                    </Grid>
                    
                </Grid>
    
                </Box>
            )
            }
            {orders && orders.Error ? (
                <Box sx={{
                    width:700,
                    height: 250
                }}>
                    <p>No Orders to show</p>
                </Box>
            ) : (
                
                
                <Box sx={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        marginBottom: 5
                        }}>
                    <TableContainer component={Paper} sx={{
                       
                       
                        marginRight: 2
                        }}
                        aria-label="customized table" >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Order ID</StyledTableCell>
                                    <StyledTableCell>Client ID</StyledTableCell>
                                    <StyledTableCell >Expert ID</StyledTableCell>
                                    <StyledTableCell >Start Date</StyledTableCell>
                                    <StyledTableCell >End Date</StyledTableCell>
                                    <StyledTableCell >Expert Start Date</StyledTableCell>
                                    <StyledTableCell >Expert End Date</StyledTableCell>
                                    <StyledTableCell >Budget</StyledTableCell>
                                    <StyledTableCell >Order Status</StyledTableCell>
                                    <StyledTableCell >Word Count</StyledTableCell>
                                    <StyledTableCell >Expert Price</StyledTableCell>
                                    <StyledTableCell >Description</StyledTableCell>
                                    <StyledTableCell >Operations</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            
                            <TableBody>
                            
                            {orders !== null && (
                                orders.map((orderData) => (
                                
                                <StyledTableRow key={orderData.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                   {console.log(orderData.budget)}
                                   
                                    <StyledTableCell component="th" scope="row">{orderData.id}</StyledTableCell>
                                    <StyledTableCell>{orderData.client_id} </StyledTableCell>
                                    <StyledTableCell>{orderData.expert_id}</StyledTableCell>
                                    <StyledTableCell>{orderData.order_start_date}</StyledTableCell>
                                    <StyledTableCell>{orderData.order_end_date}</StyledTableCell>
                                    <StyledTableCell>{orderData.expert_start_date}</StyledTableCell>
                                    <StyledTableCell>{orderData.expert_end_date}</StyledTableCell>
                                    <StyledTableCell>{orderData.budget}</StyledTableCell>
                                    <StyledTableCell>{orderData.order_status}</StyledTableCell>
                                    <StyledTableCell>{orderData.word_count}</StyledTableCell>
                                    <StyledTableCell>{orderData.expert_price}</StyledTableCell>
                                    <StyledTableCell>{orderData.description}</StyledTableCell>
                                    <StyledTableCell>
                                    {roles != "admin" && orderData.id != null && (
                                        <Button variant="contained" type='submit' color="success" 
                                                onClick={() => handleModalUpdate(orderData.id, orderData.order_status)}
                                                size="small" 
                                                sx={{marginRight: 2}}>
                                                Update Status
                                        </Button>
                                        )
                                    }
                                    {roles == "admin" && orderData.id != null && (
                                        <Box sx = {{
                                        marginTop : 5,
                                        marginBottom: 5
                                        }}>
                                    
                                            <Button variant="contained" type='submit' color="success" 
                                                onClick={() => handleModalUpdate(orderData.id, orderData.order_status)}
                                                size="small" 
                                                sx={{marginRight: 2}}>
                                                Update Status
                                            </Button>
                                        
                                            <Button 
                                                onClick={() => handleModalEdit(orderData.id)}
                                                variant="contained" 
                                                color="success" size="small" 
                                                sx={{marginRight: 2, marginTop: 2}}>
                                                Edit
                                            </Button>    
                                            <Button variant='contained' size='small' color='error'  
                                                onClick={() => deleteUser(orderData.id)}  sx={{marginTop: 2}}
                                                >Delete
                                            </Button>
                                        </Box>
                                    )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            )))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )} 
            {orders == null && (
                <Box sx={{
                    width:700,
                    height: 250
                }}>
                    <p>Select Subject First</p>
                </Box>
            )}
          
           
           
           
            {/* Add more details you want to display */}
        </Box>
        
        
        <BottomNavigation
        showLabels = {true}
        value={bottomNavSub} //subject
        onChange={(event, newValue) => {
            setBottomNavSub(newValue);
            fetchDataForSubject(subjectValue, newValue);
            //setOrders(null)
        }}
        sx={{position: 'fixed', bottom: 0, marginBottom: 2, width: '100%', marginLeft: -10}}
        
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
                marginTop:2
            }}>
            <FormControl fullWidth sx={{
                marginTop:2
            }}>
            
            {prevStatus != null && prevStatus != 'new order' && (
      
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Status}
                    label="Status"
                    onChange={handleChangeStatus}>
                        <MenuItem value={'qc'}>QC</MenuItem>
                        <MenuItem value={'pass'}>Pass</MenuItem>
                        <MenuItem value={'fail'}>Failed</MenuItem>
                        <MenuItem value={'rework'}>Rework</MenuItem>
                    </Select>
                </FormControl>
            )}
            {Status != 'pass' && prevStatus != 'new order' && (
                
                <FormControl fullWidth sx={{marginTop: 3}}>
                    <InputLabel >Expert</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Qc_Expert_name}
                            label="Experts"
                            onChange={handleChangeQc}
                            
                        >
                        {expert.map((data) => ( 
                            
                            <MenuItem value={data.id}>{data.Expert_firstname}</MenuItem>
                            
                        ))}
                        </Select>
                </FormControl>
                
            )}
            
            {(Status === 'fail' || Status === 'rework') &&  prevStatus !== 'new order' && (
                <FormControl fullWidth sx={{marginTop: 3}}>
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
               
                    <Grid item xs={6}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Status}
                            label="Status"
                            onChange={handleChangeStatus} >
                            
                            <MenuItem value={'assigned'}>Assigned</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{marginTop: 3}}>
                            <InputLabel >Expert</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Qc_Expert_name}
                                    label="Experts"
                                    onChange={handleChangeQc}
                                    
                                >
                                {expert.map((data) => ( 
                                    
                                    <MenuItem value={data.id}>{data.Expert_firstname}</MenuItem>
                                    
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
                marginTop:2
            }}>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                        <TextField id="outlined-basic" type='date'   
                            value={Expert_startDate}
                                onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_startDate(e.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Expert Start Date"
                            variant="outlined" />
                    </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                        <TextField id="outlined-basic"  type='date' 
                            value={Expert_endDate}
                                onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_endDate(e.target.value);
                            }} 
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
                            m:1
                        }}>
                        <InputLabel id="demo-simple-select-label">Qc Expert</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Qc_Expert_name}
                            label="Experts"
                            onChange={handleChangeQc}
                        >
                        {expert.map((data) => ( 
                            
                            <MenuItem value={data.Expert_firstname}>{data.Expert_firstname}</MenuItem>
                            
                        ))}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{
                            marginTop: 3,
                            m:1
                        }}>
                        <InputLabel id="demo-simple-select-label">Otm Member</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={otmUser}
                            label="Otm Member"
                            onChange={handleChangeOtm}
                        >
                        {otmMember.map((data) => ( 
                            
                            <MenuItem value={data.firstname}>{data.firstname}</MenuItem>
                            
                        ))}
                        </Select>
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

    </div>
  )
}

export default AssignTaskConsole