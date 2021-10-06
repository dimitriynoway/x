import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	box: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

export const WarningPage: React.FC<{
	warningMessage: string,
	warningColor: string,
	windowWidthLess900: boolean
}> = ({ warningMessage, warningColor, windowWidthLess900 }) => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<Box className={classes.box} style={{ backgroundColor: warningColor }}>
			<Typography variant={windowWidthLess900 ? 'h5' : 'h3'} style={{ textAlign: 'center' }}>
				{warningMessage}
			</Typography>
			<Button onClick={() => {
				history.push('/login');
			}}
			>
				Go Home
			</Button>
		</Box>
	);
};
