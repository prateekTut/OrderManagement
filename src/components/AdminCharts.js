import { Box, Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { FRONTEND_API } from "./urls";
import { useTheme } from '@mui/material/styles';

function AdminCharts() {

    const [orders, setOrders] = useState([]);
    
    const token = localStorage.getItem("token")
    
    const theme = useTheme();

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

    // Create a function to count orders per month
    const countOrdersPerMonth = () => {
        const orderCounts = {};
        
        orders.forEach(order => {
            const monthYear = order.task_date.slice(0, 7); // Extract YYYY-MM format
            if (orderCounts[monthYear]) {
                orderCounts[monthYear] += 1;
            } else {
                orderCounts[monthYear] = 1;
            }
        });
        
        return orderCounts;
    };
    const orderCounts = countOrdersPerMonth();
   
    const data = Object.keys(orderCounts).map((month) => ({
        month,
        orders: orderCounts[month],
    }));
   

    return (
        <Box>
            <Typography variant="h7" sx={{mt: 2, color: "#343F71", fontWeight: "bold", textAlign: "center"}}>
                Most Orders
            </Typography>
           
            <ResponsiveContainer width="100%" height= {200}>
                <LineChart data={data}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}>
                <XAxis dataKey="month" 
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                />
                  
                <YAxis>
                    <Label
                    value="Number of Orders"
                    angle={270}
                    position="left"
                    style={{
                        textAnchor: 'middle',
                        fill: theme.palette.text.primary,
                        ...theme.typography.body1,
                      }}
                    offset={-8}
                    />
                </YAxis>
                <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default AdminCharts;