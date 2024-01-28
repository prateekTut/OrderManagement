import React, { createRef } from 'react';
import { Typography, Container, Portal } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { FRONTEND_API } from './urls';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import './css/invoices.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { DateRange } from 'react-date-range';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { format } from 'date-fns';
import Menu from '@mui/material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Circle,
  PartPaid,
  Paid,
  DueStatus,
  DateText,
  PaidAmt,
  ButtonContainer,
  Unpaid,
} from './styles/style';
import TablePagination from '@mui/material/TablePagination';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
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
import { StyledTableCell, StyledTableRow } from './styles/TableStyles';
import ExpenseFormModal from './ExpenseFormModal';
import DeleteModal from './DeleteModal';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function ExpenseManagement() {
  const [invoices, setInvoices] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [expenseId, setExpenseId] = useState('');

  const [expenseData, setExpenseData] = useState({
    expense_date: '',
    vendor: '',
    expense_number: '',
    amount: '',
    notes: '',
    currency: '',
    invoice_number: '',
  });
  const [recurringDate, setReccuringDate] = React.useState([]);
  const fileData = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [allExpenses, setAllExpenses] = useState([]);
  const [toggleLifetime, setToggleLifetime] = useState(false);

  const [graphBool, setGraphBool] = useState(false);
  const [summaryBool, setSummaryBool] = useState(false);

  const [expenseStatus, setExpenseStatus] = useState('');

  const today = dayjs();
  const [selectedPaymentId, setSelectedPaymentId] = useState();
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(today);
  const [paymentMode, setPaymentMode] = useState('');

  const [dialogValidationOpen, setDialogValidationOpen] = useState(false);

  const [clientName, setClientName] = useState('');

  const [openWarn, setOpenWarn] = React.useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  /* function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  } */
  console.log('currentExpenseId', expenseId);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const buttonRef = useRef(null);
  const moreButtonRef = useRef(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  console.log('date', expenseData.expense_date);
  console.log('expenseNumber', expenseData.expense_number);
  console.log('invoice number', expenseData.invoice_number);
  console.log('amount', expenseData.amount);
  console.log('notes', expenseData.notes);
  console.log('vendor', expenseData.vendor);
  console.log('currency', expenseData.currency);
  console.log('attachment', fileData);
  const submitHandler = () => {
    const formData = {
      expense_date: expenseData.expense_date,
      expense_number: expenseData.expense_number,
      invoice_number: expenseData.invoice_number,
      amount: expenseData.amount,
      notes: expenseData.notes,
      vendor: expenseData.vendor,
      currency: expenseData.currency,
      attachment: fileData.current.value,
    };

    console.log('formData', formData);
    // const formData = new FormData();

    // formData.append('expense_date', expenseDate);
    // formData.append('expense_number', expenseNumber);
    // formData.append('invoice_number', invoiceNumber);
    // formData.append('currency', currencyVal);
    // formData.append('invoice_number', invoiceNumber);
    // formData.append('amount', amount);
    // formData.append('vendor', vendor);
    // formData.append('attachment', fileData.current.value);

    fetch(
      expenseId
        ? `${FRONTEND_API}editexpense/${expenseId}`
        : `${FRONTEND_API}submitexpense`,
      {
        method: expenseId ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log('Backend response:', data);
        setShowExpenseModal(false);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const res = await fetch(`${FRONTEND_API}getAllExpenses`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('all expense data', data);
    setAllExpenses(data.expenses);
  };

  const deleteItemHandler = () => {
    const deleteExpenseUrl = `deleteexpense/${expenseId}`;

    fetch(FRONTEND_API + deleteExpenseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('successfully deleted'))
      .catch((error) => console.error('Error:', error));
    getAllExpenses();
  };

  const menuCloseHandler = () => {
    setMenuOpen(false);
  };

  const viewOrdersInvoice = (invoiceId) => {
    console.log('Invoice ID', invoiceId);
    navigate(`/generated-invoice/${invoiceId}`);
  };

  const handleBudget = (budget, currency) => {
    if (budget == null) {
      budget = 0;
    }
    if (currency == 'GBP') {
      return '£' + budget;
    } else if (currency == 'USD') {
      return '$' + budget;
    } else {
      return '₹' + budget;
    }
  };

  const toggleLData = () => {
    if (!toggleLifetime) {
      setToggleLifetime(true);
    } else {
      setToggleLifetime(false);
    }
  };

  const toggleGraph = () => {
    if (!graphBool) {
      setGraphBool(true);
    } else {
      setGraphBool(false);
    }
  };

  const toggleSummary = () => {
    if (!summaryBool) {
      setSummaryBool(true);
    } else {
      setSummaryBool(false);
    }
  };

  const handleExpenseChange = (event) => {
    setExpenseStatus(event.target.value);
  };

  const onChangePaymentMode = (event) => {
    setPaymentMode(event.target.value);
  };
  const initialDateRange = [
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ];

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
    if (dateString === null) return;
    const formattedDate = format(new Date(dateString), 'MMM dd, yyyy');
    return formattedDate;
  };

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
  };

  const handleClosePay = () => {
    setDialogOpen(false);
    setPaidAmount(null);
    setPaymentDate(null);
    setPaymentMode(null);
  };

  const handleUpdatePay = () => {
    var formdata = new FormData();
    console.log(paidAmount);
    formdata.append('amount', paidAmount);
    formdata.append('payment_date', paymentDate);
    formdata.append('payment_method', paymentMode);
    console.log(selectedInvoice.amount, 'Amount');
    if (
      paidAmount != null &&
      paidAmount != 0 &&
      paidAmount != '' &&
      paidAmount <= selectedInvoice.amount
    ) {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      fetch(
        FRONTEND_API + 'updatePaymentById/'.concat(selectedPaymentId),
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          // do something with data
          console.log('payment update status', data);
          setPaidAmount(null);
          setPaymentDate(null);
          setPaymentMode(null);
          handleClosePay();
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    } else {
      setDialogValidationOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogValidationOpen(false);
    setPaidAmount(null);
    setPaymentDate(null);
    setPaymentMode(null);
  };

  const handlePayDateChange = (date) => {
    setPaymentDate(date);
  };

  const onChangePaidAmt = (event) => {
    const newValue = event.target.value;
    setPaidAmount(newValue);
  };

  function getDueStatus(dueDate) {
    const today = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
    let dueDateFormatted = null;
    if (dueDate !== null) {
      dueDateFormatted = dueDate.split('T')[0]; // Extract date part from the due date string
    }
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
      console.log('in get dates');
      const startDate = formatDateObj(dateRange[0].startDate);
      const endDate = formatDateObj(dateRange[0].endDate);
      console.log(startDate, endDate);
      return startDate + ' - ' + endDate;
    } else {
      return 'No date range selected';
    }
  };

  const [selectedClient, setSelectedClient] = useState(null);
  //Filter Logic
  const filteredExpenses = allExpenses.filter((invoice) => {
    if (
      !selectedClient &&
      !expenseStatus &&
      (!dateRange[0] || dateRange[0].startDate === null)
    ) {
      return true;
    }

    if (selectedClient) {
      const searchedClient = invoice.vendor
        .toLowerCase()
        .includes(selectedClient?.vendor?.toLowerCase());
      return searchedClient;
    }

    // Check if invoice status is selected
    if (expenseStatus) {
      switch (expenseStatus) {
        case 'paid':
          return invoice.paid_amount >= invoice.amount; // Include fully paid invoices
        case 'unpaid':
          return invoice.paid_amount == 0 || invoice.paid_amount == null; // Include unpaid invoices
        case 'overdue':
          const today = new Date().toISOString().split('T')[0];
          return (
            invoice.due_date < today && invoice.paid_amount < invoice.amount
          ); // Include overdue invoices
        case 'part-paid':
          return (
            invoice.paid_amount > 0 && invoice.paid_amount < invoice.amount
          ); // Include partially paid invoices
        default:
          break;
      }
    }

    if (dateRange[0].startDate != null) {
      const expenseDate = new Date(invoice.expense_date);
      console.log('invocie date', expenseDate);
      const formattedExpenseDate = expenseDate.toISOString().split('T')[0];
      let startDate = dateRange[0].startDate;
      let endDate = dateRange[0].endDate;
      const withinDateRange =
        formattedExpenseDate >=
          new Date(startDate).toLocaleDateString('en-CA') &&
        formattedExpenseDate <= new Date(endDate).toLocaleDateString('en-CA');
      console.log('range', withinDateRange);

      console.log('formated expense date from filter', formattedExpenseDate);
      console.log('date range', dateRange);
      console.log(
        'date start Range',
        dateRange[0].startDate.toISOString().split('T')[0]
      );
      console.log(
        'date end Range',
        dateRange[0].endDate.toISOString().split('T')[0]
      );
      return withinDateRange;
    }
  });

  const resetFilter = () => {
    console.log('reset called');
    setDateRange(initialDateRange);
  };

  //Menu Logic
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const handleClick = (event, id) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
    console.log('click id', id);
    setSelectedInvoiceId(id);
  };

  const handleClickAway = () => {
    setMenuOpen(false);
  };

  const handleCloseMenu = () => {
    console.log('Close menu');
    setMenuOpen(false);
  };

  //Count due invoices
  function countDueExpenses(expenses) {
    // Get the current date in "YYYY-MM-DD" format
    const today = new Date().toISOString().split('T')[0];

    // Filter the expenses that are due (due_date is today or earlier)
    const dueExpenses = expenses.filter((invoice) => invoice.due_date <= today);

    // Return the number of due expenses
    return dueExpenses.length;
  }

  const totalAmountDue = allExpenses.reduce(
    (total, expense) => total + (expense.amount - expense.paid_amount),
    0
  );

  const totalAmount = allExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const totalAmountReceived = allExpenses.reduce(
    (total, invoice) => total + invoice.paid_amount,
    0
  );

  function calculateTotalAmountDueInINR(expenses) {
    // Assuming expenses is an array of objects with a currency property and amount_due property
    let totalAmountDueInINR = 0;

    for (const invoice of expenses) {
      if (invoice.currency === '₹') {
        totalAmountDueInINR = totalAmountDue;
      } else if (invoice.currency == '£') {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      } else if (invoice.currency == '$') {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      }
    }

    return totalAmountDueInINR;
  }

  function calculateTotalAmount(expenses) {
    // Assuming expenses is an array of objects with a currency property and amount_due property
    let totalAmountInINR = 0;

    for (const invoice of expenses) {
      if (invoice.currency === '₹') {
        totalAmountInINR = totalAmount;
      } else if (invoice.currency == '£') {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      } else if (invoice.currency == '$') {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      }
    }

    return totalAmountInINR;
  }

  function calculatePaymentReceived(expenses) {
    // Assuming expenses is an array of objects with a currency property and amount_due property
    let totalAmountInINR = 0;

    for (const invoice of expenses) {
      if (invoice.currency === '₹') {
        totalAmountInINR = totalAmountReceived;
      } else if (invoice.currency == '£') {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      } else if (invoice.currency == '$') {
        // Convert other currencies to INR using appropriate conversion rates
        // You need to implement the currency conversion logic here
        // totalAmountDueInINR += convertToINR(invoice.amount_due, invoice.currency);
      }
    }

    return totalAmountInINR;
  }

  console.log('current file', fileData.current);

  //Edit invoices
  const editExpense = (user) => {
    console.log(' user from edit', user);
    setShowExpenseModal(true);
    setExpenseData({
      expense_date: user.expense_date,
      vendor: user.vendor,
      expense_number: user.expense_number,
      amount: user.amount,
      notes: user.notes,
      currency: user.currency,
      invoice_number: user.invoice_number,
    });
    fileData.current = user.attachment;
    setExpenseId(user.id);
  };

  //Client dropdown
  const handleClientSelect = (event, newValue) => {
    setSelectedClient(newValue);
  };

  //handle click away date
  const handleClickAwayDate = () => {};

  const handleClickOpenWarn = (id) => {
    setOpenWarn(true);
    setDeleteId(id);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const handleInvoiceDelete = () => {
    // Add your delete logic here
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    fetch(FRONTEND_API + 'delete_invoice/'.concat(deleteId), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        handleCloseWarn();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [invoiceForMail, setInvoiceForMail] = useState([]);

  const handleOpenEmailDialog = (id) => {
    //setSelectedInvoiceNumber(invoiceNumber);
    const foundExpense = allExpenses.find((expense) => expense.id === id);
    console.log(id);
    setInvoiceForMail(foundExpense);
    console.log('Send mail dialog');
    setOpenEmailDialog(true);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setInvoiceForMail([]);
  };

  const handleDownloadPDF = async (id) => {
    const foundExpense = allExpenses.find((expense) => expense.id === id);
    console.log('In get pdf', foundExpense.expense_number);
    var expenseNumber = foundExpense.expense_number;

    try {
      const response = await fetch(
        FRONTEND_API + 'download-invoice/'.concat(expenseNumber)
      );
      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      // Convert the response blob to a blob URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a link and trigger a click to download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `${expenseNumber}_invoice.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optionally, revoke the blob URL to free up resources
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const expenseModalHandler = () => {
    setShowExpenseModal(true);
    setExpenseId('');
    setExpenseData({
      expense_date: '',
      vendor: '',
      expense_number: '',
      amount: '',
      notes: '',
      currency: '',
      invoice_number: '',
    });
    fileData.current = null;
  };

  return (
    <div style={{ marginRight: '10px' }}>
      {
        <Typography
          variant='h3'
          sx={{
            marginLeft: 2,
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Expense Management
        </Typography>
      }

      <Paper elevation={3}>
        <div className='toggle-container'>
          <div
            className='toggle-data'
            role='button'
            onClick={toggleLData}>
            <div>Lifetime Data</div>
            <div className='arrow-button'>
              <ExpandMoreIcon
                style={{
                  transform: toggleLifetime ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </div>
          </div>
          {toggleLifetime && (
            <Container style={{ paddingBottom: 10, marginLeft: 10 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}>
                  <IconWithText
                    icon={<ReceiptIcon />}
                    heading='Total Invoice'
                    content={allExpenses.length}
                    iconColor='#2E9EFF'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}>
                  <IconWithText
                    icon={<MonetizationOnIcon />}
                    heading='Invoice Due'
                    content={countDueExpenses(allExpenses)}
                    iconColor='#2E9EFF'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}>
                  <IconWithText
                    icon={<MoneyOffIcon />}
                    heading='Amount Due'
                    content={`₹${calculateTotalAmountDueInINR(allExpenses)}`}
                    iconColor='#1AAA3A'
                  />
                </Grid>
              </Grid>
            </Container>
          )}
        </div>
      </Paper>

      <div className='toggle-container'>
        <div className='filters-data'>
          <div>Filters</div>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid
              item
              xs={2}
              sm={4}
              md={4}>
              <InputLabel id='demo-select-small-label'>
                Select Invoice Status
              </InputLabel>
              <FormControl
                sx={{ marginTop: 1, minWidth: 200 }}
                size='small'>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={expenseStatus}
                  onChange={handleExpenseChange}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='paid'>Paid</MenuItem>
                  <MenuItem value='unpaid'>Unpaid</MenuItem>
                  <MenuItem value='overdue'>Overdue</MenuItem>
                  <MenuItem value='part-paid'>Part Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={2}
              sm={4}
              md={4}>
              <div>
                <InputLabel id='demo-select-small-label'>
                  Search Client
                </InputLabel>
                <Autocomplete
                  options={invoices}
                  getOptionLabel={(option) => option.name}
                  onChange={handleClientSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ marginTop: 1, maxWidth: 250 }}
                      size='small'
                      variant='outlined'
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid
              item
              xs={2}
              sm={4}
              md={4}>
              <InputLabel id='demo-select-small-label'>
                Select Date Range
              </InputLabel>
              {/* <Button variant='contained' onClick={handleButtonClick} ref={buttonRef} >Select Date</Button> */}
              <ClickAwayListener onClickAway={handleClickAwayDate}>
                <ButtonContainer
                  sx={{ marginTop: 1 }}
                  role='button'
                  onClick={handleButtonClick}
                  size='small'
                  ref={buttonRef}>
                  <span>{getDates()}</span>
                  <IconButton
                    sx={{
                      display: 'flex',
                      alignItems: 'end',
                      alignContent: 'end',
                    }}>
                    <CalendarTodayIcon />
                  </IconButton>
                </ButtonContainer>
              </ClickAwayListener>
              {showDateRangePicker && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 9999,
                    top:
                      buttonRef.current.offsetTop +
                      buttonRef.current.offsetHeight +
                      'px',
                    left: buttonRef.current.offsetLeft + 'px',
                  }}>
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
              <div
                role='button'
                onClick={resetFilter}>
                <div>Reset Filters</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='toggle-container'>
        <div
          className='toggle-data'
          role='button'
          onClick={toggleSummary}>
          <div>Expenditure Summary</div>
          <div className='arrow-button'>
            <ExpandMoreIcon
              style={{
                transform: summaryBool ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </div>
        {summaryBool && (
          <Container>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{ paddingBottom: 2 }}>
              <Grid
                item
                xs={3}>
                <IconWithText
                  icon={<ReceiptIcon />} // Use the School icon
                  heading='Expenditure'
                  content={allExpenses.length}
                  iconColor='#2E9EFF'
                />
              </Grid>
              <Grid
                item
                xs={3}>
                <IconWithText
                  icon={<MonetizationOnIcon />} // Use the Work icon
                  heading='Expenditure Amount'
                  content={calculateTotalAmount(allExpenses)}
                  iconColor='#2E9EFF'
                />
              </Grid>
              <Grid
                item
                xs={3}>
                <IconWithText
                  icon={<MoneyOffIcon />} // Use the School icon
                  heading='Amount Due'
                  content={`₹${calculateTotalAmountDueInINR(allExpenses)}`}
                  iconColor='#1AAA3A'
                />
              </Grid>

              <Grid
                item
                xs={3}>
                <IconWithText
                  icon={<MoneyOffIcon />} // Use the School icon
                  heading='Payment Received'
                  content={`₹${calculatePaymentReceived(allExpenses)}`}
                  iconColor='#1AAA3A'
                />
              </Grid>
            </Grid>
          </Container>
        )}
      </div>

      <div className='toggle-container'>
        <div
          className='toggle-data'
          role='button'
          onClick={toggleGraph}>
          <div>Invoice Graph</div>
          <div className='arrow-button'>
            <ExpandMoreIcon
              style={{
                transform: graphBool ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </div>

        {graphBool && (
          <Container>
            {/*   <InvoiceGraph
              invoices={invoices}
            /> */}
          </Container>
        )}
      </div>
      <Container
        style={{
          textAlign: 'right',
          marginRight: '0px',
          paddingRight: '0px',
          marginBottom: '10px',
        }}>
        <ExpenseFormModal
          onClose={() => setShowExpenseModal(false)}
          open={showExpenseModal}
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          editItem={editItem}
          fileData={fileData}
          editId={expenseId}
          setExpenseId={setExpenseId}
          submitHandler={submitHandler}
        />
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          deleteItemHandler={() => deleteItemHandler(expenseId)}
        />
        <Button
          variant='contained'
          size='large'
          disableElevation
          onClick={expenseModalHandler}>
          + Add Expenditure
        </Button>
      </Container>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TableContainer
          sx={{
            marginBottom: 6,
            marginRight: 2,
            marginLeft: 2,
          }}
          aria-label='customized table'>
          <TablePagination
            className='table-page'
            rowsPerPageOptions={[itemsPerPage]}
            component='div'
            count={invoices.length}
            rowsPerPage={itemsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage='Invoices per page:'
            labelDisplayedRows={({ from, to, count }) =>
              `Showing ${from} to ${to} Invoice of ${count} Invoice(s)`
            }
          />
          <Table
            sx={{ minWidth: 650 }}
            aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Invoice Number</StyledTableCell>
                <StyledTableCell>Vendor</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {filteredExpenses
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((user, index) => (
                  <StyledTableRow
                    key={index + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell
                      component='th'
                      scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDate(user.expense_date)}
                    </StyledTableCell>
                    <StyledTableCell>{user.invoice_number}</StyledTableCell>
                    <StyledTableCell>{user.vendor}</StyledTableCell>
                    <StyledTableCell>
                      {user.currency}
                      {user.amount}
                    </StyledTableCell>
                    <StyledTableCell>
                      {/*  <Circle className={getPaymentStatus(user.amount, user.paid_amount)} /> */}
                      {getPaymentStatus(user.amount, user.paid_amount) ===
                        'Part Paid' && (
                        <div>
                          <PartPaid>
                            {getPaymentStatus(user.amount, user.paid_amount)}
                          </PartPaid>
                          <PaidAmt>
                            Due: {user.currency}
                            {getDueAmt(user.amount, user.paid_amount)}
                          </PaidAmt>
                        </div>
                      )}

                      {getPaymentStatus(user.amount, user.paid_amount) ===
                        'Paid' && (
                        <Paid>
                          {getPaymentStatus(user.amount, user.paid_amount)}
                        </Paid>
                      )}

                      {getDueStatus(user.due_date) !== null &&
                        getPaymentStatus(user.amount, user.paid_amount) !=
                          'Paid' && (
                          <DueStatus>
                            {getDueStatus(
                              user.due_date,
                              user.amount,
                              user.paid_amount
                            )}
                          </DueStatus>
                        )}
                      {user.paid_amount == null && <Unpaid>Unpaid</Unpaid>}
                      <DateText>{formatDate(user.due_date)}</DateText>
                    </StyledTableCell>
                    <StyledTableCell align='end'>
                      <div className='container-in'>
                        <div
                          role='button'
                          className='container-icon'
                          onClick={() =>
                            viewOrdersInvoice(user.invoice_number)
                          }>
                          <OpenInNewIcon fontSize='small' />
                          <div className='text'>Open</div>
                        </div>
                        {console.log('attachment from list', user.attachment)}
                        <div
                          className='container-icon'
                          role='button'
                          onClick={() => editExpense(user)}>
                          <DriveFileRenameOutlineIcon fontSize='small' />
                          <div className='text'>Edit</div>
                        </div>
                        {getPaymentStatus(user.amount, user.paid_amount) !==
                          'Paid' && (
                          <div
                            className='container-icon'
                            role='button'
                            onClick={() => {
                              setPaymentState(user.id);
                              console.log('user from mark paid', user);
                            }}>
                            <CheckCircleOutlineIcon fontSize='small' />
                            <div className='text'>Mark Paid</div>
                          </div>
                        )}

                        <div className='container-icon'>
                          <div
                            role='button'
                            onClick={(e) => {
                              console.log('delete icon clicked', user);
                              setExpenseId(user.id);
                              handleClick(e, user.id);
                            }}>
                            <MoreHorizIcon fontSize='small' />
                            <div className='text'>More</div>
                          </div>

                          <Menu
                            id={`menu-${user.id}`}
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={menuCloseHandler}>
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  handleOpenEmailDialog(selectedInvoiceId)
                                }>
                                <ListItemIcon>
                                  <MailIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Send Email</ListItemText>
                              </MenuItem>

                              {/* <MenuItem>
                                  <ListItemIcon>
                                    <NotificationsNoneIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Send Reminder by Email</ListItemText>
                                </MenuItem>*/}

                              <MenuItem
                                onClick={() => {
                                  handleDownloadPDF(selectedInvoiceId);
                                  console.log('user from download', user);
                                }}>
                                <ListItemIcon>
                                  <DownloadIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Download</ListItemText>
                              </MenuItem>

                              <MenuItem
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  menuCloseHandler();
                                }}>
                                <ListItemIcon>
                                  <DeleteIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                              </MenuItem>

                              <MenuItem onClick={() => handleCloseMenu()}>
                                <ListItemIcon>
                                  <CancelIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Cancel</ListItemText>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </div>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[itemsPerPage]}
            component='div'
            count={invoices.length}
            rowsPerPage={itemsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage='Invoices per page:'
            labelDisplayedRows={({ from, to, count }) =>
              `Showing ${from} to ${to} Invoice of ${count} Invoice(s)`
            }
          />
        </TableContainer>
      </Paper>

      {/*  <EmailDialog open={openEmailDialog} handleClose={handleCloseEmailDialog} invoices={invoiceForMail} />
       */}
      <BootstrapDialog
        fullWidth
        open={dialogOpen}
        sx={{}}>
        <DialogTitle>
          <strong>Record Payment</strong>
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClosePay}
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid
              item
              xs={6}>
              <div>Invoice No</div>
            </Grid>
            <Grid
              item
              xs={6}>
              {selectedInvoice?.invoice_number}
            </Grid>
            <Grid
              item
              xs={6}>
              <div>Billed To</div>
            </Grid>
            <Grid
              item
              xs={6}>
              {selectedInvoice?.name}
            </Grid>
            <Grid
              item
              xs={6}>
              <div>Invoice Total</div>
            </Grid>
            <Grid
              item
              xs={6}>
              {selectedInvoice?.currency}
              {selectedInvoice?.amount}
            </Grid>
            <Grid
              item
              xs={6}>
              <div>Amount Recieved</div>
            </Grid>
            <Grid
              item
              xs={6}>
              <FormControl>
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Amount
                </InputLabel>
                <OutlinedInput
                  size='small'
                  value={paidAmount}
                  onChange={onChangePaidAmt}
                  id='outlined-adornment-amount'
                  startAdornment={
                    <InputAdornment position='start'>
                      {selectedInvoice?.currency}
                    </InputAdornment>
                  }
                  label='Amount'
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={6}>
              <div>Payment Date</div>
            </Grid>
            <Grid
              item
              xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={paymentDate} // Set the value prop to display the selected date
                  onChange={(date) => handlePayDateChange(date)} // Capture the selected date
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select Date'
                      variant='outlined'
                      inputFormat='DDMMYYYY'
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid
              item
              xs={6}>
              <div>Payment Method</div>
            </Grid>
            <Grid
              item
              xs={6}>
              <FormControl
                fullWidth
                size='small'>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={paymentMode}
                  onChange={onChangePaymentMode}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='account_transfer'>Account Transfer</MenuItem>
                  <MenuItem value='cheque'>Cheque</MenuItem>
                  <MenuItem value='upi'>UPI</MenuItem>
                  <MenuItem value='cash'>Cash Payment</MenuItem>
                  <MenuItem value='dd'>Demand Draft</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClosePay}
            color='primary'>
            Close
          </Button>
          <Button
            onClick={handleUpdatePay}
            color='primary'>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Dialog
        open={dialogValidationOpen}
        onClose={handleCloseDialog}>
        <DialogTitle>Updation Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>Invalid Amount.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWarn}
        onClose={handleCloseWarn}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure you want to delete this user?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            After selecting this step this user will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWarn}>Close</Button>
          <Button
            onClick={handleInvoiceDelete}
            autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExpenseManagement;

// useEffect(() => {
//   getAllExpenses();
// }, []);

// const getAllExpenses = async () => {
//   const res = await fetch(`${FRONTEND_API}getAllExpenses`, {
//     headers: {
//       Authorization: 'Bearer ' + token,
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await res.json();
//   console.log('all expense data', data);
//   setAllExpenses(data.expenses);
// };
