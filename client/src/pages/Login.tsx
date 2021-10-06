import React, { useState } from 'react';
import {
	TextField,
	CssBaseline,
	Button,
	Avatar,
	Typography,
	Container,
} from '@material-ui/core/';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useCustomSnackbar from '../notifications/customSnackBar';
import { REACT_APP_SERVER } from '../config';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		padding: theme.spacing(3),
		backgroundColor: '#E24D28',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(4, 0, 3),
		backgroundColor: '#e76f51',
		color: '#fff',
		'&:hover': {
			backgroundColor: '#E24D28',
			color: 'white',
		},
	},
	google: {
		margin: theme.spacing(4, 0, 3),
		backgroundColor: '#023e8a',
		color: '#fff',
		'&:hover': {
			backgroundColor: '#6d6875',
			color: 'white',
		},
	},
	login: {
		display: 'flex',
		justifyContent: 'center',
	},
	signIn: {
		color: '#264653',
	},
	customInputBorder: {
		borderWidth: '2px',
		borderColor: 'white !important',
	},
	title: {
		color: '#264653',
		textAlign: 'center',
		fontSize: 50,
		[theme.breakpoints.down('md')]: {
			fontSize: 45,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: 32,
		},
	},
}));

const Login = () => {
	const classes = useStyles();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const SnackError = useCustomSnackbar().error

	const loginHandler = async (e) => {
		e.preventDefault();
		const data = { email, username, password };

		axios.post(`${REACT_APP_SERVER}/user/login`, data)
			.then((res) => {
				if (res.data?.token) {
					console.log(res.data);
					localStorage.setItem('token', res.data.token);
					history.push('/chat');
				}
			})
			.catch((err) => {
				if (err?.response?.data?.error) {
					SnackError(err.response.data.error);
				}
			});
	};

	const loginGoogle = async (e) => {
		e.preventDefault();
		window.open(`${REACT_APP_SERVER}/google`, '_self');
	};

	return (
		<Container component="main" maxWidth="xs">
			<Typography className={classes.title}>
				You are welcome to Messenger
			</Typography>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
					className={classes.signIn}
				>
					Sign in
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={(e) => loginHandler(e)}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						InputProps={{
							style: {
								color: 'black',
							},
							classes: {
								notchedOutline: classes.customInputBorder,
							},
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						InputProps={{
							style: {
								color: 'black',
							},
							classes: {
								notchedOutline: classes.customInputBorder,
							},
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						InputProps={{
							classes: {
								notchedOutline: classes.customInputBorder,
							},
						}}
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={classes.submit}
					>
						Sing In
					</Button>
				</form>
				<Button
					onClick={loginGoogle}
					type="submit"
					fullWidth
					variant="contained"
					className={classes.google}
				>
					Google
				</Button>
			</div>
		</Container>
	);
};

export default Login;
