import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import UseTextInput from "./UseTextInput";
import "./css/Resister.css";
import "./css/main.css";

function AddTutors() {
  const navigate = useNavigate();
  const [Expert_firstname, setExpert_firstname] = UseTextInput("");
  const [Expert_lastname, setExpert_lastname] = UseTextInput("");
  const [Expert_email, setExpert_email] = useState("");
  const [Expert_contact, setExpert_contact] = useState("");
  const [Expert_Address, setExpert_Address] = useState("");
  const [Expert_dob, setExpert_dob] = useState("");
  const [Expert_status, setExpert_status] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit1 = (event) => {
    event.preventDefault();
    // Regex pattern for a 10-digit phone number
    // const phoneNumberPattern = /^\d{10}$/;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Test the email against the pattern
    if (Expert_email.match(regex)) {
      // The email is valid, do something with it
      setEmailError("");
    } else {
      // The email is not valid, show an error message
      setEmailError("Invalid ");
    }
  };

  // ====================   Email validetion function ==================
  // console.log(Expert_contact.length)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Regex pattern for a 10-digit phone number
    // const phoneNumberPattern = /^\d{+10}$/;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checktext = /^[a-zA-Z ]+$/;
    // Test the email against the pattern
    if (Expert_email.match(regex) && Expert_contact.length >= 13) {
      // The email is valid, do something with it
      console.log(`Valid phone number: ${Expert_contact.length}`);
      setEmailError("");
      var formdata = new FormData();
      formdata.append("Expert_firstname", Expert_firstname);
      formdata.append("Expert_lastname", Expert_lastname);
      formdata.append("Expert_email", Expert_email);
      formdata.append("Expert_contact", Expert_contact);
      formdata.append("Expert_contact", Expert_contact);
      formdata.append("Expert_Address", Expert_Address);
      formdata.append("Expert_dob", Expert_dob);
      formdata.append("Expert_status", Expert_status);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:5000/tutors", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert("Data inserted");
          console.log(result);
          navigate("/Updatetutors");
        })
        .catch((error) => alert("error", error));
    } else {
      // The email is not valid, show an error message
      alert("Invalid Input Please Check And Fill Field's correctly");
      setEmailError("Invalid Input Please Check And Fill Field's correctly ");
    }
  };

  // ============================END=======================
  return (
    <div>
      <>
        <div class='one'>
          <h1>Add Tutors</h1>
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
                        <h5 class='modal-title text_white'>Add Tutors</h5>
                      </div>
                      <div class='modal-body'>
                        <form onSubmit={handleSubmit}>
                          <div class=''>
                            <input
                              type='text'
                              // value={Expert_firstname}
                              // onInput={(e) => {
                              //   console.log(e.target.value);
                              //   setExpert_firstname(e.target.value);
                              // }}
                              value={Expert_firstname}
                              onChange={setExpert_firstname}
                              class='form-control'
                              placeholder='First Name'
                              required
                            />
                          </div>
                          <div class=''>
                            <input
                              type='text'
                              value={Expert_lastname}
                              onChange={setExpert_lastname}
                              // onInput={(e) => {
                              //   console.log(e.target.value);
                              //   setExpert_lastname(e.target.value);
                              // }}

                              class='form-control'
                              placeholder='Last Name'
                              required
                            />
                          </div>
                          {/* <div class=''>
                            <input
                              type='text'
                              value={Expert_email}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_email(e.target.value);
                              }}
                              onChange={handleEmailChange}
                              class='form-control'
                              placeholder='Your Email'
                              required
                            />
                          </div> */}
                          <div>
                            <input type='email' value={Expert_email} onChange={(event) => setExpert_email(event.target.value)} placeholder='Your Email' required />
                          </div>
                          <div class=''>
                            {/* <input type='text' value={Expert_contact} onChange={handlePhoneChange} /> */}
                            <PhoneInput placeholder='Phone Number' value={Expert_contact} onChange={setExpert_contact} required />

                            {/* <input
                              type='Text'
                              value={Expert_contact}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_contact(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Your Contect No.'
                            /> */}
                          </div>
                          <div class=''>
                            <input
                              type='Text'
                              value={Expert_Address}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_Address(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Address'
                            />
                          </div>
                          <div class=''>
                            <label class='col-sm-2 col-form-label'>Select DOB</label>
                            <input
                              type='date'
                              value={Expert_dob}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_dob(e.target.value);
                              }}
                              // class='form-control'
                              placeholder='DOB'
                              required
                              onKeyDown={(event) => {
                                event.preventDefault();
                              }}
                            />
                          </div>
                          <div class=''>
                            {/* <label htmlFor=''>select client status </label> */}
                            <select
                              class='form-select form-select-m'
                              value={Expert_status}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setExpert_status(e.target.value);
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

export default AddTutors;
