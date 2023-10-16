import {StyleSheet, View, Button} from 'react-native';
import React, {useEffect} from 'react';
import {KindeSDK} from '@kinde-oss/react-native-sdk-0-7x';
import {useDispatch} from 'react-redux';
import {setKindeToken, setKindeUser, setLogout} from './Screen/User/userSlice';
import {useNavigation} from '@react-navigation/native';
import {
  VITE_KINDE_CLIENT_ID,
  VITE_KINDE_DOMAIN,
  KINDE_POST_CALLBACK_UR,
  KINDE_POST_LOGOUT_REDIRECT_URL,
} from '@env';

const AuthLogin = () => {
  const client = new KindeSDK(
    VITE_KINDE_DOMAIN,
    KINDE_POST_CALLBACK_UR,
    VITE_KINDE_CLIENT_ID,
    KINDE_POST_LOGOUT_REDIRECT_URL,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const checkAuthenticate = async () => {
    if (await client.isAuthenticated) {
      dispatch(setLogout(client));
      s;
    }
  };
  useEffect(async () => {
    checkAuthenticate();
    const userProfile = await client.getUserDetails();
  }, []);
  const handleSignIn = async () => {
    const token = await client.login();

    dispatch(setKindeToken(token));
    if (token) {
      navigation.navigate('HomePages');
      const userProfile = await client.getUserDetails();

      dispatch(setKindeUser(userProfile));
    }
  };
  const handleSignUp = async () => {
    const token = await client.register();
    dispatch(setKindeToken(token));
    if (token) {
      navigation.navigate('WelcomeAbroad');

      const userProfile = await client.getUserDetails();
      dispatch(setKindeUser(userProfile));
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <View style={{marginVertical: 5}}>
        <Button title="Sign UP" onPress={handleSignUp} />
      </View>
    </View>
  );
};
export default AuthLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
