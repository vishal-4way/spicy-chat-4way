import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {KindeSDK} from '@kinde-oss/react-native-sdk-0-7x';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  VITE_KINDE_CLIENT_ID,
  VITE_KINDE_DOMAIN,
  KINDE_POST_CALLBACK_UR,
  KINDE_POST_LOGOUT_REDIRECT_URL,
  ASSETS_URL,
} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  setKindeToken,
  setKindeUser,
  setLogout,
  setProfileItems,
} from '../../Screen/User/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jsonApiService from '../../Screen/services/jsonApiService';
import ProfileStyle from '../../Screen/Profile/Profile.style';
import User from 'react-native-vector-icons/FontAwesome5';
import CrossIcon from 'react-native-vector-icons/AntDesign';

export default function CustomDrawer(props) {
  const navigation = props.navigation;
  const client = new KindeSDK(
    VITE_KINDE_DOMAIN,
    KINDE_POST_CALLBACK_UR,
    VITE_KINDE_CLIENT_ID,
    KINDE_POST_LOGOUT_REDIRECT_URL,
  );

  const dispatch = useDispatch();
  const {kindeToken} = useSelector(state => state.user);
  const handleSignIn = async () => {
    const token = await client.login();
    navigation.dispatch(DrawerActions.closeDrawer());
    dispatch(setKindeToken(token));
    if (token) {
      const userProfile = await client.getUserDetails();
      dispatch(setKindeUser(userProfile));
    }
  };
  const handleSignUp = async () => {
    const token = await client.register();
    dispatch(setKindeToken(token));
    if (token) {
      const userProfile = await client.getUserDetails();
      dispatch(setKindeUser(userProfile));
      navigation.navigate('WelcomeAbroad');
    }
  };
  const handleLogout = async () => {
    const isLoggedOut = await client.logout();

    if (isLoggedOut) {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('profile');
      dispatch(setKindeToken(null));
      jsonApiService.setUserToken(null);
      dispatch(setKindeUser(null));
      dispatch(setProfileItems(null));
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  };
  const image = useSelector(state => state?.user?.profile?.avatar_url);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              width: 110,
              height: 100,
              alignSelf: 'center',
              marginVertical: 5,
            }}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            {image ? (
              <Image
                source={{uri: `${ASSETS_URL}/${image}`}}
                // style={ProfileStyle.profIcon}
                style={{
                  height: 100,
                  width: 100,
                  // alignSelf: 'center',
                  marginLeft: 9,
                  borderRadius: 10,
                }}
              />
            ) : (
              <User
                name="user-circle"
                size={100}
                color="white"
                style={{marginLeft: 9}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 30,
              height: 20,
              marginTop: 10,
            }}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <CrossIcon name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
        {kindeToken != null ? (
          <DrawerItem
            label="Logout"
            onPress={() => handleLogout()}
            labelStyle={{color: '#ffffff', fontSize: 20}}
          />
        ) : (
          <DrawerItem
            label="Login"
            onPress={() => handleSignIn()}
            labelStyle={{
              color: '#ffffff',
              fontSize: 20,
              fontFamily: 'OpenSans-Regular',
              fontWeight: '400',
            }}
          />
        )}
        {kindeToken != null ? null : (
          <DrawerItem
            label="Sign Up"
            onPress={() => handleSignUp()}
            labelStyle={{
              color: '#ffffff',
              fontSize: 20,
              fontFamily: 'OpenSans-Regular',
              fontWeight: '400',
            }}
          />
        )}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
