import React from 'react'
import { Container, FormControl, TextField, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { FRONTEND_API } from "./urls";

function AddTaskNew() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
 
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Assingntask";


    const [user, setUser] = React.useState('');
    const [userClient, setUserClient] = React.useState('');
    const [otmUser, setOtmUser] = React.useState('');
    const [expert, setexpert] = useState([]);
    const [client, setclient] = useState([]);
    const [otmMember, setOtmMember] = useState([]);

    const [Vendor_budget, setVendor_budget] = useState("");
    const [Status, setStatus] = useState("");
    const [subject, setSubject] = useState("");
    const [Start_date, setStart_date] = useState("");
    const [End_date, setEnd_date] = useState("");
    const [Expert_startDate, setExpert_startDate] = useState("");
    const [Expert_endDate, setExpert_endDate] = useState("");
    const [Qc_Expert_name, setQc_Expert_name] = useState("");
    const [Description, setDescription] = useState("");
    const [Word_count, setWord_count] = useState("");
    const [Expert_price, setExpert_price] = useState("");
  

    const handleChange = (event) => {
        setUser(event.target.value);
        console.log(event.target.value);
        
    };

    const handleChangeQc = (event) => {
        setQc_Expert_name(event.target.value);
        console.log(event.target.value);
        
    };
    
    const handleChangeOtm = (event) => {
        setOtmUser(event.target.value);
    };
    
    const handleChangeStatus = (event) => {
        setStatus(event.target.value); 
        console.log(event.target.value);
        
    };

    const handleChangeSubject = (event) => {
        setSubject(event.target.value); 
        console.log(event.target.value);
        
    };
    
    

    const handleChangeClient = (event) => {
        setUserClient(event.target.value);
        console.log(event.target.value);
    };
 
    useEffect(() => {
        const fetchInitial = async () =>{
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
                });
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
        fetchInitial();
    }, []);

    const uploadData = () => {
        var formdata = new FormData();
        formdata.append("Task_Subject", subject);
        formdata.append("Vendor_budget", Vendor_budget);
        formdata.append("Expert_firstname", user);
        formdata.append("Client_name", userClient);
        formdata.append("Status", Status);
        formdata.append("Start_date", Start_date);
        formdata.append("End_date", End_date);
        formdata.append("Expert_startDate", Expert_startDate);
        formdata.append("Expert_endDate", Expert_endDate);
        formdata.append("Qc_Expert_name", Qc_Expert_name);
        formdata.append("Otm_username", otmUser);
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
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                //navigate('/Assingntask');
            })
            .catch((error) => console.log(error));
    };

  return (
    
    <Container maxWidth="sm" sx={{
        marginTop: 10,
        marginBottom: 10
    }}>
        <h1>Add Task </h1>
        <form autoComplete="off" onSubmit={uploadData}>
            <FormControl fullWidth sx={{m:1}}>
              {/*   <TextField id="outlined-basic"
                  value={Task_Subject}
                        onInput={(e) => {
                        console.log(e.target.value);
                        setTask_Subject(e.target.value);
                    }}
                  label="Subject" 
                  variant="outlined"  /> */}

                  <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subject}
                        label="Subject"
                        onChange={handleChangeSubject}
                        
                    >
                        <MenuItem value={'mathematics'}>Mathematics</MenuItem>
                        <MenuItem value={'science'}>Science</MenuItem>
                        <MenuItem value={'english'}>English</MenuItem>
                        <MenuItem value={'data science'}>Data Science</MenuItem>
                    </Select>

            </FormControl>
            <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                <TextField id="outlined-basic"  
                    value={Vendor_budget}
                        onInput={(e) => {
                        console.log(e.target.value);
                        setVendor_budget(e.target.value);
                    }}
                    label="Budget" variant="outlined" />
            </FormControl>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* <Grid item xs={6}>
                    <FormControl fullWidth sx={{
                        marginTop: 3,
                        m:1
                    }}>
                    <InputLabel id="demo-simple-select-label">Expert</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="Experts"
                        onChange={handleChange}
                    >
                    {expert.map((data) => ( 
                        
                        <MenuItem value={data.Expert_firstname}>{data.Expert_firstname}</MenuItem>
                        
                    ))}
                    </Select>
                    </FormControl>
                </Grid> */}
               {/*  <Grid item xs={6}>
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
                        onChange={handleChangeClient}
                    >
                    {client.map((data) => ( 
                        
                        <MenuItem value={data.Client_name}>{data.Client_name}</MenuItem>
                        
                    ))}
                    </Select>
                    </FormControl>
                </Grid> */}
            </Grid>
            <FormControl fullWidth sx={{m:1, marginTop: 3}}>
               {/*  <TextField id="outlined-basic" 
                    value={Status}
                        onInput={(e) => {
                        console.log(e.target.value);
                        setStatus(e.target.value);
                    }} 
                    label="Status" 
                    variant="outlined" /> */}
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Status}
                        label="Status"
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value={'new order'}>New Order</MenuItem>
                        {/* <MenuItem value={'assigned'}>Assigned</MenuItem>
                        <MenuItem value={'qc'}>QC</MenuItem>
                        <MenuItem value={'pass'}>Pass</MenuItem>
                        <MenuItem value={'fail'}>Failed</MenuItem>
                        <MenuItem value={'rework'}>Rework</MenuItem> */}
                    </Select>
            </FormControl>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                    <TextField id="outlined-basic" 
                        type='date' 
                        value={Start_date}
                            onInput={(e) => {
                            console.log(e.target.value);
                            setStart_date(e.target.value);
                        }}
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
                            onInput={(e) => {
                            console.log(e.target.value);
                            setEnd_date(e.target.value);
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Task End Date"
                         variant="outlined" />
                </FormControl>
                </Grid>
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
            </Grid>
        
        
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
               {/*  <Grid item xs={6}>
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
                </Grid> */}
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
                        onChange={handleChangeClient}
                    >
                    {client.map((data) => ( 
                        
                        <MenuItem value={data.Client_name}>{data.Client_name}</MenuItem>
                        
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
                            onInput={(e) => {
                            console.log(e.target.value);
                            setWord_count(e.target.value);
                        }}
                        label="Word Count" variant="outlined" />
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{m:1, marginTop: 3}}>
                    <TextField id="outlined-basic"  
                        value={Expert_price}
                            onInput={(e) => {
                            console.log(e.target.value);
                            setExpert_price(e.target.value);
                        }} label="Expert Price" variant="outlined" />
                </FormControl>
                </Grid>
            </Grid>
            <Button variant="outlined" type='submit' sx={{marginTop:3}}>Submit</Button>
        </form>
    </Container>
  )
}

export default AddTaskNew