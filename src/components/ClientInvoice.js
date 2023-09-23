import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useReactToPrint } from "react-to-print";
import Logo from "./img/logo.jpg";

import { FRONTEND_API } from "./urls";
import { Button, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";


function ClientInvoice() {
  const navigate = useNavigate();
  let params = useParams();
  //console.log(params, params.userId);

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'INR',
      label: '₹',
    },
    {
      value: 'GBP',
      label: '£',
    },
  ];
  const [userToEdit, setUserToEdit] = useState([]);
  const [userToinvoice, setUserToinvoice] = useState([]);
  const componentRef = useRef();
  const token = localStorage.getItem("token")
  const [openEdit, setOpenEdit] = React.useState(false);

  const [amount, setAmount] = useState("");

  const [amountValid, setAmountValid] = useState(null);
  const [currencyValue, setCurrencyValue] = React.useState('');


  // ======================= calculation of discount , tex , total ======================

  var subtotalePrice = 0;
  var total = userToEdit.map((user) => (subtotalePrice += user.amount_paid));
  var totalAmount = userToEdit.map((user) => (user.order_budget));

  var discountformula = subtotalePrice * (1 - 0.1);
  var discount = subtotalePrice - discountformula;

  var GSTtaxformula = subtotalePrice * (1 + 0.18);
  var GSTtax = GSTtaxformula - subtotalePrice;

  //var amountPaid = userToEdit.map((user) => (user.amount_paid === 0 ? 0 : user.amount_paid));
  var amountPaid = userToEdit.reduce((total, user) => total + user.amount_paid, 0);
  amountPaid = amountPaid === 0 ? 0 : amountPaid;

  var totalprice = subtotalePrice + GSTtax;


  var totalGstOnAmount = totalAmount * (0.18);
  var totalCalculatedGst = parseFloat(totalAmount) + totalGstOnAmount;

  var remainingAmount = totalAmount - amountPaid;
  // ===========================end=========================================
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

  const validateAmount = (value) => {
    if (value > parseFloat(amountPaid) && value <= remainingAmount) {
      console.log(remainingAmount);
      return true;
    }
    else if (value == remainingAmount) {
      console.log(value);
      return true;
    }
    else {
      return false;
    }
  }

  // ===============================Edit invoice=====================
  const handleCurrencyChange = (event) => {
    setCurrencyValue(event.target.value);
  };

  const onAmountChange = (event) => {
    //console.log("Task ID", orderId);
    const newValue = event.target.value;
    //navigate(`/Edit-vendor-invoice/${orderId}`);
    setAmount(newValue);
    setAmountValid(validateAmount(newValue));
  };

  // ===========================END============================
  useEffect(() => {
    fetchClientForInvoice(params.userId);
    fetchOrderData(params.userId);
  }, []);

  // =================== student data api ========================
  const fetchClientForInvoice = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getClientFromOrderId/".concat(userId), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Tutors data", data);
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

  // ==========================student invoice api ====================

  const fetchOrderData = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getbudgetdataforview/".concat(userId), {
      headers: {
        'Authorization': 'Bearer ' + token
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

  const handleClose = () => {
    setOpenEdit(false);
    resetFormFields();
  };

  const handleOrderUpdate = () => {
    if (amountValid) {
      var formdata = new FormData();
      console.log(amount)
      console.log(amountPaid)
      formdata.append("paid_amount", parseFloat(amount) + parseFloat(amountPaid));
      formdata.append("order_id", params.userId)
      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization': 'Bearer ' + token
        }

      };

      fetch(FRONTEND_API + "updateOrderAmount", requestOptions)
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((result) => {
          console.log(result);
          resetFormFields();
          resetValidationFields();
          setOpenEdit(false);
          fetchClientForInvoice(params.userId);
          fetchOrderData(params.userId);
        })
        .catch((error) => {
          console.log(error)
        });
    }
  };

  const handleModalEdit = (id) => {

    setOpenEdit(true);

  };

  const resetFormFields = () => {
    setAmount("");
  }
  const resetValidationFields = () => {
    setAmountValid(null);
  }

  return (
    <Container>
      <Typography variant='h1' sx={{
        marginLeft: 2,
        paddingTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        Student's Invoice
      </Typography>

      <Button variant="contained" type='submit' color="success" onClick={handlePrint}>
        Print & Save as PDF
      </Button>
      <Button
        sx={{ marginLeft: 2 }}
        variant="contained" type='submit' color="success"
        disabled={remainingAmount == 0}
        onClick={() => handleModalEdit(userToinvoice.order_id)}>
        Edit Invoice
      </Button>
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
              <InputLabel id="demo-simple-select-label">Currency</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currencyValue}
                label="currency"
                onChange={handleCurrencyChange}
                error={currencyValue === ''}
                helperText={currencyValue === '' && 'Select Currency'}
                sx={{ width: 15 }}
              >
                {currencies.map((data) => (

                  <MenuItem value={data.value}>{data.label}</MenuItem>

                ))}
              </Select>
              <table class='table table-striped'>
                <thead id='tablehead'>
                  <tr>
                    <th class='center'>#</th>
                    <th>Item's</th>
                    <th class='right'>Price</th>
                    <th class='right'>Amount Paid</th>
                    {/* <th class='right'>Remaining Amount</th> */}
                    <th class='center'>Qty</th>
                    {/* <th class='right'>Total</th> */}
                  </tr>
                </thead>
                <tbody>
                  {userToEdit.map((user, index) => (
                    <tr key={index}>
                      <td>{user.order_id}</td>
                      <td>{user.task}</td>
                      <td>{user.order_budget}</td>
                      <td>{user.amount_paid}</td>
                      {/*  <td>{remainingAmount}</td> */}
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
                      <td class='right'>{subtotalePrice.toFixed(2) - GSTtax.toFixed(2)}</td>
                    </tr>
                    {/* <tr>
                      <td class='left'>
                        <strong>Discount (10%)</strong>
                      </td>
                      <td class='right'>{discount.toFixed(2)}</td>
                    </tr> */}
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
                        <strong>{((subtotalePrice - GSTtax) + GSTtax).toFixed(2)}</strong>
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
      <Dialog
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Order Invoice"}
        </DialogTitle>
        <DialogContent sx={{
          marginTop: 2
        }}>
          <Grid item xs={6}>
            <FormControl fullWidth >
              <TextField
                margin="normal"
                required
                fullWidth
                id="paid_amount"
                label="Amount Paid"
                name="paid_amount"
                value={amount}
                onChange={onAmountChange}
                error={amountValid == false}
                helperText={amountValid == false && 'Invalid Amount'}

              />
            </FormControl>
          </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleOrderUpdate} autoFocus>
            Update Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ClientInvoice;
