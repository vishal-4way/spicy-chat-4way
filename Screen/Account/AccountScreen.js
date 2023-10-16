import {View,} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Profile from '../Profile/Profile';
import AuthLogin from '../../AuthLogin';
const AccountScreen = () => {
  const {kindeToken} = useSelector(state => state.user);
  return (
    <View style={{flex: 1}}>
    {kindeToken != null ? <Profile /> : <AuthLogin />}
  </View>
  );
};
export default AccountScreen;
