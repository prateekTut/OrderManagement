import React, { useEffect, PureComponent } from "react";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { useState } from "react";
import { XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import img from "./img/dashbord img.avif";
import "./css/Dashbord.css";
import useAuth from "../hooks/useAuth";
import { FRONTEND_API } from "./urls";
import { Button } from "@mui/material";
import { Flex } from 'reflexbox';
import { useNavigate } from "react-router-dom";

function Dashbord() {

  const [users, setUsers] = useState([]);
  const [Vendors, setVendors] = useState([]);
  const [Tutors, setTutors] = useState([]);
  const [Otm, setOtm] = useState([]);
  const [budget, setbudget] = useState([]);
  const [order, setorder] = useState([]);

  const token = localStorage.getItem("token")
  const roles = localStorage.getItem("roles")
  const userId = localStorage.getItem("userId")

  console.log("token in dashboard", token)
  console.log("roles in dashboard", roles)
  const { setAuth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    setAuth({ roles });
  }, []);
  // ==================graf ===========================
  const data01 = [
    { name: "Group tutors", value: Tutors.length },
    { name: "Grouroles in dashboard adminroles in dashboard adminroles in dashboard adminp OTM ", value: Otm.length },
    { name: "Group Orders", value: order.length },
    { name: "Group vendors", value: Vendors.length },
    { name: "Group Student", value: users.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#401e22"];

  const RADIAN = Math.PI / 180;
  const data = [
    { name: "A", value: Tutors.length, color: "#ff0000" },
    { name: "B", value: Otm.length, color: "#00ff00" },
    { name: "C", value: order.length, color: "#0000ff" },
    { name: "C", value: Vendors.length, color: "#FF8042" },
    { name: "C", value: users.length, color: "#401e22" },
  ];
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = 50;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [<circle cx={x0} cy={y0} r={r} fill={color} stroke='none' />, <path d={`M${xba},${yba}L${xbb},${ybb},L${xp},${yp},L${xba},${yba}`} stroke='#none' fill={color} />];
  };

  // ===================================================

  const fetchstudentData = () => {
    fetch(FRONTEND_API + "getstudentclientdata", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        // console.log(data.length);
        setUsers(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  const fetchvendorData = () => {
    fetch(FRONTEND_API + "getvendoreclientdata", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        // console.log(data.length);
        setVendors(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchtutorData = () => {
    fetch(FRONTEND_API + "getexpert", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        // console.log(data.length);
        setTutors(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchotmData = () => {
    var formdata = new FormData();
      formdata.append("type", "otm");

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization': 'Bearer ' + token
        }

      };
    fetch(FRONTEND_API + "getUsers", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        // console.log(data.length);
        setOtm(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchstudentbudgetData = () => {
    fetch(FRONTEND_API + "getbudgetdata", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        // console.log(data.length);
        setbudget(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const getorderfordashbord = () => {
    fetch(FRONTEND_API + "getorderfordashbord", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        // console.log(data.length);
        setorder(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  useEffect(() => {
    fetchtutorData();
    fetchstudentData();
    fetchvendorData();
    fetchotmData();
    fetchstudentbudgetData();
    getorderfordashbord();
  }, []);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const currentNewDate = new Date();
  const [currentDate, setCurrentDate] = useState()
  const [currentTime, setCurrentTime] = useState()

  // Function to start the timer
  const startTimer = () => {

    // Extract the date and time components
    setCurrentDate(currentNewDate.toLocaleDateString()); // Date in "MM/DD/YYYY" or "DD/MM/YYYY" format
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
      .catch((error) => alert("error", error));
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
        'Authorization' : 'Bearer ' + token
        }

    };

    fetch(FRONTEND_API + "end_work/".concat(userId), requestOptions)
        .then((response) =>  { 
            if(response.status == 200){
                //setStatus("200")
                return response.json();
            }
        })
        .then((result) => {
            alert(result.message)
        })
        .catch((error) => alert("error", error));
  }

  const handleClick = () => {
    navigate("/UpdateClientdata");
  };
  
  const handleClickTask = () =>{
    navigate("/Assingntask");
  };
  
  const handleClickVendor = () =>{
    navigate("/Updatevonder");
  };

  
  const handleClickOtm = () =>{
    navigate("/updateotm");
  };
  
  
  return (
    <div>

      <div class='one'>
        <h1> #No.1 Academic Writing Services </h1>
      </div>
      {roles != "admin" && roles != "hr" && (
        <Flex justifyContent="flex-end" sx={{ marginBottom: 4, marginRight: 3 }}>
          <div>

            <h2>Timer: {hours}h {minutes}m {seconds}s</h2>

            {isRunning ? (
              <Button variant="contained" type='submit' color="success" onClick={stopTimer} >
                Stop
              </Button>

            ) : (
              <Button variant="contained" type='submit' color="success" onClick={startTimer} >
                Start
              </Button>

            )}

          </div>

        </Flex>
      )
      }

      <div class='row'>
        <div class='col-sm'>
          {" "}
          <div id='divbox1'>
            <span id='span1'>
              Student's <br />
              <p>{users.length}</p>
            </span>
            
              <Button variant="contained" type='submit' color="success" onClick = {handleClick} disabled={roles != 'admin'}>
                View
              </Button>
            
          </div>
        </div>
        <div class='col-sm'>
          <div id='divbox2'>
            <span id='span2'>
              Vendor's <br />
              <p>{Vendors.length}</p>
            </span>
            {/* <Link to='/Updatevonder'>
              <button type='button' class='btn btn-success btn-m' id='button2'>
                View
              </button>
            </Link> */}
            <Button variant="contained" type='submit' color="success" onClick = {handleClickVendor} disabled={roles != 'admin'}>
                View
              </Button>
          </div>
        </div>
        <div class='col-sm'>
          {" "}
          <div id='divbox3'>
            <span id='span3'>
              OTM's <br />
              <p>{Otm.length}</p>
            </span>
            {/* <Link to='/updateotm'>
              <button type='button' class='btn btn-success btn-m' id='button3'>
                View
              </button>
            </Link> */}

              <Button variant="contained" type='submit' color="success" onClick = {handleClickOtm} disabled={roles != 'admin'}>
                View
              </Button>
          </div>
        </div>{" "}
        <div class='col-sm'>
          <div id='divbox4'>
            <span id='span4'>
              Student <br></br>Budget's <br />
              <p>{budget.length}</p>
            </span>
            {/* <Link to='/UpdateClientdata'>
              <button type='button' class='btn btn-success btn-m' id='button4'>
                View
              </button>
            </Link> */}
          </div>
        </div>
        <div class='col-sm'>
          <div id='divbox5'>
            <span id='span5'>
              Current
              <br />
              Month <br /> Order's <br />
              <p>{order.length}</p>
            </span>
            {/* <Link to='/Assingntask'>
              <button type='button' class='btn btn-success btn-m' id='button5'>
                View
              </button>
            </Link> */}
             <Button variant="contained" type='submit' color="success" onClick = {handleClickTask} disabled={roles != 'admin'}>
                View
              </Button>
          </div>
        </div>
      </div>
      <div class='row'></div>
      <div class='container'>
        <div class='row ' id='row1'>
          <PieChart width={1000} height={400} id='PieChart'>
            <Pie dataKey='value' isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill='#8884d8' label>
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <BarChart width={200} height={400} data={data01} id='BarChart'>
            <Bar dataKey='value'>
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>

          <PieChart width={400} height={500} id='PieChart2'>
            <Pie dataKey='value' startAngle={180} endAngle={0} data={data} cx={cx} cy={cy} innerRadius={iR} outerRadius={oR} fill='#8884d8' stroke='none'>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {needle(value, data, cx, cy, iR, oR, "#d0d000")}
          </PieChart>
        </div>
        <div class='row'>
          <img src={img} alt='BigCo Inc. logo' id='dashbordimg' />
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
