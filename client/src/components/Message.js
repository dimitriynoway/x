import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(0.7),
		marginBottom: theme.spacing(0.7),
		paddingTop: theme.spacing(1.5),
		paddingBottom: theme.spacing(1.5),
		borderRadius: 10,
		width: '100%',
	},
	avatar: {
		margin: theme.spacing(1),
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5),
		backgroundColor: 'white',
	},
	block: {
		display: 'flex',
	},
	text: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		padding: theme.spacing(1),
		display: 'flex',
		wordBreak: 'break-word',
		color: 'black',
		alignItems: 'center',
	},
	nickname: {
		fontSize: 24,
		marginLeft: theme.spacing(2),
	},
}));
const Message = ({ message }) => {
	const classes = useStyles();
	return (
		<Grid
			item
			className={classes.container}
			style={{ backgroundColor: message.bgColor, opacity: 0.9 }}
		>
			<div className={classes.block}>
				<Avatar className={classes.avatar} style={{ backgroundColor: message.bgColor === 'white' ? 'black' : 'white' }}>
					<PermIdentityIcon style={{ color: message.bgColor }} />
				</Avatar>
				<div>
					<Typography className={classes.nickname}>
						{message.username}
					</Typography>
					<Typography className={classes.text}>
						{message.message}
					</Typography>
				</div>
			</div>
		</Grid>
	);
};
export default Message;
