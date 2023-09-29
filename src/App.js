import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewLogin from "./components/NewLogin"
import Home from "./components/Home";
import UpdateOTMdata from "./components/UpdateOTMdata";
import OTMform from "./components/OTMform";
import DataTableTuytors from "./components/DataTableTuytors";
import Tutorform from "./components/Tutorform";
import OTMdata from "./components/OTMdata";
import Clientform from "./components/Clientform";
import AddBudget from "./components/AddBudget";
import UpdateBudgetdata from "./components/UpdateBudgetdata";
import Budgetform from "./components/Budgetform";
import Taskform from "./components/Taskform";
import Allbutton from "./components/Allbutton";
import Vonderform from "./components/Vonderform";
import Viewbudget from "./components/Viewbudget";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Vendorsinvoice from "./components/Vendorsinvoice";
import Editvendoreinvoice from "./components/Editvendoreinvoice";
import Updateinvoiceform from "./components/Updateinvoiceform";
import Tryform from "./components/tryform";
import Dashbord from "./components/Dashbord";
import Invoicedata from "./components/Invoicedata";
import TutorsInvoice from "./components/TutorsInvoice";
import Edittutorsinvoice from "./components/Edittutorsinvoice";
import Updatetoturinvoceform from "./components/Updatetoturinvoceform";
import TutorsInvoicetabledata from "./components/TutorsInvoicetabledata";
import AppSelection from "./components/AppSelection";
import { useLocation } from 'react-router-dom';
import Register from "./components/Register";
import AssignTaskConsole from "./components/AssignTaskConsole";
import AddTaskNew from "./components/AddTaskNew";
import OtmUsersConsole from "./components/OtmUsersConole";
import ExpertsConsole from "./components/ExpertsConsole";
import ClientStudentConsole from "./components/ClientStudentConsole";
import ClientVendorConsole from "./components/ClientVendorConsole";
import AddExpert from "./components/AddExpert";
import EditClientsDetails from "./components/EditClientsDetails";
import StudentOrderHistory from "./components/StudentOrderHistory";
import UpdateExpert from "./components/UpdateExpert";
import TeamLeadConsole from "./components/TeamLeadConsole";
import ClientInvoice from "./components/ClientInvoice";
import VendorOrderHistory from "./components/VendorOrderHistory";
import AttendanceOverview from "./components/AttendanceOverview";
import RegisterClients from "./components/RegisterClients";
import GenerateInvoice from "./components/GenerateInvoice";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline, Paper } from "@mui/material";
import NewClientInvoice from "./components/NewClientInvoice";
import AddFreelancers from "./components/AddFreelancers";


// Create a styled component for the Paper element
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#E9D8E4',
  height: '100vh',
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#343F71',
    },
    secondary: {
      main: '#F34C19',
    },
    customRedColor: {
      main: '#FF0000',
    },
    customGreenColor :{
      main: '#228B22',
    },
    background: {
      backgroundColor: '#E9D8E4'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    // Define typography styles for various elements
  },

  /*   spacing: 4, // You can adjust the spacing between elements
    shape: {
      borderRadius: 8, // You can customize the shape of components
    }, */
});

function App() {

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>

          <Route path='/' element={<NewLogin />} />
          <Route path='/app_select' element={<AppSelection />} />
          <Route path='/' element={<Layout />}>
       
            {/* Public Routes */}
            <Route path='/unauthorized' element={<Unauthorized />} />
      
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>

              <Route path='/register' element={<Register />} />
              <Route path='/registerExpert' element={<AddExpert />} />
              <Route path='/updateotm/:userId' element={<OTMform />} />
              <Route path='/Updatetutors/:userId' element={<Tutorform />} />
              <Route path='/1' element={<DataTableTuytors />} />
              <Route path='/new' element={<OTMdata />} />
              <Route path='/Assingntask/:userId' element={<Taskform />} />
              <Route path='/UpdateClientdata' element={<ClientStudentConsole />} />
              <Route path='/Updatevonder' element={<ClientVendorConsole />} />
              <Route path='/UpdateClientdata/:userId' element={<Clientform />} />
              <Route path="/updateExpert/:expertId" element={<UpdateExpert />} />
              <Route path='/Updatevonder/:userId' element={<Vonderform />} />
              <Route path='/Budget' element={<AddBudget />} />
              <Route path='/Updatebudget' element={<UpdateBudgetdata />} />
              <Route path='/Updatebudget/:userId' element={<Budgetform />} />
              <Route path='/allbutton' element={<Allbutton />} />
              <Route path='/viewbudget/:userId' element={<Viewbudget />} />
              <Route path='/client-invoice/:userId' element={<ClientInvoice />} />
              <Route path='/vendor-invoice/:userId' element={<Vendorsinvoice />} />
              <Route path='/Edit-vendor-invoice/:userId' element={<Editvendoreinvoice />} />
              <Route path='/update-vendor-invoice/:userId' element={<Updateinvoiceform />} />
              <Route path='/try' element={<Tryform />} />
              <Route path='tutors-invoice' element={<TutorsInvoicetabledata />} />
              <Route path='/tutors-invoice/:userId' element={<TutorsInvoice />} />
              <Route path='/Edit-tutors-invoice/:userId' element={<Edittutorsinvoice />} />
              <Route path='/update-tutors-invoice/:userId' element={<Updatetoturinvoceform />} />
              <Route path="/editClients/:clientId" element={<EditClientsDetails />} />
              <Route path="/order-history/:clientId" element={<StudentOrderHistory />} />
              <Route path="/vendor-order-history/:clientId" element={<VendorOrderHistory />} />
              <Route path='/invoicedata' element={<Invoicedata />} />
              <Route path='/register-clients' element={<RegisterClients />} />
              <Route path='/client-invoice' element={<GenerateInvoice />} />
              <Route path="/add-freelancers" element={<AddFreelancers />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["admin", "hr", "otm", "lead", "expert"]} />}>
              <Route path='/home' element={<Home />} />
              <Route path='/dashboard' element={<Dashbord />} />
              <Route path='/Assingntask' element={<AssignTaskConsole />} />
              <Route path='/addtask/*' element={<AddTaskNew />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["admin", "hr"]} />}>
              <Route path="/attendanceOverview" element={< AttendanceOverview />} />
              <Route path='/teamLead' element={<TeamLeadConsole />} />
              <Route path='/updateotm' element={<OtmUsersConsole />} />
              <Route path='/Updatetutors' element={<ExpertsConsole />} />
            </Route>

          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;
