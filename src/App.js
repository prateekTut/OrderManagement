import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewLogin from "./components/NewLogin"
import UpdateBudgetdata from "./components/UpdateBudgetdata";

import Allbutton from "./components/Allbutton";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Dashbord from "./components/Dashbord";
import AppSelection from "./components/AppSelection";
import { useLocation } from 'react-router-dom';
import Register from "./components/Register";

import AddTaskNew from "./components/AddTaskNew";
import OtmUsersConsole from "./components/OtmUsersConole";
import ExpertsConsole from "./components/ExpertsConsole";
import ClientStudentConsole from "./components/ClientStudentConsole";
import ClientVendorConsole from "./components/ClientVendorConsole";
import EditClientsDetails from "./components/EditClientsDetails";

import UpdateExpert from "./components/UpdateExpert";
import TeamLeadConsole from "./components/TeamLeadConsole";
import VendorOrderHistory from "./components/VendorOrderHistory";
import AttendanceOverview from "./components/AttendanceOverview";
import RegisterClients from "./components/RegisterClients";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline, Paper } from "@mui/material";
import NewClientInvoice from "./components/NewClientInvoice";
import AddFreelancers from "./components/AddFreelancers";
import StudentInvoices from "./components/StudentInvoices";
import GenerateVendorInvoice from "./components/GenerateVendorInvoice";

import AllInvoices from "./components/AllInvoices";
import GenerateInvoice from "./components/GenerateInvoice";
import EditInvoices from "./components/EditInvoices";
import AssignTaskConsole from "./components/AssignTaskConsole";
import ExpenseManagement from "./components/ExpenseManagement";

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
    customGreenColor: {
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
      <Routes>

        <Route path='/' element={<NewLogin />} />
        <Route path='/app_select' element={<AppSelection />} />
        <Route path='/' element={<Layout />}>

          {/* Public Routes */}
          <Route path='/unauthorized' element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>

            <Route path='/register' element={<Register />} />
            <Route path="/add-freelancers" element={<AddFreelancers />} />
            <Route path='/register-clients' element={<RegisterClients />} />
            
            <Route path='/UpdateClientdata' element={<ClientStudentConsole />} />
            <Route path='/Updatevonder' element={<ClientVendorConsole />} />

            <Route path="/updateExpert/:expertId" element={<UpdateExpert />} />

            <Route path='/Updatebudget' element={<UpdateBudgetdata />} />

            <Route path='/allbutton' element={<Allbutton />} />

            <Route path='/client-invoice/:userId' element={<NewClientInvoice />} />
            <Route path='/vendor-invoice/:userId' element={<GenerateVendorInvoice />} />

            <Route path="/editClients/:clientId" element={<EditClientsDetails />} />

            {/* <Route path="/vendor-order-history" element={<VendorOrderHistory />} /> */}
            <Route path="/order-history" element={<AllInvoices />} />

           
            <Route path="/expense-manage" element={<ExpenseManagement />} />
         
            <Route path="/generated-invoice/:invoiceId" element={<StudentInvoices />} />

            <Route path='/edit-invoices/:id' element={<EditInvoices />} />

            <Route path="/order-management" element={<AssignTaskConsole />} />

          </Route>

          <Route element={<RequireAuth allowedRoles={["admin", "hr", "otm", "lead", "expert"]} />}>

            <Route path='/dashboard' element={<Dashbord />} />
            <Route path="/order-management" element={<AssignTaskConsole />} />

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
