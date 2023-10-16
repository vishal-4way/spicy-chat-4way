import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  position: null,
  status: null,
};
const WaitingQueue = createSlice({
  name: 'Waiting',
  initialState,
  reducers: {
    updateWaitingQueue: (state, action) => {
      state.status = action.payload?.status;
      if (action.payload?.position) state.position = action.payload?.position;
    },
  },
});
export const {updateWaitingQueue} = WaitingQueue.actions;

export default WaitingQueue.reducer;
