import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Resister.css";
import "./css/main.css";
import { FRONTEND_API } from "./urls";

function AddBudget() {
  const navigate = useNavigate();
  const [Client_id, setClient_id] = useState("");
  const [Package_price, setPackage_price] = useState("");
  const [Amount_Paid, setAmount_Paid] = useState("");
  const [Client_name, setClient_name] = useState();
  const [Mode_of_payment, setMode_of_payment] = useState("");
  const [Status, setStatus] = useState("");
  const [userToEdit, setUserToEdit] = useState([]);
  const [clients, setClient] = useState([]);

  const token = localStorage.getItem("token")


  const fetchData = () => {
                              
    fetch(FRONTEND_API + "getClient", {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setClient(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    var formdata = new FormData();
    formdata.append("Client_name", Client_name);
    formdata.append("Client_id", clients[0]);
    formdata.append("Package_price", Package_price);
    formdata.append("Amount_Paid", Amount_Paid);
    const Pending_amount = Package_price - Amount_Paid;
    formdata.append("Pending_amount", Pending_amount);
    formdata.append("Mode_of_payment", Mode_of_payment);
    formdata.append("Status", Status);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
          'Authorization' : 'Bearer ' + token
        }
      
    };

    fetch(FRONTEND_API + "Budget", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Data inserted");
        console.log(result);
        navigate("/Updatebudget");
      })
      .catch((error) => alert("error", error));
  }


  const handleChangeClient = (event) =>{

  }

  return (
    <div>
      <div class='one'>
        <h1>Budget Data</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div class=''>
          {/* <FormControl fullWidth sx={{
            marginTop: 3,
            m:1
          }}>
          <InputLabel id="demo-simple-select-label">Client</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Client_name}
            label="Select Client"
            //error={clientValid == false}
            //helperText={clientValid == false && 'Invalid Client'}
            variant='outlined'
            onChange={handleChangeClient}>
            {clients.map((data) => ( 
                
              <MenuItem value={data.id}>{data.Client_name}</MenuItem>
                
            ))}
          </Select>
          </FormControl> */}
        </div>
        <br />
        <div class=''>
          <input
            type='number'
            value={Package_price}
            onInput={(e) => {
              console.log(e.target.value);
              setPackage_price(e.target.value);
            }}
            class='form-control'
            placeholder='Package Price'
            required
          />
        </div>
        <div class=''>
          <input
            type='number'
            value={Amount_Paid}
            onInput={(e) => {
              console.log(e.target.value);
              setAmount_Paid(e.target.value);
            }}
            class='form-control'
            placeholder='Amount Paid'
            required
          />
        </div>
        <div class=''>
          <input
            type='text'
            value={Mode_of_payment}
            onInput={(e) => {
              console.log(e.target.value);
              setMode_of_payment(e.target.value);
            }}
            class='form-control'
            placeholder='Mode Of Payment'
            required
          />
        </div>
        <div class=''>
          {/* <label htmlFor=''>select client status </label> */}
          <select
            class='form-select form-select-m'
            value={Status}
            onInput={(e) => {
              console.log(e.target.value);
              setStatus(e.target.value);
            }}
            required>
            <option value=''>Select Client Status </option>
            <option value='Available'>Available</option>
            <option value='Not available'>Not available</option>
          </select>
        </div>
        <button type='submit' class='btn_1 full_width text-center'>
          submit
        </button>
      </form>
    </div>
  );
}

export default AddBudget;
