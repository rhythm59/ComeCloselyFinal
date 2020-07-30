import {StyleSheet} from 'react-native';

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
    color: '#515C6F',
    fontFamily: 'Gilroy-Bold',
    alignSelf: 'center',
    marginBottom: -20,
  },
  dscrTitle: {
    fontFamily: 'Gilroy-SemiBold',
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
    height: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
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
  arrowRight: {
    height: 15,
    width: 15,
  },
  rightArrowView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '10%',
  },
  dscrMainView: {
    marginLeft: 25,
    marginTop: 25,
    flexDirection: 'row',
    height: '5%',
    alignItems: 'center',
  },
});
