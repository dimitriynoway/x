import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';

export const Google = () => {
	const history = useHistory();
	useEffect(() => {
		axios.get('http://localhost:4000/auth/getUser', {
			withCredentials: 'include',
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
