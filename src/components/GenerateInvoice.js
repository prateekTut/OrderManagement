import {
  Box,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import Logo from './img/logo.jpg';
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FRONTEND_API } from './urls';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { data, event, get } from 'jquery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';
import { useReactToPrint } from 'react-to-print';
import { amountInWords } from '../utils/utils';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function GenerateInvoice() {
  const location = useLocation();
  const { state } = location;
  let expenseData = state;
  console.log('data url ', state);
  let isExpenseData = false;
  if (expenseData !== null) {
    isExpenseData = Object.keys(expenseData).length > 0;
  }
  const currencies = [
    {
      value: '$',
      label: 'US Dollar( USD, $)',
    },
    {
      value: '₹',
      label: 'Indian Rupee(INR, ₹)',
    },
    {
      value: '£',
      label: 'British Pound Sterling(GBP, £)',
    },
  ];

  const [userClientType, setUserClientType] = useState('');
  const [client, setclient] = useState([]);
  const token = localStorage.getItem('token');
  const [userClient, setUserClient] = React.useState('');
  const [currencyValue, setCurrencyValue] = React.useState(
    currencies.at(0).value
  );

  const [taxType, setTaxType] = React.useState('');

  const [selectedTax, setSelectedTax] = useState('');

  const [radioError, setRadioError] = useState(false);

  const [savedTax, setSavedTax] = React.useState('');
  const [saveSubTax, setSaveSubTax] = useState('');

  const [orders, setOrders] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [tableData, setTableData] = useState([
    {
      id: 0,
      item: '',
      taxRate: 0,
      quantity: 0,
      rate: 0,
      amount: 0,
      igst: 0,
      sgst: 0,
      cgst: 0,
      amount: 0,
      total: 0,
    },
  ]);

  const [dueDate, setDueDate] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const componentRef = useRef();

  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      name: `Row ${tableData.length + 1}`,
      description: `Description ${tableData.length + 1}`,
    };
    setTableData([...tableData, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedTableData = tableData.filter((row) => row.id !== index);
    setTableData(updatedTableData);
  };

  const handleRadioChange = (event) => {
    //setSelectedRadio(event.target.value);
    console.log(event.target.value);
    setUserClientType(event.target.value);
    fetchInitial(event.target.value);
  };

  const handleTaxRadioChange = (event) => {
    //setSelectedRadio(event.target.value);
    console.log(event.target.value);
    setSelectedTax(event.target.value);
  };

  const handleChangeClient = (event) => {
    const newValue = event.target.value;
    setUserClient(newValue);
    console.log(event.target.value);
    //getOrdersOfClient(newValue);
  };

  const handleCurrencyChange = (event) => {
    setCurrencyValue(event.target.value);
  };

  const handleCloseTax = () => {
    if (savedTax == null) {
      setDialogOpen(false);
      setTaxType('');
      setSelectedTax('');
    } else {
      setDialogOpen(false);
    }
  };

  const handleTaxUpdate = () => {
    setDialogOpen(true);
  };

  const handleTaxTypeChange = (event) => {
    const { name, value } = event.target;
    if (savedTax != null) setTaxType(value);
    else setTaxType(savedTax);
  };

  const handleSaveTax = () => {
    if (taxType == 'gst') {
      if (selectedTax == '') {
        setRadioError(true);
      } else {
        setRadioError(false);
        setSavedTax(taxType);
        setSaveSubTax(selectedTax);

        setDialogOpen(false);
      }
    } else if (taxType == 'none') {
      setSavedTax('');
      setDialogOpen(false);
    } else {
      setSavedTax(taxType);
      setDialogOpen(false);
    }
  };

  const handleInvoiceDate = (date) => {
    setInvoiceDate(date);
  };

  const handleDueDate = (date) => {
    setDueDate(date);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  /*  const handlePrint = () => {
    window.print();
  }; */
  const saveInvoice = (clinetId) => {
    fetch(FRONTEND_API + 'getOrdersByClientId/'.concat(clinetId), {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log('Orders data', data);
        setOrders(data);
        // navigate("/OTMform");
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  const fetchInitial = (type) => {
    if (type === 'student') {
      fetch(FRONTEND_API + 'getstudentclientdata', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // do something with data
          console.log(data);
          setclient(data);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    } else {
      fetch(FRONTEND_API + 'getvendoreclientdata', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // do something with data
          console.log(data);
          setclient(data);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  };

  const getClientsDetails = () => {
    if (client != null) {
      const selectedClient = client.filter(
        (filteredClients) => filteredClients.id == userClient
      );
      console.log(selectedClient);
      return selectedClient;
    }
  };

  const handleInputChange = (event, field, id) => {
    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        const newValue = event.target.value;
        let taxRate = parseFloat(row.taxRate) || 0;
        let quantity = parseFloat(row.quantity) || 0;
        let amount = parseFloat(row.amount) || 0;
        let rate = parseFloat(row.rate) || 0;

        if (field === 'quantity') {
          quantity = parseFloat(newValue) || 0;
        } else if (field === 'rate') {
          rate = parseFloat(newValue) || 0;
        } else if (field === 'taxRate') {
          taxRate = parseFloat(newValue) || 0;
        }

        let igst = 0; // Initialize igst, cgst, sgst to 0
        let cgst = 0;
        let sgst = 0;
        let vat = 0;
        let total = 0;
        console.log(savedTax);
        amount = rate * quantity;
        if (savedTax === 'gst') {
          if (saveSubTax === 'igst') {
            igst = (taxRate / 100) * amount;
          } else if (saveSubTax === 'gst') {
            cgst = (taxRate / 200) * amount;
            sgst = (taxRate / 200) * amount;
          }
          total = amount + igst + cgst + sgst;
        } else if (savedTax === 'vat') {
          console.log(taxRate / 100);
          vat = (taxRate / 100) * amount;
          console.log(vat);
          total = amount + vat;
        } else {
          total = amount;
        }

        //igst = (taxRate / 100) * (amount);

        return {
          ...row,
          [field]: newValue,
          amount,
          igst,
          cgst,
          sgst,
          vat,
          total,
        };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const getTotal = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.total;
    });
    return total;
  };

  const getTotalAmount = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.amount;
    });
    console.log(total);
    return total;
  };

  const getIgst = () => {
    let total = 0;
    if (savedTax == 'gst' && saveSubTax == 'igst') {
      tableData.forEach((row) => {
        total += row.igst;
      });
    } else if (savedTax == 'vat') {
      tableData.forEach((row) => {
        total += row.vat;
      });
    }
    return total;
  };

  const getSgst = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.sgst;
    });
    return total;
  };

  const getCgst = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.cgst;
    });
    return total;
  };

  return (
    <Container sx={{ bgcolor: '#FBF1F7' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Container
          maxWidth='lg'
          sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={3}>
            {/* Chart */}
            <Grid
              item
              xs={12}>
              <Paper
                sx={{
                  m: 5,
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #C7A1BD',
                }}
                ref={componentRef}>
                <Typography
                  variant='h4'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: '20px',
                  }}>
                  Invoice
                </Typography>

                <Grid
                  container
                  spacing={3}>
                  <Grid
                    item
                    xs={6}>
                    <Grid
                      container
                      spacing={2}>
                      <Grid
                        item
                        xs={6}>
                        <div>
                          <strong>Invoice No:</strong>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}>
                        <div>
                          {isExpenseData ? (
                            <p>{expenseData.invoice_number}</p>
                          ) : (
                            <>
                              <TextField
                                label='Invoice'
                                variant='standard'
                                fullWidth
                              />
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}>
                        <div>
                          <strong>Date:</strong>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}>
                        <div>
                          {isExpenseData ? (
                            <p>{expenseData.expense_date}</p>
                          ) : (
                            <>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  value={invoiceDate} // Set the value prop to display the selected date
                                  onChange={handleInvoiceDate} // Capture the selected date
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label='Select Date'
                                      variant='outlined'
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}>
                        <div>
                          <strong> Due Date:</strong>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}>
                        <div>
                          {isExpenseData ? (
                            <p>{expenseData.due_date}</p>
                          ) : (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={dueDate} // Set the value prop to display the selected date
                                onChange={handleDueDate} // Capture the selected date
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Select Date'
                                    variant='outlined'
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <img
                      src={Logo}
                      alt='BigCo Inc. logo'
                      id='invoicelogo'
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={3}
                  marginTop='10px'>
                  <Grid
                    item
                    xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#FBF1F7',
                      }}>
                      <Box sx={{ paddingBottom: 2 }}>
                        <strong>Billed By-</strong>
                        <p id='companylogo'>
                          <span id='tutorshivetext'>
                            {' '}
                            TutorsHive Pvt. Ltd.{' '}
                          </span>
                          <br />
                          Regd. office: 88A, Nancy Residency, First Floor,{' '}
                          <br />
                          Sindhu Nagar, Scheme No. 17, Murlipura, Jaipur,
                          jaipur,
                          <br />
                          Email: info@webz.com.pl
                        </p>
                        <img
                          src={Logo}
                          alt='BigCo Inc. logo'
                          id='invoicelogo'
                        />
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#FBF1F7',
                        height: '230px',
                      }}>
                      <strong>Billed To-</strong>
                      {isExpenseData ? (
                        <p>{expenseData.vendor}</p>
                      ) : (
                        <>
                          <RadioGroup
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                            value={userClientType}
                            onChange={handleRadioChange}>
                            <FormControlLabel
                              value='student'
                              control={<Radio />}
                              label='Student'
                            />
                            <FormControlLabel
                              value='vendor'
                              control={<Radio />}
                              label='Vendor'
                            />
                          </RadioGroup>

                          {userClientType != '' && (
                            <FormControl>
                              <InputLabel id='demo-simple-select-label'>
                                Client
                              </InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={userClient}
                                label='Experts'
                                variant='outlined'
                                onChange={handleChangeClient}>
                                {client.map((data) => (
                                  <MenuItem value={data.id}>
                                    {data.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                          {getClientsDetails() != null && (
                            <div>
                              {getClientsDetails().map((selectedClient) => (
                                <div key={selectedClient.id}>
                                  <p>Name: {selectedClient.name}</p>
                                  <p>Email: {selectedClient.email}</p>
                                  <p>Contact: {selectedClient.contact}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
                {!isExpenseData && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px',
                    }}>
                    <Button
                      variant='outlined'
                      sx={{ mt: 3, mb: 2, marginRight: 2 }}
                      onClick={handleTaxUpdate}>
                      {savedTax != '' ? 'Configure Tax' : 'Add Tax'}
                    </Button>
                    <InputLabel
                      id='demo-simple-select-label'
                      sx={{ marginRight: 2 }}>
                      Currency
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={currencyValue}
                      onChange={handleCurrencyChange}
                      error={currencyValue === ''}
                      helperText={currencyValue === '' && 'Select Currency'}
                      fullWidth
                      sx={{ width: '200px' }}>
                      {currencies.map((data) => (
                        <MenuItem value={data.value}>{data.label}</MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
                <Box>
                  <TableContainer
                    component={Paper}
                    sx={{
                      marginBottom: 6,
                      marginRight: 2,
                      mt: 3,
                    }}
                    aria-label='customized table'>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label='simple table'>
                      <TableHead fullWidth>
                        <StyledTableRow>
                          <StyledTableCell>Item</StyledTableCell>
                          {savedTax && (
                            <StyledTableCell>
                              {savedTax == 'gst' ? 'GST Rate' : 'VAT Rate'}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>Quantity</StyledTableCell>
                          <StyledTableCell>Rate</StyledTableCell>
                          {/* */}
                          {savedTax == 'gst' &&
                            saveSubTax == 'igst' &&
                            !isExpenseData && (
                              <StyledTableCell>IGST</StyledTableCell>
                            )}
                          {(savedTax == 'gst' && saveSubTax == 'gst') ||
                            (isExpenseData && (
                              <StyledTableCell>Amount</StyledTableCell>
                            ))}
                          {savedTax == 'gst' &&
                            saveSubTax == 'gst' &&
                            !isExpenseData && (
                              <StyledTableCell>CGST</StyledTableCell>
                            )}
                          {savedTax == 'gst' &&
                            saveSubTax == 'gst' &&
                            !isExpenseData && (
                              <StyledTableCell>SGST</StyledTableCell>
                            )}
                          {savedTax == 'vat' && !isExpenseData && (
                            <StyledTableCell>VAT</StyledTableCell>
                          )}
                          <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                      </TableHead>

                      {tableData.length > 0 && !isExpenseData ? (
                        tableData.map((data, index) => (
                          <TableBody key={data.id}>
                            <StyledTableCell>
                              <TextField
                                variant='standard'
                                value={data.item}
                                onChange={(event) =>
                                  handleInputChange(event, 'item', data.id)
                                }
                              />
                            </StyledTableCell>
                            {savedTax && (
                              <StyledTableCell>
                                <div>
                                  <TextField
                                    variant='standard'
                                    value={data.taxRate}
                                    onChange={(event) =>
                                      handleInputChange(
                                        event,
                                        'taxRate',
                                        data.id
                                      )
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position='end'>
                                          %
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </div>
                              </StyledTableCell>
                            )}
                            <StyledTableCell>
                              <TextField
                                id='standard-basic'
                                variant='standard'
                                value={data.quantity}
                                onChange={(event) =>
                                  handleInputChange(event, 'quantity', data.id)
                                }
                              />
                            </StyledTableCell>

                            <StyledTableCell>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <span
                                  style={{
                                    marginRight: '5px',
                                    marginTop: '0px',
                                  }}>
                                  {currencyValue}
                                </span>
                                <TextField
                                  id='standard-basic'
                                  variant='standard'
                                  value={data.rate}
                                  onChange={(event) =>
                                    handleInputChange(event, 'rate', data.id)
                                  }
                                />
                              </div>
                            </StyledTableCell>

                            {savedTax == 'gst' && saveSubTax == 'igst' && (
                              <StyledTableCell>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}>
                                  <span
                                    style={{
                                      marginRight: '5px',
                                      marginTop: '0px',
                                    }}>
                                    {currencyValue}
                                  </span>

                                  <TextField
                                    id='standard-basic'
                                    disabled
                                    variant='standard'
                                    value={data.amount}
                                    onChange={(event) =>
                                      handleInputChange(
                                        event,
                                        'amount',
                                        data.id
                                      )
                                    }
                                  />
                                </div>
                              </StyledTableCell>
                            )}

                            {savedTax == 'gst' && saveSubTax == 'igst' && (
                              <div>
                                <StyledTableCell>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}>
                                    <span
                                      style={{
                                        marginRight: '5px',
                                        marginTop: '0px',
                                      }}>
                                      {currencyValue}
                                    </span>

                                    <TextField
                                      id='standard-basic'
                                      disabled
                                      variant='standard'
                                      value={data.igst.toFixed(2)}
                                      onChange={(event) =>
                                        handleInputChange(
                                          event,
                                          'igst',
                                          data.id
                                        )
                                      }
                                    />
                                  </div>
                                </StyledTableCell>
                              </div>
                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (
                              <StyledTableCell>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}>
                                  <span
                                    style={{
                                      marginRight: '5px',
                                      marginTop: '0px',
                                    }}>
                                    {currencyValue}
                                  </span>

                                  <TextField
                                    id='standard-basic'
                                    disabled
                                    variant='standard'
                                    value={data.amount}
                                    onChange={(event) =>
                                      handleInputChange(
                                        event,
                                        'amount',
                                        data.id
                                      )
                                    }
                                  />
                                </div>
                              </StyledTableCell>
                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (
                              <div>
                                <StyledTableCell>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}>
                                    <span
                                      style={{
                                        marginRight: '5px',
                                        marginTop: '0px',
                                      }}>
                                      {currencyValue}
                                    </span>
                                    <TextField
                                      disabled
                                      id='standard-basic'
                                      variant='standard'
                                      value={data.cgst.toFixed(2)}
                                      onChange={(event) =>
                                        handleInputChange(
                                          event,
                                          'cgst',
                                          data.id
                                        )
                                      }
                                    />
                                  </div>
                                </StyledTableCell>
                              </div>
                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (
                              <StyledTableCell>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}>
                                  <span
                                    style={{
                                      marginRight: '5px',
                                      marginTop: '0px',
                                    }}>
                                    {currencyValue}
                                  </span>

                                  <TextField
                                    disabled
                                    id='standard-basic'
                                    variant='standard'
                                    value={data.sgst.toFixed(2)}
                                    onChange={(event) =>
                                      handleInputChange(event, 'sgst', data.id)
                                    }
                                  />
                                </div>
                              </StyledTableCell>
                            )}

                            {savedTax == 'vat' && (
                              <StyledTableCell>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}>
                                  <span
                                    style={{
                                      marginRight: '5px',
                                      marginTop: '0px',
                                    }}>
                                    {currencyValue}
                                  </span>

                                  <TextField
                                    disabled
                                    id='standard-basic'
                                    variant='standard'
                                    value={data.vat.toFixed(2)}
                                    onChange={(event) =>
                                      handleInputChange(event, 'vat', data.id)
                                    }
                                  />
                                </div>
                              </StyledTableCell>
                            )}

                            <StyledTableCell>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <span
                                  style={{
                                    marginRight: '5px',
                                    marginTop: '0px',
                                  }}>
                                  {currencyValue}
                                </span>

                                {data.total != null ? data.total.toFixed(2) : 0}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              {' '}
                              <CloseIcon
                                onClick={() => handleRemoveRow(data.id)}
                              />
                            </StyledTableCell>
                          </TableBody>
                        ))
                      ) : (
                        <>
                          <TableBody key={data.id}>
                            <StyledTableCell>
                              <h3>Expenditure</h3>
                            </StyledTableCell>
                            <StyledTableCell>
                              <h3>1</h3>
                            </StyledTableCell>

                            <StyledTableCell>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <span
                                  style={{
                                    marginRight: '5px',
                                    marginTop: '0px',
                                  }}>
                                  {expenseData.amount ? (
                                    <>{expenseData.amount}</>
                                  ) : (
                                    0
                                  )}
                                </span>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <span
                                  style={{
                                    marginRight: '5px',
                                    marginTop: '0px',
                                  }}>
                                  {currencyValue}
                                </span>
                                {expenseData.amount ? (
                                  <>{expenseData.amount}</>
                                ) : (
                                  0
                                )}
                              </div>
                            </StyledTableCell>
                          </TableBody>
                        </>
                      )}
                    </Table>
                  </TableContainer>
                  {!isExpenseData && (
                    <>
                      {tableData.length >= 1 && (
                        <Grid
                          alignItems='end'
                          display='flex'
                          justifyContent='flex-end'
                          container
                          spacing={2}>
                          <Grid
                            item
                            xs={9}>
                            <Typography
                              align='right'
                              variant='subtitle1'>
                              Amount:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={3}>
                            <Typography
                              align='right'
                              variant='subtitle1'>
                              {isNaN(getTotalAmount())
                                ? 0
                                : getTotalAmount().toFixed(2)}
                            </Typography>
                          </Grid>

                          {savedTax === 'gst' && saveSubTax === 'gst' && (
                            <>
                              <Grid
                                item
                                xs={9}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  SGST:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={3}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  {getSgst().toFixed(2)}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={9}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  CGST:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={3}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  {getCgst().toFixed(2)}
                                </Typography>
                              </Grid>
                            </>
                          )}

                          {savedTax === 'gst' && saveSubTax === 'igst' && (
                            <>
                              <Grid
                                item
                                xs={9}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  IGST:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={3}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  {getIgst().toFixed(2)}
                                </Typography>
                              </Grid>
                            </>
                          )}

                          {savedTax === 'vat' && (
                            <>
                              <Grid
                                item
                                xs={9}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  VAT:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={3}>
                                <Typography
                                  align='right'
                                  variant='subtitle1'>
                                  {getIgst().toFixed(2)}
                                </Typography>
                              </Grid>
                            </>
                          )}

                          <Grid
                            item
                            xs={9}>
                            <Typography
                              align='right'
                              variant='h5'
                              fontWeight='semi-bold'>
                              Total:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={3}>
                            <Typography
                              align='right'
                              variant='h5'
                              fontWeight='bold'>
                              {isNaN(getTotal()) ? 0 : getTotal().toFixed(2)}
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                      <Button
                        variant='outlined'
                        sx={{ mt: 3 }}
                        onClick={handleAddRow}>
                        Add More Items
                      </Button>
                    </>
                  )}
                </Box>
                {isExpenseData && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gap: '50px',
                    }}>
                    <Typography variant='h6'>
                      <Box sx={{ fontWeight: 'semi-bold', m: 1 }}>
                        Total (in words):-
                        <span style={{ fontWeight: 'bold' }}>
                          {amountInWords(
                            expenseData.currency,
                            expenseData.amount
                          )}
                        </span>
                      </Box>
                    </Typography>
                    <Typography variant='h6'>
                      <Box sx={{ fontWeight: 'semi-bold', m: 1 }}>
                        Total{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {expenseData.currency}
                          {expenseData.amount}
                        </span>
                      </Box>
                    </Typography>
                  </div>
                )}
                {tableData.length >= 1 && (
                  <Button
                    variant='outlined'
                    type='submit'
                    sx={{ mt: 3, width: '200px' }}
                    onClick={!isExpenseData ? handlePrint : () => {}}>
                    Print & Save as PDF
                  </Button>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {!isExpenseData && (
        <BootstrapDialog
          fullWidth
          open={dialogOpen}
          sx={{}}>
          <DialogTitle>
            <strong>Configure Tax</strong>
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleCloseTax}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers
            fullWidth
            sx={{ padding: 3 }}>
            <InputLabel
              id='demo-simple-select-label'
              sx={{ mb: 1 }}>
              Select Tax Type
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={taxType}
              placeholder='Tax'
              onChange={handleTaxTypeChange}
              fullWidth
              sx={{ mb: 1 }}>
              <MenuItem value={'none'}>None</MenuItem>
              <MenuItem value={'gst'}>GST (India)</MenuItem>
              <MenuItem value={'vat'}>VAT</MenuItem>
            </Select>

            {taxType == 'gst' && (
              <Box sx={{ marginTop: 3 }}>
                <strong>GST Type</strong>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={selectedTax}
                  onChange={handleTaxRadioChange}>
                  <FormControlLabel
                    value='igst'
                    control={<Radio />}
                    label='IGST'
                  />

                  <FormControlLabel
                    value='gst'
                    control={<Radio />}
                    label='CGST & SGST'
                  />
                </RadioGroup>
                {radioError && (
                  <p style={{ color: 'red' }}>Please select a tax option.</p>
                )}
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleCloseTax}
              color='primary'>
              Close
            </Button>
            <Button
              onClick={handleSaveTax}
              color='primary'>
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </Container>
  );
}

export default GenerateInvoice;
