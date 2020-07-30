import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navigationBar: {
    width: '100%',
    height: 64,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  navigationText: {
    width: '70%',
    color: '#515C6F',
    textAlign: 'center',
    fontSize: 29,
    color: '#515C6F',
    fontFamily: 'Gilroy-Bold',
    alignSelf: 'center',
    marginBottom: -20,
  },
  lineView: {
    width: '85%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#9CA5B2',
    justifyContent: 'center',
  },
  headerView: {
    width: '85%',
    height: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  closeView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: '40%',
    aspectRatio: 1,
    right: 15,
  },
  closeImg: {
    tintColor: '#515C6F',
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  PrivateAccountTxt: {
    width: '70%',
    color: '#515C6F',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
  },
  switchMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  privateTxt: {
    fontSize: 14,
    marginLeft: 5,
  },
  publicTxt: {
    fontSize: 14,
    marginLeft: 5,
  },
  inputCotainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
    marginRight: '8%',
  },
  textInputBackground: {
    backgroundColor: '#FFFFFF',
  },
  newPasswordInputCotainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
    marginRight: '8%',
  },
  newPasswordTextInputBackground: {
    backgroundColor: '#FFFFFF',
  },
  repeatNewPasswordinputCotainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
    marginRight: '8%',
  },
  RepeatnewPasswordTextinputBackground: {
    backgroundColor: '#FFFFFF',
  },
  SubmitMainView: {
    backgroundColor: '#FF2485',
    borderRadius: 25,
    padding: 15,
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  SubmitText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Gilroy-SemiBold',
  },
});
