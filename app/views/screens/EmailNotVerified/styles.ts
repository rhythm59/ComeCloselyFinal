import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  childView: {
    width: wp('100%'),
    height: hp('100%'),
  },

  headingView: {
    marginTop: '50%',
    padding: 5,
  },

  heading: {
    color: '#515C6F',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  descriptionView: {
    marginTop: '5%',
    marginBottom: '5%',
    padding: 5,
  },

  descriptionText: {
    color: '#515C6F',
    fontSize: 12,
    textAlign: 'center',
  },

  descriptionEmail: {
    color: '#515C6F',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  buttonSubmitView: {
    width: '100%',
    height: '7%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  buttonSubmit: {
    height: '100%',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#FF2485',
    borderRadius: 35,
  },

  /* buttonLogoutView: {
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  }, */

  buttonLogout: {
    marginTop: '5%',
    fontSize: 13,
    textAlign: 'center',
    color: '#1E75FF',
  },
});
