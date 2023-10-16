import {StyleSheet, View, Image, Text, Switch} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyStack from '../StackNavigation/MyStack';
import {useTheme} from '../../Store/ThemeContext';
import {lightTheme, darkTheme} from '../../Screen/Theme/Theme';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CustomDrawer from './CustomDrawer';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  const {toggleTheme, isDarkMode} = useTheme();
  const {profile} = useSelector(state => state.user);

  const theme = isDarkMode ? lightTheme : darkTheme;
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({}) => ({
        drawerLabelStyle: {
          color: theme.textColor,
          fontSize: 20,
          fontFamily: 'OpenSans-Regular',
          fontWeight: '400',
        },
        drawerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTintColor: theme.textColor,
        headerStyle: {
          backgroundColor: theme.backgroundColor,
          height: 60,
          elevation: 10,
          borderBottomWidth: 0.5,
          borderColor: theme.textColor,
          shadowColor: theme.backgroundColor,
        },
        headerTitle: '',

        headerShown: true,
        headerLeft: props => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              icon="menu"
              textColor={theme.textColor}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.textColor,
                  // fontSize: 20,
                  fontSize: responsiveFontSize(2.5),
                  fontFamily: 'OpenSans-Bold',
                }}>
                SPICYCHAT
                <Text
                  style={{
                    color: 'rgba(8, 74, 147, 1)',
                    // fontSize: 20,
                    fontSize: responsiveFontSize(2.5),
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  .AI
                </Text>
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: 'rgba(31, 10, 51, 1)',
                  width: 101,
                }}>
                <Text
                  style={{
                    // fontSize: 12,
                    fontSize: responsiveFontSize(1.3),
                    textAlign: 'center',
                    lineHeight: 17,
                    color: 'rgba(181, 131, 231, 1)',
                    fontWeight: 'bold',
                  }}>
                  ALPHA RELEASE
                </Text>
              </View>
            </View>
          </View>
        ),
      })}>
      <Drawer.Screen
        name="Home"
        component={MyStack}
        initialParams={{visible: true}}
      />
    </Drawer.Navigator>
  );
};
export default MyDrawer;

const styles = StyleSheet.create({});
