import { Button, Container } from "react-bootstrap";
import Headerr from "./Headerr";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Paper, Box, Grid, Typography} from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


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

  const RightBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Align content to the right
    padding: '16px',
    marginTop: '50px',
    backgroundColor: '#fff',
    borderRadius: '10px'

  });

  const Logo = styled('img')({
    width: '180px', // Set the width of the logo
    height: '100px', // Set the height of the logo
    objectFit: 'contain', // Ensure the logo scales without distortion
  });
  
  const BrandName = styled(Typography)({
    fontWeight: 'bold', // Apply a bold font weight to the brand name
    color: '#333', // Set the text color
    
  });

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
                    spacing={18}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                   
                    >
                
                    <Grid item xs={6}>
                        <RightBox onClick={routeToGmail}>
                            <Logo src="gmail_logo.png" alt="Gmail App" />
                            <BrandName noWrap variant="h6">Gmail Application</BrandName>
                        </RightBox>
                       
                    </Grid>

                    <Grid item xs={6}>
                        <RightBox onClick={routeChange}>
                            <Logo src="order_manage.webp" alt="Order Management App" />
                            <BrandName noWrap variant="h6">Order Management Application</BrandName>
                        </RightBox>
                        
                    </Grid>
                
                </Grid>
          
        </Container>
      
    );
}


export default AppSelection;