import React from 'react'
import { Typography, TextField, Grid, Autocomplete, TablePagination } from '@mui/material';
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
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Container } from 'react-bootstrap';

function VendorOrderHistory() {
 
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

    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);

    const [showDateRangePicker, setShowDateRangePicker] = useState(false);

    const handleButtonClick = () => {
        setShowDateRangePicker(!showDateRangePicker);
        if(showDateRangePicker){
            fetchClientsData();
        }
    };

    const handleDateRangeChange = (ranges) => {
        setDateRange([ranges.selection]);
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

    // Extract the start date and end date from the state
  
    const fetchClientsData =  () => {

        var formdata = new FormData();
        //const startDate = dateRange[0].startDate;
        //const endDate = dateRange[0].endDate;
        const startDate = dateRange[0].startDate.toLocaleDateString('en-US');
        const endDate = dateRange[0].endDate.toLocaleDateString('en-US');

        formdata.append("start_date", startDate);
        formdata.append("end_date", endDate)
        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
            'Authorization' : 'Bearer ' + token
            }
        
        };

        fetch(FRONTEND_API + "getVendorOrderHistory/".concat(params.clientId), requestOptions)
            .then((response) =>  { 
                if(response.status == 200){
                return response.json();
                }
            })
            .then((result) => {
            console.log(result);
            setClient(result);
            })
            .catch((error) => {
            console.log(error)
            });
        
    };

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const rawData = await fetchClientsData();
    //     if (rawData) {
    //       console.log("raw ", rawData);
    //       setClient(rawData);
    //     }
    //   };
    //   fetchData();
    // }, [setClient]);

  
    const viewOrdersInvoice = (userId) => { 
        console.log("Tutor ID", userId);
        navigate(`/client-invoice/${userId}`);
    };
   
    return (
      <Container>
         <Typography variant='h1' sx={{
          marginLeft: 2,
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          }}>
            Vendor Order History
          </Typography>
         

         <Button variant='contained' 
            onClick={handleButtonClick}>Select Date</Button>
            <br></br>
            {showDateRangePicker && (
                <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                />
            )}
     

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
                        <StyledTableCell>{handleBudget(user.order_budget, user.currency)} </StyledTableCell>
                        <StyledTableCell>{user.task}</StyledTableCell>
                        <StyledTableCell>{handleBudget (user.amount_paid, user.currency)}</StyledTableCell>
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
    </Container>
    )
}

export default VendorOrderHistory   