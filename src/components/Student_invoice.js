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

function Student_invoice() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [userToEdit, setUserToEdit] = useState([]);
  const [userToinvoice, setUserToinvoice] = useState([]);
  const componentRef = useRef();
  const token = sessionStorage.getItem("token")

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
  var totale1 = userToEdit.map((user) => (subtotalePrice += user[2]));
  var discountformula = subtotalePrice * (1 - 0.1);
  var discount = subtotalePrice - discountformula;
  var GSTtaxformula = subtotalePrice * (1 + 0.18);
  var GSTtax = GSTtaxformula - subtotalePrice;
  var totalprice = subtotalePrice - discount + GSTtax;

  // ===========================end=========================================

  // =================== student data api ========================
  const fetchDataforinvoice = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getclient/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
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
  };
  // =========================end=============================

  // ==========================student invoice api ====================

  const fetchDataforupdateinvoice = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getbudgetdataforview/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Tutors data", data);
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
  useEffect(() => {
    fetchDataforinvoice(params.userId);
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
                {userToinvoice[1]}
                <div>UK,</div>
                <div>United Kingdom (UK)</div>
                <div>Email: {userToinvoice[3]}</div>
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
                      <td>{user[0]}</td>
                      <td>{user[1]}</td>
                      <td>{user[2]}</td>
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
    </div>
  );
}

export default Student_invoice;
