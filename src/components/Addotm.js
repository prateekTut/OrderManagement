import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import UseTextInput from "./UseTextInput";
import "./css/Resister.css";
import "./css/main.css";

function Addotm() {
  const navigate = useNavigate();
  const [firstname, setfirstname] = UseTextInput("");
  const [lastname, setlastname] = UseTextInput("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [joiningDate, setjoiningDate] = useState("");
  const [Level, setLevel] = useState("");
  const [type, settype] = useState("");
  const [emailError, setEmailError] = useState("");

  // ====================   Email validetion function ==================

  const handleSubmit = (event) => {
    event.preventDefault();
    // Regex pattern for a 10-digit phone number
    // const phoneNumberPattern = /^\d{10}$/;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checktext = /^[a-zA-Z ]+$/;
    // Test the email against the pattern
    if (email.match(regex) && contact.length >= 13) {
      // The email is valid, do something with it
      setEmailError("");
      var formdata = new FormData();
      formdata.append("firstname", firstname);
      formdata.append("lastname", lastname);
      formdata.append("password", password);
      formdata.append("email", email);
      formdata.append("contact", contact);
      formdata.append("joiningDate", joiningDate);
      formdata.append("Level", Level);
      formdata.append("type", type);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:5000/otm", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert("Data inserted");
          console.log(result);
          navigate("/updateotm");
        })
        .catch((error) => alert("error", error));
    } else {
      // The email is not valid, show an error message
      alert("Invalid Input Please Check And Fill Field's correctly");
      setEmailError("Invalid Input Please Check And Fill Field's correctly ");
    }
  };
  // ====================   Email validetion function END  ==================
  return (
    <div>
      <div class='one'>
        <h1>OTM Member Data</h1>
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
                        <h5 class='modal-title text_white'>Add OTM Member</h5>
                      </div>
                      <div class='modal-body'>
                        <form onSubmit={handleSubmit}>
                          <div class=''>
                            <input
                              type='text'
                              value={firstname}
                              onChange={setfirstname}
                              // onInput={(e) => {
                              //   console.log(e.target.value);
                              //   setfirstname(e.target.value);
                              // }}
                              class='form-control'
                              placeholder='First Name'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={lastname}
                              onChange={setlastname}
                              // onInput={(e) => {
                              //   console.log(e.target.value);
                              //   setlastname(e.target.value);
                              // }}
                              class='form-control'
                              placeholder='Last Name'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={password}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setpassword(e.target.value);
                              }}
                              class='form-control'
                              placeholder='password'
                              required
                            />
                          </div>
                          <div class=''>
                            {/* <input
                              type='text'
                              value={email}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setemail(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Email'
                            /> */}
                            <div>
                              <input type='email' value={email} onChange={(event) => setemail(event.target.value)} placeholder='Your Email' required />
                            </div>
                          </div>
                          <div class=''>
                            {/* <input
                              type='number'
                              value={contact}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setcontact(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Contect No.'
                            /> */}
                            <PhoneInput placeholder='Phone number' value={contact} onChange={setcontact} required />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Select Joining Date</label>
                            <input
                              type='date'
                              value={joiningDate}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setjoiningDate(e.target.value);
                              }}
                              // class='form-control'
                              placeholder='Joining Date'
                              required
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            {/* <input
                              type='text'
                              value={Level}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setLevel(e.target.value);
                              }}
                              class='form-control'
                              placeholder=' Level'
                            /> */}
                            <select
                              class='form-select form-select-m'
                              value={Level}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setLevel(e.target.value);
                              }}
                              required>
                              <option value=''>Select Level </option>
                              <option value='1'>1</option>
                              <option value='0'>0</option>
                            </select>
                          </div>
                          <br />
                          <div class=''>
                            {/* <label htmlFor=''>select client status </label> */}
                            <select
                              class='form-select form-select-m'
                              value={type}
                              onInput={(e) => {
                                console.log(e.target.value);
                                settype(e.target.value);
                              }}
                              required>
                              <option value=''>Select User Type </option>
                              <option value='otm'>OTM</option>
                              <option value='expert'>Admin</option>
                            </select>
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

export default Addotm;
