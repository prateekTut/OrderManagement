import React from 'react'
import { FormControl, MenuItem, InputLabel, BottomNavigation, BottomNavigationAction, TextField, Grid, Autocomplete, TablePagination } from '@mui/material';
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
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import './css/style.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Viewbudget from './Viewbudget';
import { FRONTEND_API } from "./urls";
import { Flex } from 'reflexbox';

function ClientStudentConsole() {
    const [client, setClient] = useState([]);
    const token = localStorage.getItem("token")
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

    const viewBudgetData = (userId) => {
      console.log("student ID", userId);
      navigate(`/viewbudget/${userId}`);
    };
    
    const viewInvoiceData = (userId) => {
      console.log("student ID", userId);
      navigate(`/student-invoice/${userId}`);
    };
    
    const fetchClientsData = async () => {
      try{
        const response = await fetch(FRONTEND_API + "getstudentclientdata", {
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        });
        const rawData = await response.json();
        console.log(rawData)
        return rawData;
      }
      catch(rejected)  {
        console.log(rejected);
        return null
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        const rawData = await fetchClientsData();
        if (rawData) {
          console.log("raw ", rawData);
          setClient(rawData);
        }
      };
      fetchData();
    }, [setClient]);

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const filteredClients = client.filter((client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.university.toLowerCase().includes(searchQuery.toLowerCase())
      // ... add more fields to search
    );

    return (
      <div>
      <div class='one'>
         <h1>Student Clients </h1>
        </div>
        <Flex justifyContent="flex-start">
          <Link to='/addStudent'>
            <Button variant="contained" type='submit' color="success"          
              size="small" >
              Add Student
            </Button>
          </Link>
          <Link to='/Budget'>
            <Button variant="contained" type='submit' color="success"          
              size="small" 
              sx={{marginLeft: 2}}>
              Add Budget
            </Button>
          </Link>
        </Flex>
        <Flex justifyContent="flex-end" sx={{ marginBottom: 2, marginRight: 3, marginBottom: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Flex>

      <Box sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          
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
                          <StyledTableCell >University</StyledTableCell>
                          <StyledTableCell >Budget</StyledTableCell>
                          <StyledTableCell >Invoice</StyledTableCell>
                          {/* <StyledTableCell >Update</StyledTableCell> */}
                          {/* <StyledTableCell >Delete</StyledTableCell> */}
                      </StyledTableRow>
                  </TableHead>
                  
                  <TableBody>
                  {(
                    filteredClients.map((user) => (

                      <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
                        <StyledTableCell>{user.email} </StyledTableCell>
                        <StyledTableCell>{user.contact}</StyledTableCell>
                        <StyledTableCell>{user.university}</StyledTableCell>
                        <StyledTableCell>
                            <Button variant="contained" type='submit' color="success" 
                                onClick={() => viewBudgetData(user.id)}
                                disabled={!user.budget}
                                size="small" 
                                sx={{marginRight: 2}}>
                                Budget
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            disabled={!user.invoice}
                            onClick={() => viewInvoiceData(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoice
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                      )))}
                  </TableBody>
              </Table>

              {/* <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              /> */}
          </TableContainer>
      </Box>

       {/*  <div>
          <Dialog
            open={open}
            onClose={handleCloseUpdate}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Update Expert Details."}
                </DialogTitle>
                  <DialogContent sx={{
                      marginTop:2
                  }}>
                    <FormControl fullWidth sx={{
                        marginTop:2
                    }}>
                    <InputLabel id="demo-simple-select-label">Update Expert</InputLabel>
                    
                    </FormControl>
                  </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseUpdate}>Close</Button>
                  <Button onClick={handleUpdate} autoFocus>
                      Update
                  </Button>
                </DialogActions>
            </Dialog>
          </div> */}
        </div>
    )
}

export default ClientStudentConsole