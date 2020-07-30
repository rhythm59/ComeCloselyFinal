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
  containerChildView: {
    width: '100%',
    height: '100%',
  },
  backGroundImage: {
    width: wp('100%'),
    resizeMode: 'cover',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  inboxTitleContainer: {
    width: '100%',
    marginLeft: '3%',
    marginRight: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '30%',
  },
  createFollowText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Gilroy-Bold',
    marginLeft: '1%',
  },
  closeIcon: {
    height: '20%',
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
  followMainView: {
    height: hp('100%'),
    backgroundColor: '#F8F8F8',
    marginTop: '-35%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#F8F8F8',
  },
  inboxView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayView: {
    marginTop: '10%',
  },
  todayText: {
    marginLeft: '10%',
    fontSize: 14,
    color: '#FF2485',
    fontFamily: 'Gilroy-ExtraBold',
  },
  mashiView: {
    marginTop: '10%',
    width: '60%',
  },
  mashiTitle: {
    marginLeft: '5%',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  mashiDescription: {
    marginLeft: '5%',
    fontSize: 10,
    marginTop: 10,
    color: '#8895AA',
    fontFamily: 'Poppins-Medium',
  },
  sushiView: {
    marginTop: '10%',
    width: '60%',
  },
  sushiText: {
    fontFamily: 'Poppins-SemiBold',
    marginLeft: '5%',
    fontSize: 14,
  },
  sushiDescription: {
    marginLeft: '5%',
    fontSize: 10,
    marginTop: 10,
    color: '#8895AA',
  },
});
