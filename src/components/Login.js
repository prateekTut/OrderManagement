import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./css/main.css";
import "./css/Login.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { contains, get } from "jquery";

function Login() {

  const navigate = useNavigate();
  const {setAuth} = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/app_select";
  const from1 = location.state?.from?.pathname || "/dashboard";

  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  
  const token = sessionStorage.getItem("token")
  const roles = sessionStorage.getItem("roles")

  function onSubmit(){
    var formdata = new FormData();
    formdata.append("email", user);
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://order-env.ap-south-1.elasticbeanstalk.com/test", requestOptions)
      .then((response) => 
        response.json()
      )
      
      .then(result => {
        //JSON.parse(response._bodyText)
        console.log("response data", result.type); 
        console.log("response token", result.access_token); 
        const roles_arr = [];
        sessionStorage.setItem("token", result.access_token)
        
        var roles = result.type;
        //roles_arr.append(roles)
        //console.log(roles_arr);
        sessionStorage.setItem("roles", roles)
        var user_role = roles.split(" ")
        setAuth({user_role});
        //console.log("roles in login ", sessionStorage.getItem("roles"));
        navigate("/app_select"); 

      })
      .catch((error) => console.log("error", error));
  }

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    sessionStorage.removeItem("token")
    fetch('http://order-env.ap-south-1.elasticbeanstalk.com/logout')
    .then(() => {
      window.location.href = '/home'; // Redirect to home page after logout
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const InUser = () => {
  
    const roles = sessionStorage.getItem("roles").split(" ")
    console.log("roles in loggedIn", roles); 

    setAuth({roles});

    navigate(from, {replace: true});
  
  }

  return (
    <>
    {token && token !== "" && token !== undefined ? (
      <div>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>

       <p>User already logged in {token} {InUser()} {sessionStorage.getItem("roles")}</p> 
       <button onClick={logout}>log out</button>
        {} 
      </div>
    ) : ( 
    
      <div class='main_content_iner '>
        <div class='one'>
          <h1>LogIn</h1>
        </div>
        <div class='container-fluid'>
          <div class='row justify-content-center mx-5'>
            <div class='col-8'>
              <div class='dashboard_header '>
                <div class='row'></div>
              </div>
            </div>
            <div class='col-lg-8 '>
              <div class='white_box '>
                <div class='row justify-content-center'>
                  <div class='col-lg-6'>
                    <div class='modal-content cs_modal '>
                      <div class='modal-header justify-content-center theme_bg_1 '>
                        <h5 class='modal-title text_white'>Log in</h5>
                      </div>
                      <div class='modal-body'>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}>
                          <div class=''>
                            <input
                              type='text'
                              value={user}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setuser(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Enter your email'
                            />
                          </div>
                          <div class=''>
                            <input
                              type='password'
                              value={password}
                              onInput={(e) => {
                                console.log(e.target.value);
                                setpassword(e.target.value);
                              }}
                              class='form-control'
                              placeholder='Password'
                            />
                          </div>
                          <button
                            class='btn_1 full_width text-center'
                            onClick={onSubmit}>
                            Log in
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      
    </>
  );
}

export default Login;
