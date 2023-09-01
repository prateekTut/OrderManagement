import React from 'react'
import { FormControl, DialogContentText, TextField, Grid, Autocomplete, TablePagination } from '@mui/material';
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
import { useParams } from "react-router-dom";

function StudentOrderHistory() {
 
    let params = useParams();
    console.log(params, params.clientId);

    const [client, setClient] = useState([]);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

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

   

    const fetchClientsData = async () => {
      try{
        const response = await fetch(FRONTEND_API + "getStudentOrderHistory/".concat(params.clientId), {
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

  
    const viewOrdersInvoice = (userId) => { 
        console.log("Tutor ID", userId);
        navigate(`/student-invoice/${userId}`);
    };
   
    return (
      <div>
        <div class='one'>
         <h1>Student Order History </h1>
        </div>
        

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
                          <StyledTableCell>Order ID</StyledTableCell>
                          <StyledTableCell>Order Budget</StyledTableCell>
                          <StyledTableCell >Task</StyledTableCell>
                          <StyledTableCell >Amount Paid</StyledTableCell>
                          <StyledTableCell >Invoice</StyledTableCell>
                          {/* <StyledTableCell >University</StyledTableCell>
                          {/* <StyledTableCell >Budget</StyledTableCell> */}
                          {/* <StyledTableCell >Order History</StyledTableCell>
                          <StyledTableCell >Update</StyledTableCell> 
                          <StyledTableCell >Delete</StyledTableCell>  */}
                          
                      </StyledTableRow>
                  </TableHead>
                  
                  <TableBody>
                  {(
                    client.map((user) => (

                      <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{user.id}</StyledTableCell>
                        <StyledTableCell>{user.order_budget} </StyledTableCell>
                        <StyledTableCell>{user.task}</StyledTableCell>
                        <StyledTableCell>{user.amount_paid}</StyledTableCell>
                        <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                          
                            onClick={() => viewOrdersInvoice(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoices
                          </Button>
                        </StyledTableCell>
                        {/* <StyledTableCell>{user.university}</StyledTableCell>
                        <StyledTableCell>
                          
                        </StyledTableCell>

                        <StyledTableCell>
                         
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

export default StudentOrderHistory   