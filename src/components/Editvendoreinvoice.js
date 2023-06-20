import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

function Editvendoreinvoice() {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, params.userId);
  const [userToEdit, setUserToEdit] = useState([]);
  const fetchDataforupdate = (userId) => {
    console.log("OTM ID", userId);
    fetch("http://127.0.0.1:5000/getvendordataforupinvoice/".concat(userId))
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("==", data);
        setUserToEdit(JSON.parse(data));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const editUser = (userId) => {
    console.log("Task ID", userId);
    navigate(`/update-vendor-invoice/${userId}`);
  };

  useEffect(() => {
    fetchDataforupdate(params.userId);
  }, []);
  return (
    <div>
      <div class='one'>
        <h1>Edit Vendor invoice</h1>
      </div>
      <table class='table table-striped'>
        <thead id='tablehead'>
          <tr>
            <th>Item's</th>
            <th class='right'>Price</th>
            <th class='center'>Update</th>
            {/* <th class='right'>Total</th> */}
          </tr>
        </thead>
        <tbody>
          {userToEdit.map((user, index) => (
            <tr key={index}>
              {/* <td>{user[0]}</td> */}
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>
                <button type='button' class='btn btn-success btn-sm' onClick={() => editUser(user[0])}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Editvendoreinvoice;
