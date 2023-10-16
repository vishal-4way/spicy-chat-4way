import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './Navigation/Drawer/MyDrawer';

import {Provider} from 'react-redux';
import store from './Store/Store';
import {ThemeProvider} from './Store/ThemeContext';
import {PaperProvider} from 'react-native-paper';
import Auth_Context from './Store/Auth_Context';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <ThemeProvider>
          <Auth_Context>
            <MyDrawer />
            </Auth_Context>
          </ThemeProvider>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
