import React from 'react'
import { Typography, TextField, Container, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
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
import { useNavigate } from "react-router-dom";
import { FRONTEND_API } from "./urls";
import AddIcon from '@mui/icons-material/Add';


function ExpertsConsole() {
  const [expertUsers, setExpertUsers] = useState([]);
  const token = localStorage.getItem("token")
  const roles = localStorage.getItem("roles")
  const [open, setOpen] = React.useState(false);
  const [expertUsersId, setExpertUsersId] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [userType, setUserType] = useState('');

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

  const handleUserUpdate = (expertId) => {
    //setOpen(true);
    //setExpertUsersId(id);
    navigate(`/updateExpert/${expertId}`)
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };


  // const tutorsinvoice = (userId) => {
  //   console.log("Tutor ID", userId);
  //   navigate(`/tutors-invoice/${userId}`);
  // };
  const handleUserTypeChange = (event) => {
    //setSelectedRadio(event.target.value);
    console.log(event.target.value);
    setUserType(event.target.value);
    //fetchInitial(event.target.value);
    fetchExpertsData(event.target.value);
  };

  const fetchExpertsData = (type) => {
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
        setExpertUsers(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  /*   useEffect(() => {
      const fetchData = async () => {
        const rawData = await fetchExpertsData();
        if (rawData) {
          console.log("raw ", rawData);
          setExpertUsers(rawData);
        }
      };
      fetchData();
    }, [setExpertUsers]); */


  const handleUpdate = () => {

  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredExperts = expertUsers.filter((client) =>
    client.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moveToRegister = () =>{
    navigate('/register');
  }

  return (

    <Box>
      <Typography variant='h1' sx={{
        marginLeft: 2,
        paddingTop: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        Experts
      </Typography>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
            flexDirection: "column",
          
            marginRight: 2,
          }}
        >
          <Button
           startIcon={<AddIcon />}
           variant='contained'
           onClick={moveToRegister}>
            Add Expert
          </Button>
        </Box>
        <FormControl fullWidth sx={{ marginTop: 3 }}>

          <FormLabel id="demo-row-radio-buttons-group-label">Select Expert Type</FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <FormControlLabel value="permanent" control={<Radio />} label="Full Time" />
            <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
          </RadioGroup>
        </FormControl>


        {filteredExperts != '' && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
                flexDirection: "column",
                marginBottom: 2,
                marginRight: 2,
              }}
            >


              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
              />


            </Box>
            <TableContainer component={Paper} sx={{
              marginBottom: 6,
              marginRight: 2
            }}
              aria-label="customized table" >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell >Contact</StyledTableCell>
                    <StyledTableCell >DOB</StyledTableCell>
                    <StyledTableCell >Address</StyledTableCell>
                    {/* <StyledTableCell >Invoice</StyledTableCell> */}
                    <StyledTableCell >Update</StyledTableCell>
                    <StyledTableCell >Designation</StyledTableCell>
                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {(
                    filteredExperts.map((user) => (

                      <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{user.firstname + " " + user.lastname}</StyledTableCell>
                        <StyledTableCell>{user.email} </StyledTableCell>
                        <StyledTableCell>{user.contact}</StyledTableCell>
                        <StyledTableCell>{user.DOB}</StyledTableCell>
                        <StyledTableCell>{user.address}</StyledTableCell>
                        <StyledTableCell>{user.designation}</StyledTableCell>
                        {/* <StyledTableCell>
                             <Button variant="contained" type='submit' color="success" 
                               onClick={() => tutorsinvoice(user.id)}
                               size="small" 
                               sx={{marginRight: 2}}>
                               Invoice
                             </Button>
                           </StyledTableCell> */}
                        {roles != "hr" && (
                          <StyledTableCell>
                            <Button variant="contained" type='submit' color="success"
                              onClick={() => handleUserUpdate(user.id)}
                              size="small"
                              sx={{ marginRight: 2 }}>
                              Update
                            </Button>
                          </StyledTableCell>
                        )}

                        {/* <StyledTableCell>
                             <Button variant="contained" type='submit' color="error" 
                               onClick={() => deleteUser(user.id)}
                               size="small" 
                               sx={{marginRight: 2}}>
                               Delete
                             </Button>
                           </StyledTableCell> */}
                      </StyledTableRow>
                    )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}


      </Container>
    </Box>

  )
}

export default ExpertsConsole