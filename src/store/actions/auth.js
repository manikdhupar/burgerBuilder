import * as actionTypes from './actionTypes';
import axios from 'axios';

// API KEY: 'AIzaSyDMkgON36BI49gU3a20uBzkYvHabn5SEK8'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		axios
			.post(
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMkgON36BI49gU3a20uBzkYvHabn5SEK8',
				authData
			)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};
