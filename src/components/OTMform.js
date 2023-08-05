import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import "./css/Resister.css";
import "./css/main.css";

function OTMform() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);

  const [userToEdit, setUserToEdit] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [emailError, setEmailError] = useState("");

  // ====================   Email validetion function ==================
  const handleSubmit = (event) => {
    event.preventDefault();
    // Regex pattern for a 10-digit phone number
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checktext = /^[a-zA-Z ]+$/;
    // Test the email against the pattern
    if (userToEdit[4].match(regex) && userToEdit[1].match(checktext) && userToEdit[2].match(checktext)) {
      // The email is valid, do something with it
      setEmailError("");
      var formdata = new FormData();
      formdata.append("firstname", userToEdit[1]);
      formdata.append("lastname", userToEdit[2]);
      formdata.append("password", userToEdit[3]);
      formdata.append("email", userToEdit[4]);
      formdata.append("contact", userToEdit[5]);
      formdata.append("joiningDate", userToEdit[6]);
      formdata.append("Level", userToEdit[7]);
      formdata.append("type", userToEdit[8]);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:5000/updateotm/".concat(userToEdit[0]), requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alert("Data Updated");
          console.log(typeof result, result);
          setUserToEdit([]); // clear
          console.log("result", JSON.parse(result));
          setUpdated(true);
          navigate("/updateotm");
        })
        .catch((error) => {
          console.log(error);
          // alert("error", error)
        });
    } else {
      // The email is not valid, show an error message
      alert("Invalid Input Please Check And Fill Field's correctly");
      setEmailError("Invalid Input Please Check And Fill Field's correctly ");
    }
  };

  // ====================   Email validetion function END  ==================
  const fetchDataforupdate = (userId) => {
    console.log("OTM ID", userId);
    fetch("http://127.0.0.1:5000/getotmuser/".concat(userId))
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("OTM DATA", data);
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
        <h1>OTM Member Data</h1>
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
                      <h5 class='modal-title text_white'>Update OTM Member</h5>
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
                              required
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
                              class='form-control'
                              placeholder='Last Name'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[3]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[3] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Password'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[4]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[4] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Your Email'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='number'
                              value={userToEdit[5]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[5] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Your Contect No.'
                              required
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Select Joining Date</label>
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
                          <div class=''>
                            <input
                              type='text'
                              value={userToEdit[7]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[7] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              class='form-control'
                              placeholder='Level'
                              required
                            />
                          </div>
                          <div>
                            {" "}
                            <select
                              class='form-select form-select-sm'
                              value={userToEdit[8]}
                              onInput={(e) => {
                                let updatedData = cloneDeep(userToEdit);
                                updatedData[8] = e.target.value;
                                setUserToEdit(updatedData);
                              }}
                              required>
                              <option value=''>Select Type</option>
                              <option value='otm'>OTM</option>
                              <option value='admin'>Admin</option>
                            </select>
                          </div>
                          {emailError && <p id='invailidemail'>{emailError}</p>}
                          <button class='btn_1 full_width text-center'>submit</button>
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

export default OTMform;
