import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Login from './Login';
import Chat from './Chat';
import PrivateRoute from '../routes/PrivateRout';
import ChatHOC from '../HOC/SuperChat';
import { InitialRoute } from '../routes/InitialRoute';
import { LoginRoute } from '../routes/LoginRoute';
import { Google } from './Google';

const SuperChat = ChatHOC(Chat);

const Root = () => (
	<Container
		maxWidth="xl"
		style={{
			backgroundColor: '#A1C6EA', // ,
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			paddingLeft: 0,
			paddingRight: 0,
		}}
	>
		<Router>
			<Switch>
				<Route path="/google">
					<Google />
				</Route>
				<LoginRoute path="/login">
					<Login />
				</LoginRoute>
				<PrivateRoute path="/chat">
					<SuperChat />
				</PrivateRoute>
				<Route path="/" exect>
					<InitialRoute />
				</Route>
			</Switch>
		</Router>
	</Container>
);
export default Root;
