import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CreditCard from '@material-ui/icons/CreditCard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Receipt from '@material-ui/icons/Receipt';
import Settings from '@material-ui/icons/Settings';

import { State } from './Dashboard';

export default function NavDrawerItems(props) {

	return (
		<div>
			<List>
				<ListItem
					button
					onClick={() => props.setNextState(State.OVERVIEW)}
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary={State.OVERVIEW} />
				</ListItem>
				<ListItem
					button
					onClick={() => props.setNextState(State.DEBT)}
				>
					<ListItemIcon>
						<CreditCard />
					</ListItemIcon>
					<ListItemText primary={State.DEBT} />
				</ListItem>
				<ListItem
					button
					onClick={() => props.setNextState(State.EXPENSES)}
				>
					<ListItemIcon>
						<Receipt />
					</ListItemIcon>
					<ListItemText primary={State.EXPENSES} />
				</ListItem>
				<ListItem
					button
					onClick={() => props.setNextState(State.INCOME)}
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
		</div>
	);
}