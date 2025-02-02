import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  followTxt: {
    fontSize: 15,
    marginLeft: 15,
    fontFamily: 'Poppins-Regular',
  },
  listView: {
    flexDirection: 'row',
    width: wp('100%'),
  },
  searchIcon: {
    width: wp('3%'),
    height: hp('3%'),
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 10,
    marginRight: '3%',
    zIndex:1000
  },
  descriptionView: {
    height: '90%',
    width: Math.round(SCREEN_WIDTH * 0.9),
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 0.9,
      width: 0.5,
    },
    justifyContent: 'center',
    elevation: 10,
  },
  searchMainView: {
    width: '90%',
    aspectRatio: 6.4,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  accountsTxt: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },
  accountsView: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 0.5, width: 0.5},
    justifyContent: 'center',
    width: '90%',
    height: '62%',
    alignSelf: 'flex-end',
    borderRadius: 31,
  },
  accountsMainView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
  },
  eventTxt: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },
  eventView: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 0.5, width: 0.5},
    justifyContent: 'center',
    width: '90%',
    height: '62%',
    alignSelf: 'flex-start',
    borderRadius: 31,
  },
  eventMainView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
  },
  segMainView: {
    width: '90%',
    height: '8%',
    marginTop: '-7%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  safeView: {
    height: '100%',
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  homeNavigationImg: {
    height: '60%',
    width: '100%',
    position: 'absolute',
  },
  closeImg: {
    alignSelf: 'center',
    height: '70%',
    width: '70%',
    aspectRatio: 1,
  },
  closeView: {
    height: '45%',
    aspectRatio: 1,
    alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  findUserTxt: {
    height: '100%',
    marginLeft: 20,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Gilroy-Bold',
  },
  findUserView: {
    height: '60%',
    width: '100%',
    alignContent: 'center',
    flexDirection: 'row',
  },
  headerMainView: {
    height: '13%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
  },
  petName: {
    color: '#8895AA',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  list: {
    paddingVertical: 15,
    marginLeft: 15,
  },
  userName: {
    color: '#13153B',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  listProfileView: {
    width: wp('15%'),
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'grey',
    marginRight: 10,
  },
  listProfileImage: {
    width: '100%',
    height: '100%',
  },
  listTextView: {
    flexDirection: 'column',
    marginLeft: 1,
    justifyContent: 'space-evenly',
    width: wp('35%'),
  },
  bottomTabSpace: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mapViewMainView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  mapViewChildView: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  mapView: {
    flex: 1,
  },
  showshadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  hideShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.0,
    shadowRadius: 4.65,
  },
  markerView: {
    overflow: 'visible',
    width: 60,
    height: 70,
    justifyContent: 'flex-end',
  },
  liveMakerImageView: {
    width: 60,
    height: 15,
    resizeMode: 'contain',
    position: 'absolute',
  },
  markerImageView: {
    width: 60,
    height: 70,
    resizeMode: 'cover',
  },
  markerFlatListMainView: {
    flexDirection: 'row',
    width: Math.round(SCREEN_WIDTH),
    height: Math.round(SCREEN_WIDTH * 0.4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: 20,
    aspectRatio: 3.1,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  markerListItemMainView: {
    height: '88%',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    aspectRatio: 2.2,
    backgroundColor: 'white',
    marginLeft: 20,
  },
  listItemImageMainView: {
    height: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    aspectRatio: 1,
    backgroundColor: 'pink',
    marginLeft: 10,
  },
  listItemImageView: {
    width: '100%',
    height: '100%',
  },
  listItemInformationMainView: {
    height: '90%',
    alignSelf: 'center',
    aspectRatio: 1.2,
    marginLeft: 10,
  },
  listItemTypeMainView: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
  },
  listItemTypeTextView: {
    position: 'absolute',
    color: 'white',
    fontSize: 9,
    marginLeft: 1,
    paddingLeft: 8,
    borderRadius: 10,
    overflow: 'hidden',
    paddingRight: 8,
    paddingVertical: 4,
    backgroundColor: '#00CA03',
  },
  eventNameMainView: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
  },
  eventNameTextView: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  nameTextView: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  dateMainView: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
  },
  dateTextView: {
    color: '#515C6F',
  },
  closeIconView: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 10,
    marginRight: -100,
    marginTop: 30,
    elevation: 1, // works on android
  },
  closeIcon: {
    flex: 1,
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginRight: -150,
    marginTop: 10,
  },
   imageMainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  imageThumbnailView: {
    flex: 1 / 3,
    flexDirection: 'column',
    margin: 1,
  },
  imageThumbnail: {
    height: 100,
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 2,
  },
  bottomPadding: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
