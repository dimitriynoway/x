import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
		marginTop: 10,
		padding: 10,
	},
	avatar: {
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
	},
}));

export const AdminInfo = ({ item, windowWidthLess900 }) => {
	const [mutted, setMutted] = useState(false);
	const [banned, setBanned] = useState(false);
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography>Admin: </Typography>

			<Typography>{item.username}</Typography>
			<Box style={{ display: 'flex', flexDirection: windowWidthLess900 ? 'column' : 'row' }}>
				<Button
					style={{
						backgroundColor: banned ? 'red' : 'green',
						marginRight: windowWidthLess900 ? 0 : 10,
						marginTop: 3,
						display: 'flex',
					}}
				>
					Ban All
				</Button>
				<Button style={{
					backgroundColor: mutted ? 'red' : 'green', marginRight: windowWidthLess900 ? 0 : 10, marginTop: 3, display: 'flex',
				}}
				>
					Mute All
				</Button>
				<Button
					style={{
						backgroundColor: banned ? 'red' : 'green',
						marginRight: windowWidthLess900 ? 0 : 10,
						marginTop: 3,
						display: 'flex',
					}}
				>
					Unban All
				</Button>
				<Button style={{ backgroundColor: mutted ? 'red' : 'green', marginTop: 3, display: 'flex' }}>
					Unmute All
				</Button>
			</Box>
		</Box>
	);
};
