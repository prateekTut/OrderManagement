import { styled } from '@mui/system';

export const Circle = styled('div')({
  width: 10,
  height: 10,
  borderRadius: '50%',
  marginRight: 5,
});

export const PartPaid = styled('span')({
  backgroundColor: '#2DB7F5',
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 16,
  color: 'white',
});

export const Paid = styled('span')({
  backgroundColor: 'green',
  color: 'white',
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 16,
});

export const PaidAmt = styled('span')({
  backgroundColor: '#E8E8E8',
  color: '#201742',
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 16,
});

export const DueStatus = styled('div')({
  backgroundColor: 'red',
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 16,
  color: 'white',
  marginTop: 7,
  display: 'inline-flex', // Use inline-flex to allow the div to have a width based on its content
  alignItems: 'center',
  justifyContent: 'center',
});

export const Unpaid = styled('div')({
  backgroundColor: 'rgb(250, 173, 20)',
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 16,
  color: 'white',
  marginTop: 7,
  display: 'inline-flex', // Use inline-flex to allow the div to have a width based on its content
  alignItems: 'center',
  justifyContent: 'center',
});

export const DateText = styled('div')({
  color: 'black',
  marginTop: 5,
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between', // Align items to the start and end of the container
  alignItems: 'center',
  border: '1px solid #ccc',
  padding: '4px',
  width: 250,
  borderRadius: '4px',
  cursor: 'pointer',
});