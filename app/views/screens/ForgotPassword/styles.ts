import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  childView: {
    width: wp('100%'),
    height: hp('100%'),
  },

  forgotTextMainView: {
    marginTop: '30%',
    padding: 5,
  },

  forgotText: {
    color: '#515C6F',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-Bold',
  },

  descriptionMainView: {
    marginTop: '5%',
    padding: 5,
  },

  descriptionText: {
    color: '#515C6F',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },

  fieldWrapper: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },

  textInput: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },

  buttonSubmitView: {
    width: '100%',
    height: '14%',
    justifyContent: 'center',
  },

  buttonSubmit: {
    height: '60%',
    justifyContent: 'center',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: '#FF2485',
    borderRadius: 35,
    fontFamily: 'Gilroy-Bold',
  },
});
