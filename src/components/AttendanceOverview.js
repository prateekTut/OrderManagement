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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { FRONTEND_API } from "./urls";

function AttendanceOverview() {
  
    const [employees, setEmployees] = useState([]);
  
  const token = localStorage.getItem("token")
  const roles = localStorage.getItem("roles")
  
  const [open, setOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');


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

  const fetchExpertsData = async () => {
    try {
      

      var requestOptions = {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token
        }

      };
      const response = await fetch(FRONTEND_API + "getAttendance", requestOptions);
      const rawData = await response.json();
      console.log(rawData)
      return rawData;
    }
    catch (rejected) {
      console.log(rejected);
      return null
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchExpertsData();
      if (rawData) {
        console.log("raw ", rawData);
        setEmployees(rawData);
      }
    };
    fetchData();
  }, [setEmployees]);


  const handleUpdate = () => {
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredExperts = employees.filter((client) =>
    client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div>
      <div class='one'>
        <h1>Employee Attendance</h1>
      </div>

      <Box sx={{
          display:"flex",
          justifyContent:"end",
          alignItems:"end",
          marginBottom: 2,
          marginTop: 2,
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

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}>


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
                <StyledTableCell >Date</StyledTableCell>
                <StyledTableCell >Start Time</StyledTableCell>
                <StyledTableCell >End Time</StyledTableCell>
                <StyledTableCell >Status</StyledTableCell>
                <StyledTableCell >Working Hours</StyledTableCell>
                {/*  <StyledTableCell >Delete</StyledTableCell> */}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {(
                filteredExperts.map((user) => (

                  <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">{user.first_name + " " + user.last_name}</StyledTableCell>
                    <StyledTableCell>{user.email} </StyledTableCell>
                    <StyledTableCell>{user.date}</StyledTableCell>
                    <StyledTableCell>{user.start_time}</StyledTableCell>
                    <StyledTableCell>{user.end_time}</StyledTableCell>
                    <StyledTableCell>
                            {user.status}
                           </StyledTableCell>
                    {/* <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            onClick={() => tutorsinvoice(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoice
                          </Button>
                        </StyledTableCell> */}
                            <StyledTableCell>
                            {user.working_hours}
                           </StyledTableCell>
                   
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

    </div>
  )
}

export default AttendanceOverview