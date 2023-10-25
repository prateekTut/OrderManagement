import { Box, Container, CssBaseline, Grid, InputAdornment, Paper, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Logo from "./img/logo.jpg";
import { FormControl, TextField, InputLabel, Select, MenuItem, Button, FormControlLabel } from '@mui/material'
import { useState, useEffect } from 'react';
import { FRONTEND_API } from "./urls";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#343F71',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FBF1F7',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function StudentInvoices() {

  let params = useParams();
  console.log(params, params.invoiceId)
  const [client, setclient] = useState([]);

  const token = localStorage.getItem("token")
  const [invoices, setInvoices] = useState([]);
  const [data, setData] = useState();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    console.log('useEffect');
    console.log(params.invoiceId);
    fetchInvoiceData(params.invoiceId);
  }, [params.invoiceId]);

  const fetchInvoiceData = async (invoiceNumber) => {
    console.log("Tutor ID", invoiceNumber);
    fetch(FRONTEND_API + "/getInvoice/".concat(invoiceNumber), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Invoices data", data);

        console.log("data is", data.data);
        console.log("invoice is", data.invoices);
        setData(data.data);
        setInvoices(data.invoices);
        fetchClientForInvoice(data.data.client_id);

      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  const fetchClientForInvoice = async (userId) => {
    console.log("Tutor ID", userId);
    fetch(FRONTEND_API + "getClientFromClientId/".concat(userId), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log("Clients data", data);
        data.map((user) => {
          setclient(user);

        })
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };



  return (
    <Container sx={{ bgcolor: "#FBF1F7" }}>
      {data != null && invoices != null && (


        <Box sx={{ display: 'flex', }}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper sx={{ m: 5, p: 5, display: 'flex', flexDirection: 'column', border: '1px solid #C7A1BD' }} ref={componentRef}>

                  <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
                    Invoice
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <div>
                            <strong>Invoice No:</strong>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <p>{data.invoice_number}</p>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <strong>Date:</strong>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <p>{data.invoice_date}</p>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <strong>Due Date:</strong>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <p>{data.due_date}</p>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={Logo} alt='BigCo Inc. logo' id='invoicelogo' />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} marginTop="10px">
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: "#FBF1F7" }}>
                        <Box sx={{ paddingBottom: 2 }}>
                          <strong>Billed By-</strong>
                          <p id='companylogo'>
                            <span id='tutorshivetext'> TutorsHive Pvt. Ltd. </span>
                            <br />
                            Regd. office: 88A, Nancy Residency, First Floor, <br />
                            Sindhu Nagar, Scheme No. 17, Murlipura, Jaipur, jaipur,
                            <br />
                            Email: info@webz.com.pl
                          </p>
                          <img src={Logo} alt='BigCo Inc. logo' id='invoicelogo' />
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: "#FBF1F7", height: "230px" }}>
                        <strong>Billed To-</strong>
                        {client != null && (
                          <div>
                            <p>Name: {client.name}</p>
                            <p>Email: {client.email}</p>
                            <p>Contact: {client.contact}</p>
                          </div>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box>
                    <TableContainer component={Paper} sx={{
                      marginBottom: 6,
                      marginRight: 2,
                      mt: 3
                    }}
                      aria-label="customized table" >
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead fullWidth>
                          <StyledTableRow>
                            <StyledTableCell>Item</StyledTableCell>

                            <StyledTableCell >{data.tax_type == 'gst' ? 'GST Rate' : 'VAT Rate'}</StyledTableCell>

                            <StyledTableCell>Quantity</StyledTableCell>
                            <StyledTableCell >Rate</StyledTableCell>
                            {data.tax_type != null && (
                              <StyledTableCell >Amount</StyledTableCell>
                            )}
                            {data.tax_type == 'gst' && data.sub_tax == 'igst' &&(
                              <StyledTableCell >IGST</StyledTableCell>
                            )}
                           
                            {data.tax_type == 'gst' && data.sub_tax !== 'igst'&& (
                              <StyledTableCell >CGST</StyledTableCell>
                            )}
                            {data.tax_type == 'gst' && data.sub_tax !== 'igst' && (
                              <StyledTableCell >SGST</StyledTableCell>
                            )}
                            {data.tax_type == 'vat' && data.sub_tax !== 'igst'&& (
                              <StyledTableCell >VAT</StyledTableCell>
                            )}

                            <StyledTableCell >Total</StyledTableCell>

                          </StyledTableRow>
                        </TableHead>
                        {invoices.map((invoice) => (
                          <TableBody key={invoice.id}>
                            <StyledTableCell>
                              {invoice.item}
                            </StyledTableCell>

                            <StyledTableCell>
                              {invoice.tax_rate}
                            </StyledTableCell>

                            <StyledTableCell>
                              {invoice.quantity}
                            </StyledTableCell>

                            <StyledTableCell>
                              {invoice.rate}
                            </StyledTableCell>
                              
                            <StyledTableCell>
                              {invoice.amount}
                            </StyledTableCell>
                            
                            {data.tax_type == 'vat' && (
                              <StyledTableCell>
                                {invoice.vat}
                              </StyledTableCell>
                            )}

                           
                            {data.tax_type == 'gst' && data.sub_tax == 'gst' &&(
                              <StyledTableCell >{invoice.cgst}</StyledTableCell>
                            )}
                            {data.tax_type == 'gst' && data.sub_tax == 'gst' &&(
                              <StyledTableCell >{invoice.sgst}</StyledTableCell>
                            )}
                            
                            {data.tax_type == 'gst' && data.sub_tax == 'igst' &&(
                              <StyledTableCell >{invoice.igst}</StyledTableCell>
                            )}
                          
                           
                            <StyledTableCell>
                              {invoice.item_total}
                            </StyledTableCell>

                          </TableBody>
                        ))}
                      </Table>
                    </TableContainer>


                    <Grid alignItems='end' display='flex' justifyContent='flex-end' container spacing={2}>
                      <Grid item xs={9}>
                        <Typography align="right" variant="subtitle1">
                          Amount:
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography align="right" variant="subtitle1">
                          {data.total_amount}
                        </Typography>
                      </Grid>

                      {data.tax_type === 'gst' && data.sub_tax == 'gst' &&(
                        <>
                          <Grid item xs={9}>
                            <Typography align="right" variant="subtitle1">
                              SGST:
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography align="right" variant="subtitle1">
                              {(data.tax_amount/2)}
                            </Typography>
                          </Grid>

                          <Grid item xs={9}>
                            <Typography align="right" variant="subtitle1">
                              CGST:
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography align="right" variant="subtitle1">
                            {(data.tax_amount/2)}
                            </Typography>
                          </Grid>
                        </>
                      )}

                      {data.sub_tax === 'igst' && (
                        <>
                          <Grid item xs={9}>
                            <Typography align="right" variant="subtitle1">
                              IGST:
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography align="right" variant="subtitle1">
                            {(data.tax_amount)}
                            </Typography>
                          </Grid>
                        </>
                      )}

                      {data.tax_type === 'vat' && (
                        <>
                          <Grid item xs={9}>
                            <Typography align="right" variant="subtitle1">
                              VAT:
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography align="right" variant="subtitle1">
                              (+){data.tax_amount}
                            </Typography>
                          </Grid>

                        </>
                      )}
                      {data.discount != 0 && (
                        <>
                          <Grid item xs={9}>

                            <Typography align="right" variant="subtitle1">
                              Discount({data.dis_percent}%):
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography align="right" variant="subtitle1">
                              (-){data.discount}
                            </Typography>
                          </Grid>

                        </>

                      )}

                      <Grid item xs={9}>

                        <Typography align="right" variant="h5" fontWeight="semi-bold">
                          Total:
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography align="right" variant="h5" fontWeight="bold">
                          {data.total}
                        </Typography>
                      </Grid>


                    </Grid>



                  </Box>


                  <Button variant="outlined" type='submit' sx={{ mt: 3, width: '200px' }} onClick={handlePrint}>
                    Print & Save as PDF
                  </Button>


                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Container>
  )
}

export default StudentInvoices