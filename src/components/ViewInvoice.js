import { Box, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Logo from "./img/logo.jpg";
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import { FRONTEND_API } from "./urls";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useReactToPrint } from "react-to-print";
import { Link, useParams } from "react-router-dom";
import { PartPaid } from './styles/style';
import { StyledTableCell, StyledTableRow } from './styles/TableStyles';


const bankDetails = {
  accountHolderName: 'TutorsHive Private Limited',
  accountNumber: '50200041023430',
  ifsc: 'HDFC0002837',
  accountType: 'Current',
  bankName: 'HDFC BANK',
};

function ViewInvocie() {

  let params = useParams();
  console.log(params, params.invoiceId)
  const [client, setclient] = useState([]);

  const token = localStorage.getItem("token")
  const [invoices, setInvoices] = useState([]);
  const [data, setData] = useState();
  const componentRef = useRef();
  const [currency, setCurrency] = useState("");


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
        console.log("currency is", data.data.currency)
        setCurrency(data.data.currency)
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

  const calculateDue = (total, paid) => {
    return total - paid;
  }

  const downloadAttachemts = async (attachment) => {
    // Call your method here
    try {
      var formdata = new FormData();
      formdata.append("attachments", attachment)
      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
      const response = await fetch(FRONTEND_API + "download-attachemts", requestOptions);
      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      // Convert the response blob to a blob URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a link and trigger a click to download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `${attachment}_attachment.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optionally, revoke the blob URL to free up resources
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  function getPaymentStatus(amount, paidAmount) {
    if (paidAmount === null) {
      return; // Return nothing if paidAmount is null
    } else if (paidAmount < amount) {
      return 'Part Paid';
    } else if (paidAmount === amount) {
      return 'Paid';
    } else {
      return 'unpaid';
    }
  }

  function getWords(number, currency) {
    const numberToWords = require('number-to-words');
    const amountInWords = numberToWords.toWords(number).toUpperCase();

    var curr_word;

    if (currency == '$') {
      curr_word = " US DOLLARS ";
    } else if (currency == '£') {
      curr_word = " POUNDS ";
    } else {
      curr_word = " RUPEES ";
    }


    console.log(number, amountInWords);
    return amountInWords + curr_word + "ONLY";

  }

  return (
    <div sx={{ bgcolor: "#FBF1F7" }} >
      {data != null && invoices != null && (


        <Box sx={{ display: 'flex', }} ref={componentRef}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Typography variant="h4" color="primary" sx={{ marginRight: '10px' }}>
                    Invoice
                  </Typography>

                  {getPaymentStatus(data.total, data.paid_amount) === "Part Paid" && (
                    <PartPaid>Part Paid</PartPaid>
                  )}
                </div>
                <Grid container >
                  <Grid item xs={6}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <p>Invoice No:</p>
                      </Grid>
                      <Grid item xs={6}>
                        <strong>{data.invoice_number}</strong>
                      </Grid>
                      <Grid item xs={6}>
                        <p>Date:</p>
                      </Grid>
                      <Grid item xs={6}>
                        <strong>{data.invoice_date}</strong>
                      </Grid>
                      <Grid item xs={6}>
                        <p color='grey'>Due Date:</p>
                      </Grid>
                      <Grid item xs={6}>
                        <strong>{data.due_date}</strong>
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
                        <Typography color="primary" fontWeight="bold">Billed By-</Typography>
                        <p style={{ marginTop: "5px" }} id='companylogo'>
                          <strong id='tutorshivetext'> TutorsHive Pvt. Ltd. </strong>
                          <br />
                          Regd. office: 88A, Nancy Residency, First Floor, <br />
                          Sindhu Nagar, Scheme No. 17, Murlipura, Jaipur, jaipur,
                          <br />
                          Email: info@webz.com.pl
                        </p>

                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: "#FBF1F7", height: "165px" }}>
                      <Typography color="primary" fontWeight="bold">Billed To-</Typography>
                      {client != null && (
                        <div style={{ marginTop: "5px" }}>
                          <p>{client.name}</p>
                          <p>{client.email}</p>
                          <p>{client.contact}</p>
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
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell sx={{ width: '50%' }} >Item</StyledTableCell>
                          {data.tax_type != "" && (
                            <StyledTableCell >
                              {data.tax_type === 'gst' ? 'GST Rate' : 'VAT Rate'}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>Quantity</StyledTableCell>
                          <StyledTableCell>Rate</StyledTableCell>
                          {data.tax_type != "" ? (
                            <StyledTableCell>Amount</StyledTableCell>
                          ) : null}
                          {data.tax_type == 'gst' && data.sub_tax == 'igst' && (
                            <StyledTableCell>IGST</StyledTableCell>
                          )}

                          {data.tax_type == 'gst' && data.sub_tax !== 'igst' && (
                            <StyledTableCell>CGST</StyledTableCell>
                          )}
                          {data.tax_type == 'gst' && data.sub_tax !== 'igst' && (
                            <StyledTableCell>SGST</StyledTableCell>
                          )}
                          {data.tax_type == 'vat' && data.sub_tax !== 'igst' && (
                            <StyledTableCell>VAT</StyledTableCell>
                          )}

                          <StyledTableCell>Total</StyledTableCell>

                        </StyledTableRow>
                      </TableHead>
                      {invoices.map((invoice, index) => (
                        <TableBody key={invoice.id}>
                          <StyledTableCell> {index + 1}. </StyledTableCell>
                          <StyledTableCell sx={{ width: '50%' }}>
                            {invoice.order_id} {client.name}

                          </StyledTableCell>
                          {data.tax_type != "" && (
                            <StyledTableCell>
                              {invoice.tax_rate}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>
                            {invoice.quantity}
                          </StyledTableCell>

                          <StyledTableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: '5px', marginTop: '0px' }}>{currency}</span>
                              {invoice.rate}
                            </div>
                          </StyledTableCell>
                          {data.tax_type != "" && (
                            <StyledTableCell>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '5px', marginTop: '0px' }}>{currency}</span>
                                {invoice.amount}
                              </div>
                            </StyledTableCell>
                          )}
                          {data.tax_type == 'vat' && (
                            <StyledTableCell>
                              {invoice.vat}
                            </StyledTableCell>
                          )}


                          {data.tax_type == 'gst' && data.sub_tax == 'gst' && (
                            <StyledTableCell >{invoice.cgst}</StyledTableCell>
                          )}
                          {data.tax_type == 'gst' && data.sub_tax == 'gst' && (
                            <StyledTableCell >{invoice.sgst}</StyledTableCell>
                          )}

                          {data.tax_type == 'gst' && data.sub_tax == 'igst' && (
                            <StyledTableCell >{invoice.igst}</StyledTableCell>
                          )}


                          <StyledTableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: '5px', marginTop: '0px' }}>{currency}</span>
                              {invoice.item_total}
                            </div>
                          </StyledTableCell>

                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>


                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        <p>Total (in words): </p>
                        <p style={{ marginLeft: '6px' }}>{getWords(data.total, currency)}</p>
                      </div>
                      <Paper sx={{ marginTop: 4, p: 2, display: 'flex', flexDirection: 'column', backgroundColor: "#FBF1F7", width: "420px" }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="h7" color="primary" fontWeight="bold">Bank Details</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight="bold" variant="body1">Account Holder Name</Typography>
                            <Typography variant="body1" fontWeight="bold">Account Number</Typography>
                            <Typography variant="body1" fontWeight="bold">IFSC</Typography>
                            <Typography variant="body1" fontWeight="bold">Account Type</Typography>
                            <Typography variant="body1" fontWeight="bold">Bank</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">{bankDetails.accountHolderName}</Typography>
                            <Typography variant="body1">{bankDetails.accountNumber}</Typography>
                            <Typography variant="body1">{bankDetails.ifsc}</Typography>
                            <Typography variant="body1">{bankDetails.accountType}</Typography>
                            <Typography variant="body1">{bankDetails.bankName}</Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} >
                      <Grid container spacing={1}>
                        {data.tax_type != "" && (
                          <div>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                Amount:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                                <span style={{ marginRight: '5px', marginTop: '0px' }}>{currency}</span>
                                {data.total_amount}
                              </Typography>
                            </Grid>
                          </div>
                        )}
                        {data.tax_type === 'gst' && data.sub_tax == 'gst' && (
                          <>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                SGST:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                                {(data.tax_amount / 2)}
                              </Typography>
                            </Grid>

                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                CGST:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                                {(data.tax_amount / 2)}
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
                            <span style={{ marginRight: '5px', marginTop: '0px', fontWeight: "bold" }}>{currency}</span>
                            {data.total}
                          </Typography>

                        </Grid>
                        {data.paid_amount != null && (
                          <>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                Paid Amount:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                                <span style={{ marginRight: '5px', marginTop: '0px' }}>{currency}</span>

                                {data.paid_amount}
                              </Typography>
                            </Grid>
                            </>
                        )}

                        {calculateDue(data.total, data.paid_amount) != 0 && (
                          <>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1" fontWeight="bold">
                                Due Amount:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1" fontWeight="bold">
                                <span style={{ marginRight: '5px', marginTop: '0px', fontWeight: "bold" }}>{currency}</span>
                                {calculateDue(data.total, data.paid_amount)}
                              </Typography>

                            </Grid>
                          </>
                        )}


                      </Grid>
                    </Grid>
                  </Grid>

                  <div style={{ marginTop: '30px' }}>
                    <Typography color='primary' fontWeight="bold">Terms and Conditions: </Typography>
                    <p>1. Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</p>
                    <p>2. Please quote invoice number when remitting funds.</p>
                  </div>

                  {data.attachments != null && (
                    <div style={{ marginTop: '10px' }}>
                      <Typography color="primary" align="left" variant="subtitle1" fontWeight="bold">
                        Attachments:
                      </Typography>
                      <Link onClick={() => downloadAttachemts(data.attachments)}>{data.attachments}</Link>
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

      )}
      <Button variant="outlined" type='submit' sx={{ mt: 3, marginLeft: '40px', width: '200px' }} onClick={handlePrint}>
        Print & Save as PDF
      </Button>
    </div>
  )
}

export default ViewInvocie
