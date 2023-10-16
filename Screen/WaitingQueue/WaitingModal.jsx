import {View, Text, Modal, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import CrossIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const WaitingModal = ({waitingModalVisible, setIsWaitingModal}) => {
  const {position} = useSelector(state => state?.waitingQueue) || {};
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={waitingModalVisible}>
      <View
        style={{
          //   width: Dimensions.get('window').width - 60,
          width: responsiveWidth(85),
          padding: 10,
          backgroundColor: '#16181A',
          //   marginVertical: 300,
          marginVertical: responsiveHeight(28),
          borderRadius: 15,
          alignSelf: 'center',
          alignItems: 'center',
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 10,
        }}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => setIsWaitingModal(false)}>
          <CrossIcon name="close" size={20} color="#808080" />
        </TouchableOpacity>
        <View style={{gap: 15, alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'OpenSans-Regular',
                fontWeight: 'bold',
                textAlign: 'justify',
              }}>
              You are now in line to chat with a chatbot.
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#fff',
                textAlign: 'justify',
                fontFamily: 'OpenSans-Regular',
                fontSize: 17,
              }}>
              Your position in line is:{' '}
              <Text
                style={{fontWeight: 'bold', fontFamily: 'OpenSans-Regular'}}>
                {position}
              </Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#6E3F9E',
                fontSize: 18,
                textAlign: 'justify',
                fontFamily: 'OpenSans-Regular',
              }}>
              Skip the line
            </Text>
            <Text
              style={{
                color: '#D49122',
                fontSize: 12,
                textAlign: 'justify',
                fontFamily: 'OpenSans-Regular',
              }}>
              ONLY $5/MONTH
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                textAlign: 'justify',
                fontFamily: 'OpenSans-Regular',
              }}>
              We are experiencing a high volume of traffic and using a virtual
              queue to limit the amount of users that can chat at the same time.
              This will ensure you have the best possible online experience.
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                textAlign: 'justify',
                fontFamily: 'OpenSans-Regular',
              }}>
              This page will automatically refresh, you can wait here or use
              other sections of the site.
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                textAlign: 'justify',
                fontFamily: 'OpenSans-Regular',
              }}>
              Last updated 1:10:40 PM
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default WaitingModal;
