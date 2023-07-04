import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import "./css/Resister.css";
import "./css/main.css";

function Taskform() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [Expert_firstname, setExpert_firstname] = useState("");
  const [Client_name, setClient_name] = useState();
  const [Qc_Expert_name, setQc_Expert_name] = useState("");
  const [Otm_username, setOtm_username] = useState("");
  const [otmmamber, setotmmamber] = useState([]);
  const [expert, setexpert] = useState([]);
  const [client, setclient] = useState([]);

  const token = sessionStorage.getItem("token")

  const fetchDataforupdate = (userId) => {
    console.log("OTM ID", userId);
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/gettaskid/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("budget DATA", data);
        setUserToEdit(data[0]);
        // navigate("/Budgetform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchtutorsData = () => {
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/getexpert", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setexpert(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchclientData = () => {
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/getclientdata", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setclient(data);
      })
      .catch((rejected) => {
        console.log(rejected);
        alert("select client name");
      });
  };
  const fetchOTMData = () => {
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/getotm1", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setotmmamber(data);
      })
      .catch((rejected) => {
        alert("select OTm  name");
        console.log(rejected);
      });
  };

  useEffect(() => {
    fetchDataforupdate(params.userId);
    fetchOTMData();
    fetchclientData();
    fetchtutorsData();
  }, []);
  return (
    <div>
      <div class='one'>
        <h1>Update Task Data</h1>
      </div>
      {/* ============================ */}
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
                      <h5 class='modal-title text_white'>Update Task Data</h5>
                    </div>
                    <div class='modal-body'>
                      {updated ? <h1>Updated!</h1> : null}
                      {userToEdit.length > 0 && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            var formdata = new FormData();
                            formdata.append("Task_Subject", userToEdit[1]);
                            formdata.append("Vendor_budget", userToEdit[2]);
                            formdata.append("Expert_firstname", Expert_firstname);
                            formdata.append("Client_name", Client_name);
                            formdata.append("Status", userToEdit[5]);
                            formdata.append("Start_date", userToEdit[6]);
                            formdata.append("End_date", userToEdit[7]);
                            formdata.append("Expert_startDate", userToEdit[8]);
                            formdata.append("Expert_endDate", userToEdit[9]);
                            formdata.append("Qc_Expert_name", Qc_Expert_name);
                            formdata.append("Otm_username", Otm_username);
                            formdata.append("Description", userToEdit[12]);
                            formdata.append("Word_count", userToEdit[13]);
                            formdata.append("Expert_price", userToEdit[14]);

                            var requestOptions = {
                              method: "POST",
                              body: formdata,
                            };

                            fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/updatetask/".concat(userToEdit[0]), requestOptions)
                              .then((response) => response.json())
                              .then((result) => {
                                alert("Data Updated");
                                console.log(typeof result, result);
                                setUserToEdit([]); // clear
                                console.log(users);
                                console.log("result", JSON.parse(result));
                                setUsers(JSON.parse(result));
                                //navigate("/");
                                
                              })
                              .catch((error) => {
                                console.log(error);
                                // alert("error", error)
                              });
                          }}>
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[1]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[1] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Subject'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={userToEdit[2]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[2] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Enter Vendor budget'
                              required
                            />
                          </div>
                          <div class=''>
                            {/* <label htmlFor=''>select Expert Name</label> */}
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
                              type='text'
                              value={userToEdit[5]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[5] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Status'
                              required
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Task Start Date</label>
                            <input
                              type='date'
                              value={userToEdit[6]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[6] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Start_date'
                              required
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Task End Date</label>
                            <input
                              type='date'
                              value={userToEdit[7]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[7] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='End_date'
                              required
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Expert Stert Date</label>
                            <input
                              type='date'
                              value={userToEdit[8]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[8] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Expert_startDate'
                              required
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Expert End Date</label>
                            <input
                              type='date'
                              value={userToEdit[9]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[9] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Expert_endDate'
                              required
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
                            {/* <label htmlFor=''> </label> */}
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
                              type='text'
                              value={userToEdit[12]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[12] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Description'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={userToEdit[13]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[13] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Word_count'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={userToEdit[14]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[14] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Expert_price'
                              required
                            />
                          </div>
                          <button class='btn_1 full_width text-center' type='submit'>
                            submit
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===================== */}
    </div>
  );
}

export default Taskform;
