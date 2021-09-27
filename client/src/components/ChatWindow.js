import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AdminWindow } from './AdminWindow';
import { EmptyRightBox } from './EmptyRightBox';
import { MainMessages } from './MainMessages';
import { OnlineUsers } from './OnlineUsers';
import { TopNavigation } from './TopNavigation';
import Typing from './Typing';

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '100vh',
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
}));

const ChatWindow = ({
	socket,
	userRole,
	setShowAdmin,
	windowWidthLess900,
	onlineUsersArray,
	showAdmin,
	usersInDB,
	messages,
	sendMessage,
}) => {
	const classes = useStyles();
	return (
		<>
			<TopNavigation
				socket={socket}
				role={userRole}
				setShowAdmin={setShowAdmin}
				windowWidthLess900={windowWidthLess900}
				onlineUsersArray={onlineUsersArray}
			/>
			<div className={classes.container}>
				<AdminWindow
					socket={socket}
					showAdmin={showAdmin}
					setShowAdmin={setShowAdmin}
					onlineUsersArray={onlineUsersArray}
					allUsers={usersInDB}
					windowWidthLess900={windowWidthLess900}
				/>
				{!windowWidthLess900
					&& <OnlineUsers onlineUsers={onlineUsersArray} />}
				<MainMessages messages={messages} />
				{!windowWidthLess900
					&& <EmptyRightBox />}
			</div>
			<Typing
				sendMessage={sendMessage}
			/>
		</>
	);
};
export { ChatWindow };
