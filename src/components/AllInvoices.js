import React from 'react'
import { Typography, Container, Portal } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect, useRef } from "react";
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

import { FRONTEND_API } from "./urls";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import "./css/invoices.css"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { DateRange } from 'react-date-range';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import InvoiceGraph from './InvoiceGraph';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { format } from 'date-fns';

import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Circle, PartPaid, Paid, DueStatus, DateText, PaidAmt, ButtonContainer } from './styles/style';
import TablePagination from '@mui/material/TablePagination';


import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';

import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import IconWithText from './IconWithText';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import Autocomplete from '@mui/material/Autocomplete';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function AllInvoices() {

  let params = useParams();
  console.log(params, params.clientId);

  const [invoices, setInvoices] = useState([]);
  const [toggleLifetime, setToggleLifetime] = useState(false);

  const [graphBool, setGraphBool] = useState(false);
  const [summaryBool, setSummaryBool] = useState(false);

  const [invoiceStatus, setInvoiceStatus] = useState('');

  const today = dayjs();
  const [selectedPaymentId, setSelectedPaymentId] = useState();
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(today);
  const [paymentMode, setPaymentMode] = useState('');

  const [dialogValidationOpen, setDialogValidationOpen] = useState(false);

  const [clientName, setClientName] = useState('');

  /* function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  } */

  const token = localStorage.getItem("token")
  const navigate = useNavigate();

  const buttonRef = useRef(null);
  const moreButtonRef = useRef(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

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

  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchInvoicesData = async () => {
    try {
      var formdata = new FormData();
      //formdata.append("user", "student");
      const response = await fetch(FRONTEND_API + "getAllInvoices", {
        method: "POST",
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
      const rawData = await fetchInvoicesData();
      if (rawData) {
        console.log("raw ", rawData);
        setInvoices(rawData);
      }
    };
    fetchData();
  }, [setInvoices]);


  const viewOrdersInvoice = (invoiceId) => {
    console.log("Invoice ID", invoiceId);
    navigate(`/generated-invoice/${invoiceId}`);
  };

  const handleBudget = (budget, currency) => {
    if (budget == null) {
      budget = 0;
    }
    if (currency == 'GBP') {
      return "£" + budget
    } else if (currency == 'USD') {
      return "$" + budget
    } else {
      return "₹" + budget
    }
  }

  const toggleLData = () => {

    if (!toggleLifetime) {
      setToggleLifetime(true);
    } else {
      setToggleLifetime(false);
    }

  }

  const toggleGraph = () => {

    if (!graphBool) {
      setGraphBool(true);
    } else {
      setGraphBool(false);
    }

  }

  const toggleSummary = () => {

    if (!summaryBool) {
      setSummaryBool(true);
    } else {
      setSummaryBool(false);
    }

  }

  const handleInvoiceStatusChange = (event) => {
    setInvoiceStatus(event.target.value);
  };

  const onChangePaymentMode = (event) => {
    setPaymentMode(event.target.value);
  }
  const initialDateRange = [{
    startDate: null,
    endDate: null,
    key: 'selection',
  }];

  const [dateRange, setDateRange] = useState(initialDateRange);

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  //const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });

  const handleButtonClick = () => {
    setShowDateRangePicker(!showDateRangePicker);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
    // Close the DateRangePicker when a date is selected
    console.log(ranges.selection);

    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const daysDifference = Math.abs(
      Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000))
    );

    // Close the DateRangePicker if the difference is greater than 1
    if (daysDifference > 1) {
      setShowDateRangePicker(false);
      //fetchInvoicesData(startDate, endDate)
    }

  };



  const formatDate = (dateString) => {
    const formattedDate = format(new Date(dateString), 'MMM dd, yyyy');
    return formattedDate;
  }

  const setPaymentState = (id) => {
    setSelectedPaymentId(id);
    const foundInvoice = invoices.find((invoice) => invoice.id === id);
    console.log(id);
    console.log(foundInvoice);
    if (foundInvoice) {
      setSelectedInvoice(foundInvoice);
      setDialogOpen(true);
    } else {
      console.error(`Invoice with ID ${id} not found`);
    }
  }

  const handleClosePay = () => {
    setDialogOpen(false);
    setPaidAmount(null);
    setPaymentDate(null);
    setPaymentMode(null);
  }

  const handleUpdatePay = () => {
    var formdata = new FormData();
    console.log(paidAmount);
    formdata.append("amount", paidAmount)
    formdata.append("payment_date", paymentDate)
    formdata.append("payment_method", paymentMode)
    if (paidAmount != null && paidAmount != 0 && paidAmount != '' && invoices.amount < paidAmount) {
      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
      fetch(FRONTEND_API + "updatePaymentById/".concat(selectedPaymentId), requestOptions)
        .then((res) => res.json())
        .then((data) => {
          // do something with data
          console.log("payment update status", data);
          setPaidAmount(null);
          setPaymentDate(null);
          setPaymentMode(null);
          handleClosePay();
          fetchInvoicesData();
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    } else {
      setDialogValidationOpen(true);
    }
  }

  const handleCloseDialog = () => {
    setDialogValidationOpen(false);
    setPaidAmount(null);
    setPaymentDate(null);
    setPaymentMode(null);
  };

  const handlePayDateChange = (event) => {
    const { name, value } = event.target;
    setPaymentDate(value);

  };

  const onChangePaidAmt = (event) => {
    const newValue = event.target.value;
    setPaidAmount(newValue);
  };

  function getDueStatus(dueDate) {
    const today = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
    const dueDateFormatted = dueDate.split('T')[0]; // Extract date part from the due date string

    // Compare due date with today's date
    if (dueDateFormatted < today) {
      return 'Overdue';
    } else {
      return null;
    }
  }

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

  function getDueAmt(amount, paidAmount) {
    const remainingAmt = amount - paidAmount;
    return remainingAmt;
  }

  const onClientNameChange = (event) => {
    const { name, value } = event.target;
    setClientName(value);
  };

  function formatDateObj(inputDate) {
    const dateObject = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const getDates = () => {
    console.log(dateRange);
    if (dateRange[0].startDate != null) {
      console.log("in get dates");
      const startDate = formatDateObj(dateRange[0].startDate);
      const endDate = formatDateObj(dateRange[0].endDate);
      console.log(startDate, endDate);
      return startDate + " - " + endDate;
    } else {
      return "No date range selected";
    }
  };


  const [selectedClient, setSelectedClient] = useState(null);
  //Filter Logic
  const filteredInvoices = invoices.filter((invoice) => {

    if (!selectedClient && !invoiceStatus && (!dateRange[0] || dateRange[0].startDate === null)) {
      return true;
    }

    if (selectedClient) {
      const searchedClient = invoice.name.toLowerCase().includes(selectedClient.name.toLowerCase())
      return searchedClient
    }


    // Check if invoice status is selected
    if (invoiceStatus) {
      switch (invoiceStatus) {
        case 'paid':
          return invoice.paid_amount >= invoice.amount; // Include fully paid invoices
        case 'unpaid':
          return invoice.paid_amount == 0 || invoice.paid_amount == null; // Include unpaid invoices
        case 'overdue':
          const today = new Date().toISOString().split('T')[0];
          return invoice.due_date < today && invoice.paid_amount < invoice.amount; // Include overdue invoices
        case 'part-paid':
          return invoice.paid_amount > 0 && invoice.paid_amount < invoice.amount; // Include partially paid invoices
        default:
          break;
      }
    }

    if (dateRange[0].startDate != null) {
      const invoiceDate = new Date(invoice.invoice_date);
      console.log("invocie date", invoiceDate);
      const formattedInvoiceDate = invoiceDate.toISOString().split('T')[0];

      const withinDateRange =
        formattedInvoiceDate >= dateRange[0].startDate.toISOString().split('T')[0] &&
        formattedInvoiceDate <= dateRange[0].endDate.toISOString().split('T')[0];
      console.log("range", withinDateRange);
      return withinDateRange;
    }
  });

  const resetFilter = () => {
    console.log("reset called");
    setDateRange(initialDateRange);

  }

  //Menu Logic
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setMenuOpen(false);
  };


  //Count due invoices 
  function countDueInvoices(invoices) {
    // Get the current date in "YYYY-MM-DD" format
    const today = new Date().toISOString().split("T")[0];

    // Filter the invoices that are due (due_date is today or earlier)
    const dueInvoices = invoices.filter((invoice) => invoice.due_date <= today);

    // Return the number of due invoices
    return dueInvoices.length;
  }

  const totalAmountDue = invoices.reduce(
    (total, invoice) => total + (invoice.amount - invoice.paid_amount),
    0
  );

  const totalAmount = invoices.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );

  const totalAmountReceived = invoices.reduce(
    (total, invoice) => total + invoice.paid_amount,
    0
  );

  function calculateTotalAmountDueInINR(invoices) {
    // Assuming invoices is an array of objects with a currency property and amount_due property
    let totalAmountDueInINR = 0;

    for (const invoice of invoices) {
      if (invoice.currency === "₹") {
        totalAmountDueInINR = totalAmountDue;
      } else if (invoice.currency == "£") {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      } else if (invoice.currency == "$") {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      }
    }

    return totalAmountDueInINR;
  }


  function calculateTotalAmount(invoices) {
    // Assuming invoices is an array of objects with a currency property and amount_due property
    let totalAmountInINR = 0;

    for (const invoice of invoices) {
      if (invoice.currency === "₹") {
        totalAmountInINR = totalAmount;
      } else if (invoice.currency == "£") {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      } else if (invoice.currency == "$") {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      }
    }

    return totalAmountInINR;
  }

  function calculatePaymentReceived(invoices) {
    // Assuming invoices is an array of objects with a currency property and amount_due property
    let totalAmountInINR = 0;

    for (const invoice of invoices) {
      if (invoice.currency === "₹") {
        totalAmountInINR = totalAmountReceived;
      } else if (invoice.currency == "£") {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      } else if (invoice.currency == "$") {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      }
    }

    return totalAmountInINR;
  }

  //Edit invoices
  const editInvoices = (invoice_number) => {
    navigate(`/edit-invoices/${invoice_number}`);
  }

  //Client dropdown
  const handleClientSelect = (event, newValue) => {
    setSelectedClient(newValue);
  };

  //handle click away date
  const handleClickAwayDate = () => {

  }

  return (
    <Container sx={{ marginBottom: 10 }}>
      {<Typography variant='h3' sx={{
        marginLeft: 2,
        paddingTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        Invoices
      </Typography>}

      <Paper elevation={3}>
        <div className='toggle-container'>
          <div className='toggle-data' role='button' onClick={toggleLData}>
            <div>Lifetime Data</div>
            <div className='arrow-button'>
              <ExpandMoreIcon style={{ transform: toggleLifetime ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>

          </div>
          {toggleLifetime && (
            <Container style={{ paddingBottom: 10, marginLeft: 10 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={2} sm={4} md={4}>
                  <IconWithText
                    icon={<ReceiptIcon />} // Use the School icon
                    heading="Total Invoice"
                    content={invoices.length}
                    iconColor="#2E9EFF"
                  />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <IconWithText
                    icon={<MonetizationOnIcon />} // Use the Work icon
                    heading="Invoice Due"
                    content={countDueInvoices(invoices)}
                    iconColor="#2E9EFF"
                  />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <IconWithText
                    icon={<MoneyOffIcon />} // Use the School icon
                    heading="Amount Due"
                    content={`₹${calculateTotalAmountDueInINR(invoices)}`}
                    iconColor="#1AAA3A"
                  />
                </Grid>
              </Grid>

            </Container>
          )}
        </div>
      </Paper>

      <div className='toggle-container' >
        <div className='filters-data'>
          <div>Filters</div>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid item xs={2} sm={4} md={4}>
              <InputLabel id="demo-select-small-label">Select Invoice Status</InputLabel>
              <FormControl sx={{ marginTop: 1, minWidth: 200 }} size='small'>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={invoiceStatus}
                  onChange={handleInvoiceStatusChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='paid'>Paid</MenuItem>
                  <MenuItem value='unpaid'>Unpaid</MenuItem>
                  <MenuItem value='overdue'>Overdue</MenuItem>
                  <MenuItem value='part-paid'>Part Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <div>
                <InputLabel id="demo-select-small-label">Search Client</InputLabel>
                <Autocomplete
                  options={invoices}
                  getOptionLabel={(option) => option.name}
                  onChange={handleClientSelect}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ marginTop: 1, maxWidth: 250 }} size='small' variant="outlined" />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <InputLabel id="demo-select-small-label">Select Date Range</InputLabel>
              {/* <Button variant='contained' onClick={handleButtonClick} ref={buttonRef} >Select Date</Button> */}
              <ClickAwayListener onClickAway={handleClickAwayDate}>
                <ButtonContainer
                  sx={{ marginTop: 1 }}
                  role="button"
                  onClick={handleButtonClick}
                  size='small'
                  ref={buttonRef}
                >
                  <span>{getDates()}</span>
                  <IconButton sx={{ display: 'flex', alignItems: 'end', alignContent: 'end' }}>
                    <CalendarTodayIcon />
                  </IconButton>
                </ButtonContainer>
              </ClickAwayListener>
              {showDateRangePicker && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 9999,
                    top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight + 'px',
                    left: buttonRef.current.offsetLeft + 'px'
                  }}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateRangeChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange || {}}
                  />
                </div>
              )}
            </Grid>

          </Grid>

          <div>
            {dateRange[0].startDate != null && (
              <div role='button' onClick={resetFilter}>
                <div>Reset Filters</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='toggle-container'>
        <div className='toggle-data' role='button' onClick={toggleSummary}>
          <div>Invoice Summary</div>
          <div className='arrow-button'>
            <ExpandMoreIcon style={{ transform: summaryBool ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>

        </div>
        {summaryBool && (
          <Container>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ paddingBottom: 2 }}>

              <Grid item xs={3}>
                <IconWithText
                  icon={<ReceiptIcon />} // Use the School icon
                  heading="Invoices"
                  content={invoices.length}
                  iconColor="#2E9EFF"
                />
              </Grid>
              <Grid item xs={3}>
                <IconWithText
                  icon={<MonetizationOnIcon />} // Use the Work icon
                  heading="Invoice Amount"
                  content={calculateTotalAmount(invoices)}
                  iconColor="#2E9EFF"
                />
              </Grid>
              <Grid item xs={3}>
                <IconWithText
                  icon={<MoneyOffIcon />} // Use the School icon
                  heading="Amount Due"
                  content={`₹${calculateTotalAmountDueInINR(invoices)}`}
                  iconColor="#1AAA3A"
                />
              </Grid>

              <Grid item xs={3}>
                <IconWithText
                  icon={<MoneyOffIcon />} // Use the School icon
                  heading="Payment Received"
                  content={`₹${calculatePaymentReceived(invoices)}`}
                  iconColor="#1AAA3A"
                />
              </Grid>
            </Grid>
          </Container>
        )}
      </div>

      <div className='toggle-container'>
        <div className='toggle-data' role='button' onClick={toggleGraph} >
          <div >Invoice Graph</div>
          <div className='arrow-button'>
            <ExpandMoreIcon style={{ transform: graphBool ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
        </div>

        {graphBool && (
          <Container>
            <InvoiceGraph
              invoices={invoices}
            />
          </Container>
        )}
      </div>
      <Paper elevation={3} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

        <TableContainer sx={{
          marginBottom: 6,
          marginRight: 2,
          marginLeft: 2
        }}
          aria-label="customized table" >
          <TablePagination
            className='table-page'
            rowsPerPageOptions={[itemsPerPage]}
            component="div"
            count={invoices.length}
            rowsPerPage={itemsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage="Invoices per page:"
            labelDisplayedRows={({ from, to, count }) => `Showing ${from} to ${to} Invoice of ${count} Invoice(s)`}
          />
          <Table sx={{ minWidth: 650,  }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Invoice ID</StyledTableCell>
                <StyledTableCell>Invoice Number</StyledTableCell>
                <StyledTableCell >Invoice Date</StyledTableCell>
                <StyledTableCell>Billed To</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell >Status</StyledTableCell>
                <StyledTableCell ></StyledTableCell>

              </StyledTableRow>
            </TableHead>

            <TableBody>
              {(
                filteredInvoices.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((user) => (

                  <StyledTableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">{user.id}</StyledTableCell>
                    <StyledTableCell>{user.invoice_number} </StyledTableCell>
                    <StyledTableCell>{formatDate(user.invoice_date)}</StyledTableCell>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.currency}{user.amount}</StyledTableCell>
                    <StyledTableCell>
                      {/*  <Circle className={getPaymentStatus(user.amount, user.paid_amount)} /> */}
                      {getPaymentStatus(user.amount, user.paid_amount) === 'Part Paid' && (
                        <div>
                          <PartPaid>{getPaymentStatus(user.amount, user.paid_amount)}</PartPaid>
                          <PaidAmt>Due: {user.currency}{getDueAmt(user.amount, user.paid_amount)}</PaidAmt>
                        </div>
                      )}

                      {getPaymentStatus(user.amount, user.paid_amount) === 'Paid' && (
                        <Paid>{getPaymentStatus(user.amount, user.paid_amount)}</Paid>
                      )}


                      {getDueStatus(user.due_date) !== null && getPaymentStatus(user.amount, user.paid_amount) !== 'Paid' && (
                        <DueStatus>{getDueStatus(user.due_date, user.amount, user.paid_amount)}</DueStatus>
                      )}

                      <DateText>{formatDate(user.due_date)}</DateText>
                    </StyledTableCell>
                    <StyledTableCell align="end">
                      <div className="container-in">
                        <div role='button' className="container-icon" onClick={() => viewOrdersInvoice(user.invoice_number)}>
                          <OpenInNewIcon fontSize='small' />
                          <div className="text">Open</div>
                        </div>
                        <div className="container-icon" role='button' onClick={() => editInvoices(user.invoice_number)}>
                          <DriveFileRenameOutlineIcon fontSize='small' />
                          <div className="text">Edit</div>
                        </div>
                        {getPaymentStatus(user.amount, user.paid_amount) !== 'Paid' && (
                          <div className="container-icon" role='button' onClick={() => setPaymentState(user.id)}>
                            <CheckCircleOutlineIcon fontSize='small' />
                            <div className="text">Mark Paid</div>
                          </div>
                        )
                        }
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <div className="container-icon">
                            <div role='button' onClick={(e) => handleClick(e)}>
                              <MoreHorizIcon fontSize='small' />
                              <div className="text">More</div>
                            </div>
                            <Menu
                              id="menu"
                              anchorEl={anchorEl}
                              open={menuOpen}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              style={{
                                position: 'absolute',
                                top: anchorEl ? anchorEl.getBoundingClientRect().bottom : 0,
                                left: anchorEl ? anchorEl.getBoundingClientRect().left : 0,
                              }}
                              onClose={() => setMenuOpen(false)}
                            >

                              <MenuList style={{ width: '200px', maxHeight: '300px', overflowY: 'auto' }}>
                                <MenuItem>
                                  <ListItemIcon>
                                    <MailIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Send Email</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                  <ListItemIcon>
                                    <NotificationsNoneIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Send Reminder by Email</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                  <ListItemIcon>
                                    <DownloadIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Download</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                  <ListItemIcon>
                                    <DeleteIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Delete</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                  <ListItemIcon>
                                    <CancelIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Cancel</ListItemText>
                                </MenuItem>
                              </MenuList>

                            </Menu>
                          </div>
                        </ClickAwayListener>

                        {/*  <div className="container-icon" style={{ position: 'relative' }} ref={moreButtonRef} role='button' onClick={handleVertMenuClick} >
                          <MoreHorizIcon fontSize='small' />
                          <div className="text">More</div>

                        </div> */}
                      </div>


                    </StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[itemsPerPage]}
            component="div"
            count={invoices.length}
            rowsPerPage={itemsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage="Invoices per page:"
            labelDisplayedRows={({ from, to, count }) => `Showing ${from} to ${to} Invoice of ${count} Invoice(s)`}
          />
        </TableContainer>
      </Paper>


      <BootstrapDialog fullWidth open={dialogOpen} sx={{

      }}>
        <DialogTitle>
          <strong>Record Payment</strong>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosePay}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers fullWidth sx={{ padding: 3 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <div>Invoice No</div>
            </Grid>
            <Grid item xs={6}>

              {selectedInvoice?.invoice_number}
            </Grid>
            <Grid item xs={6}>
              <div>Billed To</div>
            </Grid>
            <Grid item xs={6}>
              {selectedInvoice?.name}
            </Grid>
            <Grid item xs={6}>
              <div>Invoice Total</div>
            </Grid>
            <Grid item xs={6}>
              {selectedInvoice?.currency}{selectedInvoice?.amount}
            </Grid>
            <Grid item xs={6}>
              <div>Amount Recieved</div>
            </Grid>
            <Grid item xs={6}>
              <FormControl >
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  size='small'
                  value={paidAmount}
                  onChange={onChangePaidAmt}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">{selectedInvoice?.currency}</InputAdornment>}
                  label="Amount"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <div>Payment Date</div>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={paymentDate} // Set the value prop to display the selected date
                  onChange={handlePayDateChange} // Capture the selected date
                  renderInput={(params) => (
                    <TextField {...params} label="Select Date" variant="outlined" inputFormat="DDMMYYYY" />
                  )}


                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <div>Payment Method</div>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size='small'>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={paymentMode}
                  onChange={onChangePaymentMode}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="account_transfer">Account Transfer</MenuItem>
                  <MenuItem value="cheque">Cheque</MenuItem>
                  <MenuItem value="upi">UPI</MenuItem>
                  <MenuItem value="cash">Cash Payment</MenuItem>
                  <MenuItem value="dd">Demand Draft</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>


          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClosePay} color="primary">
            Close
          </Button>
          <Button onClick={handleUpdatePay} color="primary">
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>


      <Dialog open={dialogValidationOpen} onClose={handleCloseDialog}>
        <DialogTitle>Updation Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>Invalid Amount.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default AllInvoices   