import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {KindeSDK} from '@kinde-oss/react-native-sdk-0-7x';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setKindeToken, setKindeUser, setProfileItems} from '../User/userSlice';
import jsonApiService from '../services/jsonApiService';
import ProfileStyle from './Profile.style';
import {lightTheme, darkTheme} from '../Theme/Theme';
import {useTheme} from '../../Store/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Logout from 'react-native-vector-icons/Feather';
import Delete from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/FontAwesome5';

import {
  VITE_KINDE_CLIENT_ID,
  VITE_KINDE_DOMAIN,
  KINDE_POST_CALLBACK_UR,
  KINDE_POST_LOGOUT_REDIRECT_URL,
  ASSETS_URL,
} from '@env';
import CommonStyle from '../../Style/CommonStyle';
const Profile = () => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const Dispatch = useDispatch();
  const image = useSelector(state => state?.user?.profile?.avatar_url);

  const name = useSelector(state => state?.user?.profile?.name);
  const {profile} = useSelector(state => state.user);
  const client = new KindeSDK(
    VITE_KINDE_DOMAIN,
    KINDE_POST_CALLBACK_UR,
    VITE_KINDE_CLIENT_ID,
    KINDE_POST_LOGOUT_REDIRECT_URL,
  );

  const handleLogout = async () => {
    const isLoggedOut = await client.logout();

    if (isLoggedOut) {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('profile');
      Dispatch(setProfileItems(null));
      Dispatch(setKindeToken(null))
      Dispatch(setKindeUser(null))
      jsonApiService.setUserToken(null)

    }
  };
  const deleteUser = async () => {
    let result = await jsonApiService.deleteResource('users');
    if (result) {
      Dispatch(setProfileItems(null));
      Dispatch(setKindeToken(null))
      Dispatch(setKindeUser(null))
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('profile');
    }
  };
  return (
    <View
      style={[CommonStyle.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={ProfileStyle.subView}>
        {image ? (
          <Image
            source={{uri: `${ASSETS_URL}/${image}`}}
            style={ProfileStyle.profIcon}
          />
        ) : (
          <User
            name="user-circle"
            size={170}
            color="white"
            style={ProfileStyle.profIcon}
          />
        )}
        <Text style={[ProfileStyle.nameText, {color: theme.textColor,fontFamily:'OpenSans-Regular',fontWeight:'400'}]}>
          {name}
        </Text>
      </View>
      {/* <TouchableOpacity
        style={ProfileStyle.touchableOpacity}
        onPress={() => navigation.navigate('ProfileSetting')}>
        <Icon
          name="user-cog"
          style={ProfileStyle.image}
          color={theme.textColor}
          size={25}
        />
        <Text style={[ProfileStyle.text,{color:theme.textColor}]}>Profile Setting</Text>
  </TouchableOpacity>*/}
      <TouchableOpacity
        style={ProfileStyle.touchableOpacity}
        onPress={handleLogout}>
        <Logout
          name="log-out"
          size={25}
          color={theme.textColor}
          style={ProfileStyle.image}
        />
        <Text style={[ProfileStyle.text, {color: theme.textColor,fontFamily:'OpenSans-Regular',fontWeight:'400'}]}>
          Logout
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={ProfileStyle.touchableOpacity}
        onPress={() => deleteUser()}>
        <Delete
          name="delete"
          size={25}
          color="white"
          style={ProfileStyle.removeImg}
        />
        <Text style={ProfileStyle.removeBtn}>Remove Account</Text>
</TouchableOpacity>*/}
    </View>
  );
};

export default Profile;
