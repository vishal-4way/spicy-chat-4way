import {StyleSheet} from 'react-native';

const CreateStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  link: {
    color: '#47B5FF',
    marginLeft: 14,
  },
  nextView: {
    margin: 14,
    gap: 15,
  },
  lastBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '18%',
    marginRight: 14,
    marginLeft: 14,
    marginTop: 10,
  },
  checkBoxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxTouch: {
    marginLeft: 14,
    marginTop: 15,
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: '400',
  },
  checkTextView: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 14,
    marginTop: 15,
  },
  checkText: {
    color: 'white',
  },
  checkLink: {
    flexDirection: 'row',
    color: '#47B5FF',
  },
  headingText: {
    fontSize: 16,
    fontWeight: '400',
  },
  descText: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 3,
  },
  textInput: {
    backgroundColor: '#333944',
    color: '#FDFDFD',
    fontSize: 18,
  },
  lastBtnsSubView: {
    width: 176,
  },
});

export default CreateStyle