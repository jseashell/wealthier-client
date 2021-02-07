import * as React from 'react';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';

const useStyles = makeStyles((theme) => {
	return {
		scrollPane: {
			overflow: 'auto'
		},
		container: {
			paddingLeft: theme.spacing(2),
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
		},
		paper: {
			padding: theme.spacing(2),
			display: 'flex',
			overflow: 'hidden',
			flexDirection: 'column',
		}
	};
});

export default function Settings(props) {
	const [isEmailOptOut, setIsEmailOptOut] = React.useState(false); // init to email notifs being activated

	const classes = useStyles();
	const minHeightPaper = clsx(classes.paper, props.paperHeight);

	return (
		<React.Fragment>
			<Paper className={minHeightPaper}>
				<Title>{props.title}</Title>
				<Paper className={classes.scrollPane}>
					<form>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField id='first-name-setting' label='First name' />
							</Grid>
							<Grid item xs={12}>
								<TextField id='last-name-setting' label='Last name' />
							</Grid>
							<Grid item xs={12}>
								<TextField id='email-setting' label='Email' />
							</Grid>
							<Grid item xs={12}>
								<TextField id='current-password-setting' label='Current password' type='password' />
							</Grid>
							<Grid item xs={12}>
								<TextField id='new-password-setting' label='New password' type='password' />
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											checked={!isEmailOptOut}
											onChange={() => setIsEmailOptOut(!isEmailOptOut)}
											name="emailOptOut"
											color="primary"
										/>
									}
									label='I would like to receive emails about Wealthier news and updates.'
								/>
							</Grid>
						</Grid>
						<Button>Submit</Button>
					</form>
				</Paper>
			</Paper>
		</React.Fragment >
	);
}