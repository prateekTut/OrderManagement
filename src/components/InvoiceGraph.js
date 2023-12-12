import { Box, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FRONTEND_API } from "./urls";
import { useTheme } from '@mui/material/styles';

const InvoiceGraph = ({ invoices }) => {
    
    const theme = useTheme();

    // Create a function to calculate total invoice amount and amount received per invoice
    const calculateAmountsPerInvoice = () => {
        const amountsData = invoices.map((invoice, index) => ({
            invoiceNumber: index + 1, // 1-based index for the number of invoices
            totalAmount: invoice.amount,
            receivedAmount: invoice.paid_amount,
        }));

        return amountsData;
    };

    const amountsData = calculateAmountsPerInvoice();

    return (
        <Box>
            <Typography variant="h7" sx={{ mt: 2, color: "#343F71", fontWeight: "bold", textAlign: "center" }}>
                Invoice Amounts
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    layout="vertical"
                    data={amountsData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        type="number"
                        dataKey="totalAmount"
                        name="Total Amount"
                        unit="$"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        type="category"
                        dataKey="invoiceNumber"
                        name="Number of Invoices"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend />

                    <Bar dataKey="totalAmount" name="Total Amount" fill="#8884d8" />
                    <Bar dataKey="receivedAmount" name="Amount Received" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default InvoiceGraph;
