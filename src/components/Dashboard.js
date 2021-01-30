import * as React from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CreditCard from '@material-ui/icons/CreditCard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Receipt from '@material-ui/icons/Receipt';
import Settings from '@material-ui/icons/Settings';

import Debt from './Debt';
import Expenses from './Expenses';
import Income from './Income';
import Overview from './Overview';
import RemainingBalance from './RemainingBalance';
import Schedule from './Schedule';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Open Source Software by '}
      <Link color='inherit' href='https://github.com/jseashell'>
        John Schellinger
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const State = {
  ACCOUNT: 'Account',
  OVERVIEW: 'Overview',
  DEBT: 'Debt',
  EXPENSES: 'Expenses',
  INCOME: 'Income',
  REMAINING_BALANCE: 'Remaining Balance',
  SCHEDULE: 'Schedule',
  SETTINGS: 'Settings',
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [dashboardState, setDashboardState] = React.useState(State.OVERVIEW);

  const setNextState = (nextState) => {
    console.log('Setting next state "' + nextState + '".');
    setDashboardState(nextState);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
          // onClick={setNextState(State.OVERVIEW)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={State.OVERVIEW} />
          </ListItem>
          <ListItem
            button
          // onClick={setNextState(State.DEBT)}
          >
            <ListItemIcon>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary={State.DEBT} />
          </ListItem>
          <ListItem
            button
          // onClick={setNextState(State.EXPENSES)}
          >
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary={State.EXPENSES} />
          </ListItem>
          <ListItem
            button
          // onClick={setNextState(State.INCOME)}
          >
            <ListItemIcon>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary={State.INCOME} />
          </ListItem>
        </List>
        <Divider />
        <List>
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
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {dashboardState === State.OVERVIEW &&
            <Overview />
          }
          {dashboardState === State.DEBT &&
            <Debt />
          }
          {dashboardState === State.EXPENSES &&
            <Expenses />
          }
          {dashboardState === State.INCOME &&
            <Income />
          }
          {dashboardState === State.REMAINING_BALANCE &&
            <RemainingBalance />
          }
          {dashboardState === State.SCHEDULE &&
            <Schedule />
          }
          <Box sx={{ pt: 4 }}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
