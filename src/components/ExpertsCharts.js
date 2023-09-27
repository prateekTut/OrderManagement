import { Box, Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react'
import { FRONTEND_API } from "./urls";
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ExpertsCharts() {

    const [employeeDetails, setEmployeeDetails] = useState([]);

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const theme = useTheme();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            fetch(FRONTEND_API + "getEmployeeAttendance/".concat(userId), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'method': 'GET'
                }
            })
                .then((res) => res.json())
                .then((rawData) => {
                    console.log(rawData)
                    setEmployeeDetails(rawData);
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        };
        fetchEmployeeDetails();
    }, []);

    /*     const data = employeeDetails.map((employee) => ({
            employee[date],
            orders: orderCounts[month],
        })); */

    return (
        <Box>
            <Typography variant="h7" sx={{ mt: 2, color: "#343F71", fontWeight: "bold", textAlign: "center" }}>
                Your Attendance History
            </Typography>

            <ResponsiveContainer height={200}>
                <BarChart
                    data={employeeDetails}
                   
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="working_hours" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default ExpertsCharts;