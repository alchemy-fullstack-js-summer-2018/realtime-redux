jest.mock('../../services/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    signInAnonymously: jest.fn()
  }
}));

import { login } from './actions';
import { USER_LOAD } from './reducers';
import { auth } from '../../services/firebase';

describe('app actions', () => {
  it('calls signin when no user', () => {
    const dispatch = jest.fn();
    const thunk = login();
    const onAuthMock = auth.onAuthStateChanged;
    const signInMock = auth.signInAnonymously ;
    signInMock.mockReturnValueOnce(Promise.resolve());

    thunk(dispatch);
    
    expect(onAuthMock.mock.calls.length).toBe(1);
    const userCallBack = onAuthMock.mock.calls[0][0];
    userCallBack();

    expect(signInMock.mock.calls.length).toBe(1);
  });

  it('dispatches USER_LOAD when user present', () => {
    jest.clearAllMocks();
    const user = { uid: '123' };
    const dispatch = jest.fn();
    const thunk = login();
    const onAuthMock = auth.onAuthStateChanged;
    const signInMock = auth.signInAnonymously ;
    signInMock.mockReturnValueOnce(Promise.resolve());

    thunk(dispatch);
    
    expect(onAuthMock.mock.calls.length).toBe(1);
    const userCallBack = onAuthMock.mock.calls[0][0];
    userCallBack(user);

    expect(dispatch.mock.calls.length).toBe(1);
    const { type, payload } = dispatch.mock.calls[0][0];
    expect(type).toBe(USER_LOAD);
    expect(payload).toBe(user);
    expect(signInMock.mock.calls.length).toBe(0);
  });
});