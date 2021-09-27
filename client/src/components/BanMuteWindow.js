import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';

export const BanMuteWindow = () => {
	const [banned, setBanned] = useState(false);
	const [mutted, setMutted] = useState(false);
	return (
		<Grid
			item
			style={{
				padding: 2,
				margin: 2,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Button
				style={{ backgroundColor: banned ? 'red' : 'green', marginRight: 10 }}
				onClick={() => setBanned((prev) => !prev)}
			>
				Ban
			</Button>
			<Button
				style={{ backgroundColor: mutted ? 'red' : 'green', marginLeft: 10 }}
				onClick={() => setMutted((prev) => !prev)}
			>
				Mute
			</Button>
		</Grid>
	);
};
