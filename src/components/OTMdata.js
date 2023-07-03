import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/table.css";
import "./css/Heading.css";

function OTMdata() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState();
  const [Student, setStudent] = useState();
  const fetchData = () => {
    fetch("http://order-env.ap-south-1.elasticbeanstalk.com/getordersdata")
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setUsers(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const deleteUser = (userId) => {
    console.log("Del", userId);
    fetch("http://order-env.ap-south-1.elasticbeanstalk.com/deleteotm/".concat(userId), {
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
  const UpadeteUser = (userId) => {
    console.log("Del", userId);
    fetch("http://order-env.ap-south-1.elasticbeanstalk.com/getordersdata/".concat(userId), {
      method: "UPDATE",
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
  const onClick = (e) => {
    setShow(e);
    setStudent(e);
  };
  return (
    <>
      <div class='one'>
        <h1>OTM Member Data</h1>
      </div>
      <div>
        <button onClick={fetchData} className='OTMbutton'>
          <Link to=''>OTM Member</Link>
        </button>
        <button className='OTMbutton'>
          <Link to='/otm'>Add OTM Member </Link>
        </button>
        -
        {users.length > 0 && (
          <table class='table '>
            <thead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>password</th>
                <th scope='col'>Email</th>
                <th scope='col'>Contact No.</th>
                <th scope='col'>joiningDate</th>
                <th scope='col'>Level</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user[0]}</td>
                  <td>
                    {" "}
                    <select>
                      {users.map((user, index) => (
                        <option value={user[1]}>{user[1]}</option>
                      ))}
                    </select>
                  </td>

                  <td>{user[1]}</td>
                  <td>{user[2]}</td>
                  <td>{user[3]}</td>
                  <td>{user[4]}</td>
                  <td>{user[5]}</td>
                  <td>{user[6]}</td>
                  <td>{user[7]}</td>
                  <td>
                    <button type='button' class='btn btn-success btn-sm' onClick={() => UpadeteUser(user[0])}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button class='btn btn-danger btn-sm' onClick={() => deleteUser(user[0])}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {Student === 1 ? <input type='text' placeholder='bussness' /> : <p></p>}
      <button class={Student === 1 ? "btn btn-success btn-sm active" : "btn btn-success btn-sm"} onClick={() => onClick(1)}>
        show
      </button>
      {Student === 2 ? <input type='text' placeholder='student' /> : <p></p>}
      <button class={show === 2 ? "btn btn-success btn-sm active" : "btn btn-success btn-sm"} onClick={() => onClick(2)}>
        student
      </button>
    </>
  );
}

export default OTMdata;
