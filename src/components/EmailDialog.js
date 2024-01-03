import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { FRONTEND_API } from './urls';
import { TextareaAutosize } from '@material-ui/core';
import { FormLabel } from '@mui/material';

const EmailDialog = ({ open, handleClose, invoices }) => {

    console.log("invoice in email dialog", invoices);
    const token = localStorage.getItem("token")
    const [senderEmail, setSenderEmail] = useState("admin@tutorshive@gmail.com");
    const [receiverEmail, setReceiverEmail] = useState();
    const [taskInfo, setTaskInfo] = useState('');
    const [subject, setSubject] = useState("Invoice Details");

    const [client, setClient] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (invoices) {
                const result = formatInvoiceDataForTextField(invoices);
                setTaskInfo(result);
            }
        };
        fetchClientForInvoice(invoices.client_id);
        fetchData();
    }, [invoices]); // Update the effect when the "invoices" prop changes

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
                    console.log(user);
                    setReceiverEmail(user.email);
                })
                // navigate("/OTMform");
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    };
    const formatInvoiceDataForTextField = (invoice) => {
        if (!invoice) {
            return ''; // Return an empty string if the invoice is not provided
        }

        console.log("in format", invoice.name);

        const formattedData = `
            Hi, ${invoice.name}

            Please find attached Invoice ${invoice.invoice_number}. Due Date was ${invoice.due_date}

            Amount: ${invoice.amount}
            Currency: ${invoice.currency}
            Invoice Date: ${invoice.invoice_date}
            Name: ${invoice.name}
            Paid Amount: ${invoice.paid_amount}
            Payment Date: ${invoice.payment_date}

            Thank you for your business.

            Regards ,
            Admin
        `;

        return formattedData;
    };

    const handleSenderChange = (e) => {
        const { name, value } = e.target;
        setSenderEmail(value);
    };
    const handleReceiverChange = (e) => {
        const { name, value } = e.target;
        setReceiverEmail(value);
    };

    const handleSubjectChange = (e) => {
        const { name, value } = e.target;
        setSubject(value);
    };


    const handleTaskInfoChange = (event) => {
        setTaskInfo(event.target.value)
    };

    const handleSendMail = async () => {
        try {
            var formData = new FormData();
            formData.append("receiverEmail", receiverEmail)
            formData.append("senderEmail", senderEmail)
            formData.append("subject", subject)
            formData.append("content", taskInfo)
            formData.append("invoiceNumber", invoices.invoice_number)

            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            const response = await fetch(FRONTEND_API + 'send_mail', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();
            console.log(result);
            handleClose();  // Close the dialog after sending the email
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Compose Email</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    Fill in the details and click "Send Mail" to send the email.
                </DialogContentText> */}
                <FormLabel id="demo-row-radio-buttons-group-label">From</FormLabel>
                <TextField
                    margin="dense"

                    type="email"
                    fullWidth
                    name="senderEmail"
                    value={senderEmail}
                    onChange={handleSenderChange}
                />
                <FormLabel id="demo-row-radio-buttons-group-label">To</FormLabel>
                <TextField
                    margin="dense"

                    type="email"
                    fullWidth
                    name="receiverEmail"
                    value={receiverEmail}
                    onChange={handleReceiverChange}
                />
                <TextField
                    margin="dense"
                    label="Subject"
                    type="text"
                    fullWidth
                    name="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                />
                <TextareaAutosize

                    aria-label="Task Information"
                    placeholder="Task Information"
                    value={taskInfo}
                    onChange={handleTaskInfoChange}
                    style={{ width: '100%', resize: 'none', border: '1px solid #ccc', marginTop: '5px' }}
                />
                <p>We will attach your invoice as pdf attachemnt.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSendMail} variant="contained" color="primary">
                    Send Mail
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmailDialog;
