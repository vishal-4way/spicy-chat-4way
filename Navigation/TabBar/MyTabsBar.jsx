import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../../Screen/HomeScreen/HomePage';
import Chats from '../../Screen/TabScreens/Chats';
import Create from '../../Screen/TabScreens/Create';
import MyBots from '../../Screen/TabScreens/MyBots';
import AccountScreen from '../../Screen/Account/AccountScreen';
import AuthLogin from '../../AuthLogin';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyBot from 'react-native-vector-icons/FontAwesome5';
import TabStyle from './TabStyle';
import {lightTheme, darkTheme} from '../../Screen/Theme/Theme';
const Tab = createBottomTabNavigator();
const MyTabsBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#000',
          borderTopWidth: 0,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="HomePages"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={TabStyle.TabBox}>
              {focused ? (
                <View>
                  <Icon
                    name="home"
                    size={25}
                    color="#47B5FF"
                    style={TabStyle.TabIcon}
                  />
                  <Text style={TabStyle.TabTextColor}>Home</Text>
                </View>
              ) : (
                <View>
                  <Icon
                    name="home"
                    color="rgba(255, 255, 255, 0.6)"
                    size={25}
                    style={TabStyle.TabIcon}
                  />
                  <Text style={TabStyle.TabText}>Home</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="Chats"
        component={Chats}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View style={TabStyle.TabBox}>
              {focused ? (
                <View>
                  <Icon
                    name="comments"
                    size={25}
                    color="#47B5FF"
                    style={TabStyle.TabIcon}
                  />
                  <Text style={TabStyle.TabTextColor}>Chats</Text>
                </View>
              ) : (
                <View>
                  <Icon
                    name="comments"
                    color="rgba(255, 255, 255, 0.6)"
                    size={25}
                    style={TabStyle.TabIcon}
                  />
                  <Text style={TabStyle.TabText}>Chats</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={TabStyle.TabBox}>
              {focused ? (
                <View>
                  <Icon
                    name="user"
                    size={25}
                    color="#47B5FF"
                    style={TabStyle.TabIcon}
                  />
                  <Text style={TabStyle.TabTextColor}>Account</Text>
                </View>
              ) : (
                <View>
                  <Icon
                    name="user"
                    color="rgba(255, 255, 255, 0.6)"
                    size={25}
                    style={TabStyle.TabIcon}
                  />
                  <Text style={TabStyle.TabText}>Account</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabsBar;
