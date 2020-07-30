import {StyleSheet, Dimensions} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  navigationBar: {
    width: '100%',
    height: 64,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  navigationText: {
    width: '70%',
    textAlign: 'center',
    fontSize: 29,
    alignSelf: 'center',
    color: '#515C6F',
    fontFamily: 'Gilroy-Bold',
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
    height: hp('5%'),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerTxt: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: deviceHeight * 0.02,
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'center',
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
  subscriptionTxt: {
    width: '100%',
    textAlign: 'center',
    fontSize: deviceHeight * 0.016,
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'center',
    color: '#FF2485',
  },
  subscriptionView: {
    width: '85%',
    height: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  bottomMainView: {
    width: '85%',
    height: hp('9%'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomView: {
    width: '85%',
    aspectRatio: 4.5,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#FF2485',
    borderRadius: 32.5,
  },
  reqEventAccountTxt: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    alignSelf: 'center',
    color: 'white',
  },
});
