import {StyleSheet, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  homeNavigationImg: {
    height: '35%',
    width: '100%',
    marginTop: 0,
    resizeMode: 'cover',
  },
  similarEventTypeMainView: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
  },
  similarEventTypeText: {
    marginLeft: 12,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#rgba(255,255,255,0.53)',
    color: '#FF2485',
    textAlign: 'center',
    overflow: 'hidden',
    fontSize: 10,
    fontFamily: 'Gilroy-ExtraBold',
  },
  similarEvetsBackImg: {
    flex: 1,
  },
  similarEvetsTimeNTitleView: {
    width: '100%',
    height: '80%',
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  similarEvetsTimeView: {
    marginLeft: 10,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  similarEvetsTimeTxt: {
    width: '95%',
    textAlign: 'left',
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Gilroy-ExtraBold',
  },
  similarEvetsTitleView: {
    marginLeft: 10,
    height: '35%',
    justifyContent: 'flex-start',
  },
  similarEvetsTitleText: {
    width: '95%',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-ExtraBold',
    textAlign: 'left',
    marginBottom: 10,
    paddingRight: 5,
  },
  bottomTabSpace: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  viewSimilarEvent: {
    width: Math.round(SCREEN_WIDTH * 0.5),
    height: Math.round(SCREEN_WIDTH * 0.6),
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    marginLeft: 20,
    overflow: 'hidden',
  },
  mainViewSimilarEvent: {
    flexDirection: 'row',
    width: Math.round(SCREEN_WIDTH),
    height: Math.round(SCREEN_WIDTH * 0.6),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
  },
  text: {
    color: '#4f603c',
  },
  similarEventView: {
    justifyContent: 'center',
    height: '100%',
    marginLeft: 20,
    fontSize: 30,
  },
  headerTitleView: {
    justifyContent: 'center',
    height: '100%',
    marginLeft: 20,
    fontSize: 30,
  },
  myTicketText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  viewHeader: {
    height: 90,
    width: '100%',
    marginTop: 0,
    flexDirection: 'row',
  },
  similarEventText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
  },
  headerSimilarEvent: {
    height: 50,
    width: '100%',
    marginTop: 20,
  },
  backImage: {
    aspectRatio: 0.57,
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
  },
  pagerbackImage: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#rgba(0,0,0,0)',
  },
  viewSwiper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#rgba(0,0,0,0)',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  carouselContainer: {
    aspectRatio: 0.78,
    backgroundColor: 'rgba(0,0,0,0)',
    overflow: 'visible',
  },
  itemContainer: {
    width: '100%',
    height: '100%',
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  ticketTitleNTimeView: {
    width: '100%',
    aspectRatio: 2.22,
  },
  ticketTimeView: {
    marginHorizontal: 30,
    paddingTop: 5,
    height: '30%',
    justifyContent: 'center',
  },
  ticketTimeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  ticketTitleView: {
    marginHorizontal: 30,
    height: '70%',
  },
  ticketTitleText: {
    fontSize: 35,
    fontWeight: '400',
  },
  ticketbottomView: {
    marginHorizontal: 30,
    marginTop: 10,
    flex: 1,
  },
  ticketTypeView: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketTypeText: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 2,
    fontWeight: '400',
  },
  ticketEntryNExtrasView: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
  },
  ticketEntryMainView: {
    width: '55%',
    height: '100%',
    flexDirection: 'column',
  },
  ticketEntryTitleView: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketEntryImage: {
    width: '16%',
    aspectRatio: 1,
  },
  ticketEntryTitleText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '500',
  },
  ticketEntryAnsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketEntryAnsText: {
    width: '100%',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    color: '#707070',
  },
  ticketExtrasMainView: {
    width: '45%',
    height: '100%',
    flexDirection: 'column',
  },
  ticketExtrasTitleView: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketExtrasTitleImage: {
    width: '18.5%',
    aspectRatio: 1,
  },
  ticketExtrasTitleText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '500',
  },
  ticketExtrasTitleAnsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketExtrasTitleAnsText: {
    width: '100%',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  ticketIdMainView: {
    width: '100%',
    height: '45%',
  },
  ticketIdTitleText: {
    marginTop: 10,
    fontSize: 18,
    color: '#2B2424',
    width: '100%',
  },
  ticketIdText: {
    marginTop: 10,
    fontSize: 16,
    color: '#707070',
    width: '100%',
  },
  ticketBarcodeView: {
    marginTop: 10,
    width: '100%',
    height: '35%',
    backgroundColor: 'pink',
    overflow: 'hidden',
  },
});
