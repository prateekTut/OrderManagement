import { styled } from '@mui/system';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#343F71",
        color: theme.palette.common.white,
        borderRight: `1px solid ${theme.palette.common.white}`, // Add border to the right side
        fontWeight: 'bold', // Make text bold in header cells
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRight: `1px solid ${theme.palette.divider}`, // Add border to the right side

    },
    '&:last-child': {
        borderRight: 0, // Remove right border for the last cell in each row
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));

