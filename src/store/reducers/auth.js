import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	token: null,
	userId: null,
	loading: false,
	error: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return updateObject(state, { loading: true, error: null });

		case actionTypes.AUTH_SUCCESS:
			return updateObject(state, {
				token: action.idToken,
				userId: action.userId,
				loading: false,
				error: null
			});

		case actionTypes.AUTH_FAIL:
			return updateObject(state, {
				loading: false,
				error: action.error
			});

		default:
			return state;
	}
};

export default reducer;
