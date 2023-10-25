import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import CrownIcon from '@mui/icons-material/EmojiEvents';

export default function SideItems() {
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const [openCollapseAccount, setOpenCollapseAccount] = React.useState(false);
  const [openCollapseTeam, setOpenCollapseTeam] = React.useState(false);

  const role = localStorage.getItem('roles');

  const toggleClientSubmenu = () => {
    setOpenCollapse(!openCollapse);
  };

  const toggleAccountSubmenu = () => {
    setOpenCollapseAccount(!openCollapseAccount);
  };

  const toggleTeamSubmenu = () => {
    setOpenCollapseTeam(!openCollapseTeam);
  };

  return (
    <div>
      {role == 'admin' && (
        <React.Fragment>

          <Link to="/dashboard">
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>



          <ListItemButton onClick={toggleClientSubmenu}>
            <ListItemIcon>
              <PersonIcon style={{ color: '#F34C19' }}/>
            </ListItemIcon>
            <ListItemText primary="Clients" />
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <Link to="/UpdateClientdata">
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </Link>

            <Link to="/Updatevonder">
              <ListItemButton>
                <ListItemIcon>
                  <BusinessIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="Vendors" />
              </ListItemButton>
            </Link>
          </Collapse>


          <ListItemButton onClick={toggleAccountSubmenu}>
            <ListItemIcon>
              <AccountBoxIcon style={{ color: '#F34C19' }}/>
            </ListItemIcon>
            <ListItemText primary="Account" />
            {openCollapseAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCollapseAccount} timeout="auto" unmountOnExit>
          {/*   <Link to="/client-invoice">
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Invoice" />
              </ListItemButton>
            </Link> */}

            <Link to="/order-history">
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Student Invoice" />
              </ListItemButton>
            </Link>

            <Link to="/vendor-order-history">
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Vendor Invoice" />
              </ListItemButton>
            </Link>
            
            <ListItemButton onClick={toggleTeamSubmenu}>

              <ListItemIcon>
                <ManageAccountsIcon style={{ color: '#343F71' }}/>
              </ListItemIcon>
              <ListItemText primary="Manage Team" />
              {openCollapseTeam ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

          </Collapse>


          <Collapse in={openCollapseTeam} timeout="auto" unmountOnExit>
            <Link to="/Updatetutors">
              <ListItemButton >
                <ListItemIcon>
                  <StarIcon style={{ color: '#F34C19' }}/>
                </ListItemIcon>
                <ListItemText primary={
                  "Experts"
                } sx={{ opacity: 1 }} />
              </ListItemButton>
            </Link>
            <Link to="/updateotm">
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon style={{ color: '#F34C19' }}/>
                </ListItemIcon>
                <ListItemText primary="OTMs" />
              </ListItemButton>
            </Link>
            <Link to="/teamLead">
              <ListItemButton>
                <ListItemIcon>
                  <CrownIcon style={{ color: '#F34C19' }} />
                </ListItemIcon>
                <ListItemText primary="Team Leads" />
              </ListItemButton>
            </Link>

          </Collapse>

          <ListSubheader component="div" inset>
            Admin Tasks
          </ListSubheader>
          <Link to="/Assingntask">
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </Link>

          <Link to="/register">
            <ListItemButton>
              <ListItemIcon>
                <PersonAddAltIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Register User" />
            </ListItemButton>
          </Link>
          <Link to="/register-clients">
            <ListItemButton>
              <ListItemIcon>
                <PersonAddAltIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Add Clients" />
            </ListItemButton>
          </Link>
          <Link to="/add-freelancers">
            <ListItemButton>
              <ListItemIcon>
                <PersonAddAltIcon style={{ color: '#F34C19' }}/>
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
                <DashboardIcon style={{ color: '#F34C19' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Link to="/Assingntask">
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon style={{ color: '#F34C19' }}/>
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
                <DashboardIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Link to="/Updatetutors">
            <ListItemButton >
              <ListItemIcon>
                <PeopleIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary={
                "Experts"
              } sx={{ opacity: 1 }} />
            </ListItemButton>
          </Link>
          <Link to="/updateotm">
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="OTMs" />
            </ListItemButton>
          </Link>
          <Link to="/teamLead">
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Team Leads" />
            </ListItemButton>
          </Link>

          <Link to='/attendanceOverview'>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Employee Attendace" />
            </ListItemButton>
          </Link>
        </div>
      )}
    </div>

  );
}
