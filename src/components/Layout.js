import { Outlet } from "react-router-dom"
import NavBarMain from "./NavBarMain";
import { Box, Container, Paper } from "@mui/material";
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import Dashbord from "./Dashbord";

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: "55px",
    marginLeft: 50,
    flex: 1, 
    overflowY: 'auto'
}));

  
const Layout = () => {
    return (
        <Box sx={{background: "#FBF1F7", height: "100vh", // Use 100vh for 100% of the viewport height
        display: 'flex',
        flexDirection: 'column',}}>
            <NavBarMain />
            <StyledBox>
               <Outlet />
            </StyledBox>
        </Box>
    )
}

export default Layout