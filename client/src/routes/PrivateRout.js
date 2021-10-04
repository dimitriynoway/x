import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
	const [loader, setLoader] = useState(true);
	const [valid, setValid] = useState(false);
	const history = useHistory();
	useEffect(() => {
		if (!localStorage.getItem('token')) {
			setValid(false);
			history.push('/');
			setLoader(false);
		} else {
			console.log('we are gere');
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
				children
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: location },
					}}
				/>
			))}
		/>
	);
};

export default PrivateRoute;
