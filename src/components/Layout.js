import { Outlet } from "react-router-dom"
import NavBarMain from "./NavBarMain";
import { Box, Container, Paper } from "@mui/material";
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import { useState } from "react";

const drawerWidth = 280;

const StyledBox = styled(Box)(({ theme, drawerOpen }) => ({
    marginTop: "55px",
    flex: 1,
    marginBottom: "25px",
    overflowY: 'auto',
    marginLeft: drawerOpen ? `${drawerWidth}px` : '80px', // Adjust the left margin based on drawer state
    transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const Layout = () => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
  
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
      return (
        <Box sx={{background: "#FBF1F7", height: "100vh", // Use 100vh for 100% of the viewport height
        display: 'flex',
        flexDirection: 'column',}}>
            <div>
                <NavBarMain onDrawerOpen={handleDrawerOpen} onDrawerClose={handleDrawerClose} />
            </div>
            {console.log("Drawer", open)}
            <StyledBox drawerOpen={open}>
               <Outlet />
            </StyledBox>
        </Box>
    )
}

export default Layout