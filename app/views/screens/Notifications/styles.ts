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
  backImage: {
    width: wp('100%'),
    height: hp('25%'),
  },
  backGroundImage: {
    width: wp('100%'),
    height: hp('25%'),
    marginTop: 0,
    resizeMode: 'cover',
  },
  overlay: {
    height: '50%',
    width: '100%',
    position: 'absolute',
  },
  followTitleContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  createFollowText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Gilroy-Bold',
    marginLeft: 20,
    marginTop: 50,
  },
  closeIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  closeIconView: {
    height: '35%',
    aspectRatio: 1,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  followMainView: {
    height: hp('100%'),
    backgroundColor: '#F8F8F8',
    marginTop: '-20%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#F8F8F8',
  },
  descriptionView: {
    marginTop: '5%',
    padding: 15,
    marginLeft: '5%',
    marginRight: '5%',
  },
  searchIcon: {
    width: wp('3%'),
    height: hp('3%'),
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    marginRight: '3%',
  },
  listContainer: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  list: {
    paddingVertical: 13,
    marginLeft: '3.4%',
  },
  userName: {
    marginTop: 5,
    color: '#13153B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  days: {
    color: '#FF2485',
    fontSize: 18,
    fontFamily: 'Gilroy-ExtraBold',
  },
  petName: {
    marginTop: 5,
    color: '#8895AA',
    fontSize: 10,
  },
  notificationItemFollowBtn: {
    height: 30,
    backgroundColor: '#FF2485',
    borderRadius: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  followText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationItemView: {
    flexDirection: 'row',
    width: wp('100%'),
  },
  notificationItemProfileView: {
    height: 55,
    aspectRatio: 1,
    borderRadius: 27.5,
    marginRight: 15,
    overflow: 'hidden',
  },
  notificationItemProfileImage: {
    height: '100%',
    width: '100%',
  },
  notificationItemNameView: {
    flexDirection: 'column',
    marginLeft: 1,
    width: wp('35%'),
  },
  notificationItemFollowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('30%'),
    marginRight: 1,
  },
});
