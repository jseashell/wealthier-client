import * as React from 'react';
import _ from 'lodash';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
	dataGridContainer: {
		display: 'flex',
		height: '100%'
	},
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function Schedule() {
	const [scheduleEvents, setScheduleEvents] = React.useState([]);

	React.useEffect(() => {
		async function fetchScheduleEvents() {
			await fetch('/schedule')
				.then(res => res.json())
				.then(data => {
					setScheduleEvents(
						_.sortBy(data, row => row.rank)
							.map(scheduleEvent => {
								scheduleEvent.id = scheduleEvent.rank; // Data-Grid requires all rows have a unique "id" property
								delete scheduleEvent.rank;
								return scheduleEvent;
							}));
				})
				.catch(error => console.log(error))
		}

		fetchScheduleEvents();
	}, []);

	const formatCurrency = (key, params) => {
		return `$${params.getValue(key).toFixed(2) || ''}`;
	}

	const columns = [{
		field: 'date',
		headerName: 'Date',
		description: 'Date in which a debt payment should occur.',
		flex: .30
	}, {
		field: 'name',
		headerName: 'Credit Card',
		description: 'The party to which the debt is owed.',
		flex: .40
	}, {
		field: 'previousBalance',
		headerName: 'Previous Balance',
		description: "The debt balance prior to this date's payment amount.",
		type: 'number',
		flex: .15,
		valueFormatter: (params) => `$${params.getValue('previousBalance').toFixed(2) || ''}`
	}, {
		field: 'paymentAmount',
		headerName: 'Amount',
		description: 'The amount of this payment.',
		type: 'number',
		flex: .15,
		valueFormatter: (params) => `$${params.getValue('paymentAmount').toFixed(2) || ''}`
	}, {
		field: 'nextBalance',
		headerName: 'Next Balance',
		description: "The debt balance after applying this date's payment amount.",
		type: 'number',
		flex: .15,
		valueFormatter: (params) => `$${params.getValue('nextBalance').toFixed(2) || ''}`
	}];

	const classes = useStyles();
	return (
		<React.Fragment>
			<Title>Payment Schedule</Title>
			<Paper className={classes.dataGridContainer}>
				<DataGrid
					rows={scheduleEvents}
					columns={columns}
					pageSize={0}
				// checkboxSelection // don't need this yet
				/>
			</Paper>
		</React.Fragment>
	);
}
