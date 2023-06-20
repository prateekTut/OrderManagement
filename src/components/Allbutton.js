import React from "react";
import { Link } from "react-router-dom";
import "./css/Heading.css";
import "./css/main.css";

function Allbutton() {
  return (
    <>
      <div class='one'>
        <h1>Tutors information </h1>
      </div>
      <div className='Allbutton'>
        <table>
          <tr>
            <td>
              <Link to='/Updatetutors'>
                <button type='button' class='btn btn-success btn-sm'>
                  Tutors
                </button>
              </Link>
            </td>
            <td>
              <Link to='/updateotm'>
                <button type='button' class='btn btn-success btn-sm'>
                  OTM Mambers
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to='/UpdateClientdata'>
                <button type='button' class='btn btn-success btn-sm'>
                  Clients
                </button>
              </Link>
            </td>
            <td>
              <Link to='/Updatebudget'>
                <button type='button' class='btn btn-success btn-sm'>
                  Budgets
                </button>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Allbutton;
