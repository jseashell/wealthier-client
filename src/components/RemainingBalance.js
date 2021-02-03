import * as React from 'react';

import clsx from 'clsx';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => {
	return {
		depositContext: {
			flex: 1,
		},
		paper: {
			padding: theme.spacing(2),
			display: 'flex',
			overflow: 'hidden',
			flexDirection: 'column',
		}
	};
});

export default function RemainingBalance(props) {
	const [data, setData] = React.useState({ remainingBalance: null });

	React.useEffect(() => {
		async function fetchRemainingBalance() {
			await fetch('/debt/all')
				.then(res => res.json())
				.then(data => {
					setData({
						remainingBalance: data.map(debt => debt.value).reduce((a, b) => a + b, 0)
					})
				})
				.catch(error => console.log(error));
		}

		fetchRemainingBalance();
	}, []);

	const classes = useStyles();

	const minHeightPaper = clsx(classes.paper, props.paperHeight);

	return (
		<React.Fragment>
			<Paper className={minHeightPaper}>
				<Title>{props.title}</Title>
				<Typography component='p' variant='h4'>
					{data.remainingBalance}
				</Typography>
				<Typography color='textSecondary' className={classes.depositContext}>
					on {new Date().toLocaleString()}
				</Typography>
				<div>
					<Link color='primary' href='#' onClick={preventDefault}>
						View balance
        			</Link>
				</div>
			</Paper>
		</React.Fragment>
	);
}
