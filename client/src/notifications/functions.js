import Fade from '@material-ui/core/Fade';

export const ErrorHandler = (enqueueSnackbar) => (err) => {
	enqueueSnackbar(err, {
		variant: 'error',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'left',
		},
		autoHideDuration: 2000,
		TransitionComponent: Fade,
	});
};

export const NotificationHandler = (enqueueSnackbar) => (err) => {
	enqueueSnackbar(err, {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'left',
		},
		autoHideDuration: 2000,
		TransitionComponent: Fade,
	});
};
