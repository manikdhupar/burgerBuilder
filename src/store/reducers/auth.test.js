import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    });
  });

  it('should return state', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectPath: '/'
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          userId: 'some-id'
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-id',
      loading: false,
      error: null,
      authRedirectPath: '/'
    });
  });
});
