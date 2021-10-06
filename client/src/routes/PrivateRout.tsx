import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';

const PrivateRoute: React.FC<{ path: string }> = ({ children, path, ...rest }) => {
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
			exect
			path={path}
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