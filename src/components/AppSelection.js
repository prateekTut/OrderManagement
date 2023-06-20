import { Button, Container } from "react-bootstrap";
import Headerr from "./Headerr";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
function AppSelection() {
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const routeChange = () =>{ 
      let path = "/dashboard"; 
      navigate(path);
    }

    const routeToGmail = () =>{ 
        let path = "/home/prateek/Documents/Order Management/adminreact.js/comms-front-end"; 
        navigate(path);
      }

    return (
     
        <div className='main_content_iner'>
        <Container>
            <div class='one'>
                <h1> TutorsHive Pvt. Ltd.</h1>
            </div>
            <center>
                <h1 id='home'> Welcome To Home Page </h1>
                <Button onClick={routeToGmail}>Gmail App</Button> 
                    <br></br>
                    <br></br>
                    <br></br>

                    <Button onClick={routeChange}>Order Management App</Button>
            </center>
        </Container>
        </div>
    );
}


export default AppSelection;