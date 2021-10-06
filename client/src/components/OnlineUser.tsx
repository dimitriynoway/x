import {
	Avatar,
	Grid,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PermIdentityOutlined } from '@material-ui/icons';
import colors from '../colors';

const useStyles = makeStyles((theme) => ({
	block: {
		backgroundColor: 'white',
		padding: theme.spacing(1),
		margin: theme.spacing(2),
		borderRadius: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	avatar: {
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
	},
	text: {
		fontSize: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}));

export const OnlineUser: React.FC<{ username: string, color: number }> = ({ username, color }) => {
	const classes = useStyles();

	return (
		<Grid item className={classes.block}>
			<Grid
				item
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				<Avatar
					className={classes.avatar}
					style={{ backgroundColor: colors[color] }}
				>
					<PermIdentityOutlined />
				</Avatar>
				<Typography style={{ color: colors[color] }} className={classes.text}>
					{username}
				</Typography>
			</Grid>
		</Grid>
	);
};
