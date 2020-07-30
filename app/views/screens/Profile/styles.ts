import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backImage: {
    width: wp('100%'),
  },
  backgroundImage: {
    width: wp('100%'),
    marginTop: 0,
    resizeMode: 'cover',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  profileTitleView: {
    height: hp('8%'),
    flexDirection: 'row',
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Gilroy-Bold',
  },
  menuImageMainView: {
    position: 'absolute',
    right: -10,
    marginRight: 10,
    width: '8%',
    aspectRatio: 1.35,
  },
  menuImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  profileImageView: {
    borderRadius: 20,
    alignItems: 'center',
    marginTop: '-40%',
  },
  profileImage: {
    aspectRatio: 1,
    height: hp('24%'),
    borderRadius: 20,
  },
  userMainView: { 
    marginTop: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf:'center'
  },
  nameText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Gilroy-Bold',
  },
  verified: {
    marginTop: -25,
    marginLeft: 0,
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  followersFollowingView: {
    marginTop: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '4%',
  },
  followingTextView: {
    marginTop: '5%',
  },
  followingText: {
    color: '#BEBEBE',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  followingCountText: {
    color: '#2B2424',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
  followersView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '4%',
  },
  followersTextView: {
    marginTop: '5%',
  },
  followersText: {
    color: '#BEBEBE',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  followersCountText: {
    color: '#2B2424',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
  levelTextMainView: {
    marginTop: '2%',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 14,
    color: '#BEBEBE',
    fontWeight: 'normal',
    fontFamily: 'Gilroy-Medium',
  },
  levelTextAns: {
    color: '#2B2424',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    marginTop: 2,
  },
  progressbarMainView: {
    alignItems: 'center',
    marginTop: '2%',
  },
  locationFollowingView: {
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
  },
  locationImage: {
    alignItems: 'center',
    marginTop: '5%',
  },
  messageButton: {
    width: 43,
    height: 43
  },
  followButton: {
    aspectRatio: 152.17 / 43,
    marginHorizontal: 12,
    height: 43
  },
  dotView: {
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBioTextMian: {
    marginTop: '3%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBioText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Gilroy-Medium',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoriesView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
  memoriesText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#BEBEBE',
    fontFamily: 'Gilroy-Medium',
  },
  memoriesTextCount: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2B2424',
    fontFamily: 'Gilroy-SemiBold',
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
