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
  const [userToEdit, setUserToEdit] = useState([]);

  const componentRef = useRef();
  const fetchDataforupdate = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getbudgetdataforview/".concat(userId))
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
  const deleteUser = (userId) => {
    console.log("Del", userId);
    fetch(FRONTEND_API + "deletebudget/".concat(userId), {
      method: "delete",
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
            <button type='button' id='invoicebutton' class='btn btn-success btn-m' onClick={() => Invoice(userToEdit[1])}>
              Invoice
            </button>
            <button id='Editbudgetbutton' type='button' class='btn btn-success btn-m' onClick={() => editUser(userToEdit[0])}>
              Edit
            </button>
            <button type='button' class='btn btn-danger  btn-m' onClick={() => deleteUser(userToEdit[0])}>
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
        </table>
      </div>

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

export default Viewbudget;
