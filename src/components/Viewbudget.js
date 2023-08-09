import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useReactToPrint } from "react-to-print";
import "./css/Resister.css";
import "./css/main.css";
import { FRONTEND_API } from "./urls";

function Viewbudget() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const token = localStorage.getItem("token")
  const [userToEdit, setUserToEdit] = useState([]);

  const componentRef = useRef();
  const fetchDataforupdate = (userId) => {
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
        data.map((tutors) => {
          setUserToEdit(tutors);
        })
       
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const deleteUser = (userId) => {
    console.log("Del", userId);
    fetch(FRONTEND_API + "deletebudget/".concat(userId), {
      method: "delete",
    }, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      })
      .finally(() => {
        navigate("/UpdateClientdata");
      });
  };
  const editUser = (userId) => {
    console.log("budget ID", userId);
    navigate(`/Updatebudget/${userId}`);
  };
  const Invoice = (userId) => {
    console.log("student ID", userId);
    navigate(`/student-invoice/${userId}`);
  };

  useEffect(() => {
    fetchDataforupdate(params.userId);
  }, []);
  return (
    <div ref={componentRef}>
      <div class='one'>
        <h1>Student Budget information</h1>
      </div>
      {/* <button onClick={handlePrint}>Print this out!</button> */}
      <div id='budgetdata'>
        <div id='budgetbutton'>
          <td>
            <button type='button' id='invoicebutton' class='btn btn-success btn-m' onClick={() => Invoice(userToEdit.client_id)}>
              Invoice
            </button>
            <button id='Editbudgetbutton' type='button' class='btn btn-success btn-m' onClick={() => editUser(userToEdit.id)}>
              Edit
            </button>
            <button type='button' class='btn btn-danger  btn-m' onClick={() => deleteUser(userToEdit.id)}>
              Delete
            </button>
          </td>
        </div>
        <table class='table table-striped'>
          <thead>
            {/* <tr>
            <th scope='col'>#</th>
            <th scope='col'>Client_id</th>
            <th scope='col'> Package_price</th>
            <th scope='col'>Amount_Paid</th>
            <th scope='col'>Pending_amount</th>
            <th scope='col'>Mode_of_payment</th>
            <th scope='col'>Status</th>
            <th scope='col'>Edit</th>
          </tr> */}
            <tr>
              <th scope='col'>Budget Id </th>
              <td>=</td>
              <td>{userToEdit.id}</td>
            </tr>
            <tr>
              <th scope='col'>Client_id</th>
              <td>=</td>
              <td>{userToEdit.client_id}</td>
            </tr>
            <tr>
              <th scope='col'>Package Price</th>
              <td>=</td>
              <td>{userToEdit.package_price}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Amount Paid</th>
              <td>=</td>
              <td>{userToEdit.amount_paid}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Pending Amount</th>
              <td>=</td>
              <td>{userToEdit.pending_amount}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Mode Of Payment</th>
              <td>=</td>
              <td>{userToEdit.mode_of_payment}</td>
            </tr>{" "}
            <tr>
              <th scope='col'>Status</th>
              <td>=</td>
              <td>{userToEdit.status}</td>
            </tr>{" "}
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Viewbudget;
