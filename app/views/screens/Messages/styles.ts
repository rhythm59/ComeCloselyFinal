import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  receiverCretedTimeText: {
    color: 'white',
    paddingBottom: 5,
    fontFamily: 'Poppins-MediumItalic',
    fontSize: 9,
  },
  massageText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  mainView: {
    height: '100%',
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  homeNavigationImg: {
    height: '60%',
    width: '100%',
    position: 'absolute',
  },
  headerView: {
    height: 75,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
  },
  headerSubView: {
    height: '60%',
    width: '100%',
    alignContent: 'center',
    flexDirection: 'row',
  },
  titleHeaderText: {
    height: '100%',
    marginLeft: 20,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Gilroy-Bold',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  closeButtonView: {
    height: '60%',
    aspectRatio: 1,
    alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  closeImg: {
    alignSelf: 'center',
    height: '70%',
    width: '70%',
    aspectRatio: 1,
  },
  chatMainView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInputMainView: {
    height: 50,
    width: SCREEN_WIDTH - 32 - 16 - 50,
    backgroundColor: '#CF326F',
    marginLeft: 8,
    borderRadius: 10,
  },
  textInputSendMassage: {
    height: '100%',
    width: '96%',
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  sendImg: {
    height: '100%',
    width: '100%',
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  receiverContentView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 24,
  },
  receiverContentMessageView: {
    marginTop: 8,
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
  },
  receiverContentDate: {flex: 3, justifyContent: 'center'},
  senderContentView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  senderContentDate: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  senderContentMessage: {
    marginTop: 8,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
  },
  senderCretedTimeText: {
    color: 'white',
    paddingBottom: 5,
    fontFamily: 'Poppins-MediumItalic',
    fontSize: 9,
  },
});
