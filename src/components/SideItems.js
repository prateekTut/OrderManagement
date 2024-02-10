import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { styled } from '@mui/material/styles';

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Adjust the padding as needed
}));

export default function SideItems() {
  const [openCollapseAccount, setOpenCollapseAccount] = React.useState(false);

  const role = localStorage.getItem('roles');

  const toggleAccountSubmenu = () => {
    setOpenCollapseAccount(!openCollapseAccount);
  };

  return (
    <div>
      {role == 'admin' && (
        <React.Fragment>
          <Link to='/dashboard'>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon style={{ color: '#F34C19' }} />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </Link>
          <Link to='/generate-invoice'>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon style={{ color: '#F34C19' }} />
              </ListItemIcon>
              <ListItemText primary='Generate Invoice' />
            </ListItemButton>
          </Link>

          <ListItemButton onClick={toggleAccountSubmenu}>
            <ListItemIcon>
              <AccountBoxIcon style={{ color: '#F34C19' }} />
            </ListItemIcon>
            <ListItemText primary='Accounting' />
            {openCollapseAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse
            in={openCollapseAccount}
            timeout='auto'
            unmountOnExit>
            <Link to='/order-history'>
              <CustomListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary='Invoices' />
              </CustomListItemButton>
            </Link>

            <Link to='/expense-manage'>
              <CustomListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary='Expense Management' />
              </CustomListItemButton>
            </Link>
          </Collapse>
        </React.Fragment>
      )}
    </div>
  );
}
