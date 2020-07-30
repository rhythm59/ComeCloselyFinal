import React from 'react';
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { AppImages } from '../../config';
import styles from './styles';
import Barcode from 'react-native-barcode-builder';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import AuthProvider from '../../../../app/providers/auth';
import { AuthContext } from '../../../../app/providers/auth';
import Loading from '../../../../app/views/components/Loading';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.9);
const DATA = [];

for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

class MyTickets extends React.Component {
  state = {
    selectedItem: 'About',
    index: 0,
    myTickets: [
      // {
      //   id: 0,
      //   name: 'Dancers on the Roll From Vegas',
      //   time: '12 Aug | 12:00 AM',
      //   type: 'Party',
      //   entry: '2',
      //   Extras: 'Unlimited Alcohol ',
      //   ticketID: 'NDF299393NFFF494995',
      // },
      // {
      //   id: 1,
      //   name: 'Dancers on the Roll From Vegas',
      //   time: '12 Aug | 11:00 AM',
      //   type: 'Finished',
      //   entry: '5',
      //   Extras: 'Unlimited Alcohol ',
      //   ticketID: 'NDF299393NFFF494456',
      // },
      // {
      //   id: 2,
      //   name: 'Dancers on the Roll From Vegas',
      //   time: '12 Aug | 11:00 AM',
      //   type: 'event',
      //   entry: '5',
      //   Extras: 'Unlimited Alcohol ',
      //   ticketID: 'NDF299393NFFF494456',
      // },
    ],
    upcomingEvets: [
      {
        id: 0,
        type: 'Party',
        title: 'All Summer Castle Launch Party',
        time: '12 Aug | 12:00 AM',
      },
      {
        id: 1,
        type: 'food',
        title: 'Summer Food Festival',
        time: '12 Aug | 12:00 AM',
      },
    ],
  };

  async componentDidMount() {
    try {
      const myTickets = [];
      firestore()
        .collection('tickets')
        .where('userId', "==", this.props.currentUser.uid)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            const ticketData = documentSnapshot.data()
            const eventData = this.props.events.find(event => event.id == ticketData.eventId)
            myTickets.push({
              ...ticketData,
              ...eventData,
              ticketID: documentSnapshot.id,
            });
          });
          this.setState({ myTickets })
        })
    } catch (error) {
      console.log(error)
    }

  }

  alertItemName = (item: any) => {
    //alert(item.name);
    console.log(item.name);
  };

  constructor(props: any) {
    super(props);
    this.ticketListItem = this.ticketListItem.bind(this);
  }

  ticketListItem({ item }: any) {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={AppImages.ticketImg}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            position: 'absolute',
          }}></Image>
        <View style={styles.ticketTitleNTimeView}>
          <View style={styles.ticketTimeView}>
            <Text
              style={[
                styles.ticketTimeText,
                // eslint-disable-next-line react-native/no-inline-styles
                { color: item.type === 'Finished' ? '#BEBEBE' : '#FF2485' },
              ]}>
              {item.date} | {item.time}
            </Text>
          </View>
          <View style={styles.ticketTitleView}>
            <Text
              numberOfLines={3}
              adjustsFontSizeToFit
              style={[
                styles.ticketTitleText,
                // eslint-disable-next-line react-native/no-inline-styles
                { color: item.type === 'Finished' ? '#BEBEBE' : 'black' },
              ]}>
              {item.title}
            </Text>
          </View>
        </View>
        <View style={styles.ticketbottomView}>
          <View style={styles.ticketTypeView}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.ticketTypeText,
                // eslint-disable-next-line react-native/no-inline-styles
                { color: item.type === 'Finished' ? '#BEBEBE' : '#FF2485' },
                // eslint-disable-next-line react-native/no-inline-styles
                { borderColor: item.type === 'Finished' ? '#BEBEBE' : '#FF2485' },
              ]}>
              {item.type}
            </Text>
          </View>
          <View style={styles.ticketEntryNExtrasView}>
            <View style={styles.ticketEntryMainView}>
              <View style={styles.ticketEntryTitleView}>
                <Image
                  resizeMode={'contain'}
                  source={AppImages.entry}
                  style={[
                    styles.ticketEntryImage,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      tintColor:
                        item.type === 'Finished' ? '#BEBEBE' : '#FF2485',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.ticketEntryTitleText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { color: item.type === 'Finished' ? '#BEBEBE' : '#2B2424' },
                  ]}>
                  Entry
                </Text>
              </View>
              <View style={styles.ticketEntryAnsView}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[
                    styles.ticketEntryAnsText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { color: item.type === 'Finished' ? '#BEBEBE' : '#707070' },
                  ]}>
                  {item.totalPersons} Persons
                </Text>
              </View>
            </View>
            <View style={styles.ticketExtrasMainView}>
              <View style={styles.ticketExtrasTitleView}>
                <Image
                  resizeMode={'contain'}
                  source={AppImages.starpink}
                  style={[
                    styles.ticketExtrasTitleImage,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      tintColor:
                        item.type === 'Finished' ? '#BEBEBE' : '#FF2485',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.ticketExtrasTitleText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { color: item.type === 'Finished' ? '#BEBEBE' : '#2B2424' },
                  ]}>
                  Extras
                </Text>
              </View>
              <View style={styles.ticketExtrasTitleAnsView}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[
                    styles.ticketExtrasTitleAnsText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { color: item.type === 'Finished' ? '#BEBEBE' : '#707070' },
                  ]}>
                  {item.extras}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ticketIdMainView}>
            <Text style={styles.ticketIdTitleText}>Ticket ID</Text>
            <Text style={styles.ticketIdText}>{item.ticketID}</Text>
            <View style={styles.ticketBarcodeView}>
              <Barcode value={item.ticketID} format="CODE128" />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.viewSwiper}>
          <ScrollView>
            <View style={styles.backImage}>
              <Image
                style={styles.homeNavigationImg}
                source={AppImages.homeNavigation}
              />
            </View>
            <SafeAreaView>
              <View style={styles.viewHeader}>
                <View style={styles.headerTitleView}>
                  <Text style={styles.myTicketText}>My Tickets</Text>
                </View>
              </View>

              <Carousel
                /* ref={(c) => (this.carousel = c)} */
                data={this.state.myTickets}
                renderItem={this.ticketListItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                onSnapToItem={(index: number) => this.setState({ index })}
              // useScrollView={true}
              />
              <View style={styles.headerSimilarEvent}>
                <View style={styles.similarEventView}>
                  <Text style={styles.similarEventText}>Similar Events</Text>
                </View>
              </View>
              <View style={styles.mainViewSimilarEvent}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.upcomingEvets}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View key={item.id} style={styles.viewSimilarEvent}>
                      <ImageBackground
                        style={styles.similarEvetsBackImg}
                        source={AppImages.loginImage}>
                        <View style={styles.similarEventTypeMainView}>
                          <Text style={styles.similarEventTypeText}>
                            {item.type}
                          </Text>
                        </View>
                        <View style={styles.similarEvetsTimeNTitleView}>
                          <Text
                            style={styles.similarEvetsTitleText}
                            adjustsFontSizeToFit
                            numberOfLines={2}>
                            {item.title}
                          </Text>
                          <Text style={styles.similarEvetsTimeTxt}>
                            {item.time}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )}
                />

                {/* </ScrollView> */}
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
  };
};

const mapStateToProps = (state: any) => {
  return {
    events: state.event.events,
  };
};
function WrapMyTickets(props: any) {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ currentUser, isLoading }) =>
          isLoading ?
            <Loading /> :
            <MyTickets currentUser={currentUser} {...props} />
        }
      </AuthContext.Consumer>
    </AuthProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapMyTickets);
// export default MyTickets;