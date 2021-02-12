// import * as React from 'react';
// import clsx from 'clsx';

// import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Paper from '@material-ui/core/paper';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';

// import Title from './Title';

// const useStyles = makeStyles((theme) => {
// 	return {
// 		scrollPane: {
// 			overflow: 'auto'
// 		},
// 		container: {
// 			paddingLeft: theme.spacing(2),
// 			paddingTop: theme.spacing(2),
// 			paddingBottom: theme.spacing(2),
// 		},
// 		settingContainer: {
// 			padding: theme.spacing(2),
// 		},
// 		paper: {
// 			padding: theme.spacing(2),
// 			display: 'flex',
// 			overflow: 'hidden',
// 			flexDirection: 'column',
// 		}
// 	};
// });

// export default function Settings(props) {
// const [isEmailOptOut, setIsEmailOptOut] = React.useState(false); // init to email notifs being activated

// 	const classes = useStyles();
// 	const minHeightPaper = clsx(classes.paper, props.paperHeight);

// 	return (
// 		<React.Fragment>
// 			<Paper className={minHeightPaper}>
// 				<Title>{props.title}</Title>
// 				<Paper className={classes.scrollPane}>
// 					<form>
// 						<Grid container
// 							direction='row'
// 							justify='center'
// 							alignItems='flex-start'
// 						>
// 							<Grid item xs={3} className={classes.settingContainer}>
// 								<TextField id='first-name-setting' label='First name' fullWidth />
// 							</Grid>
// 							<Grid item xs={3} className={classes.settingContainer}>
// 								<TextField id='last-name-setting' label='Last name' fullWidth />
// 							</Grid>
// 							<Grid item xs={6} />

// 							<Grid item xs={6} className={classes.settingContainer}>
// 								<TextField id='email-setting' label='Email' fullWidth required />
// 							</Grid>
// 							<Grid item xs={6} />

// 							<Grid item xs={3} className={classes.settingContainer}>
// 								<TextField id='current-password-setting' label='Current password' type='password' />
// 							</Grid>
// 							<Grid item xs={9} />

// 							<Grid item xs={3} className={classes.settingContainer}>
// 								<TextField id='new-password-setting' label='New password' type='password' disabled />
// 							</Grid>
// 							<Grid item xs={9} />

// 							<Grid item xs={12} className={classes.settingContainer}>
// 								<FormControlLabel
// 									control={
// 										<Checkbox
// 											checked={!isEmailOptOut}
// 											onChange={() => setIsEmailOptOut(!isEmailOptOut)}
// 											name='isEmailOptOut'
// 											color='primary'
// 										/>
// 									}
// 									label='I would like to receive emails about Wealthier news and updates.'
// 								/>
// 							</Grid>
// 							<Grid item xs={12} className={classes.settingContainer}>
// 								<Button variant='contained' color='primary'>Submit</Button>
// 							</Grid>
// 						</Grid>
// 					</form>
// 				</Paper>
// 			</Paper>
// 		</React.Fragment >
// 	);
// }

import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/paper';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(4),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Settings(props) {
	const [firstName, setFirstName] = React.useState(props.firstName || '');
	const [lastName, setLastName] = React.useState(props.lastName || '');
	const [email, setEmail] = React.useState(props.email || '');
	const [currentPassword, setCurrentPassword] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [isNewPasswordDisabled, setIsNewPasswordDisabled] = React.useState(true);
	const [isEmailOptOut, setIsEmailOptOut] = React.useState(false); // init to email notifs being activated

	const handleSubmit = () => {
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			currentPassword: currentPassword,
			newPassword: newPassword,
			isEmailOptOut: isEmailOptOut
		}

		const options = {
			method: 'POST',
			body: JSON.stringify(data)
		}

		// TODO Submit to server
		// fetch('/updateSettings', options)
		// 	.then(res => res.json())
		// 	.catch(error => console.log(error));

		alert(JSON.stringify(data));
	}

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Your Account
		  		</Typography>
				<form
					noValidate
					className={classes.form}
					onSubmit={() => handleSubmit()}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="first-name"
						label="First name"
						name="first-name"
						onChange={(event) => setFirstName(event.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="last-name"
						label="Last name"
						name="last-name"
						onChange={(event) => setLastName(event.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						onChange={(event) => setEmail(event.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="current-password"
						label="Current password"
						type="password"
						id="new-password"
						autoComplete="current-password"
						onChange={(event) => {
							setCurrentPassword(event.target.value)
							if (event.target.value == '')
								setIsNewPasswordDisabled(true)
							else
								setIsNewPasswordDisabled(false)
						}}
					/>
					<TextField
						margin="normal"
						disabled={isNewPasswordDisabled}
						required
						fullWidth
						name="new-password"
						label="New password"
						type="password"
						id="new-password"
						onChange={(event) => setNewPassword(event.target.value)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={!isEmailOptOut}
								onChange={() => setIsEmailOptOut(!isEmailOptOut)}
								name='isEmailOptOut'
								color='primary'
							/>
						}
						label='I would like to receive emails about Wealthier news and updates.'
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color='primary'
						className={classes.submit}
					>
						Submit
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
