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
import { styled } from '@mui/material/styles';

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Adjust the padding as needed
}));
const CustomListItemExpButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Adjust the padding as needed
}));

export default function SideItems() {
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const [openCollapseAccount, setOpenCollapseAccount] = React.useState(false);
  const [openCollapseTeam, setOpenCollapseTeam] = React.useState(false);
  const [openCollapseTask, setOpenCollapseTask] = React.useState(false);
  
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

  const toggleTaskSubmenu = () => {
    setOpenCollapseTask(!openCollapseTask);
  }

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

          <ListItemButton onClick={toggleTaskSubmenu}>
            <ListItemIcon>
              <ShoppingCartIcon style={{ color: '#F34C19' }}/>
            </ListItemIcon>
            <ListItemText primary="Order Management" />
            {openCollapseTask ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={openCollapseTask} timeout="auto" unmountOnExit>
            <Link to="/unassigned-task">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Unassigned Tasks" />
              </CustomListItemButton>
            </Link>

            <Link to="/assign-task">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="Assigned Tasks" />
              </CustomListItemButton>
            </Link>
            <Link to="/failed-task">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="Failed Tasks" />
              </CustomListItemButton>
            </Link>
            <Link to="/rework-task">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="Rework Tasks" />
              </CustomListItemButton>
            </Link>
            <Link to="/qc-task">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="QC Tasks" />
              </CustomListItemButton>
            </Link>
            <Link to="/passed-task">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="Passed Tasks" />
              </CustomListItemButton>
            </Link>
          </Collapse>

          <ListItemButton onClick={toggleClientSubmenu}>
            <ListItemIcon>
              <PersonIcon style={{ color: '#F34C19' }}/>
            </ListItemIcon>
            <ListItemText primary="Clients" />
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <Link to="/UpdateClientdata">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Students" />
              </CustomListItemButton>
            </Link>

            <Link to="/Updatevonder">
              <CustomListItemButton>
                <ListItemIcon>
                  <SchoolIcon style={{ color: '#343F71' }} />
                </ListItemIcon>
                <ListItemText primary="Vendors" />
              </CustomListItemButton>
            </Link>
          </Collapse>


          <ListItemButton onClick={toggleAccountSubmenu}>
            <ListItemIcon>
              <AccountBoxIcon style={{ color: '#F34C19' }}/>
            </ListItemIcon>
            <ListItemText primary="Accounting" />
            {openCollapseAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={openCollapseAccount} timeout="auto" unmountOnExit>
           
            <Link to="/order-history">
              <CustomListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Invoices" />
              </CustomListItemButton>
            </Link>

            <Link to="">
              <CustomListItemButton>
                <ListItemIcon>
                  <AssignmentIcon style={{ color: '#343F71' }}/>
                </ListItemIcon>
                <ListItemText primary="Expense Management" />
              </CustomListItemButton>
            </Link>
            
            {/* <CustomListItemButton onClick={toggleTeamSubmenu}>

              <ListItemIcon>
                <ManageAccountsIcon style={{ color: '#343F71' }}/>
              </ListItemIcon>
              <ListItemText primary="Manage Team" />
              {openCollapseTeam ? <ExpandLess /> : <ExpandMore />}
            </CustomListItemButton> */}

          </Collapse>

          <ListItemButton onClick={toggleTeamSubmenu}>
            <ListItemIcon>
              <ManageAccountsIcon style={{ color: '#F34C19' }}/>
            </ListItemIcon>
            <ListItemText primary="Manage Team" />
            {openCollapseTeam ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          

          <Collapse in={openCollapseTeam} timeout="auto" unmountOnExit>
            <Link to="/Updatetutors">
              <CustomListItemExpButton >
                <ListItemIcon>
                  <StarIcon style={{ color: '#F34C19' }}/>
                </ListItemIcon>
                <ListItemText primary={
                  "Experts"
                } sx={{ opacity: 1 }} />
              </CustomListItemExpButton>
            </Link>
            <Link to="/updateotm">
              <CustomListItemExpButton>
                <ListItemIcon>
                  <PeopleIcon style={{ color: '#F34C19' }}/>
                </ListItemIcon>
                <ListItemText primary="OTMs" />
              </CustomListItemExpButton>
            </Link>
            <Link to="/teamLead">
              <CustomListItemExpButton>
                <ListItemIcon>
                  <CrownIcon style={{ color: '#F34C19' }} />
                </ListItemIcon>
                <ListItemText primary="Team Leads" />
              </CustomListItemExpButton>
            </Link>

          </Collapse>

          <ListSubheader component="div" inset>
            Admin Tasks
          </ListSubheader>

          {/* <Link to="/Assingntask">
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon style={{ color: '#F34C19' }}/>
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </Link> */}

          

         


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
