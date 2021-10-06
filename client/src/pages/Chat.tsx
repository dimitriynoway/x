import React, { useEffect, useState, useCallback } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router-dom';
import colors from '../colors';
import useCustomSnackbar from '../notifications/customSnackBar';
import { WarningPage } from '../components/Warning';
import { ChatWindow } from '../components/ChatWindow';
import Socket from '../interfaces/Socket';
import DBUser from '../interfaces/DBUser';
import Message from '../interfaces/Message';
import OnlineUser from '../interfaces/OnlineUser';
import SendMessage from '../interfaces/SendMessage';

interface Props {
	socket: Socket
}

const Chat: React.FC<Props> = ({ socket }) => {
	const history = useHistory();
	const SnackError = useCustomSnackbar().error
	const windowWidthLess900 = useMediaQuery('(max-width:960px)');

	const [messages, setMessages] = useState<Message[]>([]);
	const [usersInDB, setUsersInDB] = useState<DBUser[]>([]);
	const [onlineUsersArray, setOnlineUsersArray] = useState<OnlineUser[]>([]);
	const [showAdmin, setShowAdmin] = useState(false);
	const [warning, setWarning] = useState(false);
	const [userRole, setUserRole] = useState('user');
	const [warningMessage, setWarningMessage] = useState('You entered from two windows or connection was interrupted');
	const [warningColor, setWarningColor] = useState('');

	const sendMessage: SendMessage = (e, msg) => {
		if (e.type === 'click') {
			if (msg) {
				socket.emit('message', ({ msg }));
				return true
			}
			return false
		}
	};

	const getUserFromBan = (user) => {
		const updatedUsersInDB = usersInDB.map((item) => {
			if (item.id === user.id) {
				return { ...item, banned: user.banned };
			}
			return item;
		});
		console.log('setUsersInDb:', updatedUsersInDB);
		setUsersInDB([...updatedUsersInDB]);
	};

	const getUserFromMute = (user) => {
		const updatedUsersInDB = usersInDB.map((item) => {
			if (item.id === user.id) {
				return { ...item, mutted: user.mutted };
			}
			return item;
		});
		console.log('setUsersInDb2:', updatedUsersInDB);
		setUsersInDB([...updatedUsersInDB]);
	};

	const userDisconnect = ({ disconnectedUser }) => {
		const copy = onlineUsersArray.find((item) => item.id === disconnectedUser.id);
		if (copy) {
			const newOnline = onlineUsersArray.filter((item) => item.id !== disconnectedUser.id);
			setOnlineUsersArray([...newOnline]);
			console.log('setonline: ', newOnline);
		}
	};
	const youConnected = ({ clients, username, messages }) => {
		setWarning(false);
		setOnlineUsersArray(clients);
		console.log('setonline: ', clients);
		console.log('setMessages:', messages);
		setMessages(messages);
	};
	const newUserConnection = ({ client }) => {
		const justCreatedUser = usersInDB.find((user) => user.id === client.id);
		if (!justCreatedUser) {
			console.log('setUsersInDb3:', client);
			setUsersInDB((prev) => [...prev, client]);
		}
		const newOnline = onlineUsersArray.filter((item) => item.id !== client.id);

		setOnlineUsersArray([...newOnline, client]);
		console.log('setonline: ', client);
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
		socket.on('message', ({ message, userColor, username, messageId }) => {
			console.log('setMessages2:', messages);
			setMessages((prev) => [...prev, {
				username,
				message,
				bgColor: colors[userColor] || 'red',
				type: 'user',
				createdAt: Date.now().toString(),
				id: messageId
			},
			]);
		});

		socket.on('mutted', () => {
			SnackError('You are mutted');
		});

		socket.on('delay', (time) => {
			SnackError(`Delay. Left ${time} seconds`);
		});

		socket.on('dissconnect type', ({ type }) => {
			// localStorage.removeItem('token');
			if (type === 'banned') {
				setWarningMessage('Loooser... You have been banned!');
				setWarningColor('orange');
			}
		});
		socket.on('error', (err) => {
			setWarningMessage(err.message);
			setWarning(true);
			// localStorage.removeItem('token');
		});
		socket.on('connect_error', (err) => {
			setWarningMessage(err.message);
			setWarning(true);
			// localStorage.removeItem('token');
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
