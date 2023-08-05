import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import UseTextInput from "./UseTextInput";
import "./css/Resister.css";
import "./css/main.css";
import { FRONTEND_API } from "./urls";

function Addclient() {
  const navigate = useNavigate();
  const [Business, setBusiness] = useState(false);
  const [Student, setStudent] = useState(false);
  const [Client_name, setClient_name] = UseTextInput("");
  const [Client_contact, setClient_contact] = useState("");
  const [Client_email, setClient_email] = useState("");
  const [Client_status, setClient_status] = useState("");
  const [University, setUniversity] = useState("");
  const [Business_name, setBusiness_name] = useState("");
  const [Student_login, setStudent_login] = useState("");
  const [Student_password, setStudent_password] = useState("");
  const [emailError, setEmailError] = useState("");
  const token = sessionStorage.getItem("token")

  // ====================   Email validetion function ==================
  const handleSubmit = (event) => {
    event.preventDefault();
    // Regex pattern for a 10-digit phone number
    // const phoneNumberPattern = /^\d{10}$/;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Test the email against the pattern
    if (Client_email.match(regex) && Client_contact.length >= 13) {
      // The email is valid, do something with it
      setEmailError("");
      var formdata = new FormData();
      formdata.append("Client_name", Client_name);
      formdata.append("Client_contact", Client_contact);
      formdata.append("Client_email", Client_email);
      formdata.append("Client_status", Client_status);
      formdata.append("University", University);
      formdata.append("Business_name", Business_name);
      formdata.append("Student_login", Student_login);
      formdata.append("Student_password", Student_password);

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      
      };

      fetch(FRONTEND_API + "addclient", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert("Data inserted");
          console.log(result);
          navigate("/UpdateClientdata");
        })
        .catch((error) => alert("error", error));
    } else {
      // The email is not valid, show an error message
      alert("Invalid Input Please Check And Fill Field's correctly");
      setEmailError("Invalid Input Please Check And Fill Field's correctly ");
    }
  };

  // ====================   Email validetion function END  ==================

  const onClick = (e) => {
    setBusiness(e);
    setStudent(e);
  };
  return (
    <div>
      <div class='one'>
        <h1>Add Client</h1>
      </div>

      <>
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
                        <h5 class='modal-title text_white'>Add Client</h5>
                      </div>
                      <div class='modal-body'>
                        <form onSubmit={handleSubmit}>
                          <div class=''>
                            <input
                              type='text'
                              value={Client_name}
                              onChange={setClient_name}
                              // onInput={(e) => {
                              //   console.log(e.target.value);
                              //   setClient_name(e.target.value);
                              // }}
                              class='form-control'
                              placeholder='Full Name'
                              required
                            />
                          </div>
                          <div class=''>
                            {/* <input
                              type='number'
                              value={Client_contact}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setClient_contact(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Contact'
                            /> */}
                            <PhoneInput placeholder='Phone number' value={Client_contact} onChange={setClient_contact} required limitMaxLength='10' />
                          </div>
                          <div class=''>
                            {/* <input
                              type='text'
                              value={Client_email}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setClient_email(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Email'
                            /> */}
                            <input type='email' value={Client_email} onChange={(event) => setClient_email(event.target.value)} placeholder='Your Email' required />
                            {emailError && <p id='invailidemail'>{emailError}</p>}
                          </div>
                          {/* <div class=''>
                            <label htmlFor='' id='Client_status'>
                              Client_status
                            </label>
                            <select
                              class='form-select form-select-md '
                              value={Client_status}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setClient_status(e.target.value);
                              }}>
                              <option value='student'>student</option>
                              <option value='vendor'>vendor</option>
                            </select>
                          </div> */}

                          <div>
                            {Business === 1 ? (
                              <input
                                type='text'
                                value={Business_name}
                                onInput={(e) => {
                                  console.log(e.target.value);
                                  setBusiness_name(e.target.value);
                                }}
                                class='form-control'
                                placeholder='Bussiness Name'
                                required
                              />
                            ) : (
                              <div></div>
                            )}
                            {/* <button class='btn btn-success btn-sm' onClick={() => setBusiness(!Business)}>
                              Bussiness
                            </button> */}
                          </div>
                          {/* <div class=''>
                            <input
                              type='text'
                              value={Business_name}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setBusiness_name(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Enter Bussiness name'
                            />
                          </div> */}
                          <div>
                            {Student === 2 ? (
                              <div>
                                <div class=''>
                                  <input
                                    type='text'
                                    value={University}
                                    onInput={(e) => {
                                      console.log(e.target.value);
                                      setUniversity(e.target.value);
                                    }}
                                    class='form-control'
                                    placeholder='University'
                                    required
                                  />
                                </div>
                                <div class=''>
                                  <input
                                    type='text'
                                    value={Student_login}
                                    onInput={(e) => {
                                      console.log(e.target.value);
                                      setStudent_login(e.target.value);
                                    }}
                                    class='form-control'
                                    placeholder='Student login'
                                    required
                                  />
                                </div>
                                <div class=''>
                                  <input
                                    type='text'
                                    value={Student_password}
                                    onInput={(e) => {
                                      console.log(e.target.value);
                                      setStudent_password(e.target.value);
                                    }}
                                    class='form-control'
                                    placeholder='Student Password'
                                    required
                                  />
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {/* <button class='btn btn-success btn-sm' onClick={() => setStudent(!Student)}>
                              Student
                            </button> */}
                          </div>
                          {/* <div class=''>
                            <input
                              type='text'
                              value={University}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setUniversity(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Enter Your University'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={Student_login}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setStudent_login(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Enter Student_login'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={Student_password}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setStudent_password(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Enter Student_password'
                            />
                          </div> */}
                          {/* <div>
                            <button class='btn btn-success btn-sm' onClick={() => setStudent(!Student)}>
                              Student
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button class='btn btn-success btn-sm' onClick={() => setBusiness(!Business)}>
                              Bussiness
                            </button>
                          </div> */}

                          <div
                            class=' cs_check_box'
                            value={Client_status}
                            onInput={(e) => {
                              console.log(e.target.value);
                              setClient_status(e.target.value);
                            }}
                            required>
                            <label htmlFor=''>Select Client Stuste </label>
                            <label for='check_box'> Student </label>
                            <input onClick={() => onClick(2)} class='form-check-redio' type='radio' value='student' name='flexRadioDefault' id='flexRadioDefault2' />
                            <label for='check_box'> Vendor </label>
                            <input onClick={() => onClick(1)} class='form-check-redio' type='radio' value='vendor' name='flexRadioDefault' id='flexRadioDefault2' />
                          </div>
                          {emailError && <p id='invailidemail'>{emailError}</p>}
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

export default Addclient;
