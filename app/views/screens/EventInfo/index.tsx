import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import styles from './styles';
import { AppImages } from '../../config';
import { shareOnFacebook , shareOnTwitter} from 'react-native-social-share';

/* import ActiveImage from '../../../assets/img/selected.png';
import InActiveImage from '../../../assets/img/unselected.png'; */

interface ComponentProps {
  navigation: any;
  route: any;
}
interface ComponentState {
  PersonAdd: number;
  UnlimitedAlcoholShowInActiveImage: boolean;
  AddMorePeopleShowInActiveImage: boolean;
  UnlimitedAlcoholPrice: number;
  TotalPrice: number;
  FinalPrice: number;
  eventData: any;
}
const INITIAL_STATE: ComponentState = {
  PersonAdd: 0,
  UnlimitedAlcoholShowInActiveImage: false,
  AddMorePeopleShowInActiveImage: false,
  UnlimitedAlcoholPrice: 12,
  TotalPrice: 0,
  FinalPrice: 0,
  eventData: {},
};
class EventInfo extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const eventData = this.props.route.params?.eventData;
    this.setState({ eventData })
  }

  closeTapped = () => {
    this.props.navigation.goBack();
  }

  UnlimitedAlcoholRenderImage = () => {
    var imgSource = this.state.UnlimitedAlcoholShowInActiveImage
      ? AppImages.checkboxSelected
      : AppImages.checkboxUnselected;
    return <Image source={imgSource} />;
  };

  AddMorePeopleRenderImage = () => {
    var imgSource = this.state.AddMorePeopleShowInActiveImage
      ? AppImages.checkboxSelected
      : AppImages.checkboxUnselected;
    return <Image source={imgSource} />;
  };

  tweet(imageurl,name){
    shareOnTwitter({
        'text':name,
        'link':'https://us-central1-comeclosely-71c7c.cloudfunctions.net/',
        'imagelink':imageurl,
        'image': 'comeclosely-event',
      },
      (results) => {
        console.log(results);
      }
    );
  }

  facebookShare(imageurl,name){
    shareOnFacebook({
        'text':name,
        'link':'https://us-central1-comeclosely-71c7c.cloudfunctions.net/',
        'imagelink':imageurl,
        //or use image
        'image': 'comeclosely-event',
      },
      (results) => {
        console.log(results);
      }
    );
  }

  calculateTotalPrice = () => {
    const {
      AddMorePeopleShowInActiveImage, UnlimitedAlcoholShowInActiveImage,
      UnlimitedAlcoholPrice, eventData, PersonAdd
    } = this.state;
    let TotalPrice = parseFloat(eventData?.ticketPrice);
    if (AddMorePeopleShowInActiveImage) {
      TotalPrice = TotalPrice + (eventData?.ticketPrice * PersonAdd)
    }
    if (UnlimitedAlcoholShowInActiveImage) {
      TotalPrice = TotalPrice + UnlimitedAlcoholPrice
    }
    return TotalPrice;
  }
  PersonincrementCount = () => {
    const { PersonAdd, eventData } = this.state;
    if (PersonAdd < eventData?.ticketsAvailable - 1)
      this.setState({ PersonAdd: PersonAdd + 1 });
  };

  PersoninDecrementCount = () => {
    if (this.state.PersonAdd <= 0) {
      this.setState({ PersonAdd: 0 });
    } else {
      this.setState({ PersonAdd: this.state.PersonAdd - 1 });
    }
  };

  handleSubmit = () => {
    const {
      eventData, PersonAdd,
      AddMorePeopleShowInActiveImage, UnlimitedAlcoholShowInActiveImage,
    } = this.state;

    let ticketData = {
      eventId: eventData.id,
      totalPersons: 1,
      extras: '',
      totalAmount: this.calculateTotalPrice()
    }

    ticketData.totalPersons = AddMorePeopleShowInActiveImage ?
      ticketData.totalPersons + PersonAdd :
      ticketData.totalPersons;
    if (UnlimitedAlcoholShowInActiveImage) {
      ticketData.extras = 'Unlimited Alcohol'
    }
    //console.log(eventData);
    this.props.navigation.navigate('TicketBuy', { eventData, ticketData })
  }
  render() {
    const { eventData } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <ScrollView>
            <View style={{ marginBottom: '10%' }}>
              <View style={styles.Backcontainer}>
                <ImageBackground
                  style={styles.BackImage}
                  source={{ uri: eventData?.coverPhoto }}
                />

                <View style={styles.overlay}>
                  <View style={styles.ShareMainView}>
                    <View style={styles.ShareView}>
                      <View style={styles.ShareChildView}>
                        <View style={styles.SocialIconContainer}>
                            <TouchableOpacity onPress={() => this.facebookShare(eventData?.coverPhoto,eventData?.title)}>
                              <Image source={AppImages.facebookcircleicon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.SocialIconContainer}>
                          <TouchableOpacity onPress={() => this.tweet(eventData?.coverPhoto,eventData?.title)}>
                            <Image source={AppImages.twittercircleicon} />                         
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.overlayTimeNTitle}>
                  <View style={styles.eventNameView}>
                    <Text style={styles.ClubNAmeText}>
                      {eventData?.title}
                    </Text>
                  </View>
                  <View style={styles.timeView}>
                    <Text style={styles.DateTimeText}>{eventData?.date} | {eventData?.time}</Text>
                  </View>
                </View>
                <View style={styles.overlay}>
                  <View style={styles.ShareAndCloseContainer}>
                    <View style={styles.shareIconView}>
                      <TouchableOpacity>
                        <Image
                          source={AppImages.share}
                          style={styles.ShareIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.closeIconView}>
                      <TouchableOpacity onPress={this.closeTapped}>
                        <Image
                          source={AppImages.close}
                          style={styles.CloseIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.MapContainer}>
                <View style={styles.MapView}>
                  <MapView
                    scrollEnabled={false}
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    initialRegion={{
                      longitude: parseFloat(eventData?.location?.split(',')[0]),
                      latitude: parseFloat(eventData?.location?.split(',')[1]),
                      latitudeDelta: 0.0922, longitudeDelta: 0.0421,
                    }}
                    maxZoomLevel={0}
                  >
                    <View style={{ position: 'absolute', top: 100, left: 50 }}/>
                    <Marker
                      coordinate={{
                        longitude: parseFloat(eventData?.location?.split(',')[0]),
                        latitude: parseFloat(eventData?.location?.split(',')[1])
                      }} />
                  </MapView>
                </View>
              </View>
              <View style={styles.standardPriceView}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.standardPriceText}>
                  Standard Price : {eventData?.ticketPrice}$
                </Text>
              </View>
              <View style={styles.AboutTextContainer}>
                <Text style={styles.AboutText}>About</Text>
                <Text style={styles.AboutDescription}>
                  {eventData?.description}
                </Text>
              </View>
              <View style={styles.OtherDetailTextContainer}>
                <Text style={styles.OtherDetailText}>Other Details</Text>
                {
                  eventData?.otherDetails?.split(',').map((item, index) => (
                    <View key={index} style={styles.DetailText}>
                      <Text style={styles.FirstDots}>●</Text>
                      <Text style={styles.TextDots}>{item.trim()}</Text>
                    </View>
                  ))
                }
              </View>
              <View style={styles.ExtrasTextContainer}>
                <Text style={styles.ExtrasText}>Extras</Text>
                <View style={styles.ExtrasInsideFirstView}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        UnlimitedAlcoholShowInActiveImage: !this.state
                          .UnlimitedAlcoholShowInActiveImage,
                      })
                    }>
                    {this.UnlimitedAlcoholRenderImage()}
                  </TouchableOpacity>
                  <Text style={styles.UnlmitedAlcoholText}>
                    Unlimited Alcohol
                  </Text>
                  <Text style={styles.UnlmitedAlcoholPriceText}>
                    ${this.state.UnlimitedAlcoholPrice}
                  </Text>
                </View>
                <View style={styles.ExtrasInsideSecondView}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        AddMorePeopleShowInActiveImage: !this.state.AddMorePeopleShowInActiveImage,
                      })
                    }>
                    {this.AddMorePeopleRenderImage()}
                  </TouchableOpacity>
                  <Text style={styles.AddMorePepoleText}>Add More People</Text>
                  <Text style={styles.PersonPriceText}>
                    ${eventData?.ticketPrice}/Person
                  </Text>
                </View>
              </View>
              <View style={styles.IncrAndDecrMianView}>
                <View style={styles.IncrAndDecrChildView}>
                  <TouchableOpacity
                    style={styles.decrementButtonView}
                    onPress={() => {
                      this.PersoninDecrementCount();
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                      source={AppImages.decrement}
                    />
                  </TouchableOpacity>
                  <Text style={styles.IncrAndDecrTextView}>
                    {this.state.PersonAdd}
                  </Text>
                  <TouchableOpacity
                    style={styles.incrementButtonView}
                    onPress={() => {
                      this.PersonincrementCount();
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                      source={AppImages.increment}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.TotalTextContainer}>
                <Text style={styles.TotalText}>Total</Text>
                <View style={styles.TotalchildView}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.TotalPriceText}>
                    {/* ${this.state.TotalPrice * this.state.PersonAdd} */}
                    ${this.calculateTotalPrice()}
                  </Text>
                  <Text style={styles.BorderInsideTextView}>{eventData?.ticketsAvailable} left</Text>
                  <Text onPress={this.handleSubmit} style={styles.BuyText}>BUY</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default EventInfo;
