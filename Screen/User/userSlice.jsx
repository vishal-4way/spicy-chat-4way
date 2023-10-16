import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  kindeUser: null,
  guestUserId: null,
  kindeToken: null,
  profile: null,
  logout: null,
  theme:null
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGuestUserId: (state, action) => {
      state.guestUserId = action.payload;
      AsyncStorage.setItem('Id', JSON.stringify(state.guestUserId));
    },
    setKindeUser: (state, action) => {
      state.kindeUser = action.payload;
      AsyncStorage.setItem('kindeUser', JSON.stringify(state.kindeUser));
    },
    setKindeToken: (state, action) => {
      state.kindeToken = action.payload;
      AsyncStorage.setItem('token', JSON.stringify(state.kindeToken));
    },
    setProfileItems: (state, action) => {
      state.profile = action.payload;
      AsyncStorage.setItem('profile', JSON.stringify(state.profile));
    },
    setLogout: (state, action) => {
      state.logout = action.payload;
      AsyncStorage.setItem('Logout', JSON.stringify(state.logout));
    },
    setTheme:(state,action)=>{
      state.theme=action.payload;
      
    }
  },
});
export const {
  setGuestUserId,
  setKindeUser,
  setKindeToken,
  setProfileItems,
  setLogout,
  setTheme,
} = userSlice.actions;
export default userSlice.reducer;
