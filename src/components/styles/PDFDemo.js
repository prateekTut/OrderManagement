import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const bankDetails = {
   accountHolderName: 'TutorsHive Private Limited',
   accountNumber: '50200041023430',
   ifsc: 'HDFC0002837',
   accountType: 'Current',
   bankName: 'HDFC BANK',
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
const calculateDue = (total, paid) => {
   return total - paid;
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

// Create styles
const styles = StyleSheet.create({
   page: {
      display: 'flex',
      backgroundColor: '#FFFFFF'
   },
   header: {
      marginTop: '15px',
      marginLeft: '15px',
      display: 'flex',
      alignItems: 'center',
   },
   title: {
      fontSize: 24,
      color: '#3f51b5',
   },
   partPaid: {
      fontSize: 12,
      marginTop: '8px',
      backgroundColor: '#f50057',
      color: "#FFFFFF",
      borderRadius: '10px',
      padding: '4px',
      display: 'inline-block',
   },

   invoiceInfo: {
      flexDirection: 'row',
      marginLeft: '15px',
   },
   invoiceDetails: {
      marginTop: "20px",
   },

   invoiceNumber: {
      fontSize: 12,
      fontStyle: 'bold',
      marginBottom: 10,
   },

   invoiceDate: {
      fontSize: 12,
      marginBottom: 10,
   },

   dueDate: {
      fontSize: 12,
      marginBottom: 10,
   },


   inv_bill: {
      color: '#343F71',
      fontSize: 14,
      fontWeight: 'bold'
   },
   inv_para: {
      fontSize: 12,
      marginTop: '10px',
   },
   companyInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '15px',
      marginRight: '15px',
   },
   billedBy: {
      flex: 1,
      marginRight: '10px',
      padding: '10px',
      backgroundColor: '#FBF1F7'
   },
   billedTo: {
      flex: 1,
      padding: '10px',
      backgroundColor: '#FBF1F7',
      height: '135px'
   },


   tableContent: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      marginTop: '10px',
      marginLeft: '15px',
      marginRight: '15px'
   },

   tableContainer: {
      marginBottom: '20px',
      marginRight: '10px',
      marginTop: '20px',

   },

   tableHeader: {
      fontSize: 18,
      marginBottom: 10,
   },
   table: {
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
   },
   tableRow: {
      flexDirection: 'row',
   },
   columnHeader: {
      backgroundColor: '#343F71',
      padding: 5,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFFFFF',
      width: '100%'
   },
   columnData: {
      padding: 5,
      fontSize: 12,
      textAlign: 'center',
      width: '100%'
   },

   invoiceLeft: {
      flex: 1,
      marginRight: '10px',
      padding: '10px',
      marginTop: '15px',
   },


   invoiceRight: {
      flex: 1,
      padding: '10px',
      marginTop: '15px',
     marginLeft: '15px'
   },


   gridContainer: {
      flexDirection: 'row',
      marginBottom: '15px',
      marginTop: '15px',
      padding: '5px',
      backgroundColor: '#FBF1F7'
   },

   gridItemInv: {
      flex: 1,
      marginRight: 10,
   },
   labelInv: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
   },
   dataInv: {
      fontSize: 12,
      marginBottom: 5,
   },

   gridInvContainer: {
    flexDirection: 'row',
    alignItems: "flex-end",
   },

   gridItem: {
      flex: 1,
   },

   label: {
      fontSize: 12,
      fontWeight: '700',
      marginBottom: 8,
   },

   data: {
      fontSize: 12,
      marginBottom: 8,
   },



   termsContainer: {
      marginTop: "20px",
      marginLeft: '15px',
      marginRight: '15px',
      fontSize: 12,
   },
   termsHeader: {
      color: '#343F71', // Set your color
      fontWeight: 'bold',
      marginBottom: 10,
   },
});


// Create Document Component
const PDFDemo = ({ invoice }) => (
   <Document>
      {console.log(invoice)}
      {console.log("data", invoice.data)}
      {console.log("invoices", invoice.invoices)}

      <Page size="A4" style={styles.page}>
         <View style={styles.header}>
            <Text style={styles.title}>Invoice</Text>
            {getPaymentStatus(invoice.data.total, invoice.data.paid_amount) === "Part Paid" && (
               <Text style={styles.partPaid}>Part Paid</Text>
            )}
         </View>

         <View style={styles.invoiceInfo}>
            <View style={styles.invoiceDetails}>
               <Text style={styles.invoiceNumber}>Invoice No: {invoice.data.invoice_number}</Text>
               <Text style={styles.invoiceDate}>Invoice Date: {invoice.data.invoice_date}</Text>
               <Text style={styles.dueDate}>Due Date: {invoice.data.due_date}</Text>
            </View>
         </View>


         <View style={styles.companyInfo}>
            <View style={styles.billedBy}>
               <Text style={styles.inv_bill} >Billed By-</Text>
               <Text style={styles.inv_para}>
                  TutorsHive Pvt. Ltd.
                  {'\n'} Regd. office: 88A, Nancy Residency, First Floor,
                  {'\n'} Sindhu Nagar, Scheme No. 17, Murlipura, Jaipur, jaipur,
                  {'\n'} Email: info@webz.com.pl
               </Text>
            </View>
            <View style={styles.billedTo}>
               <Text style={styles.inv_bill} >Billed To-</Text>
               <Text style={styles.inv_para}>
                  {invoice.data.client_name}
                  {'\n'}{invoice.data.client_email}
                  {'\n'}{invoice.data.client_phone}
               </Text>
            </View>
         </View>
         <View style={styles.tableContent}>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <Text style={[styles.columnHeader, { width: '10%' }]}>#</Text>
                  <Text style={styles.columnHeader}>Item</Text>
                  {invoice.data.tax_type != "" && (
                     <Text style={styles.columnHeader}> {invoice.data.tax_type === 'gst' ? 'GST Rate' : 'VAT Rate'} </Text>
                  )}
                  <Text style={styles.columnHeader}>Quantity</Text>
                  <Text style={styles.columnHeader}>Rate</Text>
                  {invoice.data.tax_type != "" ? (
                     <Text style={styles.columnHeader}>Amount</Text>
                  ) : null}

                  {invoice.data.tax_type == 'gst' && invoice.data.sub_tax == 'igst' && (
                     <Text style={styles.columnHeader}>IGST</Text>
                  )}

                  {invoice.data.tax_type == 'gst' && invoice.data.sub_tax !== 'igst' && (
                     <Text style={styles.columnHeader}>CGST</Text>
                  )}
                  {invoice.data.tax_type == 'gst' && invoice.data.sub_tax !== 'igst' && (
                     <Text style={styles.columnHeader}>SGST</Text>
                  )}
                  {invoice.data.tax_type == 'vat' && invoice.data.sub_tax !== 'igst' && (
                     <Text style={styles.columnHeader}>VAT</Text>
                  )}

                  <Text style={styles.columnHeader}>Total</Text>

               </View>

               {invoice.invoices.map((data, index) => (
                  <View key={data.id} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FBF1F7' }]}>
                     <Text style={[styles.columnData, { width: '10%' }]}>{index + 1}</Text>
                     <Text style={styles.columnData}>{data.order_id}{invoice.data.client_name}</Text>

                     {invoice.data.tax_type != "" && (
                        <Text style={styles.columnData}>{invoice.data.currency}{data.tax_rate}</Text>
                     )}

                     <Text style={styles.columnData}>{data.quantity}</Text>
                     <Text style={styles.columnData}>{invoice.data.currency}{data.rate}</Text>

                     {invoice.data.tax_type != "" ? (
                        <Text style={styles.columnData}>{invoice.data.currency}{data.amount}</Text>
                     ) : null}

                     {invoice.data.tax_type == 'gst' && invoice.data.sub_tax == 'igst' && (
                        <Text style={styles.columnData}>{invoice.data.currency}{data.igst}</Text>
                     )}

                     {invoice.data.tax_type == 'gst' && invoice.data.sub_tax !== 'igst' && (
                        <Text style={styles.columnData}>{invoice.data.currency} {data.cgst}</Text>
                     )}
                     {invoice.data.tax_type == 'gst' && invoice.data.sub_tax !== 'igst' && (
                        <Text style={styles.columnData}>{invoice.data.currency} {data.sgst}</Text>
                     )}
                     {invoice.data.tax_type == 'vat' && invoice.data.sub_tax !== 'igst' && (
                        <Text style={styles.columnData}>{invoice.data.currency}{data.vat}</Text>
                     )}

                     <Text style={styles.columnData}>{invoice.data.currency}{data.item_total}</Text>
                  </View>
               ))}
            </View>
         </View>


         <View style={styles.companyInfo}>
            <View style={styles.invoiceLeft}>
               <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Total (in words):  {getWords(invoice.data.total, invoice.data.currency)}</Text>
               <View style={styles.gridContainer}>
                  <View style={styles.gridItemInv}>
                     <Text style={styles.labelInv}>Account Holder Name</Text>
                     <Text style={styles.labelInv}>Account Number</Text>
                     <Text style={styles.labelInv}>IFSC</Text>
                     <Text style={styles.labelInv}>Account Type</Text>
                     <Text style={styles.labelInv}>Bank</Text>
                  </View>

                  <View style={styles.gridItemInv}>
                     <Text style={styles.dataInv}>{bankDetails.accountHolderName}</Text>
                     <Text style={styles.dataInv}>{bankDetails.accountNumber}</Text>
                     <Text style={styles.dataInv}>{bankDetails.ifsc}</Text>
                     <Text style={styles.dataInv}>{bankDetails.accountType}</Text>
                     <Text style={styles.dataInv}>{bankDetails.bankName}</Text>
                  </View>
               </View>
            </View>

            <View style={styles.invoiceRight}>
               {invoice.data.tax_type != "" && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>Amount</Text>
                     </View>
                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{invoice.data.total_amount}</Text>
                     </View>
                  </View>
               )}


               {invoice.data.tax_type === 'gst' && invoice.data.sub_tax == 'gst' && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>SGST</Text>
                     </View>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>CGST</Text>
                     </View>
                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{(invoice.data.tax_amount / 2)}</Text>
                     </View>
                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{(invoice.data.tax_amount / 2)}</Text>
                     </View>
                  </View>
               )}

               {invoice.data.sub_tax === 'igst' && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>IGST</Text>
                     </View>

                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{invoice.data.tax_amount}</Text>
                     </View>
                  </View>
               )}
               {invoice.data.tax_type === 'vat' && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>VAT</Text>
                     </View>

                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{invoice.data.tax_amount}</Text>
                     </View>
                  </View>
               )}
               {invoice.data.discount != 0 && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>Discount</Text>
                     </View>

                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.discount}</Text>
                     </View>
                  </View>
               )}
               <View style={styles.gridInvContainer}>
                  <View style={styles.gridItem}>
                     <Text style={styles.label}>Total</Text>
                  </View>

                  <View style={styles.gridItem}>
                     <Text style={styles.data}>{invoice.data.currency}{invoice.data.total}</Text>
                  </View>
               </View>


               {invoice.data.paid_amount != null && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>Amount Paid</Text>
                     </View>

                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{invoice.data.paid_amount}</Text>
                     </View>
                  </View>
               )}

               {calculateDue(invoice.data.total, invoice.data.paid_amount) != 0 && (
                  <View style={styles.gridInvContainer}>
                     <View style={styles.gridItem}>
                        <Text style={styles.label}>Due Amount</Text>
                     </View>

                     <View style={styles.gridItem}>
                        <Text style={styles.data}>{invoice.data.currency}{calculateDue(invoice.data.total, invoice.data.paid_amount)}</Text>
                     </View>
                  </View>
               )}
            </View>
         </View>

         <View style={styles.termsContainer}>
            <Text style={styles.termsHeader}>Terms and Conditions:</Text>
            <Text>1. Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</Text>
            <Text>2. Please quote invoice number when remitting funds.</Text>
         </View>


      </Page>
   </Document >
);

export default PDFDemo;