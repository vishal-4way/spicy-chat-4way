import {StyleSheet, Dimensions} from 'react-native';

const TagsStyle = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    zIndex: 1,
    padding: 15,
    elevation: 4,
    backgroundColor: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    marginLeft: 15,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
});

export default TagsStyle;
