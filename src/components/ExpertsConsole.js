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
import { DialogContentText } from '@mui/material';

import { useNavigate } from "react-router-dom";
import { FRONTEND_API } from "./urls";
import AddIcon from '@mui/icons-material/Add';
import { StyledTableCell, StyledTableRow } from './styles/TableStyles';


function ExpertsConsole() {
  const [expertUsers, setExpertUsers] = useState([]);
  const token = localStorage.getItem("token")
  const roles = localStorage.getItem("roles")
  const [open, setOpen] = React.useState(false);
  const [expertUsersId, setExpertUsersId] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [userType, setUserType] = useState('');
  const [expertType, setExpertType] = useState('');

  const [openWarn, setOpenWarn] = React.useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleUserUpdate = (expertId) => {
    //setOpen(true);
    //setExpertUsersId(id);
    navigate(`/updateExpert/${expertId}`)
  };

  const handleClickOpenWarn = (id) => {
    setOpenWarn(true);
    setDeleteId(id);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const handleUserDelete = () => {
    var requestOptions = {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    fetch(FRONTEND_API + "delete_users/".concat(deleteId), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        fetchExpertsData(expertType);
        handleCloseWarn();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
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
    setExpertType(event.target.value);
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

  const moveToRegister = () => {
    navigate('/register');
  }

  return (

    <Box sx={{ marginRight: 2,}}>
      <Typography variant='h1' sx={{
        marginLeft: 2,
        paddingTop: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        Experts
      </Typography>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
            flexDirection: "column",
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
                    <StyledTableCell >Operations</StyledTableCell>
                
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
                        {roles != "hr" && (
                          <div>
                            <StyledTableCell>
                              <Button variant="contained" type='submit' color="success"
                                onClick={() => handleUserUpdate(user.id)}
                                size="small"
                                sx={{ marginRight: 2 }}>
                                Update
                              </Button>

                              <Button variant="contained" type='submit' color="error"
                                onClick={() => handleClickOpenWarn(user.id)}
                                size="small"
                                sx={{ marginRight: 2 }}>
                                Delete
                              </Button>

                            </StyledTableCell>
                          </div>
                        )}
                      </StyledTableRow>
                    )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <Dialog
          open={openWarn}
          onClose={handleCloseWarn}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this user?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After selecting this step this user will be permanently deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseWarn}>Close</Button>
            <Button onClick={handleUserDelete} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </Box>

  )
}

export default ExpertsConsole