import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function SideItems() {
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const [openCollapseAccount, setOpenCollapseAccount] = React.useState(false);

  const role = localStorage.getItem('roles');

  const toggleClientSubmenu = () => {
    setOpenCollapse(!openCollapse);
  };

  const toggleAccountSubmenu = () => {
    setOpenCollapseAccount(!openCollapseAccount);
  };

  return (
    <div>
    {role == 'admin' && (
      <React.Fragment>
      
      <Link to="/dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link to="/Updatetutors">
        <ListItemButton >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={
            "Experts"
          } sx={{ opacity: 1 }} />
        </ListItemButton>
      </Link>
      <Link to="/updateotm">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="OTMs" />
        </ListItemButton>
      </Link>
      <Link to="/teamLead">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Team Leads" />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={toggleClientSubmenu}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <Link to="/UpdateClientdata">
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
        </Link>

        <Link to="/Updatevonder">
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Vendors" />
          </ListItemButton>
        </Link>
      </Collapse>


      <ListItemButton onClick={toggleAccountSubmenu}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
        {openCollapseAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapseAccount} timeout="auto" unmountOnExit>
        <Link to="/client-invoice">
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Invoice" />
          </ListItemButton>
        </Link>
      </Collapse>

      <ListSubheader component="div" inset>
        Admin Tasks
      </ListSubheader>
      <Link to="/Assingntask">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </Link>

      <Link to="/register">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Register User" />
        </ListItemButton>
      </Link>
      <Link to="/register-clients">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Clients" />
        </ListItemButton>
      </Link>
      <Link to="/add-freelancers">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Freelancers" />
        </ListItemButton>
      </Link>
    </React.Fragment>
    )}

    {role === 'lead' || role === 'otm' || role == 'expert' ? (
      <div>
      <Link to="/dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
       <Link to="/Assingntask">
       <ListItemButton>
         <ListItemIcon>
           <AssignmentIcon />
         </ListItemIcon>
         <ListItemText primary="Tasks" />
       </ListItemButton>
     </Link>
     </div>
    ) : (
      ''
    )}

    {role == 'hr' && (
      <div>
        <Link to="/dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
        <Link to="/Updatetutors">
        <ListItemButton >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={
            "Experts"
          } sx={{ opacity: 1 }} />
        </ListItemButton>
        </Link>
        <Link to="/updateotm">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="OTMs" />
        </ListItemButton>
        </Link>
        <Link to="/teamLead">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Team Leads" />
        </ListItemButton>
        </Link>

        <Link to='/attendanceOverview'>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employee Attendace" />
        </ListItemButton>
        </Link>
      </div>
    )}
    </div>
    
  );
}
