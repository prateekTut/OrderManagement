import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { FRONTEND_API } from "./urls";
import { format } from 'date-fns';

function AttendanceTimer() {

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const currentNewDate = new Date();
    const [currentDate, setCurrentDate] = useState()
    const [currentTime, setCurrentTime] = useState()

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    // Function to start the timer
    const startTimer = () => {
        // Extract the date and time components
        // Date in "MM/DD/YYYY" or "DD/MM/YYYY" format
        setCurrentTime(currentNewDate.toLocaleTimeString()); // Time in "HH:MM:SS AM/PM" format
        startWork();
    };

    // Function to stop the timer
    const stopTimer = () => {
        endWork();
        setIsRunning(false);
    };

    // Use useEffect to start and stop the timer when 'isRunning' changes
    useEffect(() => {
        let intervalId;
        setCurrentDate(currentNewDate.toLocaleDateString());
        if (isRunning) {
            intervalId = setInterval(() => {
                // Increment seconds and update minutes and hours as needed
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => {
                            if (prevMinutes === 59) {
                                setHours((prevHours) => prevHours + 1);
                                return 0;
                            }
                            return prevMinutes + 1;
                        });
                        return 0;
                    }
                    return prevSeconds + 1;
                });
            }, 1000); // Update every 1 second
        } else {
            clearInterval(intervalId);
        }

        // Cleanup: Clear the interval when the component unmounts or 'isRunning' changes
        return () => clearInterval(intervalId);
    }, [isRunning]);


    const startWork = () => {
        var formdata = new FormData();
        console.log(currentDate + " " + currentTime)
        formdata.append("date", currentDate);
        formdata.append("start_time", currentTime);
        //formdata.append("end_time", Client_email);
        //formdata.append("working_hours", "vendor");

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }

        };

        fetch(FRONTEND_API + "start_work/".concat(userId), requestOptions)
            .then((response) => {
                if (response.status == 200) {
                    //setStatus("200")
                    return response.json();
                }
            })
            .then((result) => {
                setIsRunning(true);
                alert(result.message)
            })
            .catch((error) => {
                alert("error", error)
                setIsRunning(false);
            });
    }

    const endWork = () => {
        var formdata = new FormData();
        //formdata.append("date", Client_name);
        //formdata.append("start_time", Client_contact);
        const endTime = currentNewDate.toLocaleTimeString();
        const working_hours = Math.floor(hours / (1000 * 60));
        const final_hours = working_hours + minutes;

        console.log(final_hours);
        formdata.append("end_time", endTime);
        formdata.append("working_hours", final_hours);

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + token
            }

        };

        fetch(FRONTEND_API + "end_work/".concat(userId), requestOptions)
            .then((response) => {
                if (response.status == 200) {
                    //setStatus("200")
                    return response.json();
                }
            })
            .then((result) => {
                alert(result.message)
            })
            .catch((error) => {
                alert("error", error)
                setIsRunning(false);
            });
    }

    
    function formatDate(inputDate) {
        const parts = inputDate.split('/');
        if (parts.length !== 3) {
          // Handle invalid date format
          return 'Invalid Date';
        }
        
        const [day, month, year] = parts;
        const formattedDate = new Date(`${year}-${month}-${day}`);
        
        if (isNaN(formattedDate.getTime())) {
          // Handle invalid date
          return 'Invalid Date';
        }
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return formattedDate.toLocaleDateString(undefined, options);
    }

    return (
        <Box>
            <Typography variant="h7" color = "primary" sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}>
                Mark Your Attendance
            </Typography>
            <div style={{ marginTop: '10px'}}>
                <Typography variant="h7" color='secondary' sx={{ mt: 2, fontWeight: 'bold' }}>
                    Today's Date
                </Typography>
                <Typography variant='h7' sx={{ mt: 1, display: 'block' }}>
                    {formatDate(currentNewDate.toLocaleDateString())}
                </Typography>
            </div>

            <div style={{marginTop: '10px'}}>
                <Typography variant="h7" color='secondary' sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}>
                   You worked for: 
                </Typography>
                <span style={{display: 'block', marginTop: '2px'}}>hours: {hours} minutes: {minutes} seconds: {seconds}</span>
            </div>
            <div style={{marginTop: '10px'} }>
                {!isRunning ? 
                    (<Button variant="outlined" color='customGreenColor' onClick={startTimer}>Start</Button>) :
                    (<Button variant="outlined" color='customRedColor' onClick={stopTimer}>Stop</Button>)}
            </div>
        </Box>
    )
}

export default AttendanceTimer