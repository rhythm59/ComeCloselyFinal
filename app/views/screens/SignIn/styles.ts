import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainView: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#FFFFFF',
  },

  titleView: {
    flexDirection: 'row',
    width: '100%',
    height: '17.5%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  title: {
    marginTop: 50,
    padding: 1,
    fontSize: 40,
    fontFamily: 'Gilroy-SemiBold',
    marginLeft: 20,
    justifyContent: 'space-between',
  },

  titleColor: {
    marginTop: 50,
    padding: 1,
    fontSize: 40,
    fontFamily: 'Gilroy-SemiBold',
    color: '#FF2485',
  },

  topView: {
    flexDirection: 'column',
    width: '100%',
    height: '27.5%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  fieldWrapper: {
    marginTop: 0,
    width: '100%',
    height: '40%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    color: '#515C6F',
  },

  forgotPassword: {
    marginRight: 38,
    fontSize: 15,
    alignSelf: 'flex-end',
    color: '#515C6F',
    fontFamily: 'Poppins-Medium',
  },

  bottomView: {
    flexDirection: 'column',
    width: '100%',
    height: '55%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  buttonView: {
    flexDirection: 'column',
    width: '100%',
    height: '70%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  submitView: {
    flexDirection: 'column',
    width: '100%',
    height: '28%',
    alignContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  buttonSubmit: {
    justifyContent: 'center',
    height: '70%',
    margin: 20,
    backgroundColor: '#FF2485',
    borderRadius: 35,
  },

  orView: {
    marginTop: 10,
    marginBottom: 10,
  },

  or: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#515C6F',
    fontFamily: 'Gilroy-Medium',
  },

  submit: {
    height: '100%',
    backgroundColor: '#FF2485',
  },

  submittext: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
  },

  buttonFacebookView: {
    flexDirection: 'column',
    width: '100%',
    height: '28%',
    alignContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  buttonFacebook: {
    justifyContent: 'center',
    height: '70%',
    margin: 20,
    backgroundColor: '#367FC0',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#367FC0',
  },

  buttonGoogleView: {
    flexDirection: 'column',
    width: '100%',
    height: '28%',
    alignContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  buttonGoogle: {
    justifyContent: 'center',
    height: '70%',
    margin: 20,
    backgroundColor: '#DD4B39',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#DD4B39',
  },

  footerView: {
    flexDirection: 'column',
    width: '100%',
    height: '30%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  newUserView: {
    flexDirection: 'row',
    width: '100%',
    height: '62%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  newUser: {
    fontSize: 13,
    marginLeft: 3,
    marginRight: 3,
    fontFamily: 'Poppins-Regular',
    color: '#515C6F',
  },

  here: {
    fontSize: 13,
    marginLeft: 3,
    marginRight: 3,
  },

  bottomTextView: {
    flexDirection: 'column',
    width: '100%',
    height: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#515C6F',
  },

  termsMainView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  textTerms: {
    fontSize: 13,
    textAlign: 'center',
    color: '#1E75FF',
    fontFamily: 'Poppins-Regular',
  },

  and: {
    fontSize: 13,
    marginLeft: 3,
    marginRight: 3,
  },
});
