import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: '/'
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

    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null
      });

    case actionTypes.AUTH_REDIRECT_PATH:
      return updateObject(state, {
        authRedirectPath: action.path
      });

    default:
      return state;
  }
};

export default reducer;
