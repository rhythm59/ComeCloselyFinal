import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  icon: {
    aspectRatio: 1,
    height: '45%',
    // resizeMode: 'contain',
    borderRadius:100,
    overflow:'hidden'
  },

  iconHome: {
    aspectRatio: 0.9,
    height: '48%',
    marginLeft: 33,
    marginTop: 13,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },

  safeAreaView: {
    position: 'absolute',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'flex-start',
    width: Math.round(Dimensions.get('window').width),
    height: '100%',
  },

  tabBackground: {
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'flex-start',
    width: Math.round(Dimensions.get('window').width), 
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },

  bottomSafeAreaView: {
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'flex-end',
    width: Math.round(Dimensions.get('window').width),
    height: '100%',
    backgroundColor: 'white',
  },

  iconPlus: {
    marginTop: -50,
    aspectRatio: 1,
    height: '130%',
    backgroundColor: 'transparent',
  },
});
