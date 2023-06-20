import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/Resister.css";
import "./css/main.css";

function Addtask() {
  const navigate = useNavigate();
  const [Task_Subject, setTask_Subject] = useState("");
  const [Vendor_budget, setVendor_budget] = useState("");
  const [Expert_firstname, setExpert_firstname] = useState("");
  const [Client_name, setClient_name] = useState();
  const [Status, setStatus] = useState("");
  const [Start_date, setStart_date] = useState("");
  const [End_date, setEnd_date] = useState("");
  const [Expert_startDate, setExpert_startDate] = useState("");
  const [Expert_endDate, setExpert_endDate] = useState("");
  const [Qc_Expert_name, setQc_Expert_name] = useState("");
  const [Otm_username, setOtm_username] = useState("");
  const [Description, setDescription] = useState("");
  const [Word_count, setWord_count] = useState("");
  const [Expert_price, setExpert_price] = useState("");
  const [otmmamber, setotmmamber] = useState([]);
  const [expert, setexpert] = useState([]);
  const [client, setclient] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  
  const token = sessionStorage.getItem("token")


  const fetchtutorsData = () => {
    fetch("http://127.0.0.1:5000/getexpert", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setexpert(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchclientData = () => {
    fetch("http://127.0.0.1:5000/getclientdata", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setclient(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchOTMData = () => {
    fetch("http://127.0.0.1:5000/getotm1", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setotmmamber(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  useEffect(() => {
    fetchOTMData();
    fetchclientData();
    fetchtutorsData();
  }, []);
  return (
    <div>
      <>
        <div class='one'>
          <h1>Add Task </h1>
        </div>
        <div class='main_content_iner '>
          <div class='container-fluid '>
            <div class='row justify-content-center mx-5'>
              <div class='col-12'>
                <div class='dashboard_header '>
                  <div class='row'></div>
                </div>
              </div>
              <div class='col-lg-12'>
                <div class='white_box '>
                  <div class='row justify-content-center'>
                    <div class='col-lg-6'></div>
                    <div class='modal-content cs_modal'>
                      <div class='modal-header justify-content-center theme_bg_1 '>
                        <h5 class='modal-title text_white'>Add Task</h5>
                      </div>
                      <div class='modal-body'>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            var formdata = new FormData();
                            formdata.append("Task_Subject", Task_Subject);
                            formdata.append("Vendor_budget", Vendor_budget);
                            formdata.append("Expert_firstname", Expert_firstname);
                            formdata.append("Client_name", Client_name);
                            formdata.append("Status", Status);
                            formdata.append("Start_date", Start_date);
                            formdata.append("End_date", End_date);
                            formdata.append("Expert_startDate", Expert_startDate);
                            formdata.append("Expert_endDate", Expert_endDate);
                            formdata.append("Qc_Expert_name", Qc_Expert_name);
                            formdata.append("Otm_username", Otm_username);
                            formdata.append("Description", Description);
                            formdata.append("Word_count", Word_count);
                            formdata.append("Expert_price", Expert_price);

                            var requestOptions = {
                              method: "POST",
                              body: formdata,
                            };

                            fetch("http://127.0.0.1:5000/addtask", requestOptions, {
                              headers: {
                                'Authorization' : 'Bearer ' + token
                              }
                            })
                              .then((response) => response.text())
                              .then((result) => {
                                alert("Data inserted");
                                console.log(result);
                                navigate("/Assingntask");
                              })
                              .catch((error) => alert("error", error));
                          }}>
                          <div class=''>
                            <input
                              type='text'
                              value={Task_Subject}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setTask_Subject(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Subject'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={Vendor_budget}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setVendor_budget(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Vendor Budget'
                            />
                          </div>
                          <div class=''>
                            <select
                              class='form-select form-select-m'
                              value={Expert_firstname}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_firstname(e.target.value);
                              }}
                              required>
                              <option>Select Expert Name</option>
                              {expert.map((user, index) => (
                                <option value={user[1]}>{user[1]}</option>
                              ))}
                            </select>
                          </div>
                          <br />
                          <div class=''>
                            {/* <label htmlFor=''>select client Name</label> */}
                            <select
                              class='form-select form-select-m'
                              value={Client_name}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setClient_name(e.target.value);
                              }}
                              required>
                              <option>Select Client Name</option>
                              {client.map((user, index) => (
                                <option value={user[1]}>{user[1]}</option>
                              ))}
                            </select>
                          </div>
                          <br />
                          <div class=''>
                            <input
                              type='Text'
                              value={Status}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setStatus(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Status'
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Task Start Date</label>
                            <input
                              type='date'
                              value={Start_date}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setStart_date(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Start Date'
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Task End Date</label>
                            <input
                              type='date'
                              value={End_date}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setEnd_date(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='End Date'
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Expert Stert Date</label>
                            <input
                              type='date'
                              value={Expert_startDate}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_startDate(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Expert Start Date'
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Expert End Date</label>
                            <input
                              type='date'
                              value={Expert_endDate}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_endDate(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Expert End Date'
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            {/* <label htmlFor=''>Select QC Expert Name</label> */}
                            <select
                              class='form-select form-select-m'
                              value={Qc_Expert_name}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setQc_Expert_name(e.target.value);
                              }}
                              required>
                              <option>Select QC Expert Name</option>
                              {expert.map((user, index) => (
                                <option value={user[1]}>{user[1]}</option>
                              ))}
                            </select>
                          </div>
                          <br />
                          <div class=''>
                            {/* <label htmlFor=''>select OTM mamber name </label> */}
                            <select
                              class='form-select form-select-m'
                              value={Otm_username}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setOtm_username(e.target.value);
                              }}
                              required>
                              <option>Select OTM Mamber Name</option>
                              {otmmamber.map((user, index) => (
                                <option value={user[1]}>{user[1]}</option>
                              ))}
                            </select>
                          </div>
                          <br />
                          <div class=''>
                            <input
                              type='Text'
                              value={Description}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setDescription(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Description'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={Word_count}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setWord_count(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Word Count'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={Expert_price}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_price(e.target.value);
                              }}
                              class='form-control'
                              required
                              placeholder='Expert Price'
                            />
                          </div>
                          <button class='btn_1 full_width text-center' type='submit'>
                            submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Addtask;
