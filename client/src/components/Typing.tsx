import { Avatar, Grid, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import SendMessage from '../interfaces/SendMessage';

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'absolute',
		bottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
		backgroundColor: '#507DBC',
	},
}));

const Typing: React.FC<{ sendMessage: SendMessage }> = ({ sendMessage }) => {
	const classes = useStyles();
	const [message, setMessage] = useState('');

	return (
		<Grid container className={classes.container} justifyContent="center">
			<Grid item md={4} xs={8}>
				<TextField
					autoComplete="off"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="text"
					// label={message.length}
					label={message.length > 0 ? `${message.length}/200` : 'Typing'}
					type="text"
					id="text"
					value={message}
					// onKeyDown={(e) => sendMessage(e, message)}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					inputProps={{
						maxLength: 200,
					}}
				/>
			</Grid>
			<Grid
				item
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Avatar
					className={classes.avatar}
					onClick={(e) => {
						sendMessage(e, message);
						setMessage('')
					}}
				>
					<SendIcon />
				</Avatar>
			</Grid>
		</Grid>
	);
};

export default Typing;
