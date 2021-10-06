import React from 'react';
import io from 'socket.io-client';
import { REACT_APP_SERVER } from '../config';

export default (Component) => {
	const NewComponent = (props) => {
		const socket = io(`${REACT_APP_SERVER}`, {
			transports: ['websocket', 'flashsocket'], // "polling"
			auth: { token: localStorage.getItem('token') },
		});
		return <Component {...props} socket={socket} />;
	};

	return NewComponent;
};
