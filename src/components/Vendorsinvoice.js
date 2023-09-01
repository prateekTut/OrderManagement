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
import { FRONTEND_API } from "./urls";

function Vendorsinvoice() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [userToEdit, setUserToEdit] = useState([]);
  const [userToinvoice, setUserToinvoice] = useState([]);
  const componentRef = useRef();
  const token = localStorage.getItem("token")
  //  variable for get today date=====================
  var today = new Date(),
    date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // console.log("=========", date);
  // =======================================================

  // =============== make PDF function ================
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // ===================end===============================

  // ======================= calculation of discount , tex , total ======================

  var subtotalePrice = 0;
  var totale1 = userToEdit.map((user) => (subtotalePrice += user.price));
  var discountformula = subtotalePrice * (1 - 0.1);
  var discount = subtotalePrice - discountformula;
  var GSTtaxformula = subtotalePrice * (1 + 0.18);
  var GSTtax = GSTtaxformula - subtotalePrice;
  var totalprice = subtotalePrice - discount + GSTtax;

  // ===========================end=========================================
  
  useEffect(() => {
    fetchClientInfo(params.userId);
    fetchOrderData(params.userId);
  }, []);
  
  // =================== vendor data api ========================
  
  const fetchClientInfo = (userId) => {
    console.log("vendor id", userId);
    fetch(FRONTEND_API + "getclient/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Tutors data main", data);
        data.map((user) => {
          setUserToinvoice(user);
        })
       
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  // =========================end=============================

  // ==========================vendor invoice api ====================

  const fetchOrderData = (userId) => {
    console.log("vendor ID", userId);
    fetch(FRONTEND_API + "getclientvendoreid/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("vendors data", data);
        setUserToEdit(data);
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  // =======================end====================================

  // ===============================Edit invoice=====================

  const editUser = (userId) => {
    console.log("Task ID", userId);
    navigate(`/Edit-vendor-invoice/${userId}`);
  };

  // ===========================END============================


  return (
    <div>
      <div class='one'>
        <h1>Vendor invoice</h1>
      </div>
      <button type='button' id='invoicebutton' class='btn btn-success btn-m' onClick={handlePrint}>
        Print & Save as PDF
      </button>
      <button type='button' id='invoicebutton' class='btn btn-success btn-m' onClick={() => editUser(userToinvoice[0])}>
        Edit Invoice
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
                {userToinvoice.name}
                <div>UK,</div>
                <div>United Kingdom (UK)</div>
                <div>Email: {userToinvoice.email}</div>
                {/* <div>Phone: +48 123 456 789</div> */}
              </div>
            </div>

            <div class='table-responsive-sm'>
              <table class='table table-striped'>
                <thead id='tablehead'>
                  <tr>
                    <th class='center'>#</th>
                    <th>Item's</th>
                    <th class='right'>Price</th>
                    <th class='center'>Qty</th>
                    {/* <th class='right'>Total</th> */}
                  </tr>
                </thead>
                <tbody>
                  {userToEdit.map((user, index) => (
                    <tr key={index}>
                      <td>{user.Order_id}</td>
                      <td>{user.task_subject}</td>
                      <td>{user.price}</td>
                      <td>1</td>
                    </tr>
                  ))}
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
                      <td class='right'>{subtotalePrice}</td>
                    </tr>
                    <tr>
                      <td class='left'>
                        <strong>Discount (10%)</strong>
                      </td>
                      <td class='right'>{discount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class='left'>
                        <strong>GST (18%)</strong>
                      </td>
                      <td class='right'>{GSTtax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class='left'>
                        <strong>Total</strong>
                      </td>
                      <td class='right'>
                        <strong>{totalprice.toFixed(2)}</strong>
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

export default Vendorsinvoice;
