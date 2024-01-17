import React from 'react'
import { Typography, TextField, Grid, Container } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';

import { FRONTEND_API } from "./urls";
import { StyledTableCell, StyledTableRow } from './styles/TableStyles';

import TablePagination from '@mui/material/TablePagination';

function ClientVendorConsole() {
  const [client, setClient] = useState([]);
  const token = localStorage.getItem("token")
  const [open, setOpen] = React.useState(false);
  const [clientId, setClientId] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [openWarn, setOpenWarn] = React.useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleUserUpdate = (id) => {
    navigate(`/editClients/${id}`);
  };


  const fetchVendorData = async () => {
    try {
      const response = await fetch(FRONTEND_API + "getvendoreclientdata", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const rawData = await response.json();
      console.log(rawData)
      return rawData;
    }
    catch (rejected) {
      console.log(rejected);
      return null
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchVendorData();
      if (rawData) {
        console.log("raw ", rawData);
        setClient(rawData);
      }
    };
    fetchData();
  }, [setClient]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredClients = client.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.business_name.toLowerCase().includes(searchQuery.toLowerCase())
    // ... add more fields to search
  );

  const VendorOrderHistory = (clientId) => {
    console.log("student ID", clientId);
    navigate(`/vendor-invoice/${clientId}`);
  }


  const vendoreinvoice = (userId) => {
    console.log("Tutor ID", userId);
    navigate(`/vendor-invoice/${userId}`);
  };
  const handleClickOpenWarn = (id) => {
    setOpenWarn(true);
    setDeleteId(id);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const handleUserDelete = () => {
    var requestOptions = {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    fetch(FRONTEND_API + "delete_clients/".concat(deleteId), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        const fetchData = async () => {
          const rawData = await fetchVendorData();
          if (rawData) {
            console.log("raw ", rawData);
            setClient(rawData);
          }
        };
        fetchData();
        handleCloseWarn();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Typography variant='h1' sx={{
        marginLeft: 2,
        paddingTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        Vendors
      </Typography>

      <Box sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "end",
        marginBottom: 2,
        marginTop: 2,
        marginRight: 2
      }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}>
        <TableContainer component={Paper} sx={{
          marginBottom: 6,
          marginRight: 2
        }}
          aria-label="customized table" >
            <TablePagination
            className='table-page'
            rowsPerPageOptions={[itemsPerPage]}
            component="div"
            count={client.length}
            rowsPerPage={itemsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage="Invoices per page:"
            labelDisplayedRows={({ from, to, count }) => `Showing ${from} to ${to} Invoice of ${count} Invoice(s)`}
          />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell >Contact</StyledTableCell>
                <StyledTableCell >Business</StyledTableCell>
                <StyledTableCell >Order History</StyledTableCell>
                {/* <StyledTableCell >Invoice</StyledTableCell> */}
                <StyledTableCell >Update</StyledTableCell>
                {/* <StyledTableCell >Delete</StyledTableCell> */}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {(
                filteredClients.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((user, index) =>  (

                  <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
                    <StyledTableCell>{user.email} </StyledTableCell>
                    <StyledTableCell>{user.contact}</StyledTableCell>
                    <StyledTableCell>{user.business_name}</StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" type='submit' color="success"
                        onClick={() => VendorOrderHistory(user.id)}
                        disabled={!user.invoice}
                        size="small"
                        sx={{ marginRight: 2 }}>
                        Invoices
                      </Button>
                    </StyledTableCell>
                    {/* <StyledTableCell>
                          <Button variant="contained" type='submit' color="success" 
                            disabled={!user.invoice}
                            onClick={() => vendoreinvoice(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Invoice
                          </Button>
                        </StyledTableCell> */}
                    <StyledTableCell>
                      <Button variant="contained" type='submit' color="success"
                        onClick={() => handleUserUpdate(user.id)}
                        size="small"
                        sx={{ marginRight: 2 }}>
                        Update
                      </Button>
                      <Button variant="contained" type='submit' color="error"

                        onClick={() => handleClickOpenWarn(user.id)}
                        size="small"
                        sx={{ marginRight: 2 }}>
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={openWarn}
        onClose={handleCloseWarn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After selecting this step this user will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWarn}>Close</Button>
          <Button onClick={handleUserDelete} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default ClientVendorConsole