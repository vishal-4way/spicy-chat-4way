import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import jsonApiService from '../services/jsonApiService';
import ChatTopMenu from './ChatTopMenu';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ASSETS_URL} from '@env';
import ChatStyle from './ChatStyle';
import Send from 'react-native-vector-icons/Ionicons';
import LeftArrow from 'react-native-vector-icons/FontAwesome';
import Dot from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkTheme, darkThemes, lightTheme, lightThemes} from '../Theme/Theme';
import {useTheme} from '../../Store/ThemeContext';
import {TypingAnimation} from 'react-native-typing-animation';
import User from 'react-native-vector-icons/FontAwesome5';
import ReloadPage from '../../ReloadPage';
import LinkIcon from 'react-native-vector-icons/FontAwesome';
import WaitingModal from '../WaitingQueue/WaitingModal';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Markdown from 'react-native-markdown-display';

const ChatScreen = ({route}) => {
  const {status, position} = useSelector(state => state?.waitingQueue) || {};

  const conversationId = route.params.conversation_id;
  const {profile} = useSelector(state => state.user);
  const {kindeToken} = useSelector(state => state.user);
  const [disable, setDisable] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState('');
  const [getCharacterName, setGetCharacterName] = useState();
  const [getInfo, setGetInfo] = useState();
  const [typingIcon, setTypingIcon] = useState(false);
  const [conversation_id, setConversation_id] = useState();
  const navigation = useNavigation();
  const {id} = route.params;
  const {type} = route.params;
  const {isDarkMode} = useTheme();
  const themegray = isDarkMode ? lightThemes : darkThemes;
  const theme = isDarkMode ? lightTheme : darkTheme;
  const [state, setState] = useState(0);
  const [isWaitingModal, setIsWaitingModal] = useState(false);
  const getCharacterItem = async () => {
    const item = await jsonApiService.getCharacter(id);
    setGetCharacterName(item);
    setGetInfo([
      {
        id: item.id,
        role: 'bot',
        content: item.greeting,
      },
    ]);
  };
  const getCharacterMessagesList = async () => {
    const response = await jsonApiService.getCharacterMessages(
      id,
      conversationId,
    );
    setConversation_id(response.conversation_id);
    setMessages(response.messages.reverse());
  };
  useEffect(() => {
    getCharacterItem();
    if (kindeToken != null) {
      setDisable(true);
    }
    getCharacterMessagesList();
  }, [conversationId]);
  if (getCharacterName === undefined) {
    return <ReloadPage />;
  }
  let payload = {
    message: newMessage,
    conversation_id: conversationId ? conversationId : conversation_id,
    character_id: id,
  };
  const sendUserMessage = async () => {
    if (!newMessage.trim()) {
      // alert('yes')
    } else {
      setDisable(false);
      setNewMessage('');
      if (messages.length != 0) {
        setTypingIcon(true);
        setMessages(prev => [
          ...prev,
          {
            id: '9f113882-7b76-4727-971e-6790d6922bf3',
            role: 'user',
            content: newMessage,
          },
        ]);
      } else {
        setTypingIcon(true);
        setGetInfo(prev => [
          ...prev,
          {
            id: '9f113882-7b76-4727-971e-6790d6922br3',
            role: 'user',
            content: newMessage,
          },
        ]);
      }
    }
    const response = await jsonApiService.chat(payload);
    setTypingIcon(false);
    setDisable(true);
    getCharacterMessagesList();
  };
  return (
    <View
      style={[ChatStyle.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderColor: 'rgba(30, 41, 59, 1)',
          marginTop: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{justifyContent: 'center', marginRight: 15, width: 40}}
            onPress={() => navigation.navigate('HomePage')}>
            <LeftArrow
              name="chevron-left"
              size={13}
              style={{marginLeft: 14, color: theme.textColor}}
            />
          </TouchableOpacity>
          <View>
            <Image
              source={{
                uri: `${ASSETS_URL}/${
                  getCharacterName && getCharacterName.avatar_url
                }`,
              }}
              style={ChatStyle.headerImage}
            />
          </View>
          <View style={ChatStyle.textView}>
            <Text
              style={[
                ChatStyle.text,
                {
                  color: theme.textColor,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '400',
                },
              ]}>
              {getCharacterName && getCharacterName.name}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Dot
              name="dots-vertical"
              size={25}
              style={{color: theme.textColor}}
            />
          </TouchableOpacity>
          <ChatTopMenu
            modalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            id={id}
            setMessages={setMessages}
            getInfo={getInfo}
            setConversation_id={setConversation_id}
          />
        </View>
      </View>
      <View style={ChatStyle.MainContent}>
        <FlatList
          data={messages && messages.length != 0 ? messages : getInfo}
          // inverted
          contentContainerStyle={{flexDirection: 'column'}}
          renderItem={({item}) => (
            <View
              style={{
                marginTop: 5,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {item?.role === 'bot' ? (
                <>
                  <Image
                    source={{
                      uri:
                        item.role === 'bot' &&
                        `${ASSETS_URL}/${
                          getCharacterName && getCharacterName.avatar_url
                        }`,
                    }}
                    style={ChatStyle.image}
                  />
                  <View style={ChatStyle.botMessages}>
                    <Markdown
                      style={{
                        em: {
                          color: '#06b7db',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                        },
                        body: {
                          color: '#fff',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                        },
                      }}>
                      {item.content}
                    </Markdown>
                  </View>
                </>
              ) : (
                <>
                  <View style={ChatStyle.userMessages}>
                    <Markdown
                      style={{
                        em: {
                          color: '#06b7db',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                        },
                        body: {
                          color: '#fff',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                        },
                      }}>
                      {item.content}
                    </Markdown>
                  </View>
                  {profile && profile.avatar_url ? (
                    <Image
                      source={{
                        uri:
                          item.role === 'user' &&
                          `${ASSETS_URL}/${profile.avatar_url}`,
                      }}
                      style={ChatStyle.image}
                    />
                  ) : (
                    <User
                      name="user-circle"
                      size={43}
                      color="white"
                      style={ChatStyle.image}
                    />
                  )}
                </>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {typingIcon && (
          <View
            style={{
              marginTop: 5,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 10,
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'center',
              bottom: 20,
            }}>
            <Image
              source={{
                uri: `${ASSETS_URL}/${
                  getCharacterName && getCharacterName.avatar_url
                }`,
              }}
              style={ChatStyle.image}
            />
            <View
              style={{
                width: 50,
                height: 44,
                backgroundColor: '#21272D',
                padding: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                margin: 5,
              }}>
              <TypingAnimation
                dotColor="#fff"
                dotMargin={10}
                dotAmplitude={6}
                dotSpeed={0.15}
                dotRadius={3.5}
                dotX={12}
                dotY={20}
                style={{bottom: 10}}
              />
            </View>
          </View>
        )}
      </View>
      <View style={ChatStyle.InputBox}>
        {status == 'access' ? (
          <View style={ChatStyle.InputBox}>
            <TextInput
              style={[
                ChatStyle.InputText,
                {
                  // backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  borderColor: theme.textColor,
                },
              ]}
              editable={disable}
              placeholder="Type a message..."
              onSubmitEditing={() => sendUserMessage()}
              value={newMessage}
              selectTextOnFocus={false}
              onChangeText={text => setNewMessage(text)}
              placeholderTextColor={'#858586'}
            />
            <TouchableOpacity onPress={() => sendUserMessage()}>
              <Text style={{color: '#fff'}}>
                <Send name="send" size={25} style={{color: '#47B4FE'}} />
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              position: 'absolute',
              alignSelf: 'center',
              bottom: 0,
              backgroundColor: '#47B5FF',
              height: responsiveHeight(9),
              width: responsiveWidth(100),
              paddingTop: 25,
            }}
            onPress={() => setIsWaitingModal(true)}>
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
                // fontSize: 20,
                fontSize: responsiveFontSize(2.5),
                fontWeight: 400,
                fontFamily: 'OpenSans-Regular',
              }}>
              Waiting Room Position : {position}{' '}
              <LinkIcon name="external-link" size={20} />
            </Text>
          </TouchableOpacity>
        )}
        <WaitingModal
          waitingModalVisible={isWaitingModal}
          setIsWaitingModal={setIsWaitingModal}
        />
      </View>
      {isWaitingModal == true ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            elevation: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            flex: 1,
          }}
        />
      ) : null}
    </View>
  );
};
export default ChatScreen;
