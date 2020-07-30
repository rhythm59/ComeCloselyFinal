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

  upperView: {
    height: '60%',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
  },

  headerChildViewContainer: {
    height: '16.66%',
  },

  headerChildView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    padding: 1,
    fontSize: 40,
    justifyContent: 'space-between',
  },

  titleColor: {
    padding: 1,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF2485',
  },

  borderChildViewContainer: {
    height: '50%',
    backgroundColor: 'white',
    aspectRatio: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  borderChildView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  dotsBorders: {
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    borderWidth: 1.5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#EBEBEB',
  },

  borderInsideView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  borderInsideText: {
    color: '#EBEBEB',
    fontSize: 12,
    marginTop: 5,
  },

  textInputChildViewContainer: {
    height: '16.66%',
  },

  textInputChildView: {
    flex: 1,
    alignItems: 'center',
  },

  image: {
    width: 58.11,
    height: 47.54,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fieldWrapper: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },

  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },

  switchMainViewContainer: {
    height: '16.66%',
  },

  switchMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileText: {
    color: '#707070',
    fontSize: 14,
    justifyContent: 'center',
    width: '50%',
    fontFamily: 'Gilroy-Medium',
  },

  privateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  visibilitySwitchText: {
    fontSize: 14,
    marginLeft: 17,
    fontFamily: 'Gilroy-Medium',
  },

  switch: {
    marginLeft: 5,
  },

  bottomView: {
    height: '40%',
    marginLeft: '10%',
    marginRight: '10%',
  },

  buttonSubmitView: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
  },

  buttonSubmit: {
    height: '60%',
    justifyContent: 'center',
    fontFamily: 'Gilroy-Bold',
    backgroundColor: '#FF2485',
    borderRadius: 35,
  },

  socialBottomView: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2%',
    marginRight: '2%',
  },

  buttonSocialView: {
    marginLeft: 10,
  },

  buttonSocial: {
    width: '90%',
  },

  bottomText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },

  termsView: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  termsText: {
    textAlign: 'center',
    justifyContent: 'space-between',
    fontSize: 10,
    fontFamily: 'Gilroy-Medium',
    color: '#1E75FF',
  },

  and: {
    marginLeft: 3,
    marginRight: 3,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#515C6F',
  },
});
