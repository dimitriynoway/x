import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { NotMessage } from './NotificationMessage';
import Message from './Message';

const useStyles = makeStyles((theme) => ({
	box: {
		marginTop: 3,
		borderRadius: 10,
		[theme.breakpoints.down('xs')]: {
			height: '80vh',
		},
		[theme.breakpoints.up('xs')]: {
			height: '80vh',
		},
	},
}));

export const MainMessages = ({ messages }) => {
	const ref = useRef(null);
	const classes = useStyles();

	const scrollToBottom = () => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="flex-start"
			style={{}}
		>
			<Box
				className={classes.box}
				style={{ width: '90%', overflow: 'auto' }}
			>
				{messages && messages.map((message, index) => {
					if (message.type === 'notification') {
						return <NotMessage key={index} message={message} />;
					}
					return <Message message={message} key={index} />;
				})}
				<div ref={ref} />
			</Box>

		</Grid>
	);
};
