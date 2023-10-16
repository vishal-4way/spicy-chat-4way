import {StyleSheet} from 'react-native';

const HomePageStyle = StyleSheet.create({
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
  toggle: {
    width: '12%',
    alignSelf: 'flex-end',
  },
  tagBtn: {
    width: '20%',
    alignSelf: 'flex-end',
  },
});

export default HomePageStyle;
