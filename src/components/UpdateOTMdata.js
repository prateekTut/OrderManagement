import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./css/Resister.css";
import "./css/main.css";
import { cloneDeep } from "lodash";
import DataTable from "react-data-table-component";
import "./css/table.css";
import "./css/Heading.css";
import { useRef } from "react";
import { FRONTEND_API } from "./urls";

function UpdateOTMdata() {
  const usersData = useRef([]);
  const [inputdata, setinputdata] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  // ===============Modal function======================
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token")
  
  const fetchDataformodal = (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getotmuser/".concat(userId), {
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
    // {
    //   name: "OTM ID",
    //   selector: (row) => row.Tutor_ID,
    // },
    {
      name: "Name",
      id: "name",
      selector: (row) => row.Full_name,
      wrap: true,
    },

    {
      name: "  Password",
      id: "name",
      selector: (row) => row.password,
      wrap: true,
    },
    {
      name: " Email",
      id: "name",
      selector: (row) => row.Email,
      wrap: true,
    },
    {
      name: " Contact No.",
      id: "name",
      selector: (row) => row.Contact_No,
      wrap: true,
    },
    {
      name: "joining Date",
      id: "name",
      selector: (row) => row.joiningDate,
      wrap: true,
    },
    {
      name: "Level",
      id: "name",
      selector: (row) => row.Level,
      wrap: true,
    },
    {
      name: "Type",
      id: "name",
      selector: (row) => row.type,
    },
    {
      name: "View",
      id: "name",
      selector: (row) => row.View,
    },
    {
      name: "Upadet",
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
    fetch(FRONTEND_API + "getotm1", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        console.log("raw " , rawData)
        const parsedUsers = [...users];
        const data = rawData;
        data.forEach((user) => {
          parsedUsers.push({
            Tutor_ID: user[0],
            Full_name: user.firstname +" "+ user.lastname,
            password: user.password,
            Email: user.email,
            Contact_No: user.contact,
            joiningDate: user.joiningDate,
            Level: user.Level,
            type: user.type,
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
    fetch(FRONTEND_API + "deleteotm/".concat(userId), {
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

  const editUser = (userId) => {
    console.log("OTM ID", userId);
    navigate(`/updateotm/${userId}`);
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
          <h1> OTM Member information </h1>
        </div>
        {/* <button className='Addbutton'>
          <Link to='/otm'>
            <button type='button' class='btn btn-success btn-sm'>
              Add OTM members
            </button>
          </Link>
        </button> */}
        <form class='d-flex'>{/* <input class='form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' /> */}</form>
        <div className='datatable'>
          <DataTable columns={columns} data={users} pagination selectableRowsHighlight highlightOnHover subHeader subHeaderComponent={<input class='w-25 form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />} />
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modaltitle' closeButton>
            <Modal.Title className='modaltitle'>OTM's INFORMATION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='modaldata'>Name : {userToEdit.firstname + " " + userToEdit.lastname}</p>
            <p className='modaldata'>Email : {userToEdit.email}</p>
            <p className='modaldata'>Contact No. : {userToEdit.contact}</p>
            <p className='modaldata'>Joining Date: {userToEdit.joiningDate}</p>
            <p className='modaldata'>Level : {userToEdit.Level}</p>
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

export default UpdateOTMdata;
