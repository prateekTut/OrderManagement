import { Box, Container, CssBaseline, Grid, InputAdornment, Paper, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Logo from "./img/logo.jpg";
import { FormControl, TextField, InputLabel, Select, MenuItem, Button, FormControlLabel } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FRONTEND_API } from "./urls";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';
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
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { DateRange } from 'react-date-range';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import PDFDemo from './styles/PDFDemo';




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

function generateInvoiceNumber() {
  // Generate a random 4-digit number
  const random4Digits = Math.floor(1000 + Math.random() * 9000);
  const invoiceNumber = `TH-${random4Digits}`;
  return invoiceNumber;
}

function GenerateVendorInvoice() {

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
      {
      value: 'A$',
      label: 'Australian Dollar(AUD, $)',
    },
  ];
  let params = useParams();

  const [userClientType, setUserClientType] = useState('');
  const [client, setclient] = useState([]);
  const [clientId, setClientId] = useState(0);
  const token = localStorage.getItem("token")
  const [userClient, setUserClient] = React.useState('');
  const [currencyValue, setCurrencyValue] = React.useState(currencies.at(0).value)

  const [taxType, setTaxType] = React.useState('');

  const [selectedTax, setSelectedTax] = useState('');

  const [radioError, setRadioError] = useState(false);

  const [savedTax, setSavedTax] = React.useState('');
  const [saveSubTax, setSaveSubTax] = useState('');

  const [orders, setOrders] = useState([]);

  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState('');
  const [alertContent, setAlertContent] = useState('');


  const [dialogOpen, setDialogOpen] = useState(false);
  const [discountDialog, setDiscountDialogOpen] = useState(false);
  const [dialogValidationOpen, setDialogValidationOpen] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const handleButtonClick = () => {
    setShowDateRangePicker(!showDateRangePicker);
  };
  const handleCloseDialog = () => {
    setDialogValidationOpen(false);
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
      fetchClientsData(startDate, endDate)
    }

  };

  const getDates = () => {
    const startDate = dateRange[0].startDate.toLocaleDateString('en-US');
    const endDate = dateRange[0].endDate.toLocaleDateString('en-US');
    console.log(startDate, endDate);
    return "Date Ranges: " + startDate + " - " + endDate;
  };

  const fetchClientsData = (start, end) => {

    var formdata = new FormData();
    //const startDate = dateRange[0].startDate;
    //const endDate = dateRange[0].endDate;
    const startDate = start.toLocaleDateString('en-US');
    const endDate = end.toLocaleDateString('en-US');
    console.log(startDate, endDate);
    formdata.append("start_date", startDate);
    formdata.append("end_date", endDate)
    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
        'Authorization': 'Bearer ' + token
      }

    };

    fetch(FRONTEND_API + "getVendorOrderHistory/".concat(params.userId), requestOptions)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((result) => {
        console.log(result);
        setOrders(result);

        // navigate("/OTMform");
        updateTableDataWithReceivedData(tableData, result);
      })
      .catch((error) => {
        console.log(error)
      });

  };

  const [tableData, setTableData] = useState([
    { id: 0, order_id: 0, item: '', taxRate: 0, quantity: 0, rate: 0, amount: 0, igst: 0, sgst: 0, cgst: 0, amount: 0, total: 0 },
  ]);

  const today = dayjs();
  const nextDate = today.add(1, 'day');

  const [dueDate, setDueDate] = useState(nextDate);
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState(null);

  const [discount, setDiscount] = useState(0);
  //const [dis, setTotal] = useState(0);

  const [clientInvoice, setClientInvoice] = useState(null);
  const [downloadPdf, setDownloadPdf] = useState(false);

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
    console.log(index);
    const updatedTableData = tableData.filter((row) => row.id !== index);
    setTableData(updatedTableData);
  }

  const handleRadioChange = (event) => {
    //setSelectedRadio(event.target.value);
    console.log(event.target.value);
    setUserClientType(event.target.value);
    //fetchInitial(event.target.value);
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

  const handleDiscount = () => {
    setDiscountDialogOpen(true)
  };


  const handleCloseDiscount = () => {
    console.log(discountDialog);
    setDiscountDialogOpen(false);
    setDiscount(0);

  };

  const handleSaveDiscount = () => {
    if (discountDialog) {
      setDiscountDialogOpen(false);
    }
  };

  const handleDiscountChange = (event) => {
    const { name, value } = event.target;
    setDiscount(value);
  };

  const handleTaxUpdate = () => {
    setDialogOpen(true);
  };

  const handleTaxTypeChange = (event) => {
    const { name, value } = event.target;
    if (savedTax != null)
      setTaxType(value);
    else
      setTaxType(savedTax);

  };

  const handleSaveTax = () => {
    if (taxType == 'gst') {
      if (selectedTax == '') {
        setRadioError(true);
      } else {
        setRadioError(false)
        setSavedTax(taxType)
        setSaveSubTax(selectedTax)

        setDialogOpen(false);
      }
    } else if (taxType == 'none') {
      setSavedTax('')
      setDialogOpen(false);
    } else {
      setSavedTax(taxType);
      setDialogOpen(false);
    }
  };

  const handleInvoiceDate = (date) => {
    setInvoiceDate(date);
  }

  const handleDueDate = (date) => {
    setDueDate(date);
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  /*  const handlePrint = () => {
     window.print();
   }; */
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check file type
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'doc' || fileType === 'pdf') {
        // Check file size (2MB limit)
        if (file.size <= 2 * 1024 * 1024) {
          setSelectedFile(file);
        } else {
          alert('File size exceeds 2MB limit.');
        }
      } else {
        alert('Invalid file type. Please select a DOC or PDF file.');
      }
    }
  };



  const generateAndSetInvoiceNumber = () => {
    const newInvoiceNumber = generateInvoiceNumber();
    setInvoiceNumber(newInvoiceNumber);
  };

  useEffect(() => {
    fetchClientForInvoice(params.userId);
    generateAndSetInvoiceNumber();
  }, []);

  const fetchClientForInvoice = (userId) => {
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

  /*   const fetchOrderData = (userId) => {
      console.log("Tutor ID", userId);
      fetch(FRONTEND_API + "/getStudentOrderHistory/".concat(userId), {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then((res) => res.json())
        .then((data) => {
          // do something with data
          console.log("Orders data", data);
  
          setClientId(data[0].client_id)
          fetchClientForInvoice(data[0].client_id);
          setOrders(data);
  
          // navigate("/OTMform");
          updateTableDataWithReceivedData(tableData, data);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }; */

  const updateTableDataWithReceivedData = (tableData, receivedData) => {
    // Assuming the receivedData array contains an object with the data you want to add

    // Make a copy of the existing tableData array
    const updatedTableData = [...tableData];

    for (let i = 0; i < receivedData.length; i++) {
      const receivedItem = receivedData[i];
      updatedTableData[i] = {
        ...updatedTableData[i],
        id: i,
        order_id: receivedItem.id,
        amount: receivedItem.order_budget,
        item: receivedItem.task,
        total: receivedItem.order_budget,
        quantity: 1,
        rate: receivedItem.order_budget,
      };
    }
    console.log(updatedTableData);
    // Set the updated tableData to the state
    setTableData(updatedTableData);
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
            igst = (taxRate / 100) * (amount);
          } else if (saveSubTax === 'gst') {
            cgst = (taxRate / 200) * (amount);
            sgst = (taxRate / 200) * (amount);
          }
          total = amount + igst + cgst + sgst;
        } else if (savedTax === 'vat') {
          console.log(taxRate / 100);
          vat = (taxRate / 100) * (amount);
          console.log(vat);
          total = amount + vat;
        } else {
          total = amount;
        }

        //igst = (taxRate / 100) * (amount);

        return { ...row, [field]: newValue, amount, igst, cgst, sgst, vat, total };
      }
      return row;
    });
    setTableData(updatedTableData);

  };

  const getTotal = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.total;
    })
    return total - getDiscount();
  }

  const getDiscount = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.total;
    })
    const discountAmount = (discount / 100) * total;
    return discountAmount;
  }

  const getTotalAmount = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.amount;
    })
    console.log(getDiscount())
    return total;
  }

  const getIgst = () => {
    let total = 0;
    if (savedTax == 'gst' && saveSubTax == 'igst') {
      tableData.forEach((row) => {
        total += row.igst;
      })
    }
    else if (savedTax == 'vat') {
      tableData.forEach((row) => {
        total += row.vat;
      })
    }
    return total;
  }

  const getSgst = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.sgst
    })
    return total;
  }

  const getCgst = () => {
    let total = 0;
    tableData.forEach((row) => {
      total += row.cgst
    })
    return total;
  }


  const insertInvoice = async () => {
    console.log(clientId);
    const pdf = new jsPDF('p', 'mm', 'a4');

    let pdfBlob;

    await html2canvas(componentRef.current).then(async (canvas) => {
      let imgData, quality = 1.0;
    
      do {
        // Convert canvas to image data URL with the current quality
        imgData = canvas.toDataURL('image/jpeg', quality);
    
        // Add the image to the PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Adjust width and height as needed
    
        // Output PDF blob
        pdfBlob = pdf.output('blob');
    
        // Check the size of the PDF blob
        if (pdfBlob.size > 1024 * 1024 && quality > 0.1) {
          // If the size is still greater than 1MB, reduce quality and retry
          quality -= 0.1;
          pdf.deletePage(); // Remove the added page
        } else {
          // Break the loop if the size is within the limit or quality is too low
          break;
        }
      } while (true);
    });

    const data = tableData;
    //const pdfBlob = pdf.output('blob');
    const pdfFile = new File([pdfBlob], 'invoice.pdf', { type: 'application/pdf' });

    if (invoiceDate != null && dueDate != null) {


      console.log(selectedFile);

      /*  const jsonData = {
         data: data,            // Your JSON data
         invoiceNumber: invoiceNumber,
         invoiceDate: invoiceDate,
         dueDate: dueDate,
         taxType: savedTax,
         document: selectedFile,
         discount: getDiscount(),
         diskPercent: discount,
         currency: currencyValue,
         total: getTotal(),
         totalAmount: getTotalAmount(),
         subTax: saveSubTax
       }; */

      //const jsonPayload = JSON.stringify(jsonData);

      const formData = new FormData();
      formData.append('data', JSON.stringify({
        data: data,
        invoiceNumber: invoiceNumber,
        invoiceDate: invoiceDate,
        dueDate: dueDate,
        taxType: savedTax,
        discount: getDiscount(),
        diskPercent: discount,
        currency: currencyValue,
        total: getTotal(),
        totalAmount: getTotalAmount(),
        subTax: saveSubTax,
      }));

      formData.append('document', selectedFile);
      formData.append('invoicepdf', pdfFile);
      console.log(formData);

      var requestOptions = {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData,
      };

      fetch(FRONTEND_API + 'saveInvoice/'.concat(params.userId), requestOptions)
        .then((response) => {
          if (response.status == 200) {
            setStatus("200")
            return response.json();
          } else {
            setStatus(response.status)
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          setAlertContent(data.message);
          setAlert(true);
           setClientInvoice(data);
          setTimeout(() => {
            setDownloadPdf(true);
          }, 2000);
          // Log the response from the server
          // You can perform additional actions here if needed
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    } else {
      setDialogValidationOpen(true);
    }

  };
function getFile(blob) {
    console.log(blob);
    const formData = new FormData();
    formData.append('invoicepdf', blob);
    console.log(formData);

    var requestOptions = {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData,
    };

    fetch(FRONTEND_API + 'uploadInvoice/'.concat(invoiceNumber), requestOptions)
      .then((response) => {
        if (response.status == 200) {
          setStatus("200")
          return response.json();
        } else {
          setStatus(response.status)
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setAlertContent(data.message);
        setAlert(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <Container sx={{ bgcolor: "#FBF1F7" }}>
      <Box sx={{ display: 'flex', }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper sx={{ m: 5, p: 5, display: 'flex', flexDirection: 'column', border: '1px solid #C7A1BD' }}>
                <div ref={componentRef} >
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
                            <p>{invoiceNumber}</p>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <strong>Date:</strong>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={invoiceDate} // Set the value prop to display the selected date
                                onChange={handleInvoiceDate} // Capture the selected date
                                renderInput={(params) => <TextField {...params} label="Select Date" variant="outlined" />}

                              />
                            </LocalizationProvider>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <strong>Add Due Date:</strong>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={dueDate} // Set the value prop to display the selected date
                                onChange={handleDueDate} // Capture the selected date
                                renderInput={(params) => <TextField {...params} label="Select Date" variant="outlined" />}
                              />
                            </LocalizationProvider>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <strong>Select Date Range:</strong>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant='contained'
                            onClick={handleButtonClick}>Select Date</Button>

                          {showDateRangePicker && (
                            <DateRange
                              editableDateInputs={true}
                              onChange={handleDateRangeChange}
                              moveRangeOnFirstSelection={false}
                              ranges={dateRange}
                            />
                          )}
                          {dateRange != null && (
                            <div>
                              <p>{getDates()}</p>
                            </div>
                          )}
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
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Button variant="outlined" sx={{ mt: 3, mb: 2, marginRight: 2 }}
                      onClick={handleTaxUpdate}>
                      {savedTax != '' ? 'Configure Tax' : 'Add Tax'}
                    </Button>
                    <InputLabel id="demo-simple-select-label" sx={{ marginRight: 2 }}>Currency</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={currencyValue}

                      onChange={handleCurrencyChange}
                      error={currencyValue === ''}
                      helperText={currencyValue === '' && 'Select Currency'}
                      fullWidth
                      sx={{ width: '200px' }}
                    >
                      {currencies.map((data) => (

                        <MenuItem value={data.value}>{data.label}</MenuItem>

                      ))}
                    </Select>
                  </div>

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
                            {savedTax && (
                              <StyledTableCell >{savedTax == 'gst' ? 'GST Rate' : 'VAT Rate'}</StyledTableCell>
                            )}
                            <StyledTableCell>Quantity</StyledTableCell>
                            <StyledTableCell >Rate</StyledTableCell>
                            {/* */}

                            {savedTax == 'gst' && saveSubTax == 'gst' && (

                              <StyledTableCell >Amount</StyledTableCell>

                            )}
                            {savedTax == 'gst' && saveSubTax == 'igst' && (

                              <StyledTableCell >Amount</StyledTableCell>

                            )}
                            {savedTax == 'gst' && saveSubTax == 'igst' && (
                              <StyledTableCell >IGST</StyledTableCell>
                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (

                              <StyledTableCell >CGST</StyledTableCell>

                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (

                              <StyledTableCell >SGST</StyledTableCell>

                            )}
                            {savedTax == 'vat' && (

                              <StyledTableCell >VAT</StyledTableCell>

                            )}

                            <StyledTableCell >Total</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                          </StyledTableRow>
                        </TableHead>

                        {tableData.length > 0 && tableData.map((data, index) => (
                          <TableBody key={data.id}>
                            <StyledTableCell>
                              <TextField

                                variant="standard"
                                value={data.item}
                                onChange={(event) => handleInputChange(event, 'item', data.id)}
                              />
                            </StyledTableCell>
                            {savedTax && (
                              <StyledTableCell>
                                <div>
                                  <TextField

                                    variant="standard"
                                    value={data.taxRate}
                                    onChange={(event) => handleInputChange(event, 'taxRate', data.id)}
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                  />

                                </div>
                              </StyledTableCell>
                            )}
                            <StyledTableCell>
                              <TextField id="standard-basic"

                                variant="standard"
                                value={data.quantity}
                                onChange={(event) => handleInputChange(event, 'quantity', data.id)}
                              />
                            </StyledTableCell>

                            <StyledTableCell>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                                <TextField
                                  id="standard-basic"

                                  variant="standard"
                                  value={data.rate}
                                  onChange={(event) => handleInputChange(event, 'rate', data.id)}
                                />
                              </div>
                            </StyledTableCell>

                            {savedTax == 'gst' && saveSubTax == 'igst' && (
                              <StyledTableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>

                                  <TextField
                                    id="standard-basic"
                                    disabled
                                    variant="standard"
                                    value={data.amount}
                                    onChange={(event) => handleInputChange(event, 'amount', data.id)}
                                  />

                                </div>
                              </StyledTableCell>
                            )}

                            {savedTax == 'gst' && saveSubTax == 'igst' && (
                              <div>

                                <StyledTableCell >
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>

                                    <TextField
                                      id="standard-basic"
                                      disabled
                                      variant="standard"
                                      value={data.igst != null ? data.igst.toFixed(2) : 0}
                                      onChange={(event) => handleInputChange(event, 'igst', data.id)}

                                    />

                                  </div>
                                </StyledTableCell>
                              </div>
                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (
                              <StyledTableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>

                                  <TextField
                                    id="standard-basic"
                                    disabled
                                    variant="standard"
                                    value={data.amount}
                                    onChange={(event) => handleInputChange(event, 'amount', data.id)}
                                  />

                                </div>
                              </StyledTableCell>
                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (
                              <div>

                                <StyledTableCell >
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                                    <TextField
                                      disabled
                                      id="standard-basic"

                                      variant="standard"
                                      value={data.cgst != null ? data.cgst.toFixed(2) : 0}
                                      onChange={(event) => handleInputChange(event, 'cgst', data.id)}

                                    />
                                  </div>
                                </StyledTableCell>
                              </div>

                            )}
                            {savedTax == 'gst' && saveSubTax == 'gst' && (
                              <StyledTableCell >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>

                                  <TextField
                                    disabled
                                    id="standard-basic"
                                    variant="standard"
                                    value={data.sgst != null ? data.sgst.toFixed(2) : 0}
                                    onChange={(event) => handleInputChange(event, 'sgst', data.id)}

                                  />
                                </div>
                              </StyledTableCell>
                            )}

                            {savedTax == 'vat' && (

                              <StyledTableCell >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>

                                  <TextField
                                    disabled
                                    id="standard-basic"
                                    variant="standard"
                                    value={data.vat != null ? data.vat.toFixed(2) : 0}
                                    onChange={(event) => handleInputChange(event, 'vat', data.id)}

                                  />
                                </div>
                              </StyledTableCell>

                            )}

                            <StyledTableCell>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>

                                {data.total != null ? data.total.toFixed(2) : 0}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell> <CloseIcon onClick={() => handleRemoveRow(data.id)} /></StyledTableCell>
                          </TableBody>
                        ))}

                      </Table>
                    </TableContainer>

                    {tableData.length >= 1 && (
                      <Grid alignItems='end' display='flex' justifyContent='flex-end' container spacing={2}>
                        <Grid item xs={9}>
                          <Typography align="right" variant="subtitle1">
                            Amount:
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography align="right" variant="subtitle1">
                          <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                            {isNaN(getTotalAmount()) ? 0 : getTotalAmount().toFixed(2)}
                          </Typography>
                        </Grid>

                        {savedTax === 'gst' && saveSubTax === 'gst' && (
                          <>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                SGST:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                              <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                                {isNaN(getSgst()) ? 0 : getSgst().toFixed(2)}
                              </Typography>
                            </Grid>

                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                CGST:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                              <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                                {isNaN(getCgst()) ? 0 : getCgst().toFixed(2)}
                              </Typography>
                            </Grid>
                          </>
                        )}

                        {savedTax === 'gst' && saveSubTax === 'igst' && (
                          <>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                IGST:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                              <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                                {isNaN(getIgst()) ? 0 : getIgst().toFixed(2)}
                              </Typography>
                            </Grid>
                          </>
                        )}

                        {savedTax === 'vat' && (
                          <>
                            <Grid item xs={9}>
                              <Typography align="right" variant="subtitle1">
                                VAT:
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                                
                                (+){isNaN(getIgst()) ? 0 : getIgst().toFixed(2)}
                              </Typography>
                            </Grid>

                          </>
                        )}
                        {discount != 0 && (
                          <>
                            <Grid item xs={9}>

                              <Typography align="right" variant="subtitle1">
                                Discount({discount}%):
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right" variant="subtitle1">
                                (-){isNaN(getDiscount()) ? 0 : getDiscount().toFixed(2)}
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
                          <span style={{ marginRight: '5px', marginTop: '0px' }}>{currencyValue}</span>
                            {isNaN(getTotal()) ? 0 : getTotal().toFixed(2)}
                          </Typography>
                        </Grid>

                      </Grid>

                    )}


                  </Box>
                </div>
                <Button variant='outlined' sx={{ mt: 3, width: '200px' }} onClick={handleAddRow}>
                  Add More Items
                </Button>
                <Button variant='outlined' sx={{ mt: 3, width: '200px' }} onClick={handleDiscount}>
                  Add Discount
                </Button>
                {tableData.length >= 1 && (
                  <Button variant="outlined" type='submit' sx={{ mt: 3, width: '200px' }} onClick={handlePrint}>
                    Print & Save as PDF
                  </Button>
                )}
                 {downloadPdf && (
                  <PDFDownloadLink document={<PDFDemo invoice={clientInvoice} />} fileName="example.pdf">
                    {({ blob, url, loading, error }) => {
                      if (!loading && blob) {
                        // Use the blob as needed in your application logic
                        console.log('PDF Blob:', blob);
                        getFile(blob);
                        // You can send the blob to the backend here or perform any other action
                      }

                      return null; // This will prevent rendering any visible content
                    }}
                  </PDFDownloadLink>
                )}
                <Button variant="outlined" type='submit' sx={{ mt: 3, width: '200px' }} onClick={() => insertInvoice()}>
                  Save Invoice
                </Button>

                {alert && status == "400" ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                {alert && status == "200" ? <Alert severity='success'>{alertContent}</Alert> : <></>}

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>


      <Dialog open={dialogValidationOpen} onClose={handleCloseDialog}>
        <DialogTitle>Form Validation Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill in all required fields correctly.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>


      <BootstrapDialog fullWidth open={discountDialog} sx={{

      }}>
        <DialogTitle>
          <strong>Add Discount</strong>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDiscount}
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
          <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>Enter Discount</InputLabel>
          <TextField

            id="standard-basic"
            variant="standard"
            value={event.value}
            onChange={(event) => handleDiscountChange(event)}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDiscount} color="primary">
            Close
          </Button>
          <Button onClick={handleSaveDiscount} color="primary">
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog fullWidth open={dialogOpen} sx={{

      }}>
        <DialogTitle>
          <strong>Configure Tax</strong>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseTax}
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
          <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>Select Tax Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={taxType}
            placeholder='Tax'
            onChange={handleTaxTypeChange}
            fullWidth
            sx={{ mb: 1 }}
          >
            <MenuItem value={'none'}>None</MenuItem>
            <MenuItem value={'gst'}>GST (India)</MenuItem>
            <MenuItem value={'vat'}>VAT</MenuItem>

          </Select>

          {taxType == 'gst' && (
            <Box sx={{ marginTop: 3 }}>
              <strong>GST Type</strong>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedTax}
                onChange={handleTaxRadioChange}
              >

                <FormControlLabel value="igst" control={<Radio />} label="IGST" />

                <FormControlLabel value="gst" control={<Radio />} label="CGST & SGST" />
              </RadioGroup>
              {radioError && <p style={{ color: 'red' }}>Please select a tax option.</p>}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseTax} color="primary">
            Close
          </Button>
          <Button onClick={handleSaveTax} color="primary">
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>

    </Container>

  )

}

export default GenerateVendorInvoice