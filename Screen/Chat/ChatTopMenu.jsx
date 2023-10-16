import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect} from 'react';
import ChatStyle from './ChatStyle';
import jsonApiService from '../services/jsonApiService';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const ChatTopMenu = ({
  modalVisible,
  setIsModalVisible,
  setMessages,
  setConversation_id,
  id,
  getInfo,
}) => {
  const navigation = useNavigation();

  const StartNewChat = () => {
    setMessages([]);
    setIsModalVisible(false);
    setConversation_id(undefined);
    if (getInfo.length == 2) {
      getInfo.pop();
    }
    navigation.navigate('ChatInput', {
      id: id,
    });
  };
  const ViewSavedChat = async () => {
    navigation.navigate('ViewPage', id);

    setIsModalVisible(false);
  };
  const RemoveMessage = () => {
    setIsModalVisible(false);
  };
  const ShareThisBot = () => {
    setIsModalVisible(false);
  };
  const DeleteChatBot = () => {
    setIsModalVisible(false);
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => onclose(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <TouchableWithoutFeedback>
              <View style={ChatStyle.modalView}>
                <View style={ChatStyle.modalSubView}>
                  <View style={{marginLeft: 7}}>
                    <View style={{borderBottomWidth: 1, marginTop: 7}}>
                      <TouchableOpacity onPress={StartNewChat}>
                        <Text
                          style={{
                            // fontSize: 15,
                            fontSize: responsiveFontSize(1.9),
                            color: 'white',
                            fontFamily: 'OpenSans-Regular',
                            fontWeight: '400',
                          }}>
                          Start New Chat
                        </Text>
                        <Text
                          style={{
                            color: '#A0A0A0',
                            marginBottom: 4,
                            // fontSize: 12,
                            fontSize: responsiveFontSize(1.3),
                            fontFamily: 'OpenSans-Regular',
                            fontWeight: '400',
                          }}>
                          Current Chat Will be Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{borderBottomWidth: 1, marginTop: 4}}>
                      <TouchableOpacity onPress={ViewSavedChat}>
                        <Text
                          style={{
                            // fontSize: 15,
                            fontSize: responsiveFontSize(1.9),
                            color: 'white',
                            marginBottom: 4,
                            fontFamily: 'OpenSans-Regular',
                            fontWeight: '400',
                          }}>
                          View Saved Chats
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{borderBottomWidth: 1, marginTop: 4}}>
                <TouchableOpacity onPress={RemoveMessage}>
                  <Text style={{fontSize: 15, color: 'white', marginBottom: 4}}>
                    Remove Messages
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{borderBottomWidth: 1, marginTop: 4}}>
                <TouchableOpacity onPress={ShareThisBot}>
                  <Text style={{fontSize: 15, color: 'white', marginBottom: 4}}>
                    Share This Chatbot
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 4}}>
                <TouchableOpacity onPress={DeleteChatBot}>
                  <Text style={{fontSize: 15, color: 'white'}}>
                    Delete Conversation
                  </Text>
                </TouchableOpacity>
              </View> */}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ChatTopMenu;
