import {
	Avatar, Box, Button, Typography,
} from '@material-ui/core';
import { PermIdentityOutlined } from '@material-ui/icons';
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
		paddingLeft: 10,
		paddingRight: 10,
	},
	avatar: {
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
	},
}));

export const UserInfoForAdmin = ({
	user,
	socket,
}) => {
	const classes = useStyles();
	return (
		<Box className={classes.container}>
			<Avatar className={classes.avatar} style={{ backgroundColor: 'grey' }}>
				<PermIdentityOutlined />
			</Avatar>
			<Typography>{user.username}</Typography>
			<Box style={{ display: 'flex' }}>
				<Button
					onClick={() => {
						socket.emit('ban', ({ ban: !user.banned, id: user.id }));
					}}
					style={{
						backgroundColor: user.banned ? 'red' : 'green',
						marginRight: 10,
					}}
				>
					Ban
				</Button>
				<Button
					onClick={() => {
						socket.emit('mute', ({ mute: !user.mutted, id: user.id }));
					}}
					style={{ backgroundColor: user.mutted ? 'red' : 'green' }}
				>
					Mute
				</Button>
			</Box>
		</Box>
	);
};
