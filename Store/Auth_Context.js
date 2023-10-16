import {StyleSheet} from 'react-native';
import React, {createContext, useState} from 'react';

export const avatarContext = createContext();
const Auth_Context = ({children}) => {
  const [avatar, setAvatar] = useState();
  // const [loggedIn, setLoggedIn] = useState(false);

  // const login = () => {
  //   setLoggedIn(true);
  // };
  // const logout = () => {
  //   setLoggedIn(false);
  // };
  return (
    <avatarContext.Provider value={{avatar, setAvatar}}>
      {children}
    </avatarContext.Provider>
  );
};

export default Auth_Context;

const styles = StyleSheet.create({});
