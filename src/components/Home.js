import React, { useEffect } from "react";
import { useState } from "react";
import Headerr from "./Headerr";
import "./css/main.css";
import "./css/Heading.css";

function Home() {
  const [users, setUsers] = useState([]);
  const fetchstudentData = () => {
    fetch("http://127.0.0.1:5000/getstudentclientdata")
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data.length);
        setUsers(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  useEffect(() => {
    fetchstudentData();
  }, []);

  console.log(users.length);
  return (
    <div className='main_content_iner'>
      <div class='one'>
        <h1> #No.1 Academic Writing Services </h1>
      </div>
      <center>
        <h1 id='home'> Welcome To Home Page </h1>
      </center>
      <table>
        <thead>
          <tr>
            <th>ID{users.length}</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user[1]}>
              <td>{user[2]}</td>
              <td>{user[3]}</td>
              <td>{user[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
