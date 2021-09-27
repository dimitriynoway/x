import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router-dom';
import colors from '../colors';
import { ErrorHandler } from '../notifications/functions';
import { WarningPage } from '../components/Warning';
import { ChatWindow } from '../components/ChatWindow';

const Chat = ({ socket }) => {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const windowWidthLess900 = useMediaQuery('(max-width:960px)');
	const handleError = ErrorHandler(enqueueSnackbar);

	const [messages, setMessages] = useState([]);
	const [usersInDB, setUsersInDB] = useState([]);
	const [onlineUsersArray, setOnlineUsersArray] = useState([]);
	const [showAdmin, setShowAdmin] = useState(false);
	const [warning, setWarning] = useState(false);
	const [userRole, setUserRole] = useState('user');
	const [warningMessage, setWarningMessage] = useState('You entered from two windows or connection was interrupted');
	const [warningColor, setWarningColor] = useState('');

	const sendMessage = (e, msg, setMessage) => {
		if (e.key === 'Enter' || e.type === 'click') {
			if (!msg) return;
			socket.emit('message', ({ msg }));
			setMessage('');
		}
	};

	const getUserFromBan = (user) => {
		console.log('userFromBan', user);
		console.log('dbusers', usersInDB);
		const updatedUsersInDB = usersInDB.map((item) => {
			if (item.id === user._id) {
				return { ...item, banned: user.banned };
			}
			return item;
		});
		setUsersInDB([...updatedUsersInDB]);
	};

	const getUserFromMute = (user) => {
		console.log('userFromMute', user);
		console.log('dbusers', usersInDB);
		const updatedUsersInDB = usersInDB.map((item) => {
			if (item.id === user._id) {
				return { ...item, mutted: user.mutted };
			}
			return item;
		});
		setUsersInDB([...updatedUsersInDB]);
	};

	const userDisconnect = ({ disconnectedUser }) => {
		console.log('user disconnected');
		const copy = onlineUsersArray.find((item) => item.id === disconnectedUser.id);
		if (copy) {
			const newOnline = onlineUsersArray.filter((item) => item.id !== disconnectedUser.id);
			setOnlineUsersArray([...newOnline]);
		}
	};
	const youConnected = ({ clients, username, messages }) => {
		console.log('you connected');
		setWarning(false);
		setOnlineUsersArray(clients);
		setMessages(messages);
	};
	const newUserConnection = ({ client }) => {
		console.log('new user connected', client);
		console.log('users in db: ', usersInDB);
		const justCreatedUser = usersInDB.find((user) => user.id === client.id);
		if (!justCreatedUser) {
			setUsersInDB((prev) => [...prev, client]);
		}
		const newOnline = onlineUsersArray.filter((item) => item.id !== client.id);

		setOnlineUsersArray([...newOnline, client]);
	};

	useEffect(() => {
		socket.on('getUserFromBan', getUserFromBan);
		return () => {
			socket.removeAllListeners('getUserFromBan');
		};
	}, [usersInDB]);

	useEffect(() => {
		socket.on('getUserFromMute', getUserFromMute);
		return () => {
			socket.removeAllListeners('getUserFromMute');
		};
	}, [usersInDB]);

	useEffect(() => {
		socket.on('user disconnect', userDisconnect);
		socket.on('you connected', youConnected);
		socket.on('new user connection', newUserConnection);
		return () => {
			socket.removeAllListeners('user disconnect');
			socket.removeAllListeners('you connected');
			socket.removeAllListeners('new user connection');
		};
	}, [onlineUsersArray, usersInDB]);

	useEffect(() => {
		socket.once('admin', () => {
			setUserRole('admin');
		});
		socket.once('getUsersFromServer', (users) => {
			setUsersInDB([...users]);
		});
		return () => {
			socket.removeAllListeners('admin');
			socket.removeAllListeners('getUsersFromServer');
		};
	}, [usersInDB, userRole]);

	useEffect(() => {
		socket.on('message', ({ message, userColor, username }) => {
			setMessages((prev) => [...prev, {
				username,
				message,
				bgColor: colors[userColor] || 'red',
				type: 'user',
			},
			]);
		});

		socket.on('mutted', () => {
			handleError('You are mutted', windowWidthLess900);
		});

		socket.on('delay', (time) => {
			handleError(`Delay. Left ${time} seconds`, windowWidthLess900);
		});

		socket.on('dissconnect type', ({ type }) => {
			localStorage.removeItem('token');
			if (type === 'banned') {
				setWarningMessage('Loooser... You have been banned!');
				setWarningColor('orange');
			}
		});
		socket.on('error', (err) => {
			setWarningMessage(err.message);
			setWarning(true);
			localStorage.removeItem('token');
		});
		socket.on('connect_error', (err) => {
			setWarningMessage(err.message);
			setWarning(true);
			localStorage.removeItem('token');
		});
		socket.on('disconnect', () => {
			setWarning(true);
		});

		return () => {
			socket.removeAllListeners('message');
			socket.removeAllListeners('mutted');
			socket.removeAllListeners('delay');
			socket.removeAllListeners('dissconnect type');
			socket.removeAllListeners('error');
			socket.removeAllListeners('connect_error');
			socket.removeAllListeners('disconnect');
		};
	}, []);

	return (
		<>
			{warning
				? (
					<WarningPage
						warningMessage={warningMessage}
						warningColor={warningColor}
						windowWidthLess900={windowWidthLess900}
					/>
				)
				: (
					<ChatWindow
						socket={socket}
						userRole={userRole}
						setShowAdmin={setShowAdmin}
						windowWidthLess900={windowWidthLess900}
						onlineUsersArray={onlineUsersArray}
						showAdmin={showAdmin}
						usersInDB={usersInDB}
						messages={messages}
						sendMessage={sendMessage}
					/>
				)}
		</>
	);
};

export default Chat;
