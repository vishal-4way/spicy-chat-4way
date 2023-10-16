import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRefinementList, useHits} from 'react-instantsearch-core';
import TagsSearchBox from './TagsSearchBox';
import TagsStyle from './Tags.style';
import {useTheme} from '@react-navigation/native';
import {lightTheme, darkTheme} from '../Theme/Theme';
import Back from 'react-native-vector-icons/Ionicons';

const Tags = ({setSidebarVisible, attribute, operator}) => {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const [searchInputValue, setSearchInputValue] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const {items, refine} = useRefinementList({
    attribute,
    operator,
    limit: 50,
  });
  const [tagsData, setTagsData] = useState(items);
  const {hits, results} = useHits();
  const selectedTags = results._state.facetsRefinements.tags;
  useEffect(() => {
    filteredOptions(items, searchInputValue);
  }, [items, searchInputValue]);

  const isRefinedItems = items
    .filter(item => item.isRefined == true)
    .map(item => {
      return item.value;
    });
  function filteredOptions(items, searchInputValue) {
    const filteredItems = items.filter(item =>
      Object.keys(item).some(
        key =>
          typeof item[key] === 'string' &&
          item[key].toLowerCase().includes(searchInputValue.toLowerCase()),
      ),
    );
    return setTagsData(filteredItems);
  }
  const finalTagData = hits.length ? tagsData : selectedTags;
  return (
    <View style={TagsStyle.sidebar}>
      <TouchableOpacity onPress={() => setSidebarVisible(false)}>
        <Back name="arrow-back" size={25} style={{color: 'white'}} />
      </TouchableOpacity>
      {showSearchBar && (
        <TagsSearchBox
          setSearchInputValue={setSearchInputValue}
          setShowSearchBar={setShowSearchBar}
          searchInputValue={searchInputValue}
        />
      )}
      <FlatList
        data={finalTagData && finalTagData}
        keyExtractor={item => item.objectID}
        renderItem={({item, index}) => {
          return (
            <View style={TagsStyle.checkboxContainer} key={index}>
              <TouchableOpacity onPress={() => refine(item.value)}>
                {isRefinedItems.includes(item.value) ? (
                  <Image
                    source={require('../../assest/HomePage/Checked.png')}
                  />
                ) : (
                  <Image source={require('../../assest/HomePage/Check.png')} />
                )}
              </TouchableOpacity>
              <Text style={TagsStyle.label}>
                {item.label} ({item.count})
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Tags;
