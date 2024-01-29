import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewLogin from './components/NewLogin';

import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AppSelection from './components/AppSelection';
import { useLocation } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

import AllInvoices from './components/AllInvoices';
import Dashboard from './components/Dashbord';
import ExpenseManagement from './components/ExpenseManagement';
import GenerateInvoice from './components/GenerateInvoice';

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
      backgroundColor: '#E9D8E4',
    },
  },
  typography: {
    fontSize: 13,
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
        <Route
          path='/'
          element={<NewLogin />}
        />
        <Route
          path='/app_select'
          element={<AppSelection />}
        />
        <Route
          path='/'
          element={<Layout />}>
          {/* Public Routes */}
          <Route
            path='/unauthorized'
            element={<Unauthorized />}
          />

          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route
              path='/dashboard'
              element={<Dashboard />}
            />
            <Route
              path='/generate-invocie'
              element={<GenerateInvoice />}
            />
            <Route
              path='/order-history'
              element={<AllInvoices />}
            />
            <Route
              path='/expense-manage'
              element={<ExpenseManagement />}
            />
            <Route
              path='/expense-view/:id'
              element={<GenerateInvoice />}
            />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
