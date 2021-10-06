import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@material-ui/core';
import { UserInfoForAdmin } from './UserInfoForAdmin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Socket from '../interfaces/Socket';
import DBUser from '../interfaces/DBUser';
const useStyles = makeStyles(() => ({
	box: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(255,255,255,0.6)',
		border: '2px solid white',
		//boxShadow: 24,
		padding: 20,
		height: 400,
		overflow: 'auto',
		borderRadius: 1,
	}
}));


export const AdminWindow: React.FC<{ allUsers: DBUser[], showAdmin: boolean, setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>, socket: Socket }> = ({
	allUsers,
	showAdmin,
	setShowAdmin,
	socket,
}) => {
	const classes = useStyles()
	const windowWidthLess900 = useMediaQuery('(max-width:960px)');
	const handleClose = () => setShowAdmin(false);
	return (
		<div>
			<Modal
				open={showAdmin}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={classes.box} style={{ width: windowWidthLess900 ? 300 : 600 }}>
					<Typography style={{ fontSize: 34, textAlign: 'center' }}>
						All users
					</Typography>
					{allUsers && allUsers.length > 0 && allUsers.map((user) => {
						return (
							<UserInfoForAdmin
								user={user}
								key={user.id}
								socket={socket}
							/>
						);
					})}
				</Box>
			</Modal>
		</div>
	);
};
