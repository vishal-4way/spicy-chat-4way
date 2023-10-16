import {StyleSheet} from 'react-native';

const ProfileSettingStyle = StyleSheet.create({
  secondView: {
    marginBottom: 15,
  },
  lastBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 14,
    marginLeft: 14,
    marginTop: 10,
    marginBottom:5
  },
  lastTouchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastBtnsSubView: {
    width: 176,
  },
  profileText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  nextView: {
    marginRight: 14,
    marginLeft: 14,
    display: 'flex',
    gap: 15,
  },
  headingText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: '400',
  },
  descText: {
    color: '#C8C8C8',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 3,
  },
  textInput: {
    backgroundColor: '#333944',
    color: '#FDFDFD',
    fontSize: 18,
  },
  highlightTextInput: {
    backgroundColor: '#333944',
    color: '#FDFDFD',
    fontSize: 18,
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 0,
    paddingBottom: 0,
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -13,
  },
  touchableOpacityView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableOpacityText: {
    color: 'white',
    fontSize: 14,
  },
  link: {
    color: '#1D5BA9',
    fontSize: 15,
    fontWeight: '400',
  },
  linkView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondView: {
    marginBottom: 15,
  },
  radioView: {
    backgroundColor: '#333944',
  },
});

export default ProfileSettingStyle;
