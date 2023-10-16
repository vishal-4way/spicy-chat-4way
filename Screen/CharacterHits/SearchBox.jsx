import React, {useRef, useState} from 'react';
import { View, TextInput} from 'react-native';
import {useSearchBox} from 'react-instantsearch-core';
import SearchStyle from './Search.style';
import {useTheme} from '../../Store/ThemeContext';
import { lightTheme,darkTheme } from '../Theme/Theme';
export function SearchBox(props) {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const {query, refine} = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <View style={[SearchStyle.container, { backgroundColor: theme.backgroundColor,borderColor:theme.textColor }]}>
      <TextInput
        ref={inputRef}
        style={[SearchStyle.input,{color:theme.textColor,}]}
        value={inputValue}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
        placeholder="Search...."
        placeholderTextColor={theme.textColor}
      />
    </View>
  );
}
