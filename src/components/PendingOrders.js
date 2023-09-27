import React from 'react'
import { FRONTEND_API } from "./urls";
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Link} from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

function PendingOrders() {
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

    const nullStatusOrders = orders.filter((order) => order.order_status === 'new order');
    console.log(nullStatusOrders)
    const numberOfNullStatusOrders = nullStatusOrders.length;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h7" sx={{ color: "#343F71", fontWeight: "bold" }}>
                Pending Orders
            </Typography>
            <Typography component="p" variant="h4" sx={{ mt: 7, color: 'primary' }}>
                <AssignmentLateIcon fontSize="large" color="customRedColor" sx={{marginRight: '5px'}} />
                {numberOfNullStatusOrders}
            </Typography>
            <Link color="primary" href="#" sx={{ mt: 'auto' }}>
                View orders
            </Link>
        </Box>
    )
}

export default PendingOrders