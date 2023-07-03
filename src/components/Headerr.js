import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Sidebar.css";
import "./css/Header.css";
import "./css/main.css";
import Logo from "./img/logo.jpg";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

function Headerr() {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

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

  return (
    <div>
      <div className='main_content_iner'>
        <div class='sidenav'>
          <nav class='navbar navbar-expand-sm ' id='navbar'>
            <div class='container-fluid'>
              <a class='navbar-brand' href='#'>
                <img src={Logo} alt='BigCo Inc. logo' id='logo' />
              </a>
              <a class='navbar-brand'></a>
              <div class='collapse navbar-collapse'>
                <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li class='nav-item'>
                    <a class='nav-link active' aria-current='page'>
                      <Link to='/home'> Home </Link>
                    </a>
                  </li>
                  <li class='nav-item'>
                    {/* <a class='nav-link active' aria-current='page'>
                      <Link to='/allbutton'> All Buttons</Link>
                    </a> */}
                  </li>
                  {/* <li class='nav-item'>
                    <a class='nav-link '  tabindex='-1' aria-disabled=''>
                      <Link to='/'>Register</Link>
                    </a>
                  </li> */
                  console.log(auth)}

                  {auth?.roles ? (
                    <li class='nav-item'>
                      <a class='nav-link ' href='#' tabindex='-1' onClick={logout}>
                        <Link to=''>Sign out</Link>
                      </a>
                    </li>
                  ) : (
                    <li class='nav-item'>
                      <a class='nav-link ' href='#' tabindex='-1' aria-disabled=''>
                        <Link to='/login'>Login</Link>
                      </a>
                    </li>
                    // ==========================================================
                  )}
                </ul>
              </div>
            </div>
          </nav>
          {auth?.roles == "admin" ? (
            <>
              <a id='anav' class='sidemenu'>
                <Link to='/Updatetutors'> Tutor </Link>
              </a>

              <a class='sidemenu'>
                <Link to='/updateotm'> OTM's</Link>
              </a>
              <a class='dropdown'>
                <a class='dropbtn'>Clients</a>
                <div class='dropdown-content'>
                  <Link to='/UpdateClientdata'>Student's</Link>
                  <Link to='/Updatevonder'>Vendor's</Link>
                </div>
              </a>
              <a class='sidemenu'>
                <Link to='/Assingntask'>Assign Task</Link>
              </a>
              {/* <a class='sidemenu'>
                <Link to='/invoicedata'>Invoice</Link>
              </a>
              <a class='sidemenu'>
                <Link to='/tutors-invoice'>Invoice</Link>
              </a> */}
              <a class='dropdown'>
                <a class='dropbtn'>Invoice</a>
                <div class='dropdown-content'>
                  <Link to='/invoicedata'>Client Invoice</Link>
                  <Link to='/tutors-invoice'>Tutor Invoice</Link>
                </div>
              </a>
            </>
          ) : auth?.roles ? (
            <a class='sidemenu'>
              <Link to='/Assingntask'>Assign Task</Link>
            </a>
          ) : (
            <p></p>
          )}

          {/* <a class='sidemenu'>
            <Link to='/Updatebudget'>Budget</Link>
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Headerr;
