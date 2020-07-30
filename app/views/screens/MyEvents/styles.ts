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
    overflow: 'hidden',
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
  profileTextView: {
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
    fontFamily: 'Gilroy-ExtraBold',
  },
  menuImageViewContainer: {
    flex: 1,
  },
  menuImageView: {
    marginRight: '1%',
    aspectRatio: 1.25,
    width: '11%',
    alignSelf: 'flex-end',
  },
  menuImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  eventsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: '-35%',
    // marginLeft: '5%',
    // marginRight: '5%',
  },
  eventsListContainer: {
    paddingBottom: 300,
    paddingHorizontal: '5%'
  },
  eventView: {
    height: hp('30%'),
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: '4%',
  },
  deleteModelView: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  deleteModelTitleView: {
    height: 66.66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModelTitleText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Gilroy-ExtraBold',
  },
  deleteModelSubTitleView: {
    height: 66.66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModelSubTitleText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Gilroy-ExtraBold',
  },
  deleteModelYesORNoView: {
    height: 66.66,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  deleteModelYesBtnView: {
    backgroundColor: '#FF2485',
    borderRadius: 25,
    width: '25%',
    padding: 10,
    marginRight: 10,
  },
  deleteModelYesBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteModelNoBtnView: {
    backgroundColor: '#13153B',
    borderRadius: 25,
    width: '25%',
    padding: 10,
    marginLeft: 10,
  },
  deleteModelNoBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-ExtraBold',
  },
  imageHeader: {
    height: '15%',
    flexDirection: 'row',
  },
  typeView: {
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 60,
    justifyContent: 'center',
    backgroundColor: '#rgba(255,255,255,0.53)',
  },
  typeText: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: '400',
    fontFamily: 'Gilroy-ExtraBold',
    justifyContent: 'center',
  },
  deleteImageView: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
    marginRight: 20,
  },
  dateTitleView: {
    width: '100%',
    height: '85%',
    justifyContent: 'flex-end',
  },
  dateView: {
    marginLeft: 10,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  dateText: {
    padding: 0,
    height: '100%',
    width: '100%',
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Gilroy-ExtraBold',
  },
  titleView: {
    marginLeft: 10,
    height: '35%',
    justifyContent: 'flex-start',
  },

  titleText: {
    padding: 0,
    height: '100%',
    width: '100%',
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'Gilroy-ExtraBold',
  },
});
