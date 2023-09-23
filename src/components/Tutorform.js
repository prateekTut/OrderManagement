import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";

import { FRONTEND_API } from "./urls";

function Tutorform() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);

  const [userToEdit, setUserToEdit] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Regex pattern for a 10-digit phone number
    // const phoneNumberPattern = /^\d{10}$/;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checktext = /^[a-zA-Z ]+$/;

    // Test the email against the pattern
    if (userToEdit[3].match(regex) && userToEdit[1].match(checktext) && userToEdit[2].match(checktext)) {
      // The email is valid, do something with it

      var formdata = new FormData();
      formdata.append("Expert_firstname", userToEdit[1]);
      formdata.append("Expert_lastname", userToEdit[2]);
      formdata.append("Expert_email", userToEdit[3]);
      formdata.append("Expert_contact", userToEdit[4]);
      formdata.append("Expert_Address", userToEdit[5]);
      formdata.append("Expert_dob", userToEdit[6]);
      formdata.append("Expert_status", userToEdit[7]);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch(FRONTEND_API + "".concat(userToEdit[0]), requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //   alert("Data Updated");
          console.log(typeof result, result);
          setUserToEdit([]); // clear
          console.log("result", JSON.parse(result));
          // setUpdated(true);
          alert("Data Update");
          navigate("/Updatetutors");
        })
        .catch((error) => {
          console.log(error);
          // alert("error", error)
        });
    } else {
      // The email is not valid, show an error message
      alert("Invalid Input Please Check And Fill Field's correctly", userToEdit[1]);
      setEmailError("Invalid Input Please Check And Fill Field's correctly ");
      console.log(userToEdit[1], userToEdit[2], userToEdit[3], userToEdit[4], userToEdit[5]);
    }
  };

  const fetchDataforupdate = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "gettutoruser/".concat(userId))
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Tutors data", data);
        setUserToEdit(JSON.parse(data)[0]);
        // navigate("/OTMform");
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
        <h1>Update Tutors Data</h1>
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
                      <h5 class='modal-title text_white'>Update Tutor Data</h5>
                    </div>
                    <div class='modal-body'>
                      {updated ? <h1>Updated!</h1> : null}
                      {userToEdit.length > 0 && (
                        <form onSubmit={handleSubmit}>
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
                              placeholder='First Name'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[2]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[2] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                            />
                          </div>
                          <div class=''>
                            <input
                              type='email'
                              value={userToEdit[3]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[3] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Email'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={userToEdit[4]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[4] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              onChange={setUserToEdit[4]}
                              class='form-control'
                              placeholder='Your Contect No.'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[5]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[5] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              onChange={setUserToEdit[5]}
                              class='form-control'
                              placeholder='Address'
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Select DOB</label>
                            <input
                              type='date'
                              value={userToEdit[6]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[6] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Joining Date'
                              required
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div>
                            {" "}
                            <select
                              class='form-select form-select-sm'
                              value={userToEdit[7]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[7] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              required>
                              <option value=''>Select Status</option>
                              <option value='Employee'>Employee</option>
                              <option value='Freelancer'>Freelancer</option>
                            </select>
                          </div>
                          {emailError && <p id='invailidemail'>{emailError}</p>}
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

export default Tutorform;
