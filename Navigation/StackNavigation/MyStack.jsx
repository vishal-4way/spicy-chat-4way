import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabsBar from '../TabBar/MyTabsBar';
import ChatInput from '../../Screen/Chat/ChatInput';
import ProfileSetting from '../../Screen/Profile/ProfileSetting';
import ViewPage from '../../Screen/Chat/ViewPage';
import WelcomeAbroad from '../../Screen/Profile/WelcomeAbroad';

const Stack = createNativeStackNavigator();
const MyStack = visible => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={MyTabsBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatInput"
        component={ChatInput}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewPage"
        component={ViewPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeAbroad"
        component={WelcomeAbroad}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MyStack;

const styles = StyleSheet.create({});
