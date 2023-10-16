import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useInfiniteHits} from 'react-instantsearch-core';
import {ASSETS_URL} from '@env';
import CharacterStyle from './Character.style';
import {useTheme} from '../../Store/ThemeContext';
import {lightThemes, darkThemes} from '../Theme/Theme';
import {Button, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatNumber} from '../../libs/utils';
import Dot from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import QueueWaiting from '../WaitingQueue/QueueWaiting';
import Markdown from 'react-native-markdown-display';

const CharacterHitsList = props => {
  const {status} = useSelector(state => state.waitingQueue);
  const {showMore, isLastPage, hits} = useInfiniteHits(props);
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightThemes : darkThemes;

  return (
    <View>
      {/* <View style={{marginBottom: toggle ? 173 : 110}}> */}
      <View style={{marginBottom: responsiveHeight(13.4)}}>
        <FlatList
          data={hits}
          keyExtractor={item => item.objectID}
          ItemSeparatorComponent={() => (
            <View style={CharacterStyle.separator} />
          )}
          onEndReached={event => {
            if (!isLastPage) {
              showMore();
            }
          }}
          renderItem={({item, index}) => (
            <View
              style={[
                CharacterStyle.Character,
                {
                  backgroundColor: theme.backgroundColor,
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChatInput', item)}
                style={CharacterStyle.Avatar_url}>
                <Image
                  source={{uri: `${ASSETS_URL}/${item.avatar_url}`}}
                  style={{
                    width: 87,
                    height: 87,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={CharacterStyle.Character_Title}
                onPress={() => navigation.navigate('ChatInput', item)}>
                <View style={CharacterStyle.CharacterBox}>
                  <View style={CharacterStyle.CharacterBoxName}>
                    <Text
                      style={[
                        CharacterStyle.CharacterName,
                        {
                          color: theme.textColor,
                          fontFamily: 'OpenSans-Bold',
                          fontWeight: '400',
                        },
                      ]}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        CharacterStyle.CharacterNameText,
                        {
                          color: theme.textColor,
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                          fontSize: responsiveFontSize(1.3),
                        },
                      ]}>
                      @{item?.creator_username}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Dot
                      name="dots-vertical"
                      size={20}
                      style={{color: theme.textColor}}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: theme.textColor,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                    fontSize: responsiveFontSize(1.5),
                  }}
                  numberOfLines={3}>
                  {item.greeting}
                </Text>
                {/* <Markdown
                  style={{
                    em: {color: '#06b7db'},
                    body: {color: '#fff'},
                  }}
                  >
                  {item.greeting}
                </Markdown> */}
                <View style={CharacterStyle.messageBox}>
                  <Icon
                    name="envelope-o"
                    style={[CharacterStyle.icon, {color: theme.textColor}]}
                  />
                  <Text style={CharacterStyle.messageNumber}>
                    {formatNumber(item.num_messages)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default CharacterHitsList;
