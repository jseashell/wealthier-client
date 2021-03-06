import * as React from 'react';
import _ from 'lodash';

import clsx from 'clsx';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	table: {
		overflow: 'hidden',
	},
	seeMore: {
		marginTop: theme.spacing(3),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
	}
}));

export default function Schedule(props) {
	const [paymentSchedule, setPaymentSchedule] = React.useState([]);

	React.useEffect(() => {
		async function fetchPaymentSchedule() {
			await fetch('/schedule')
				.then(res => res.json())
				.then(data => {
					const paymentSchedule = _.sortBy(data, row => row.rank);
					setPaymentSchedule(paymentSchedule);
				})
				.catch(error => console.log(error))
		}

		fetchPaymentSchedule();
	}, []);

	const classes = useStyles();

	const minHeightPaper = clsx(classes.paper, props.paperHeight);

	return (
		<React.Fragment>
			<Paper className={minHeightPaper}>
				<Title>{props.title}</Title>
				<Table className='table' size='small'>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell align='right'>Before</TableCell>
							<TableCell align='right'>Amount</TableCell>
							<TableCell align='right'>After</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paymentSchedule.map((row) => (
							<TableRow key={row.rank}>
								<TableCell>{row.date}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell align='right'>${row.previousBalance}</TableCell>
								<TableCell align='right'>${row.paymentAmount}</TableCell>
								<TableCell align='right'>${row.nextBalance}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className={classes.seeMore}>
					<Link color='primary' href='#' onClick={preventDefault}>
						See more orders
        </Link>
				</div>
			</Paper>
		</React.Fragment>
	);
}
