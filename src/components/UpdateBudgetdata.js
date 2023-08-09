import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Resister.css";
import "./css/main.css";
import { cloneDeep } from "lodash";
import DataTable from "react-data-table-component";
import "./css/table.css";
import "./css/Heading.css";
import { useRef } from "react";
import { FRONTEND_API } from "./urls";

function UpdateBudgetdata() {
  const usersData = useRef([]);
  const [inputdata, setinputdata] = useState("");
  const navigate = useNavigate();
  const [Client_name, setClient_name] = useState();
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState([]);
  const [users1, setUsers1] = useState([]);

  const columns = [
    {
      name: "Budget id",
      id: "name",
      selector: (row) => row.Budget_id,
    },
    {
      name: "Client id ",
      id: "name",
      selector: (row) => row.Client_id,
    },
    {
      name: "Package price",
      id: "name",
      selector: (row) => row.Package_price,
    },
    {
      name: "Amount Paid",
      id: "name",
      selector: (row) => row.Amount_Paid,
    },
    {
      name: "Pending amount",
      id: "name",
      selector: (row) => row.Pending_amount,
    },
    {
      name: "Mode of payment",
      id: "name",
      selector: (row) => row.Mode_of_payment,
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
    fetch(FRONTEND_API + "getbudgetdata")
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        const parsedUsers = [...users];
        const data = JSON.parse(rawData);
        data.forEach((user) => {
          parsedUsers.push({
            Budget_id: user[0],
            Client_id: user[1],
            Package_price: user[2],
            Amount_Paid: user[3],
            Pending_amount: user[4],
            Mode_of_payment: user[5],
            Status: user[6],
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
        fetchData();
      });
  };

  const editUser = (userId) => {
    console.log("budget ID", userId);
    navigate(`/Updatebudget/${userId}`);
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
          <h1> Budget information </h1>
        </div>
        <button className='OTMbutton'>
          <Link to='/Budget'>
            <button type='button' class='btn btn-success btn-sm'>
              Add Budget
            </button>
          </Link>
        </button>
        <form class='d-flex'>{/* <input class='form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' /> */}</form>
        <div className='datatable'>
          <DataTable columns={columns} data={users} pagination subHeader subHeaderComponent={<input class='w-25 form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />} />
        </div>

        {/* <DataTable className='datatable' title='Tutors Data' columns={columns} data={users} pagination subHeader subHeaderComponent={<input class='w-25 form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />} /> */}
        <div class='main_content_iner ' id='displaynone'>
          <div class='container-fluid '>
            <div class='row justify-content-center mx-5'>
              <div class='col-12'>
                <div class='dashboard_header '>
                  <div class='row'></div>
                </div>
              </div>
              <div class='col-lg-12'>
                <div class='white_box '>
                  <div class='row justify-content-center'>
                    <div class='col-lg-6'></div>
                    <div class='modal-content cs_modal'>
                      <div class='modal-header justify-content-center theme_bg_1 '>
                        <h5 class='modal-title text_white'>Add Budget</h5>
                      </div>
                      <div class='modal-body'>
                        {userToEdit.length > 0 && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                            }}>
                            <div>
                              {" "}
                              {/* <label htmlFor=''>select client Name</label> */}
                              <select
                                class='form-select form-select-sm'
                                value={Client_name}
                                onInput={(e) => {
                                  console.log(e.target.value);
                                  setClient_name(e.target.value);
                                }}>
                                <option>Select Client Name</option>
                                {users1.map((user, index) => (
                                  <option value={user[1]}>{user[1]}</option>
                                ))}
                              </select>
                            </div>
                            <br />
                            <div class=''>
                              <input
                                type='number'
                                value={userToEdit[2]}
                                onInput={(e) => {
                                  let updatedData = cloneDeep(userToEdit);
                                  updatedData[2] = e.target.value;
                                  setUserToEdit(updatedData);
                                }}
                                class='form-control'
                                placeholder='Package_price'
                              />
                            </div>
                            <div class=''>
                              <input
                                type='number'
                                value={userToEdit[3]}
                                onInput={(e) => {
                                  let updatedData = cloneDeep(userToEdit);
                                  updatedData[3] = e.target.value;
                                  setUserToEdit(updatedData);
                                }}
                                class='form-control'
                                placeholder='Amount Paid'
                              />
                            </div>
                            {/* <div class=''>
                              <input
                                type='number'
                                value={userToEdit[4]}
                                onInput={(e) => {
                                  let updatedData = cloneDeep(userToEdit);
                                  updatedData[4] = e.target.value;
                                  setUserToEdit(updatedData);
                                }}
                                class='form-control'
                                placeholder='Pending Amount'
                              />
                            </div> */}
                            <div class=''>
                              <input
                                type='text'
                                value={userToEdit[5]}
                                onInput={(e) => {
                                  let updatedData = cloneDeep(userToEdit);
                                  updatedData[5] = e.target.value;
                                  setUserToEdit(updatedData);
                                }}
                                class='form-control'
                                placeholder='Mode Of Payment'
                              />
                            </div>
                            <div class=''>
                              <input
                                type='text'
                                value={userToEdit[6]}
                                onInput={(e) => {
                                  let updatedData = cloneDeep(userToEdit);
                                  updatedData[6] = e.target.value;
                                  setUserToEdit(updatedData);
                                }}
                                class='form-control'
                                placeholder='Enter status'
                              />
                            </div>
                            <button
                              class='btn_1 full_width text-center'
                              onClick={() => {
                                var formdata = new FormData();
                                formdata.append("Client_name", Client_name);
                                formdata.append("Package_price", userToEdit[2]);
                                formdata.append("Amount_Paid", userToEdit[3]);
                                const userToEdit1 = userToEdit[2] - userToEdit[3];
                                formdata.append("Pending_amount", userToEdit1);
                                formdata.append("Mode_of_payment", userToEdit[5]);
                                formdata.append("Status", userToEdit[6]);

                                var requestOptions = {
                                  method: "POST",
                                  body: formdata,
                                };

                                fetch(FRONTEND_API + "updatebudget/".concat(userToEdit[0]), requestOptions)
                                  .then((response) => response.json())
                                  .then((result) => {
                                    alert("Data Updated");
                                    console.log(typeof result, result);
                                    setUserToEdit([]); // clear
                                    console.log(users);
                                    console.log("result", JSON.parse(result));
                                    setUsers(JSON.parse(result));
                                    navigate("/Updatebudget");
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                    // alert("error", error)
                                  });
                              }}>
                              submit
                            </button>
                            <p>
                              Need an account?
                              <a id='link' data-toggle='modal' data-target='#sing_up' data-dismiss='modal' href='#'>
                                Log in
                              </a>
                            </p>
                            <div class='text-center'>
                              <a id='link' href='#' data-toggle='modal' data-target='#forgot_password' data-dismiss='modal' class='pass_forget_btn'>
                                Forget Password?
                              </a>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default UpdateBudgetdata;
