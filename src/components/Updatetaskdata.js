import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Resister.css";
import "./css/main.css";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import { cloneDeep } from "lodash";
import "./css/table.css";
import "./css/Heading.css";
import { useRef } from "react";

function Updatetaskdata() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [statususer, setstatususer] = useState([]);
  const [forstatususers, setforstatususers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  const [statusToEdit, setstatusToEdit] = useState([]);
  const usersData = useRef([]);

  const [inputdata, setinputdata] = useState("");

  // ===============Modal function======================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [statusshow, setstatusShow] = useState(false);
  const statushandleClose = () => setstatusShow(false);
  const handlestatusShow = () => setstatusShow(true);
  const token = sessionStorage.getItem("token")

  const fetchDataformodal = (userId) => {
    console.log("Tutor ID", userId);
    fetch("http://127.0.0.1:5000/gettaskid/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        handleShow();

        console.log("Tutors data", data);
        setUserToEdit(JSON.parse(data)[0]);
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  // ===============End======================

  // ==================== for update task status start============
  const fetchDataforupdatestatus = (userId) => {
    console.log("OTM ID", userId);
    fetch("http://127.0.0.1:5000/gettaskid/".concat(userId))
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        handlestatusShow();
        console.log("budget DATA", data);
        setforstatususers(JSON.parse(data)[0]);
        // navigate("/Budgetform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  // ==================== for update task status end============

  const columns = [
    // {
    //   name: "Order ID",
    // id: "name",
    //   selector: (row) => row.Order_ID,
    // },
    {
      name: "Subject",
      id: "name",
      selector: (row) => row.Task_Subject,
      wrap: true,
    },
    {
      name: "Budget",
      id: "name",
      selector: (row) => row.Vendor_budget,
    },
    {
      name: "Expert ID",
      id: "name",
      selector: (row) => row.Expert_ID,
    },
    {
      name: "Client ID",
      id: "name",
      selector: (row) => row.Client_id,
    },
    {
      name: "Status",
      id: "name",
      selector: (row) => row.Status,
      wrap: true,
    },
    {
      name: "Change Status",
      id: "name",
      selector: (row) => row.Change_Status,
      wrap: true,
    },
    {
      name: "Start Date",
      id: "name",
      selector: (row) => row.Start_date,
    },
    {
      name: "End Date",
      id: "name",
      selector: (row) => row.End_date,
    },
    {
      name: "Expert Start Date",
      id: "name",
      selector: (row) => row.Expert_startDate,
    },
    {
      name: "Expert End Date",
      id: "name",
      selector: (row) => row.Expert_endDate,
    },
    {
      name: "Qc Expert Id",
      id: "name",
      selector: (row) => row.Qc_Expert_id,
    },
    {
      name: "Otm Id",
      id: "name",
      selector: (row) => row.Otm_id,
    },
    {
      name: "Description",
      id: "name",
      selector: (row) => row.Description,
      wrap: true,
    },
    {
      name: "Word Count",
      id: "name",
      selector: (row) => row.Word_count,
    },
    {
      name: "Expert Price",
      id: "name",
      selector: (row) => row.Expert_price,
    },
    {
      name: "View",
      id: "name",
      selector: (row) => row.View,
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
    fetch("http://127.0.0.1:5000/getordersdata", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        const parsedUsers = [...users];
        const data = JSON.parse(rawData);
        data.forEach((user) => {
          parsedUsers.push({
            Order_ID: user[0],
            Task_Subject: user[1],
            Vendor_budget: user[2],
            Expert_ID: user[3],
            Client_id: user[4],
            Status: user[5],
            Start_date: user[6],
            End_date: user[7],
            Expert_startDate: user[8],
            Expert_endDate: user[9],
            Qc_Expert_id: user[10],
            Otm_id: user[11],
            Description: user[12],
            Word_count: user[13],
            Expert_price: user[14],
            View: (
              <Button variant='btn btn-success btn-sm' onClick={() => fetchDataformodal(user[0])}>
                View
              </Button>
            ),
            Change_Status: (
              <Button variant='btn btn-success btn-sm' onClick={() => fetchDataforupdatestatus(user[0])}>
                status
              </Button>
            ),
            EditUser: (
              <button type='button' class='btn btn-success btn-sm' onClick={() => editUser(user[0])}>
                Edit
              </button>
            ),
            DeleteUser: (
              <button type='button' class='btn btn-danger  btn-sm' onClick={() => deleteUser(user[0])}>
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
    fetch("http://127.0.0.1:5000/deleteorders/".concat(userId), {
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
    console.log("Task ID", userId);
    navigate(`/Assingntask/${userId}`);
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
          <h1>Task Information </h1>
        </div>
        {/* <button onClick={fetchData} className='OTMbutton'>
          <Link to=''>Tutors</Link>
        </button> */}
        <button className='Addbutton'>
          <Link to='/addtask'>
            <button type='button' class='btn btn-success btn-sm'>
              Add Task
            </button>
          </Link>
        </button>
        <form class='d-flex'>{/* <input class='form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' /> */}</form>
        <div className='datatable'>
          {" "}
          <DataTable columns={columns} data={users} pagination selectableRowsHighlight highlightOnHover subHeader subHeaderComponent={<input class='w-25 form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />} />
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modaltitle' closeButton>
            <Modal.Title className='modaltitle'>TASK INFORMATION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='modaldata'>Subject : {userToEdit[1]}</p>
            <p className='modaldata'>Budget : {userToEdit[2]}</p>
            <p className='modaldata'>Expert ID : {userToEdit[3]}</p>
            <p className='modaldata'>Client ID : {userToEdit[4]}</p>
            <p className='modaldata'>Status : {userToEdit[5]}</p>
            <p className='modaldata'>Start Date : {userToEdit[6]}</p>
            <p className='modaldata'>End Date: {userToEdit[7]}</p>
            <p className='modaldata'>Expert Start Date : {userToEdit[8]}</p>
            <p className='modaldata'>Expert End Date : {userToEdit[9]}</p>
            <p className='modaldata'>Qc Expert Id : {userToEdit[10]}</p>
            <p className='modaldata'>Otm Id : {userToEdit[11]}</p>
            <p className='modaldata'>Description : {userToEdit[12]}</p>
            <p className='modaldata'>Word Count : {userToEdit[13]}</p>
            <p className='modaldata'>Expert Price : {userToEdit[14]}</p>
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
        <Modal show={statusshow} onHide={statushandleClose}>
          <Modal.Header className='modaltitle' closeButton>
            <Modal.Title className='modaltitle'>Update TASK Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='modaldata'>
              <div class='modal-body'>
                {forstatususers.length > 0 && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      var formdata = new FormData();
                      formdata.append("Status", forstatususers[5]);

                      var requestOptions = {
                        method: "POST",
                        body: formdata,
                        headers: {
                          'Authorization' : 'Bearer ' + token
                        }
                      };

                      fetch("http://127.0.0.1:5000/updatestatustask/".concat(forstatususers[0]), requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                          statushandleClose();

                          alert("Data Updated");
                          // fetchData();
                          // console.log(typeof result, result);
                          setUsers([]); // clear
                         
                          setUsers(users);
                          window.location.reload();
                          // console.log("result", JSON.parse(result));
                          // setUsers(JSON.parse(result));
                        })
                        .catch((error) => {
                          console.log(error);
                          // alert("error", error)
                        });
                    }}>
                    <div class=''>
                      {/* <label htmlFor=''>select client status </label> */}
                      <select
                        class='form-select form-select-m'
                        value={forstatususers[5]}
                        onInput={(e) => {
                          let updatedData = cloneDeep(forstatususers);
                          updatedData[5] = e.target.value;
                          setforstatususers(updatedData);
                        }}
                        required>
                        <option value=''>Select User Type </option>
                        <option value='New Order'>New Order</option>
                        <option value='Assigned'>Assigned</option>
                        <option value='QC'>QC</option>
                        <option value='Rework'>Rework</option>
                        <option value='Submitted'>Submitted</option>
                        <option value='Pass'>Pass</option>
                        <option value='Failed'>Failed</option>
                        <option value='Reassigned'>Reassigned</option>
                      </select>
                    </div>
                    <br />
                    <button class='btn_1 full_width text-center' type='submit'>
                      Save
                    </button>
                  </form>
                )}
              </div>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary'>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Updatetaskdata;
