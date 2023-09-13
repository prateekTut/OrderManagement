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
import { useNavigate } from "react-router-dom";
import { FRONTEND_API } from "./urls";

function ExpertsConsole() {
  const [expertUsers, setExpertUsers] = useState([]);
  const token = localStorage.getItem("token")
  const [open, setOpen] = React.useState(false);
  const [expertUsersId, setExpertUsersId] = useState([]);
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
      var formdata = new FormData();
      formdata.append("type", "expert");

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization': 'Bearer ' + token
        }

      };
      const response = await fetch(FRONTEND_API + "getUsers", requestOptions);
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
        setExpertUsers(rawData);
      }
    };
    fetchData();
  }, [setExpertUsers]);


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



  return (
    <div>
      <div class='one'>
        <h1>Our Experts</h1>
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
                <StyledTableCell >Contact</StyledTableCell>
                <StyledTableCell >DOB</StyledTableCell>
                <StyledTableCell >Address</StyledTableCell>
                {/* <StyledTableCell >Invoice</StyledTableCell> */}
                <StyledTableCell >Update</StyledTableCell>
                {/*  <StyledTableCell >Delete</StyledTableCell> */}
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
                    {/* <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            onClick={() => tutorsinvoice(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoice
                          </Button>
                        </StyledTableCell> */}
                    <StyledTableCell>
                      <Button variant="contained" type='submit' color="success"
                        onClick={() => handleUserUpdate(user.id)}
                        size="small"
                        sx={{ marginRight: 2 }}>
                        Update
                      </Button>
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

export default ExpertsConsole