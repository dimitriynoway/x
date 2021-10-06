import Fade from '@material-ui/core/Fade';
import { useSnackbar, OptionsObject, ProviderContext, SnackbarKey } from 'notistack';
import { useCallback } from 'react';

interface CustomSnackInterface extends ProviderContext {
	error: (message: string) => SnackbarKey;
}

const useCustomSnackbar = (): CustomSnackInterface => {
	const { enqueueSnackbar, ...rest } = useSnackbar();

	const options: OptionsObject = {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'left',
		},
		autoHideDuration: 2000,
		// TransitionComponent: Fade,
	};

	const error = useCallback((message: string) => enqueueSnackbar(message, options), [])


	return {
		...rest,
		enqueueSnackbar,
		error,
	}
}

export default useCustomSnackbar