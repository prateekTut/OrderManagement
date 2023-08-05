import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Resister.css";
import "./css/main.css";
import { Modal, Button } from "react-bootstrap";
import { cloneDeep } from "lodash";
import DataTable from "react-data-table-component";
import "./css/table.css";
import "./css/Heading.css";
import { useRef } from "react";
import Tryform from "./tryform";
import axios from "axios";
import { FRONTEND_API } from "./urls";

function UpdateTutordata() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  const usersData = useRef([]);
  const [inputdata, setinputdata] = useState("");

  // ===============Modal function======================
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token")

  const fetchDataformodal = (userId) => {
    console.log("Tutor ID", userId);
     fetch(FRONTEND_API + "gettutoruser/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      method: "GET",
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
    // {
    //   name: "Tutor ID",
    //   selector: (row) => row.Tutor_ID,
    // },
    {
      name: "Name",
      id: "name",
      selector: (row) => row.full_name,
      wrap: true,
    },

    {
      name: "Email",
      id: "Email",
      selector: (row) => row.Email,
      wrap: true,
    },
    {
      name: "Contact No.",
      id: "name",
      selector: (row) => row.Contact_No,
      wrap: true,
    },
    {
      name: "DOB",
      id: "name",
      selector: (row) => row.expert_Dob,
      wrap: true,
    },
    {
      name: "Status",
      id: "name",
      selector: (row) => row.expert_status,
      wrap: true,
    },
    {
      name: "Address",
      id: "name",
      selector: (row) => row.Address,
      wrap: true,
    },
    {
      name: "Invoice",
      id: "name",
      selector: (row) => row.Invoice,
      wrap: true,
    },
    {
      name: "View",
      id: "name",
      selector: (row) => row.View,
      wrap: true,
    },
    {
      name: "Update",
      id: "name",
      selector: (row) => row.EditUser,
    },
    {
      name: "Delete",
      id: "name",
      selector: (row) => row.DeleteUser,
    },
  ];
  const fetchData = () => {
    fetch(FRONTEND_API + "getexpert", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        console.log("RAW", rawData)
        const parsedUsers = [...users];
        
        const data = rawData;
        console.log(data)
        data.forEach((user) => {
          parsedUsers.push({
            Tutor_ID: user.id,
            full_name: user.Expert_firstname + " " + user.Expert_lastname,
            Email: user.Expert_email,
            Contact_No: user.Expert_contact,
            Address: user.Expert_address,
            expert_Dob: user.Expert_DOB,
            expert_status: user.Expert_status,
            View: (
              <Button variant='btn btn-success btn-sm' onClick={() => fetchDataformodal(user.id)}>
                View
              </Button>
            ),
            EditUser: (
              <button type='button' class='btn btn-success btn-sm' onClick={() => editUser(user.id)}>
                Edit
              </button>
            ),
            Invoice: (
              <button type='button' class='btn btn-success btn-sm' onClick={() => tutorsinvoice(user.id)}>
                invoice
              </button>
            ),
            DeleteUser: (
              <button type='button' class='btn btn-danger  btn-sm' onClick={() => deleteUser(user.id)}>
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
    fetch(FRONTEND_API + "deleteexpert/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      },
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
        fetchData();
      });
  };
  const editUser = (userId) => {
    console.log("Tutor ID", userId);
    navigate(`/Updatetutors/${userId}`);
  };

  const tutorsinvoice = (userId) => {
    console.log("Tutor ID", userId);
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
      <>
        <div class='one'>
          <h1>Tutors information </h1>
        </div>
        {/* <button onClick={fetchData} className='OTMbutton'>
          <Link to=''>Tutors</Link>
        </button> */}
        <button className='Addbutton'>
          <Link to='/tutors'>
            <button type='button' class='btn btn-success btn-sm'>
              Add Tutors
            </button>
          </Link>
        </button>
        <form class='d-flex'>{/* <input class='form-control-m ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' /> */}</form>
        <div className='datatable'>
          <DataTable columns={columns} data={users} pagination selectableRowsHighlight highlightOnHover subHeader subHeaderComponent={<input class='w-25 form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />} expandablerows />
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modaltitle' closeButton>
            <Modal.Title className='modaltitle'>TUTORS INFORMATION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='modaldata'>Name : {userToEdit.firstName}</p>
            <p className='modaldata'>Email : {userToEdit.email}</p>
            <p className='modaldata'>Contact No. : {userToEdit.contact}</p>
            <p className='modaldata'>Address : {userToEdit.address}</p>
            <p className='modaldata'>Expert DOB : {userToEdit.dob}</p>
            <p className='modaldata'>Status : {userToEdit.status}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={() => editUser(userToEdit[0])}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default UpdateTutordata;
