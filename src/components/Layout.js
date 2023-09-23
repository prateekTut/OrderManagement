import { Outlet } from "react-router-dom"
import Headerr from "./Headerr";
import NavBarMain from "./NavBarMain";
import { Box, Container, Paper } from "@mui/material";
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import Dashbord from "./Dashbord";

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: "55px",
    paddingLeft: "30px",
    
  }));

  
const Layout = () => {
    return (
        <Box>
            <NavBarMain />
            < StyledBox >
                <Outlet />
            </StyledBox>
        </Box>
    )
}

export default Layout