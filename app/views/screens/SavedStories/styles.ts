import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
    height: '20%',
    width: '100%',
    marginLeft: '3%',
    marginRight: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  createFollowText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Gilroy-SemiBold',
    marginLeft: '1%',
  },
  closeIcon: {
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    marginRight: '5%',
  },
  imageMainContainer: {
    width: '100%',
  },
  imageThumbnail: {
    aspectRatio: 3 / 3,
    borderRadius: 15,
    resizeMode: 'cover',
    marginLeft: 10,
    marginTop: 10,
  },
});
