import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Common from './Style/Common.style';
const ReloadPage = () => {
  return (
    <View style={{flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        justifyContent:'center',
        alignItems:'center'
        }}>
    <ActivityIndicator animating={true} color={'#47B5FF'} size={50} />
    </View>
  )
}

export default ReloadPage

const styles = StyleSheet.create({})