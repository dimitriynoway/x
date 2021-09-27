import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import NotificationImportantIcon
	from '@material-ui/icons/NotificationImportant';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(0.7),
		marginBottom: theme.spacing(0.7),
		paddingTop: theme.spacing(1.5),
		paddingBottom: theme.spacing(1.5),
		borderRadius: 10,
		height: theme.spacing(10),
		justifyContent: 'center',
		width: '100%',
	},
	avatar: {
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
		backgroundColor: 'A1C6EA',
	},
	block: {
		display: 'flex',
	},
	text: {
		marginRight: theme.spacing(1),
		padding: theme.spacing(1),
		display: 'flex',
		wordBreak: 'break-word',
		color: 'black',
		alignItems: 'center',
	},
}));
export const NotMessage = ({ message }) => {
	const classes = useStyles();
	return (
		<Grid
			item
			className={classes.container}
			style={{ backgroundColor: message.bgColor, opacity: 0.6 }}
		>
			<div className={classes.block}>
				<Avatar className={classes.avatar}>
					<NotificationImportantIcon />
				</Avatar>
				<Typography className={classes.text}>
					{message.message}
				</Typography>
			</div>
		</Grid>
	);
};
