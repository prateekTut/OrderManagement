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
import { FRONTEND_API } from "./urls";

function Updatetaskdata() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [forstatususers, setforstatususers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  const [statusToUpdate, setstatusToUpdate] = useState([]);
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
    fetch(FRONTEND_API + "gettaskid/".concat(userId), {
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

  // ==================== for update task status start============
  const fetchDataforupdatestatus = (userId) => {
    console.log("OTM ID", userId);
    fetch(FRONTEND_API + "gettaskid/".concat(userId), {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        handlestatusShow();
        console.log("budget DATA", data);
        setforstatususers(data);

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
    fetch(FRONTEND_API + "getordersdata", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        const parsedUsers = [...users];
        const data = rawData;
        data.forEach((user) => {
          parsedUsers.push({
            Order_ID: user.id,
            Task_Subject: user.subject,
            Vendor_budget: user.budget,
            Expert_ID: user.expert_id,
            Client_id: user.client_id,
            Status: user.order_status,
            Start_date: user.order_start_date,
            End_date: user.order_end_date,
            Expert_startDate: user.expert_start_date,
            Expert_endDate: user.expert_end_date,
            Qc_Expert_id: user.qc_expert_id,
            Otm_id: user.otm_id,
            Description: user.description,
            Word_count: user.word_count,
            Expert_price: user.expert_price,
            View: (
              <Button variant='btn btn-success btn-sm' onClick={() => fetchDataformodal(user.id)}>
                View
              </Button>
            ),
            Change_Status: (
              <Button variant='btn btn-success btn-sm' onClick={() => fetchDataforupdatestatus(user.id)}>
                status
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
    fetch(FRONTEND_API + "deleteorders/".concat(userId), {
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
            <p className='modaldata'>Subject : {userToEdit.subject}</p>
            <p className='modaldata'>Budget : {userToEdit.budget}</p>
            <p className='modaldata'>Expert ID : {userToEdit.expert_id}</p>
            <p className='modaldata'>Client ID : {userToEdit.client_id}</p>
            <p className='modaldata'>Status : {userToEdit.status}</p>
            <p className='modaldata'>Start Date : {userToEdit.order_start_date}</p>
            <p className='modaldata'>End Date: {userToEdit.order_end_date}</p>
            <p className='modaldata'>Expert Start Date : {userToEdit.expert_start_date}</p>
            <p className='modaldata'>Expert End Date : {userToEdit.expert_end_date}</p>
            <p className='modaldata'>Qc Expert Id : {userToEdit.qc_expert_id}</p>
            <p className='modaldata'>Otm Id : {userToEdit.otm_id}</p>
            <p className='modaldata'>Description : {userToEdit.description}</p>
            <p className='modaldata'>Word Count : {userToEdit.word_count}</p>
            <p className='modaldata'>Expert Price : {userToEdit.expert_price}</p>
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
                      formdata.append("Status", statusToUpdate);
                      console.log(statusToUpdate)
                      var requestOptions = {
                        method: "POST",
                        body: formdata,
                        headers: {
                          'Authorization' : 'Bearer ' + token
                        }
                      };

                      fetch(FRONTEND_API + "updatestatustask/".concat(forstatususers[0].id), requestOptions)
                        .then((response) => response.status == 200)
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
                        value={statusToUpdate}
                        onInput={(e) => {
                          //let updatedData = cloneDeep(forstatususers);
                          //updatedData[5] = e.target.value;
                          //setforstatususers(updatedData);
                          setstatusToUpdate(e.target.value)
                        }}
                        required>
                        <option value=''>Select Order Status </option>
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
