import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import "./css/Resister.css";
import "./css/main.css";

function Budgetform() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [Client_name, setClient_name] = useState();
  const [userToEdit, setUserToEdit] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchDataforupdate = (userId) => {
    console.log("OTM ID", userId);
    fetch("http://127.0.0.1:5000/getbudget/".concat(userId))
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("budget DATA", data);
        setUserToEdit(JSON.parse(data)[0]);
        // navigate("/Budgetform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const fetchData = () => {
    fetch("http://127.0.0.1:5000/getclientnamedata")
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setUsers(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  useEffect(() => {
    fetchDataforupdate(params.userId);
    fetchData();
  }, []);
  return (
    <div>
      <div class='one'>
        <h1>Budget Data</h1>
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
                      <h5 class='modal-title text_white'>Student Budget</h5>
                    </div>
                    <div class='modal-body'>
                      {updated ? <h1>Updated!</h1> : null}
                      {userToEdit.length > 0 && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            var formdata = new FormData();
                            formdata.append("Client_name", Client_name);
                            formdata.append("Package_price", userToEdit[2]);
                            formdata.append("Amount_Paid", userToEdit[3]);
                            const userToEdit1 = userToEdit[2] - userToEdit[3];
                            formdata.append("Pending_amount", userToEdit1);
                            formdata.append("Mode_of_payment", userToEdit[5]);
                            formdata.append("Status", userToEdit[6]);

                            var requestOptions = {
                              method: "POST",
                              body: formdata,
                            };

                            fetch("http://127.0.0.1:5000/updatebudget/".concat(userToEdit[0]), requestOptions)
                              .then((response) => response.json())
                              .then((result) => {
                                //   alert("Data Updated");
                                console.log(typeof result, result);
                                setUserToEdit([]); // clear
                                console.log("result", JSON.parse(result));
                                setUpdated(true);
                                navigate("/UpdateClientdata");
                              })
                              .catch((error) => {
                                console.log(error);
                                // alert("error", error)
                              });
                          }}>
                          <div>
                            {/* <label class='col-sm-2 col-form-label'>Select Client Name</label> */}
                            <select
                              class='form-select form-select-m'
                              value={Client_name}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setClient_name(e.target.value);
                              }}
                              required>
                              <option>Select Client Name</option>
                              {users.map((user, index) => (
                                <option value={user[1]}>{user[1]}</option>
                              ))}
                            </select>
                          </div>
                          <br />
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
                              placeholder='Package Price'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='numbet'
                              value={userToEdit[3]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[3] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Amount Paid'
                              required
                            />
                          </div>
                          {/* <div class=''>
                            <input
                              type='number'
                              value={userToEdit[4]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[4] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Pending Amount'
                            />
                          </div> */}
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
                              placeholder='Mode Of Payment'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[6]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[6] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Status'
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
    </div>
  );
}

export default Budgetform;
