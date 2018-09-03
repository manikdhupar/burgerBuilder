import * as actionTypes from './actionTypes';
import axios from 'axios';

// API KEY: 'AIzaSyDMkgON36BI49gU3a20uBzkYvHabn5SEK8'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMkgON36BI49gU3a20uBzkYvHabn5SEK8';

		if (!isSignUp) {
			url =
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDMkgON36BI49gU3a20uBzkYvHabn5SEK8';
		}

		axios
			.post(url, authData)
			.then((response) => {
				console.log(response.data);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch((error) => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};
