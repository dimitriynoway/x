import React from 'react';
import './App.css';
import { SnackbarProvider } from 'notistack';
import dotenv from 'dotenv';
import Root from './pages/Root';

dotenv.config();
const App = () => (
	<SnackbarProvider maxSnack={3}>
		<Root />
	</SnackbarProvider>
);

export default App;

// if token invalid, cant send msgs
