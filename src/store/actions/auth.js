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

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
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
			.then(response => {
				console.log(response.data);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem(
					'expirationDate',
					new Date(new Date().getTime() + response.data.expiresIn * 1000)
				);
				localStorage.setItem('userId', response.data.localId);
				dispatch(authLogout(response.data.expiresIn));
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const authLogout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const authRedirectPath = path => {
	return {
		type: actionTypes.AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');

		if (!token) {
			dispatch(logout());
		} else {
			const expirationTime = new Date(localStorage.getItem('expirationDate'));
			console.log('expiration time', expirationTime);
			if (expirationTime > new Date()) {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(
					authLogout((expirationTime.getTime() - new Date().getTime()) / 1000)
				);
				console.log(expirationTime.getTime(), new Date().getTime());
				console.log((expirationTime.getTime() - new Date().getTime()) / 1000);
			} else {
				dispatch(logout());
			}
		}
	};
};
