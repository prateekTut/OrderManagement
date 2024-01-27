import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import { FRONTEND_API } from './urls';
import './css/expenseForm.css';
import { Form, json } from 'react-router-dom';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ExpenseFormModal = ({ open, onClose, setExpenses }) => {
  const [expenseDate, setExpenseDate] = useState('');
  const [vendor, setVendor] = useState('selectVendor');
  const [expenseNumber, setExpenseNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [value, setValue] = React.useState('female');
  const [isRecurringChecked, setIsReccuringChecked] = useState(false);
  const [currencyVal, setCurrencyVal] = useState('currencies');
  const [personName, setPersonName] = React.useState([]);
  const fileData = createRef();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {};

  const handleSave = () => {
    // Add your logic to save the form data
    // For example, you can send it to an API or update state in your parent component
    // Don't forget to close the modal
    onClose();
  };
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
  const vendorsList = [
    {
      id: '1',
      vendor: 'Jazz',
    },
    {
      id: '2',
      vendor: 'Jazeel',
    },
    {
      id: '1',
      vendor: 'job',
    },
  ];

  const handleRecurringCheckbox = (e) => {
    console.log('value from recurring', e.target.checked);
    setIsReccuringChecked(e.target.checked);
    console.log('recurring called');
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  let token = localStorage.getItem('token');
  const submitHandler = () => {
    console.log('date', expenseDate);
    console.log('expenseNumber', expenseNumber);
    console.log('invoice number', invoiceNumber);
    console.log('amount', amount);
    console.log('notes', notes);
    console.log('vendor', vendor);
    console.log('currency', currencyVal);

    const formData = {
      expense_date: expenseDate,
      expense_number: expenseNumber,
      invoice_number: invoiceNumber,
      amount: amount,
      notes: notes,
      vendor: vendor,
      currency: currencyVal,
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

    fetch(`${FRONTEND_API}submitexpense`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log('Backend response:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
    onClose();
    setExpenses({
      expenseDate: expenseDate,
      expenseNumber: expenseNumber,
      invoiceNumber: invoiceNumber,
      currency: currencyVal,
      amount: amount,
      notes: notes,
      vendor: vendor,
    });
  };
  const vendorSelectHandler = (e) => {
    setVendor(e.target.value);
  };
  const currecyChangeHandler = (e) => {
    console.log('inside currency', e.target.value);
    setCurrencyVal(e.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh', // Set maximum height for the modal content
          overflowY: 'auto', // Enable vertical scrolling
        }}>
        <h2
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'darkblue',
            fontSize: 'large',
          }}>
          Expenditures
        </h2>
        {/* <InputLabel id='demo-simple-select-date'>Date</InputLabel> */}
        <TextField
          id='demo-simple-select-date'
          labelId='demo-simple-select-date'
          label='Date'
          fullWidth
          margin='normal'
          size='small'
          type='date'
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            placeholder: '',
          }}
        />
        <FormControl
          fullWidth
          style={{ marginTop: '10px' }}>
          <InputLabel id='demo-simple-select-label'>Select Vendors</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={vendor}
            label='Select Vendors'
            size='small'
            onChange={vendorSelectHandler}>
            {vendorsList.map((vndr) => (
              <MenuItem
                key={vndr.id}
                value={vndr.vendor}>
                {vndr.vendor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin='normal'
          label='Expense Number'
          size='small'
          value={expenseNumber}
          onChange={(e) => setExpenseNumber(e.target.value)}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Invoice Number'
          value={invoiceNumber}
          size='small'
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
        <FormControl
          fullWidth
          style={{ marginTop: '10px' }}>
          <InputLabel id='demo-simple-select-label'>currencies</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={currencyVal}
            size='small'
            label='currencies'
            onChange={currecyChangeHandler}>
            {currencies.map((currency) => (
              <MenuItem value={currency.value}>{currency.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin='normal'
          label='Amount'
          type='number'
          size='small'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          minRows={3}
          placeholder='Notes'
          label='Notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: '100%', marginTop: '16px' }}
        />
        <div className='file-upload'>
          <p style={{ fontSize: 'large' }}>Attachements</p>
          <p style={{ color: 'gray' }}>
            *Attachments won't appear as separate documents; instead, they'll be
            accessible as clickable links within the invoice
          </p>
          <div style={{ marginTop: '6px' }}>
            <label htmlFor='fileInput'>
              <Button
                style={{
                  border: '1px solid gray',
                  borderRadius: '8px',
                  padding: '6px',
                }}
                component='span'>
                <AddIcon fontSize='small' />
              </Button>
            </label>
            <input
              id='fileInput'
              type='file'
              hidden
              ref={fileData}
            />
          </div>
        </div>
        <div className='main-container'>
          <div className='checkbox-container'>
            <Checkbox
              {...label}
              onChange={handleRecurringCheckbox}
            />
            <p>This is recurring expense</p>
          </div>
          {isRecurringChecked && (
            <>
              <div>
                A draft expenditure will be created with same details every next
                period.
              </div>
              <div className='select-repeat'>
                <p>Expenditure repeats</p>
                <FormControl
                  style={{
                    marginTop: '10px',
                    marginLeft: '6px',
                    minWidth: 120,
                  }}>
                  <InputLabel id='demo-simple-select-label'>Date</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={'Date'}
                    label='Date'
                    size='small'
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='select-repeat'>
                <p>Next Repeat dates</p>
                <FormControl
                  style={{
                    marginTop: '10px',
                    marginLeft: '6px',
                    minWidth: 120,
                  }}>
                  <InputLabel id='demo-simple-select-label'>Date</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={'Date'}
                    label='Date'
                    size='small'
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='radio-group'>
                <FormControl>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={value}
                    onChange={handleRadioChange}>
                    <FormControlLabel
                      value='female'
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Create as Draft</p>
                  Create a draft of the new expense. I will approve and send it
                  to the vendor.
                </div>
              </div>
              <div className='radio-group'>
                <FormControl>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={value}
                    onChange={handleRadioChange}>
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Create and Save</p>
                  Create a normal expense but don't send it, I will send it to
                  the vendor myself.
                </div>
              </div>
            </>
          )}
          <div>
            <div className='button-containter'>
              <Button
                variant='contained'
                color='primary'
                onClick={submitHandler}>
                Save
              </Button>
              <Button
                variant='contained'
                style={{
                  backgroundColor: 'white', // white background
                  border: '1px solid blue', // blue border
                  borderRadius: '5px', // slightly rounded corners
                  color: 'blueviolet',
                }}
                color='primary'
                onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ExpenseFormModal;
