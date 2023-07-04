import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useReactToPrint } from "react-to-print";
import Logo from "./img/logo.jpg";
import "./css/Resister.css";
import "./css/main.css";
import "./css/Invoice.css";

function Studentinvoice() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [userToEdit, setUserToEdit] = useState([]);
  const [userToinvoice, setUserToinvoice] = useState([]);
  const componentRef = useRef();
  var today = new Date(),
    date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  console.log("=========", date);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const fetchDataforupdate = (userId) => {
    console.log("Tutor ID", userId);
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/getbudgetdataforview/".concat(userId))
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Tutors data", data);
        setUserToinvoice(JSON.parse(data)[0]);
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    // .finally(() => {
    //   navigate("/UpdateClientdata");
    // });
  };
  const fetchDataforupdateinvoice = (userId) => {
    console.log("Tutor ID", userId);
    fetch("https://www.ordermodule-dev.ap-south-1.elasticbeanstalk.com/getclient/".concat(userId))
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

  const editUser = (userId) => {
    console.log("budget ID", userId);
    navigate(`/Updatebudget/${userId}`);
  };

  useEffect(() => {
    fetchDataforupdate(params.userId);
    fetchDataforupdateinvoice(params.userId);
  }, []);
  return (
    <div>
      <div class='one'>
        <h1>Student invoice</h1>
      </div>

      <button type='button' id='invoicebutton' class='btn btn-success btn-m' onClick={handlePrint}>
        Print & Save as PDF
      </button>
      <div class='container' ref={componentRef}>
        <span>
          <p id='companylogo'>
            <span id='tutorshivetext'> TutorsHive Pvt. Ltd. </span>
            <br />
            Regd. office: 88A, Nancy Residency, First Floor, <br />
            Sindhu Nagar, Scheme No. 17, Murlipura, Jaipur, jaipur,
            <br />
            Email: info@webz.com.pl
          </p>
          <img src={Logo} alt='BigCo Inc. logo' id='invoicelogo' />
        </span>
        <div class='card'>
          <div class='card-header'>
            <strong> Invoice no :</strong>
            <span class='float-right'>
              <strong>Date:</strong> {date}
            </span>
          </div>
          <div class='card-body'>
            <div class='row mb'>
              <div class='col' id='block'>
                <h6 class='mb-3' id='Billed'>
                  Billed By
                </h6>
                <div>
                  <strong>TutorsHive Pvt. Ltd.</strong>
                </div>
                <div>Madalinskiego 8</div>
                <div>Regd. office: 88A, Nancy Residency, First Floor, Sindhu Nagar, Scheme No. 17, Murlipura, Jaipur, jaipur,</div>
                <div>Email: info@webz.com.pl</div>
              </div>
              <div class='col' id='block'>
                <h6 class='mb-3' id='Billed'>
                  Billed To
                </h6>
                <div>
                  <strong>{userToEdit[1]}</strong>
                </div>
                <div>UK,</div>
                <div>United Kingdom (UK)</div>
                <div>Email: {userToEdit[3]}</div>
                {/* <div>Phone: +48 123 456 789</div> */}
              </div>
            </div>

            <div class='table-responsive-sm'>
              <table class='table table-striped'>
                <thead id='tablehead'>
                  <tr>
                    <th class='center'>#</th>
                    <th>Item</th>
                    {/* <th>Description</th> */}

                    <th class='right'>Price</th>
                    <th class='right'>Amount Paid</th>
                    <th class='right'>Pending Amount</th>

                    <th class='center'>Qty</th>
                    {/* <th class='right'>Total</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class='center'>1</td>
                    <td class='left strong'>Origin License</td>

                    <td class='right'>{userToinvoice[2]}</td>
                    <td class='center'>{userToinvoice[3]}</td>
                    <td class='center'>{userToinvoice[4]}</td>
                    <td class='right'>2</td>
                  </tr>
                  <tr>
                    <td class='center'>2</td>
                    <td class='left'>Custom Services</td>

                    <td class='right'>$150,00</td>
                    <td class='center'>20</td>
                    <td class='right'>$3.000,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class='row'>
              <div class='col-lg-4 col-sm-5'></div>

              <div class='col-lg-4 col-sm-5 ml-auto'>
                <table class='table table-clear'>
                  <tbody>
                    <tr>
                      <td class='left'>
                        <strong>Subtotal</strong>
                      </td>
                      <td class='right'>$8.497,00</td>
                    </tr>
                    <tr>
                      <td class='left'>
                        <strong>Discount (20%)</strong>
                      </td>
                      <td class='right'>$1,699,40</td>
                    </tr>
                    <tr>
                      <td class='left'>
                        <strong>VAT (10%)</strong>
                      </td>
                      <td class='right'>$679,76</td>
                    </tr>
                    <tr>
                      <td class='left'>
                        <strong>Total</strong>
                      </td>
                      <td class='right'>
                        <strong>$7.477,36</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class='row' id='bankDetails'>
            <h2 id='bankheading'>Bank Details</h2>

            <span class='float-right'>
              <strong id='one'>Account Holder Name</strong> TutorsHive Private Limited
            </span>
            <span class='float-right'>
              <strong id='two'>Account Number </strong>50200041023430
            </span>
            <span>
              <strong id='three'>IFSC</strong>HDFC0002837
            </span>
            <span>
              <strong id='four'>Account Type </strong> Current
            </span>
            <span>
              <strong id='five'>Bank </strong> HDFC BANK
            </span>
          </div>
        </div>
      </div>
      {/* <button onClick={handlePrint}>Print this out!</button> */}
      {/* <div id='budgetdata'>
        <div id='budgetbutton'>
          <td>
            <button type='button' id='invoicebutton' class='btn btn-success btn-m' onClick={handlePrint}>
              Invoice
            </button>
            <button id='Editbudgetbutton' type='button' class='btn btn-success btn-m' onClick={() => editUser(userToEdit[0])}>
              Edit
            </button>
            <button type='button' class='btn btn-danger  btn-m' onClick={() => deleteUser(userToEdit[0])}>
              Delete
            </button>
          </td>
        </div> */}
      {/* <table class=''>
          <thead>
            <tr>
            <th scope='col'>#</th>
            <th scope='col'>Client_id</th>
            <th scope='col'> Package_price</th>
            <th scope='col'>Amount_Paid</th>
            <th scope='col'>Pending_amount</th>
            <th scope='col'>Mode_of_payment</th>
            <th scope='col'>Status</th>
            <th scope='col'>Edit</th>
          </tr>
            <tr>
              <th scope='col'>Budget Id </th>
              <td>=</td>
              <td>{userToEdit[0]}</td>
            </tr>
            <tr>
              <th scope='col'>Client_id</th>
              <td>=</td>
              <td>{userToEdit[1]}</td>
            </tr>
            <tr>
              <th scope='col'>Package Price</th>
              <td>=</td>
              <td>{userToEdit[2]}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Amount Paid</th>
              <td>=</td>
              <td>{userToEdit[3]}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Pending Amount</th>
              <td>=</td>
              <td>{userToEdit[4]}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Mode Of Payment</th>
              <td>=</td>
              <td>{userToEdit[5]}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Status</th>
              <td>=</td>
              <td>{userToEdit[6]}</td>
            </tr>{" "}
          </thead>
        </table> */}
      {/* </div> */}
      {/* <table class='table table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Client_id</th>
            <th scope='col'> Package_price</th>
            <th scope='col'>Amount_Paid</th>
            <th scope='col'>Pending_amount</th>
            <th scope='col'>Mode_of_payment</th>
            <th scope='col'>Status</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>{userToEdit[0]}</th>
            <td>{userToEdit[1]}</td>
            <td>{userToEdit[2]}</td>
            <td>{userToEdit[3]}</td>
            <td>{userToEdit[4]}</td>
            <td>{userToEdit[5]}</td>
            <td>{userToEdit[6]}</td>
            <td>
              <button type='button' class='btn btn-success btn-sm' onClick={() => editUser(userToEdit[0])}>
                Edit
              </button>
            </td>
            <td>
              <button type='button' class='btn btn-danger  btn-sm' onClick={() => deleteUser(userToEdit[0])}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Studentinvoice;
