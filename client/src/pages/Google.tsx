import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import { REACT_APP_SERVER } from '../config';

export const Google: React.FC = () => {
	const history = useHistory();
	useEffect(() => {
		axios.get(`${REACT_APP_SERVER}/auth/getUser`, {
			withCredentials: true,
		}).then((res) => {
			if (res.data) {
				localStorage.setItem('token', res.data);
				history.push('/');
				return;
			}
			history.push('/login');
		}).catch(() => {
			history.push('/login');
		});
	}, []);

	return (
		<Loader />
	);
};
