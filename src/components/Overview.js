import * as React from 'react';

import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import Debt from './Debt';
import Expenses from './Expenses';
import Income from './Income';
import RemainingBalance from './RemainingBalance';
import Schedule from './Schedule';
import Title from './Title';

import { State } from './Dashboard';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 340,
		overflow: 'auto'
	},
	minHeight: {
		height: 'wrap-content'
	}
}));

export default function Overview(props) {
	const classes = useStyles();

	const [showAllExpenses, setShowAllExpenses] = React.useState(false);
	const toggleShowAllExpenses = () => {
		setShowAllExpenses(!showAllExpenses);
	};

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const minHeightPaper = clsx(classes.paper, classes.minHeight);

	return (
		<React.Fragment>
			<Title>{props.title}</Title>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<Income
						title={State.INCOME}
						paperHeight={fixedHeightPaper}
					/>
				</Grid>
				<Grid item xs={5}>
					<Debt
						title={State.DEBT}
						paperHeight={fixedHeightPaper}
					/>
				</Grid>
				<Grid item xs={3}>
					<RemainingBalance
						title={State.REMAINING_BALANCE}
						paperHeight={fixedHeightPaper}
					/>
				</Grid>
				<Grid item xs={12}>
					<Expenses
						title={State.EXPENSES}
						paperHeight={showAllExpenses ? minHeightPaper : fixedHeightPaper}
						toggleShowAll={toggleShowAllExpenses}
						showAll={showAllExpenses}
					/>
				</Grid>
				<Grid item xs={12}>
					<Schedule
						title={State.SCHEDULE}
						paperHeight={minHeightPaper}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}