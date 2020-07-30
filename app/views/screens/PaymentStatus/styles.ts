import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerChildView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
    height: '45%',
  },
  paymentMainView: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  paymentMainImgView: {
    height: '35%',
    width: '100%',
    alignItems: 'center',
  },
  paymentsuccessMainTxt: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtpaymentStatus: {
    color: 'white',
    fontSize: 33,
    fontFamily: 'Gilroy-ExtraBold',
  },
  buttonMainView: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChildView: {
    height: '70%',
    aspectRatio: 4.6,
    borderRadius: 35,
    backgroundColor: '#FF2485',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtButtonTitle: {
    color: 'white',
    fontFamily: 'Gilroy-Bold',
  },
});
