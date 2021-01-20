import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Receipt from '@material-ui/icons/Receipt';
import CreditCard from '@material-ui/icons/CreditCard';
import Settings from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AttachMoney from '@material-ui/icons/AttachMoney';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
      <ListItemText primary='Income' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Receipt />
      </ListItemIcon>
      <ListItemText primary='Expenses' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CreditCard />
      </ListItemIcon>
      <ListItemText primary='Debt' />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Manage</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary='Account' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary='Settings' />
    </ListItem>
  </div>
);
