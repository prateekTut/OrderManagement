import React from 'react'
import { Typography, Container } from '@mui/material';
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


import { FRONTEND_API } from "./urls";
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
    try {
      var formdata = new FormData();
      formdata.append("user", "student");
        const response = await fetch(FRONTEND_API + "getAllInvoices", {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          body: formdata
        });
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
      const rawData = await fetchClientsData();
      if (rawData) {
        console.log("raw ", rawData);
        setClient(rawData);
      }
    };
    fetchData();
  }, [setClient]);


  const viewOrdersInvoice = (invoiceId) => {
    console.log("Invoice ID", invoiceId);
    navigate(`/generated-invoice/${invoiceId}`);
  };

  const handleBudget = (budget, currency) => {
    if(budget == null){
      budget = 0;
    }
    if (currency == 'GBP') {
      return "£" + budget
    } else if (currency == 'USD') {
      return "$" + budget
    } else {
      return "₹" + budget
    }
  }

  return (
    <Container>
       <Typography variant='h1' sx={{
          marginLeft: 2,
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          }}>
            Student's Invoices
          </Typography>


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
                <StyledTableCell>Invoice ID</StyledTableCell>
                <StyledTableCell>Invoice Number</StyledTableCell>
                <StyledTableCell >Invoice Date</StyledTableCell>
                <StyledTableCell >Due Date</StyledTableCell>
                <StyledTableCell >View Invoice</StyledTableCell>

              </StyledTableRow>
            </TableHead>

            <TableBody>
              {(
                client.map((user) => (

                  <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">{user.id}</StyledTableCell>
                    <StyledTableCell>{user.invoice_number} </StyledTableCell>
                    <StyledTableCell>{user.invoice_date}</StyledTableCell>
                    <StyledTableCell>{user.due_date}</StyledTableCell>
                      <StyledTableCell>
                      <Button variant="contained" type='submit' color="success"

                        onClick={() => viewOrdersInvoice(user.invoice_number)}
                        size="small"
                        sx={{ marginRight: 2 }}>
                        View Invoices
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
    </Container>
  )
}

export default StudentOrderHistory   