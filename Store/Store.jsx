import {configureStore} from '@reduxjs/toolkit';
import userReducer, {
  setKindeUser,
  setKindeToken,
  setProfileItems,
  setLogout,
  setGuestUserId,
} from '../Screen/User/userSlice';
import jsonApiService from '../Screen/services/jsonApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {yupToFormErrors} from 'formik';
import waitingQueueSlice from '../Screen/User/waitingQueueSlice';
const userMiddleware = store => next => async action => {
  action = next(action);
  const state = store.getState();
  if (setKindeUser.match(action)) {
    const kindeUser = state.user.kindeUser;
    const kindeToken = state.user.kindeToken;
    try {
      if (kindeToken?.id_token && kindeUser?.id) {
        jsonApiService.setUserToken(kindeToken.id_token);
        let result = await jsonApiService
          .fetchResource('users')
          .catch(async () => {
            return await jsonApiService.createResource('users', {
              ...kindeUser,
            });
          });
        if (!result?.id) {
          result = await jsonApiService.createResource('users', {
            ...kindeUser,
          });
        }
        store.dispatch(setProfileItems(result));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
  return action;
};
const store = configureStore({
  reducer: {
    user: userReducer,
    waitingQueue: waitingQueueSlice,
  },
  middleware: [userMiddleware],
});
async function fetchUser() {
  const storedUser = await AsyncStorage.getItem('profile');
  const kindeToken = await AsyncStorage.getItem('token');
  const logout = await AsyncStorage.getItem('Logout');
  const guestUserId = await AsyncStorage.getItem('Id');
  if (storedUser) {
    jsonApiService.setGuestUserId(JSON.parse(guestUserId));
    const id_token = JSON.parse(kindeToken);
    jsonApiService.setUserToken(id_token.id_token);
    store.dispatch(setProfileItems(JSON.parse(storedUser)));
    store.dispatch(setKindeToken(JSON.parse(kindeToken)));
    store.dispatch(setLogout(JSON.parse(logout)));
    store.dispatch(setGuestUserId(JSON.parse(guestUserId)));
  } else if (guestUserId == null) {
    let guestUserId = uuid.v4();
    jsonApiService.setGuestUserId(guestUserId);
    store.dispatch(setGuestUserId(guestUserId));
  } else {
    jsonApiService.setGuestUserId(JSON.parse(guestUserId));
    store.dispatch(setGuestUserId(JSON.parse(guestUserId)));
  }
}
fetchUser();
export default store;
