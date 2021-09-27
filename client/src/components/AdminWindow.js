import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@material-ui/core';
import { UserInfoForAdmin } from './UserInfoForAdmin';
import { AdminInfo } from './AdminInfo';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'rgba(255,255,255,.6)',
	border: '2px solid white',
	boxShadow: 24,
	p: 4,
	height: 400,
	overflow: 'auto',
	borderRadius: 1,
};

export const AdminWindow = ({
	allUsers,
	showAdmin,
	setShowAdmin,
	socket,
}) => {
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
				<Box sx={style} style={{ width: windowWidthLess900 ? 300 : 600 }}>
					<Typography style={{ fontSize: 34, textAlign: 'center' }}>
						All users
					</Typography>
					{allUsers && allUsers.length > 0 && allUsers.map((user) => {
						if (Array.isArray(user.role) && user.role.includes('admin')) {
							// return (
							// 	<AdminInfo
							// 		item={user}
							// 		key={user.id}
							// 		windowWidthLess900={windowWidthLess900}
							// 	/>
							// );
							return null;
						}
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
