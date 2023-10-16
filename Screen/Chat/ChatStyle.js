import {StyleSheet} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
const ChatStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  nextView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerImage: {
    height: 44,
    width: 44,
    borderRadius: 5,
  },
  image: {
    height: 44,
    width: 44,
    borderRadius: 5,
  },
  textView: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  MainContent: {
    flex: 9,
    height: '83%',
  },
  chatInput: {
    display: 'flex',
    borderTopWidth: 1,
    borderColor: '#1E293B',
  },
  chatInputText: {
    color: 'white',
  },
  InputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'fixed',
    marginBottom: 2,
  },
  InputText: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#333944',
  },
  modalView: {
    flex: 1,
    alignSelf: 'flex-end',
    marginTop: 100,
    marginRight: 8,
  },
  modalSubView: {
    backgroundColor: '#1A212C',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    // height: 170,
    // height: 80,
    height: responsiveHeight(10),
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
  },
  botMessages: {
    backgroundColor: '#21272D',
    paddingHorizontal: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '90%',
    marginLeft: 5,
  },
  userMessages: {
    backgroundColor: '#084A93',
    opacity: 47,
    paddingHorizontal: 10,
    borderTopLeftRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '90%',
    marginRight: 5,
  },
  messageStyle: {
    color: '#fff',
  },
});
export default ChatStyle;
