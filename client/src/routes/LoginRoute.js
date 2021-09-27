import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

export const LoginRoute = ({ children, ...rest }) => {
	const [loader, setLoader] = useState(true);
	const [valid, setValid] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			setValid(false);
			setLoader(false);
		} else {
			setValid(true);
			setLoader(false);
		}
	}, []);

	if (loader) {
		return <Loader />;
	}

	return (
		<Route
			{...rest}
			render={({ location }) => (valid ? (
				<Redirect
					to={{
						pathname: '/chat',
						state: { from: location },
					}}
				/>
			) : (
				children
			))}
		/>
	);
};
