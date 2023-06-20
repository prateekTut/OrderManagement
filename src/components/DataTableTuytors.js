import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./css/table.css";
import "./css/Heading.css";
import { useRef } from "react";

function DataTableTuytors() {
  const [users, setUsers] = useState([]);
  const usersData = useRef([]);

  // const [filterdata, setfilterdata] = useState([]);
  const [inputdata, setinputdata] = useState("");
  const columns = [
    {
      name: "Tutor ID",
      selector: (row) => row.Tutor_ID,
    },
    {
      name: "Tutor First Name",
      selector: (row) => row.first_name,
    },
    {
      name: "Tutor last Name",
      selector: (row) => row.last_name,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
    },
    {
      name: "Contact No.",
      selector: (row) => row.Contact_No,
    },
    {
      name: "Address",
      selector: (row) => row.Address,
    },
    {
      name: "Delete",
      selector: (row) => row.DeleteUser,
    },
  ];

  // console.log(columns, data);
  const fetchData = () => {
    fetch("http://127.0.0.1:5000/getexpert")
      .then((res) => res.json())
      .then((rawData) => {
        // do something with data
        const parsedUsers = [...users];
        const data = JSON.parse(rawData);
        data.forEach((user) => {
          parsedUsers.push({
            Tutor_ID: user[0],
            first_name: user[1],
            last_name: user[2],
            Email: user[3],
            Contact_No: user[4],
            Address: user[5],
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
    fetch("http://127.0.0.1:5000/deleteexpert/".concat(userId), {
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
  return (
    <>
      <div class='one'>
        <h1>Tutors Data</h1>
      </div>
      {/* <button onClick={fetchData} className='OTMbutton'>
        <Link to=''>Tutors</Link>
      </button> */}
      <button className='OTMbutton'>
        <Link to='/tutors'>Add Tutors</Link>
      </button>
      <form class='d-flex'>
        <input class='form-control ' type='search' value={inputdata} onChange={(e) => search(e)} placeholder='Search' aria-label='Search' />
      </form>
      <DataTable title='Tutors Data' columns={columns} data={users} pagination />

      <div>
        {/* {[].length > 0 && (
          <table class='table bg-dark'>
            <thead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Contact No.</th>
                <th scope='col'>Address</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {[].map((user, index) => (
                <tr key={index}>
                  <td>{user[0]}</td>
                  <td>{user[1]}</td>
                  <td>{user[2]}</td>
                  <td>{user[3]}</td>
                  <td>{user[4]}</td>
                  <td>{user[5]}</td>

                  <td>
                    <button type='button' class='btn btn-success btn-sm'>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type='button' class='btn btn-danger  btn-sm' onClick={() => deleteUser(user[0])}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} */}
      </div>
    </>
  );
}

export default DataTableTuytors;
