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
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FRONTEND_API } from "./urls";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


function OtmUsersConsole() {
  const [otmUsers, setOtmUsers] = useState([]);
  const token = localStorage.getItem("token")
  const roles = localStorage.getItem("roles")
  const [open, setOpen] = React.useState(false);
  const [otmUsersId, setOtmUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleUserUpdate = (id) => {
    navigate(`/updateExpert/${id}`);
  };


  const fetchOtmUsers = async () => {
    try {
      var formdata = new FormData();
      formdata.append("type", "otm");

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization': 'Bearer ' + token
        }

      };
      const response = await fetch(FRONTEND_API + "getUsers", requestOptions);
      const rawData = await response.json();
      console.log(rawData)
      return rawData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchOtmUsers();
      if (rawData) {
        console.log("raw ", rawData);
        setOtmUsers(rawData);
      }
    };
    fetchData();
  }, [setOtmUsers]);

  const deleteUser = (userId) => {
    console.log("Del", userId);
    fetch(FRONTEND_API + "deleteotm/".concat(userId), {
      method: "delete",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      })
      .finally(() => {
        //fetchData();
        fetchOtmUsers();
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOtms = otmUsers.filter((client) =>
    client.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleUpdate = () => {

  }

  return (
    <Container>
      <Typography variant='h1' sx={{
          marginLeft: 2,
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          }}>
            OTM Members
          </Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "end",
        flexDirection: "column",
        marginBottom: 2,
        marginTop: 2,
        marginRight: 2
      }}>
        <Button
           startIcon={<AddIcon />}
           variant='contained' sx={{mb: 2}}>
            Add Expert
          </Button>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{
          marginBottom: 6,
          marginRight: 2
        }}
          aria-label="customized table" >
          <Table sx={{ minWidth: 650 }}  aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell >Contact</StyledTableCell>
                <StyledTableCell >DOB</StyledTableCell>
                <StyledTableCell >Address</StyledTableCell>
                <StyledTableCell >Designation</StyledTableCell>
                <StyledTableCell >Update</StyledTableCell>
                {/* <StyledTableCell >Delete</StyledTableCell> */}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {(
                filteredOtms.map((user) => (

                  <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">{user.firstname + " " + user.lastname}</StyledTableCell>
                    <StyledTableCell>{user.email} </StyledTableCell>
                    <StyledTableCell>{user.contact}</StyledTableCell>
                    <StyledTableCell>{user.DOB}</StyledTableCell>
                    <StyledTableCell>{user.address}</StyledTableCell>
                    <StyledTableCell>{user.designation}</StyledTableCell>
                    {roles != "hr" && (
                      <StyledTableCell>
                        <Button variant="contained" type='submit' color="success"
                          onClick={() => handleUserUpdate(user.id)}
                          size="small"
                          sx={{ marginRight: 2 }}>
                          Update
                        </Button>
                      </StyledTableCell>
                    )}
                    {/*  <StyledTableCell>
                          <Button variant="contained" type='submit' color="error" 
                            onClick={() => deleteUser(user.id)}
                            size="small" 
                            sx={{marginRight: 2}}>
                            Delete
                          </Button>
                        </StyledTableCell> */}
                  </StyledTableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


    </Container>
  )
}

export default OtmUsersConsole