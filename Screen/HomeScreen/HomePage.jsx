import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch} from 'react-instantsearch-core';
import {SearchBox} from '../CharacterHits/SearchBox';
import CharacterHitsList from '../CharacterHits/CharacterHitsList';
import Tags from '../CharacterHits/Tags';
import {
  VITE_ALGOLIA_APP_ID,
  VITE_ALGOLIA_SEARCH_KEY,
  VITE_ALGOLIA_CHARACTER_INDEX,
} from '@env';
import {useTheme} from '../../Store/ThemeContext';
import {Button} from 'react-native-paper';
import {Card, Chip} from 'react-native-paper';
const searchClient = algoliasearch(
  VITE_ALGOLIA_APP_ID,
  VITE_ALGOLIA_SEARCH_KEY,
);
import {lightTheme, darkTheme} from '../Theme/Theme';
import CommonStyle from '../../Style/CommonStyle';
import HomePageStyle from './HomePage.style';
import WaitingQueue from '../WaitingQueue/WaitingQueue';
import QueueWaiting from '../WaitingQueue/QueueWaiting';
const HomePage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const {toggleTheme, isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <View
      style={[CommonStyle.container, {backgroundColor: theme.backgroundColor}]}>
      {/*<Switch
        trackColor={{false: '#767577', true: '#1D5BA9'}}
        thumbColor={isDarkMode ? '#000' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDarkMode}
        style={HomePageStyle.toggle}
  />*/}
      <InstantSearch
        searchClient={searchClient}
        indexName={VITE_ALGOLIA_CHARACTER_INDEX}>
        <ScrollView>
          <SearchBox />
          {/* <Button
          icon="menu"
          buttonColor="rgba(30, 41, 59, 1)"
          textColor="#fff"
          onPress={() => toggleSidebar()}
          style={HomePageStyle.tagBtn}>
          Tags
        </Button> */}
          {sidebarVisible && (
            <Tags
              setSidebarVisible={setSidebarVisible}
              attribute="tags"
              operator="and"
            />
          )}
          <CharacterHitsList />
        </ScrollView>
      </InstantSearch>
      <WaitingQueue />
      <QueueWaiting />
    </View>
  );
};

export default HomePage;
