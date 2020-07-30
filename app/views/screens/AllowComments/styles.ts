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
  allowComments: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    color: '#2B2424',
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
  PrivateAccountTxt: {
    width: '70%',
    color: '#515C6F',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
  },
  switchMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  privateTxt: {
    fontSize: 14,
    marginLeft: 5,
  },
  publicTxt: {
    fontSize: 14,
    marginLeft: 5,
  },
  switchView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
  allowCommentsformView: {
    marginLeft: 25,
    marginTop: 30,
  },
  cellMainView: {
    marginLeft: 25,
    marginTop: 10,
    flexDirection: 'row',
    height: '5%',
    alignItems: 'center',
  },
});
