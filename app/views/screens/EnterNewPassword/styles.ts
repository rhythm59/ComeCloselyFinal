import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
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
  inputCotainer: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
    marginRight: '8%',
  },
  textInputBackground: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  confirmPasswordInputCotainer: {
    marginTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
    marginRight: '8%',
  },
  confirmPasswordBackground: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  submitMainView: {
    backgroundColor: '#FF2485',
    borderRadius: 25,
    padding: 15,
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
  },
});
