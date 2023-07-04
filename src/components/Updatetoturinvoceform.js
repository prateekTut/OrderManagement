import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import "./css/Resister.css";
import "./css/main.css";

function Updatetoturinvoceform() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);

  const fetchDataforupdate = (userId) => {
    console.log("OTM ID", userId);
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/gettaskid/".concat(userId))
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

  useEffect(() => {
    fetchDataforupdate(params.userId);
  }, []);
  return (
    <div>
      <div class='one'>
        <h1>Update tutor Invoice</h1>
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
                      <h5 class='modal-title text_white'>Update Vandor Invoice</h5>
                    </div>
                    <div class='modal-body'>
                      {userToEdit.length > 0 && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}>
                          <div class=''>
                            <span>{userToEdit[1]}</span>
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
                              placeholder='Enter Vendor budget'
                            />
                          </div>
                          <div class='' style={{ display: "none" }}>
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
                            />
                          </div>
                          <button
                            class='btn_1 full_width text-center'
                            onClick={() => {
                              var formdata = new FormData();
                              formdata.append("Task_Subject", userToEdit[1]);
                              formdata.append("Vendor_budget", userToEdit[2]);
                              formdata.append("Expert_price", userToEdit[14]);

                              var requestOptions = {
                                method: "POST",
                                body: formdata,
                              };

                              fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/updatevendorinvoicebudget/".concat(userToEdit[0]), requestOptions)
                                .then((response) => response.json())
                                .then((result) => {
                                  alert("Data Updated");
                                  console.log(typeof result, result);
                                  setUserToEdit([]); // clear
                                  console.log(users);
                                  console.log("result", JSON.parse(result));
                                  setUsers(JSON.parse(result));
                                  navigate(`/Updatetutors`);
                                })
                                .catch((error) => {
                                  console.log(error);
                                  // alert("error", error)
                                });
                            }}>
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

export default Updatetoturinvoceform;
