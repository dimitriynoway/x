import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OnlineUser } from './OnlineUser';
import IOnlineUser from '../interfaces/OnlineUser';

const useStyles = makeStyles((theme) => ({
	text: {
		textAlign: 'center',
		fontSize: theme.spacing(3.5),
		color: 'white',
		marginTop: theme.spacing(2),
	},
}));

export const OnlineUsers: React.FC<{ onlineUsers: IOnlineUser[] }> = ({ onlineUsers }) => {
	const classes = useStyles();
	return (
		<Grid item md={3}>
			<Typography className={classes.text}>Online Users</Typography>
			{onlineUsers
				&& onlineUsers.map((item, index) => (
					<OnlineUser
						username={item.username}
						color={item.userColor}
						key={index}
					/>
				))}
		</Grid>
	);
};
