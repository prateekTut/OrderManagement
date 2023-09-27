import { Button, Container } from "react-bootstrap";
import Headerr from "./Headerr";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import OrderManagementImg from "./img/order_manage.png";
import GmailImg from "./img/gmail_logo.png"

import "./css/main.css"

const StyledBox = styled(Box)(({ theme }) => ({
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
  },
  paddingTop: '15px',
  paddingBottom: '15px',
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'center',
}));

const InfoBox = styled(Box)(({ theme }) => ({

  h3: {
    fontSize: '1.5rem',
    fontWeight: 300,
    paddingTop: '15px',
  },
  paddingTop: '15px',
  paddingBottom: '15px',
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'center',
}));

const RightBox = styled(Paper)({
  padding: '10px',
  marginTop: '50px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  cursor: 'pointer',
});

const Logo = styled('img')({
  width: '180px', // Set the width of the logo
  height: '100px', // Set the height of the logo
  objectFit: 'contain', // Ensure the logo scales without distortion
});

const BrandName = styled(Typography)({
  fontWeight: 'bold', // Apply a bold font weight to the brand name
  color: '#333', // Set the text color
  marginTop: '20px', // Add some space
});

function AppSelection() {

  const location = useLocation();
  const navigate = useNavigate();

  const routeChange = () => {
    let path = "/dashboard";
    navigate(path);
  }

  const routeToGmail = () => {
    let path = "/home/prateek/Documents/Order Management/adminreact.js/comms-front-end";
    navigate(path);
  }

  return (
    <div style={{backgroundColor: '#FBF1F7', height: '100vh'}}>
    <Container> 
      <StyledBox>
        <h1> Welcome to TutorsHive Pvt. Ltd.</h1>

      </StyledBox>
      <InfoBox>
        <h3> Select the application of Your Choice </h3>
      </InfoBox>


      <Grid
        paddingLeft="50px"
        paddingRight="50px"
        container
        spacing={12}
        direction="row"
        alignItems="center"
        justifyContent="center"

      >

        <Grid item xs={5}>
          <RightBox onClick={routeToGmail}>
            <div className="centered-content">
              <Logo src={GmailImg} alt='Gmail App' id='invoicelogo' />
              <BrandName variant="h6">Gmail Application</BrandName>
            </div>
          </RightBox>


        </Grid>

        <Grid item xs={5}>
          <RightBox onClick={routeChange}>
            <div className="centered-content">
              <Logo src={OrderManagementImg} alt='BigCo Inc. logo' id='invoicelogo' />
              <BrandName variant="h6">Order Management Application</BrandName>
            </div>
          </RightBox>

        </Grid>

      </Grid>

    </Container>
    </div>

  );
}


export default AppSelection;