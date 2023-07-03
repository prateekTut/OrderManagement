import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Resister.css";
import "./css/main.css";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import "./css/table.css";
import "./css/Heading.css";
import { useRef } from "react";

function TutorsInvoicetabledata() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  const usersData = useRef([]);
  const [inputdata, setinputdata] = useState("");

  // ===============Modal function======================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = sessionStorage.getItem("token")
  const fetchDataformodal = (userId) => {
    console.log("Tutor ID", userId);
    fetch("http://127.0.0.1:5000/gettutorinvoicedataid/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        handleShow();
        console.log("Tutors data", data);
        setUserToEdit(data[0]);
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  // ===============End======================

  const columns = [
    {
      name: "Client ID",
      id: "name",
      selector: (row) => row.Client_id,
    },
    {
      name: "Total_price",
      id: "name",
      selector: (row) => row.Total_price,
      wrap: true,
    },
    {
      name: "Discount 10%",
      id: "name",
      selector: (row) => row.Discount,
    },
    {
      name: "Invoice Date",
      id: "name",
      selector: (row) => row.invoice_data,
    },
    {
      name: "View",
      id: "name",
      selector: (row) => row.View,
    },
    {
      name: "Invoice",
      id: "name",
      selector: (row) => row.Invoice_btn,
    },
    {
      name: "Delete",
      id: "name",
      selector: (row) => row.DeleteUser,
    },
  ];
  const fetchData = () => {
    fetch("http://127.0.0.1:5000/gettutorinvoicedata", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        const parsedUsers = [...users];
        const data = rawData;
        console.log("RAW", rawData)
        data.forEach((user) => {
          parsedUsers.push({
            Client_id: user.tutor_id,
            Total_price: user.total_price,
            Discount: user.discount,
            invoice_data: user.invoice_id,

            View: (
              <Button variant='btn btn-success btn-sm' onClick={() => fetchDataformodal(user.tutor_id)}>
                View
              </Button>
            ),
            Invoice_btn: (
              <Button variant='btn btn-success btn-sm' onClick={() => Invoice1(user.invoice_id)}>
                View
              </Button>
            ),
            DeleteUser: (
              <button type='button' class='btn btn-danger  btn-sm' onClick={() => deleteUser(user.tutor_id)}>
                Delete
              </button>
            ),
          });
        });

        usersData.current = parsedUsers;

        setUsers(parsedUsers);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const deleteUser = (userId) => {
    console.log("Del", userId);
    fetch("http://127.0.0.1:5000/deletetutorinvoice/".concat(userId), {
      method: "delete",
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
        fetchData();
      });
  };
  const Invoice1 = (userId) => {
    console.log("tutor Id", userId);
    navigate(`/tutors-invoice/${userId}`);
  };
  const search = (event) => {
    const searchTerm = event.target.value;
    setinputdata(searchTerm);
    if (searchTerm.trim() === "") {
      setUsers(usersData.current);
      return;
    }

    let filteredUsers = usersData.current.filter((user) => {
      let stringValues = Object.entries(user)
        .map((innerUser) => innerUser[1])
        .join("");

      return stringValues.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setUsers(filteredUsers);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div class='one'>
        <h1>Invoice Data</h1>
      </div>

      <button
        class='btn_1 full_width text-center'
        onClick={(event) => {
          event.preventDefault();

          fetch("http://127.0.0.1:5000/invoicetutor", {
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          })
            .then((response) => response.text())
            .then((result) => {
              alert("Data is already exists in the database.");
              console.log(result);
              // navigate("/Updatetutors");
            })
            .catch((error) => alert("Data inserted", error));
        }}>
        Generate Invoice
      </button>

      <form class='d-flex'>{/* <input class='form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' /> */}</form>
      <div className='datatable'>
        <DataTable columns={columns} data={users} pagination selectableRowsHighlight highlightOnHover subHeader subHeaderComponent={<input class='w-25 form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='modaltitle' closeButton>
          <Modal.Title className='modaltitle'>TASK INFORMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='modaldata'>Tutor_id : {userToEdit.tutor_id}</p>
          <p className='modaldata'>Discount : {userToEdit.discount}</p>
          <p className='modaldata'>Total_price : {userToEdit.price}</p>
          <p className='modaldata'>Invoice_date : {userToEdit.date}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TutorsInvoicetabledata;
