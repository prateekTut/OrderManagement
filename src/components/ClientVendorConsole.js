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
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import './css/style.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FRONTEND_API } from "./urls";


function ClientVendorConsole() {
    const [client, setClient] = useState([]);
    const token = localStorage.getItem("token")
    const [open, setOpen] = React.useState(false);
    const [clientId, setClientId] = useState([]);
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

    const handleUserUpdate = (id) => {
      navigate(`/editClients/${id}`);
    };
    

    const fetchVendorData = async () => {
      try{
        const response = await fetch(FRONTEND_API + "getvendoreclientdata", {
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
        const rawData = await fetchVendorData();
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
      client.business_name.toLowerCase().includes(searchQuery.toLowerCase())
      // ... add more fields to search
    );

      const VendorOrderHistory = (clientId) =>{
        console.log("student ID", clientId);
        navigate(`/vendor-order-history/${clientId}`);
      }


      const vendoreinvoice = (userId) => {
        console.log("Tutor ID", userId);
        navigate(`/vendor-invoice/${userId}`);
      };

    return (
      <div>
      <div class='one'>
         <h1>Vendor Clients </h1>
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
                          <StyledTableCell >Business</StyledTableCell>
                          <StyledTableCell >Order History</StyledTableCell>
                          {/* <StyledTableCell >Invoice</StyledTableCell> */}
                          <StyledTableCell >Update</StyledTableCell>
                          {/* <StyledTableCell >Delete</StyledTableCell> */}
                      </StyledTableRow>
                  </TableHead>
                  
                  <TableBody>
                  { (
                    filteredClients.map((user) => (

                      <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
                        <StyledTableCell>{user.email} </StyledTableCell>
                        <StyledTableCell>{user.contact}</StyledTableCell>
                        <StyledTableCell>{user.business_name}</StyledTableCell>
                        <StyledTableCell>
                        <Button variant="contained" type='submit' color="success" 
                          onClick={() => VendorOrderHistory(user.id)}
                          disabled={!user.invoice}
                          size="small" 
                          sx={{marginRight: 2}}>
                          Orders
                        </Button>
                        </StyledTableCell>
                        {/* <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            disabled={!user.invoice}
                            onClick={() => vendoreinvoice(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoice
                          </Button>
                        </StyledTableCell> */}
                        <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            onClick={() => handleUserUpdate(user.id)}
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
        </div>
    )
}

export default ClientVendorConsole