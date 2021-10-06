import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';

export const InitialRoute: React.FC = () => {
	const [loader, setLoader] = useState(true);
	const [valid, setValid] = useState(false);
	const history = useHistory();

	useEffect(
		() => {
			if (!localStorage.getItem('token')) {
				setValid(false);
				setLoader(false);
				history.push('/login');
			} else {
				setValid(true);
				setLoader(false);
			}
		}, []);

	if (loader) {
		return <Loader />;
	}

	return (
		<Redirect to={valid ? '/chat' : '/login'} />
	);
};