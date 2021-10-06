import { Typography, Box } from '@material-ui/core';
import React from 'react';
import { PermIdentityOutlined } from '@material-ui/icons';
import colors from '../colors';
import OnlineUser from '../interfaces/OnlineUser';

export const LeftNavOnlineUser: React.FC<{ item: OnlineUser }> = ({ item }) => (
	<Box style={{
		padding: 15,
		backgroundColor: colors[item.userColor],
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 5,
		display: 'flex',
		alignItems: 'center',
	}}
	>
		<PermIdentityOutlined style={{ marginRight: 10 }} />
		<Typography>{item.username}</Typography>
	</Box>
);
