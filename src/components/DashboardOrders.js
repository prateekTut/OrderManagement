import React from 'react'
import { FRONTEND_API } from "./urls";
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#343F71",
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

function DashboardOrders() {

    const [orders, setOrders] = useState([]);
    
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchOrders = async () => {
            fetch(FRONTEND_API + "getordersdata", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => res.json())
                .then((rawData) => {
                    console.log(rawData)
                    setOrders(rawData);
                    
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        };
        fetchOrders();
    }, []);

 /*    const formatDate = (dateString) => {
        const formattedDate = format(new Date(dateString), 'MMMM dd, yyyy');
        return formattedDate;
    } */
   return (
    <Box>
        <Typography variant="h7" sx={{mt: 2, color: "#343F71", fontWeight: "bold", textAlign: "center"}}>
            Recent Orders
        </Typography>
        <Table size="small">
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Task</StyledTableCell>
                    <StyledTableCell>Assigned To</StyledTableCell>
                    <StyledTableCell>Order Status</StyledTableCell>
                    <StyledTableCell align="right">Order Price</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {orders
                 .sort((a, b) => new Date(b.task_date) - new Date(a.task_date)) // Sort by date in descending order
                 .slice(0, 5) // Get the first 5 elements
                .map((row) => (
                    <StyledTableRow key={row.id}>
                        <StyledTableCell>{row.task_date}</StyledTableCell>
                        <StyledTableCell>{row.subject}</StyledTableCell>
                        <StyledTableCell>{row.expert_id == null ? "Unassigned" : row.expert_id.expert_name}</StyledTableCell>                       
                        <StyledTableCell>{row.order_status}</StyledTableCell>
                        <StyledTableCell align="right">{`$${row.order_price}`}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
        <Link color="primary" href="#"  sx={{ mt: 3 }}>
            See more orders
        </Link>
    </Box> 
   );
}

export default DashboardOrders;