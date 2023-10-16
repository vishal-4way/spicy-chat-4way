import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const CharacterStyle = StyleSheet.create({
  hitsResult: {
    color: '#fff',
    marginLeft: 5,
  },
  Character: {
    width: Dimensions.get('window').width,
    // height: 103,
    height: responsiveHeight(13),
    // borderColor: '#fff',
    marginVertical: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
  },
  Avatar_url: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 4,
    paddingRight: 4,
  },
  Character_Title: {
    marginTop: 3,
    marginBottom: 4,
    marginLeft: 5,
    width: Dimensions.get('window').width - 110,
    height: 100,
    paddingRight: 2,
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
    // fontSize: 16,
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
  CharacterNameText: {
    // fontSize: 13,
    fontSize: responsiveFontSize(1.4),
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
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default CharacterStyle;
