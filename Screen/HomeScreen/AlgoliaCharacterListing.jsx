import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch} from 'react-instantsearch-core';
import {SearchBox} from '../CharacterHits/SearchBox';
import CharacterHitsList from '../CharacterHits/CharacterHitsList';
import Tags from '../CharacterHits/Tags';
import {VITE_ALGOLIA_APP_ID, VITE_ALGOLIA_SEARCH_KEY} from '@env';
const searchClient = algoliasearch(
  VITE_ALGOLIA_APP_ID,
  VITE_ALGOLIA_SEARCH_KEY,
);
const AlgoliaCharacterListing = ({indexName}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <View style={styles.container}>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <SearchBox />
        <TouchableOpacity style={styles.Tegs} onPress={toggleSidebar}>
          <Text style={styles.Tegs_Text}>Tags</Text>
          <Image
            source={require('../../assest/HomePage/Tags.png')}
            style={styles.Tags_img}
          />
        </TouchableOpacity>
        {sidebarVisible && (
          <Tags
            setSidebarVisible={setSidebarVisible}
            attribute="tags"
            operator="and"
          />
        )}
        <CharacterHitsList />
      </InstantSearch>
    </View>
  );
};

export default AlgoliaCharacterListing;
const styles = StyleSheet.create({
  hitsResult: {
    color: '#fff',
    marginLeft: 5,
  },
  Character: {
    width: Dimensions.get('window').width - 10,
    height: 100,
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 1)',
  },
  Avatar_url: {
    height: 100,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Character_Title: {
    marginLeft: 5,
    width: Dimensions.get('window').width - 110,
    height: 100,
  },
  CharacterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CharacterBoxName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CharacterName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  CharacterNameText: {
    fontSize: 13,
    color: 'rgba(71, 181, 255, 1)',
    fontWeight: '400',
    marginLeft: 5,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  messageNumber: {
    color: 'rgba(203, 203, 203, 1)',
    marginLeft: 5,
  },
  Tegs: {
    width: 70,
    height: 23,
    backgroundColor: 'rgba(30, 41, 59, 1)',
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  Tegs_Text: {
    color: '#fff',
  },
  Tags_img: {
    marginLeft: 5,
  },
});
