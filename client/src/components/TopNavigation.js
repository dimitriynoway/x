import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LeftNavOnlineUser } from './LeftNavOnlineUser';
import { REACT_APP_SERVER } from '../config';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

export const TopNavigation = ({
	socket,
	role,
	setShowAdmin,
	windowWidthLess900,
	onlineUsersArray,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [showLeftNav, setShowLeftNav] = React.useState(false);

	const logoutHandler = async () => {
		localStorage.removeItem('token');
		history.push('/');
		socket.disconnect(true);
		await axios.get(`${REACT_APP_SERVER}/auth/logout`, { withCredentials: 'include' });
	};

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown'
			&& (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setShowLeftNav(open);
	};

	const list = () => (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				backgroundColor: '#3f50b5',
				height: '100vh',
			}}
			sx={{ width: 270 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<Typography style={{
				textAlign: 'center',
				fontSize: 34,
				marginTop: 16,
				color: 'white',
			}}
			>
				Online Users

			</Typography>
			<List style={{ width: 250, overflow: 'auto' }}>
				{onlineUsersArray
					&& onlineUsersArray.length > 0
					&& onlineUsersArray.map(((item, index) => <LeftNavOnlineUser key={index} item={item} />))}
			</List>
		</Box>
	);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
					{windowWidthLess900
						&& (
							<>
								<Button onClick={toggleDrawer(true)}>
									<MenuIcon style={{ color: 'white' }} />

								</Button>
								<Drawer
									open={showLeftNav}
									onClose={toggleDrawer(false)}
								>
									{list()}
								</Drawer>
							</>
						)}
					{!windowWidthLess900
						&& (
							<Typography variant="h6" className={classes.title}>
								Messanger
							</Typography>
						)}
					<div>
						{role === 'admin' ? (
							<Button
								color="inherit"
								onClick={() => {
									setShowAdmin(true);
									// socket.emit('getUsers');
								}}
							>
								Admin
							</Button>
						) : null}
						<Button color="inherit" onClick={logoutHandler}>
							Log Out
						</Button>
						{/* <Switch inputProps={{ 'aria-label': 'Switch demo' }} /> */}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};
