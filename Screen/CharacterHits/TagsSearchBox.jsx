import {StyleSheet, View, TextInput} from 'react-native';
import React, {useRef} from 'react';

const TagsSearchBox = ({setSearchInputValue, searchInputValue}) => {
  const inputRef = useRef(null);
  const handleInputChange = prev => {
    setSearchInputValue(prev);
  };
  return (
    <View>
      <View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={searchInputValue}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          autoCompleteType="off"
          placeholder="Search...."
          placeholderTextColor={'#fff'}
          onChangeText={handleInputChange}
        />
      </View>
    </View>
  );
};

export default TagsSearchBox;

const styles = StyleSheet.create({
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginVertical: 3,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    marginVertical: 20,
  },
});
