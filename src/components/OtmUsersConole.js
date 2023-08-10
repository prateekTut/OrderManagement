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
import { FRONTEND_API } from "./urls";

function OtmUsersConsole() {
    const [otmUsers, setOtmUsers] = useState([]);
    const token = localStorage.getItem("token")
    const [open, setOpen] = React.useState(false);
    const [otmUsersId, setOtmUsersId] = useState([]);

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

    const handleUserUpdate = (id) => {
      setOpen(true);
      setOtmUsersId(id);
    };
    
    const handleCloseUpdate = () => {
      setOpen(false);
    };  


    const fetchOtmUsers = async () => {
      try {
        const response = await fetch(FRONTEND_API + "getotm1", {
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        });
        const rawData = await response.json();
        console.log(rawData)
        return rawData;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        const rawData = await fetchOtmUsers();
        if (rawData) {
          console.log("raw ", rawData);
          setOtmUsers(rawData);
        }
      };
      fetchData();
    }, [setOtmUsers]);

      const deleteUser = (userId) => {
        console.log("Del", userId);
        fetch(FRONTEND_API + "deleteotm/".concat(userId), {
          method: "delete",
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
          .then((res) => res.text())
          .then((data) => {
            console.log(data);
          })
          .catch((rejected) => {
            console.log(rejected);
          })
          .finally(() => {
            //fetchData();
            fetchOtmUsers();
          });
      };

      const handleUpdate = () =>{
        
      }

    return (
      <div>
       <div class='one'>
         <h1>Our Otm Users</h1>
        </div>
      <Box sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
         
          }}>
          <TableContainer component={Paper} sx={{
              marginTop: 2,
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
                          <StyledTableCell >Joining Date</StyledTableCell>
                          {/* <StyledTableCell >Update</StyledTableCell> */}
                          {/* <StyledTableCell >Delete</StyledTableCell> */}
                      </StyledTableRow>
                  </TableHead>
                  
                  <TableBody>
                  {otmUsers !== null && (
                    otmUsers.map((user) => (

                      <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{user.firstname + " " + user.lastname}</StyledTableCell>
                        <StyledTableCell>{user.email} </StyledTableCell>
                        <StyledTableCell>{user.contact}</StyledTableCell>
                        <StyledTableCell>{user.joiningDate}</StyledTableCell>
                        {/* <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            onClick={() => handleUserUpdate(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Update
                          </Button>
                        </StyledTableCell> */}
                       {/*  <StyledTableCell>
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

        <div>
          <Dialog
            open={open}
            onClose={handleCloseUpdate}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Update Otm Details."}
                </DialogTitle>
                  <DialogContent sx={{
                      marginTop:2
                  }}>
                    <FormControl fullWidth sx={{
                        marginTop:2
                    }}>
                    <InputLabel id="demo-simple-select-label">Update Otm</InputLabel>
                    
                    </FormControl>
                  </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseUpdate}>Close</Button>
                  <Button onClick={handleUpdate} autoFocus>
                      Update
                  </Button>
                </DialogActions>
            </Dialog>
          </div>
        </div>
    )
}

export default OtmUsersConsole