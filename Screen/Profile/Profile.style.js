import {StyleSheet} from 'react-native';

const ProfileStyle = StyleSheet.create({
  profIcon: {
    alignSelf: 'center',
    width: 175,
    height: 175,
    marginTop: 30,
    borderRadius: 30,
  },
  nameText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 25,
  },
  subView: {
    borderTopWidth: 1,
    borderColor: 'white',
  },
  touchableOpacity: {
    borderTopWidth: 0.5,
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    margin: 15,
    width: 35,
    height: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
  removeImg: {
    margin: 15,
    width: 35,
    height: 25,
    color: '#EB3F3F',
  },
  removeBtn: {
    color: '#EB3F3F',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default ProfileStyle;
