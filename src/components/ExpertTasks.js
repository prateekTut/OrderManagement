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

function ExpertTasks() {

    const [orders, setOrders] = useState([]);
    
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const fetchOrders = async () => {
            fetch(FRONTEND_API + "getordersdata", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => res.json())
                .then((rawData) => {
                    console.log(rawData , userId)
                    const filteredOrders = rawData.filter(order => order.expert_id == userId);
                    console.log(filteredOrders);
                    setOrders(filteredOrders);
                    
                    
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

    const handleDate = (expertDate) => {
       
        var formattedDate = null
        if(expertDate != null){
            const dateObject = new Date(expertDate);
            formattedDate = dateObject.toDateString();
        }
        return formattedDate;
    }
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
                    <StyledTableCell>Assigned From</StyledTableCell>
                    <StyledTableCell>Last Date</StyledTableCell>
                    <StyledTableCell align="right">Order Status</StyledTableCell>
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
                        <StyledTableCell>{handleDate(row.expert_start_date)}</StyledTableCell>                       
                        <StyledTableCell>{handleDate(row.expert_end_date)}</StyledTableCell>
                        <StyledTableCell align="right">{row.order_status}</StyledTableCell>
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

export default ExpertTasks;