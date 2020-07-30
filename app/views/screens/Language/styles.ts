import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navigationBar: {
    width: '100%',
    height: 64,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  navigationText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 29,
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
    height: 50,
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
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
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
});
