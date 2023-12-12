import React from 'react'
import { Typography, TextField, Container } from '@mui/material';
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FRONTEND_API } from "./urls";


function ClientStudentConsole() {
    const [client, setClient] = useState([]);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);
    const [idToUpdate, setIdToUpdate] = useState('');
    const [phone, setPhone] = useState("");
    const [University, setUniversity] = useState("");

    const [clientPhoneValid, setClientPhoneValid] = useState(null);

    const [clientUnivValid, setClientUnivValid] = useState(null);
    
    const [dialogOpen, setDialogOpen] = useState(false);


    const validatePhone = (value) =>  !isNaN(value) && value.length == 10;
    const validateUniv = (value) => value.length >= 4;

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

    const viewOrdersHistory = (clientId) => {
      console.log("student ID", clientId);
      navigate(`/client-invoice/${clientId}`);
    };
    
    
    const updateProfile = (clientId) => {
      navigate(`/editClients/${clientId}`);
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
      <Container>
      <Typography variant='h1' sx={{
          marginLeft: 2,
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          }}>
            Students
          </Typography>
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
                          {/* <StyledTableCell >Budget</StyledTableCell> */}
                          <StyledTableCell >Invoices</StyledTableCell>
                          <StyledTableCell >Update</StyledTableCell>
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
                            disabled={!user.invoice}
                            onClick={() => viewOrdersHistory(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoices
                          </Button>
                        </StyledTableCell>

                        <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 

                            onClick={() => updateProfile(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Update
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                      )))}
                  </TableBody>
              </Table>

              
          </TableContainer>
      </Box>
    </Container>
    )
}

export default ClientStudentConsole   