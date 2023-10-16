import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import jsonApiService from '../services/jsonApiService';
import {Card, Text} from 'react-native-paper';
import CommonStyle from '../../Style/CommonStyle';
import {ASSETS_URL} from '@env';
import {useTheme} from '../../Store/ThemeContext';
import {lightTheme, darkTheme} from '../Theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {formatDistanceToNow} from 'date-fns';
import ReloadPage from '../../ReloadPage';
import CrossIcon from 'react-native-vector-icons/AntDesign';
import Markdown from 'react-native-markdown-display';

const ViewPage = ({route}) => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const [viewSavedChats, setViewSavedChats] = useState();
  const [characterDetails, setCharacterDetails] = useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteId, setDeleteId] = useState();

  const id = route.params;
  const handleBackButton = () => {
    navigation.push('ChatInput', {id: id});
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      // Remove the event listener when the component unmounts
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const getconversations = async () => {
    const items = await jsonApiService.getconversation(id);
    setViewSavedChats(items);
  };
  const getCharacterDetails = async () => {
    const character = await jsonApiService.getCharacter(id);
    setCharacterDetails(character);
  };
  useEffect(() => {
    getconversations();
    getCharacterDetails();
  }, []);
  if (viewSavedChats === undefined) {
    return <ReloadPage />;
  }
  const handleDelete = async () => {
    const items = await jsonApiService.deleteResource(
      'conversations',
      deleteId,
    );
    if (items.status == 200) {
      getconversations();
      setModalVisible(false);
    }
  };
  const convertTime = time => {
    try {
      return formatDistanceToNow(new Date(time), {addSuffix: true});
    } catch (error) {
      return '';
    }
  };
  return (
    <View
      style={[CommonStyle.container, {backgroundColor: theme.backgroundColor}]}>
      <Text
        style={{
          color: theme.textColor,
          fontFamily: 'OpenSans-Regular',
          fontWeight: '400',
        }}>
        Last Conversation With {characterDetails && characterDetails.name}
      </Text>
      {viewSavedChats && viewSavedChats.length != 0 ? null : (
        <Text
          style={{
            color: theme.textColor,
            fontFamily: 'OpenSans-Regular',
            fontWeight: '400',
          }}>
          No Conversations
        </Text>
      )}
      <FlatList
        data={viewSavedChats}
        renderItem={({item}) => (
          <Card
            mode="outlined"
            style={{
              marginTop: 10,
              backgroundColor: theme.backgroundColor,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  variant="titleLarge"
                  style={{
                    marginTop: 4,
                    marginBottom: 4,
                    marginLeft: 5,
                    color: theme.textColor,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {characterDetails && characterDetails.name}
                </Text>
              </View>
              <View style={{marginRight: 10}}>
                <Text
                  style={{
                    color: '#B1B0B3',
                    fontSize: 12,
                  }}>
                  {convertTime(
                    item.last_message && item.last_message.createdAt,
                  )}
                </Text>
              </View>
            </View>

            <View style={{borderBottomWidth: 1, borderColor: 'white'}} />
            <View style={{margin: 6, display: 'flex', flexDirection: 'row'}}>
              <Card.Cover
                source={{
                  uri: `${ASSETS_URL}/${
                    characterDetails && characterDetails.avatar_url
                  }`,
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                }}
              />
              <View style={{marginLeft: 10, paddingRight: '30%'}}>
                <Markdown
                  style={{
                    em: {color: '#06b7db'},
                    body: {color: '#fff'},
                  }}>
                  {item.last_message.content}
                </Markdown>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                // justifyContent: 'space-evenly',
                marginBottom: 4,
              }}>
              <View
                style={{
                  backgroundColor: '#404855',
                  height: 27,
                  width: 80,
                  borderRadius: 10,
                  marginRight: 4,
                }}>
                <TouchableOpacity
                  onPress={() => [setModalVisible(true), setDeleteId(item.id)]}
                  textColor="#EB3F3F">
                  <Text
                    style={{
                      color: '#EB3F3F',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: '#1D5BA9',
                  height: 27,
                  width: 170,
                  borderRadius: 10,
                  marginRight: 4,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatInput', {
                      id: id,
                      conversation_id: item.id,
                    })
                  }
                  buttonColor="#1D5BA9">
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    Continue To Chat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />
      {modalVisible == true ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            elevation: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            flex: 1,
          }}></View>
      ) : null}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            width: Dimensions.get('window').width - 60,
            padding: 10,
            backgroundColor: 'rgba(33, 39, 45, 1)',
            marginVertical: 330,
            borderRadius: 15,
            alignSelf: 'center',
            alignItems: 'center',
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 10,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setModalVisible(false)}>
            <CrossIcon name="close" size={20} color="#808080" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
              fontWeight: '400',
            }}>
            Chat will be deleted. Do you want to continue?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                width: 60,
                height: 25,
                backgroundColor: '#808080',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: '#fff'}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete()}
              style={{
                width: 60,
                height: 25,
                backgroundColor: '#084A93',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginLeft: 5,
              }}>
              <Text style={{color: '#fff'}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewPage;
