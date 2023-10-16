import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const QueueWaiting = () => {
  const {status, position} = useSelector(state => state?.waitingQueue) || {};

  return (
    <>
      {position > 0 && status === 'waiting' && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            alignSelf: 'center',
            bottom: responsiveHeight(8.6),
            backgroundColor: '#47B5FF',
            height: responsiveHeight(4.5),
            width: responsiveWidth(100),
            paddingTop: 8,
          }}>
          <Text
            style={{
              color: '#000000',
              textAlign: 'center',
              // fontSize: 14,
              fontSize: responsiveFontSize(2),
              fontWeight: 400,
              fontFamily: 'OpenSans-Regular',
            }}>
            Waiting Room Position: {position}
          </Text>
        </View>
      )}
      {status === 'access' && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            alignSelf: 'center',
            bottom: responsiveHeight(8.6),
            backgroundColor: '#306433',
            height: responsiveHeight(4.5),
            width: responsiveWidth(100),
            paddingTop: 8,
          }}>
          <Text
            style={{
              color: '#FDFDFD',
              textAlign: 'center',
              // fontSize: 14,
              fontSize: responsiveFontSize(2),
              fontWeight: 400,
              fontFamily: 'OpenSans-Regular',
            }}>
            Chat Is Available
          </Text>
        </View>
      )}
    </>
  );
};

export default QueueWaiting;

const styles = StyleSheet.create({});
