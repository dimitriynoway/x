import React from 'react';
import io from 'socket.io-client';

export default (Component) => {
	const NewComponent = (props) => {
		const socket = io('http://localhost:4000', {
			transports: ['websocket', 'flashsocket'], // "polling"
			auth: { token: localStorage.getItem('token') },
		});
		return <Component {...props} socket={socket} />;
	};

	return NewComponent;
};
