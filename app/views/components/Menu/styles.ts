import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export default StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#13153B',
  },
  avatarContainer: {
    marginLeft: 20,
    aspectRatio: 1.4,
    width: '90%',
  },
  avatar: {
    marginTop: 10,
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  viewitem: {
    flexDirection: 'row',
    height: (window.height * 8) / 100,
    paddingLeft: 40,
    alignContent: 'center',
  },
  viewlogout: {
    flexDirection: 'row',
    height: (window.height * 8) / 100,
    paddingLeft: 40,
    alignContent: 'center',
  },
  viewsetting: {
    flexDirection: 'row',
    height: (window.height * 12) / 100,
    paddingLeft: 40,
    alignContent: 'center',
  },
  item: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 5,
  },
  itemrateus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF2485',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 5,
  },
  itemimage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  itemsMainView: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  myEventView: {
    flex: 1,
    flexDirection: 'row',
  },
});
