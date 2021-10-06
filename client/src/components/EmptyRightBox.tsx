import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(0.7),
		marginBottom: theme.spacing(0.7),
		paddingTop: theme.spacing(1.5),
		paddingBottom: theme.spacing(1.5),
		borderRadius: 10,
		marginRight: 10,
		marginLeft: 10,
		height: theme.spacing(10),
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

export const EmptyRightBox: React.FC = () => {
	const classes = useStyles();
	return (
		<Grid
			item
			md={3}
			className={classes.container}
		>
			<div className={classes.block} />
		</Grid>
	);
};
