import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    width: wp('100%'),
    height: hp('100%'),
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },

  titleViewContainer: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  titleView: {
    marginLeft: 20,
  },

  title: {
    fontSize: 45,
    fontFamily: 'Gilroy-SemiBold',
  },

  titleColor: {
    fontSize: 45,
    fontFamily: 'Gilroy-SemiBold',
    color: '#FF2485',
  },

  topView: {
    flexDirection: 'column',
    width: '100%',
    height: '50%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  fieldWrapper: {
    marginTop: 0,
    width: '100%',
    height: '20%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  centerView: {
    flexDirection: 'column',
    width: '100%',
    height: '35%',
    alignContent: 'center',
    backgroundColor: 'white',
  },

  buttonSubmitView: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
  },

  buttonSubmit: {
    justifyContent: 'center',
    height: '60%',
    margin: 20,
    fontFamily: 'Gilroy-Bold',
    backgroundColor: '#FF2485',
    borderRadius: 35,
  },

  bottomView: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
  },

  socialView: {
    height: '60%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonview: {
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 10,
    paddingBottom: 10,
  },

  buttonFacebook: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: 20,
    width: '40%',
    backgroundColor: '#157DC3',
    borderRadius: 30,
    overflow: 'hidden',
  },

  buttonTwitter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginLeft: 20,
    width: '40%',
    backgroundColor: '#1DA1F3',
    borderRadius: 30,
    overflow: 'hidden',
  },

  bottomTextView: {
    flex: 1,
  },

  bottomText: {
    marginTop: '7%',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#515C6F',
  },

  termsView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  textTerms: {
    fontSize: 13,
    textAlign: 'center',
    color: '#1E75FF',
  },

  and: {
    marginLeft: 3,
    marginRight: 3,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#515C6F',
  },
});
