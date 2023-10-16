import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { CategoryContex } from '../../Store/ThemeContext'

const LoginAsync = () => {
    const { loggedIn,login,logout } = useContext(CategoryContex)
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

    {loggedIn ?
   <TouchableOpacity onPress={()=>logout()}> 
        <Text>logout</Text>
   </TouchableOpacity>
      : 
      <TouchableOpacity onPress={()=>login()}>
           <Text>Login</Text>
      </TouchableOpacity>
      }
  </View>

  )
}

export default LoginAsync

const styles = StyleSheet.create({})