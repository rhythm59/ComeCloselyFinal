import React from 'react';
import {
  TextInput,
  FlatList,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { AppImages } from '../../config';
import styles from './styles';
import { UserI } from '../../../state/types';
import { userOperations } from '../../../state/ducks/user';
import { AuthContext } from '../../../providers/auth';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface ComponentProps {
  navigation: any;
  recommendedUsers: Array<UserI>;
  getRecommendedUsersError: string;
  getRecommendedUsersLoading: boolean;
  getRecommendedUsers(): Array<UserI>;
}
interface DataSourceI {
  id: string;
  name: string;
}
interface PlaceI {
  id: number;
  name: string;
  username: string;
  tag: string;
  marklatitude: number;
  marklongitude: number;
  image: any;
  date: string;
}
interface ComponentState {
  selectedEventId: number;
  loading: boolean;
  isAccount: boolean;
  isEvents: boolean;
  currentPosition: string;
  currentPositionLatitude: number;
  currentPositionLongitude: number;
  dataSource: Array<DataSourceI>;
  arrPlace: Array<PlaceI>;
}
const INITIAL_STATE: ComponentState = {
  selectedEventId: -1,
  loading: false,
  isAccount: false,
  isEvents: false,
  dataSource: [],
  currentPosition: 'unknown',
  currentPositionLatitude: 0.0,
  currentPositionLongitude: 0.0,
  arrPlace: [
    {
      id: 1,
      name: 'The Fortune Books',
      username: 'Jony p.',
      tag: 'music',
      marklatitude: 19.01751,
      marklongitude: 72.85599,
      image: AppImages.books,
      date: '10.07.2019',
    },
    {
      id: 2,
      name: 'The Cinema',
      username: 'Jony p.',
      tag: 'music',
      marklatitude: 19.0178147,
      marklongitude: 72.8562644,
      image: AppImages.movies,
      date: '10.07.2019',
    },
    {
      id: 3,
      name: 'Tha Voice',
      username: 'Jony p.',
      tag: 'music',
      marklatitude: 19.0174147,
      marklongitude: 72.8564644,
      image: AppImages.music,
      date: '10.07.2019',
    },
    {
      id: 4,
      name: 'Tha Voice',
      username: 'Jony p.',
      tag: 'music',
      marklatitude: 19.0171147,
      marklongitude: 72.8564644,
      image: AppImages.music,
      date: '12.07.2019',
    },
  ],
};

class Search extends React.Component<ComponentProps, ComponentState> {
  flatList: any;

  

  constructor(props: ComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.flatList = null;
    this.closeTapped = this.closeTapped.bind(this);
  }

  _handleEventSelect = (eventId: number) => {
    this.setState({ selectedEventId: eventId });
  };

  handlePosition = (id: number, index: number) => {
    this.flatList.scrollToIndex({
      animated: true,
      index: index,
    });
    this.setState({ selectedEventId: id });
  };
  handleInputTextChange = (newText) => {
    this.setState({
      searchUser: newText,
    })
    this.props.searchUsers(newText)

  }


  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentPositionLatitude: position.coords.latitude,
          currentPositionLongitude: position.coords.longitude,
        });
      },
      (error) => {
        
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
    this.props.getRecommendedUsers();  
  }

  closeTapped() {
    this.setState({ 
      isAccount: false,
      isEvents: false});
  }

  segmentControll = () => {
    this.setState({
      isAccount: !this.state.isAccount,
      isEvents: !this.state.isEvents,
    });
  };

  segmentControllView = () => {
    if (this.state.isAccount) {
      const { recommendedUsers, getRecommendedUsersLoading } = this.props;
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            <View style={styles.findUserView}>
              <Text style={styles.findUserTxt}>Find Users</Text>              
            </View>            
          </View>
          <TouchableOpacity
                activeOpacity={1.0}
                onPress={this.closeTapped}
                style={styles.closeIconView}>
                <Image source={AppImages.close} style={styles.closeIcon} />
          </TouchableOpacity>

        <View style={styles.mainView}>            
          <View style={styles.segMainView}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.eventMainView}
              onPress={this.segmentControll}>
              <View style={[styles.eventView, { backgroundColor: 'white' }]}>
                <Text style={styles.eventTxt}>Events</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1.0}
              style={styles.accountsMainView}>
              <View style={[styles.accountsView, { backgroundColor: '#FF2485' }]}>
                <Text style={[styles.accountsTxt, { color: 'white' }]}>
                  Accounts
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.searchMainView}>
            <View style={styles.descriptionView}>
              <TextInput
                style={styles.followTxt}
                underlineColorAndroid="transparent"
                placeholder="Search"
                placeholderTextColor="grey"
                onChangeText={this.handleInputTextChange}
              />
              <Image source={AppImages.search} style={styles.searchIcon} />
            </View>
          </View>
          <FlatList
            data={recommendedUsers.filter(e => (e.id !== this.context.currentUser.uid))}
            renderItem={(item) => this.accountListItem(item)}
            keyExtractor={(item) => item.id!}
          />
          <View style={styles.bottomTabSpace} />
        </View>
      </View>
      );
    } else if(this.state.isEvents){
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            <View style={styles.findUserView}>
              <Text style={styles.findUserTxt}>Find Events</Text>
              
            </View>
          </View>
          <TouchableOpacity
                activeOpacity={1.0}
                onPress={this.closeTapped}
                style={styles.closeIconView}>
                <Image source={AppImages.close} style={styles.closeIcon} />
              </TouchableOpacity>
          <View style={styles.mainView}>
            <View style={styles.mapViewMainView}>
              <View style={styles.mapViewChildView}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.mapView}
                  region={{
                    latitude: this.state.currentPositionLatitude,
                    longitude: this.state.currentPositionLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  // initialRegion={{
                  //   longitude: this.state.currentPositionLatitude,
                  //   latitude: this.state.currentPositionLongitude,
                  //   latitudeDelta: 0.0922, longitudeDelta: 0.0421,
                  // }}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  showsPointsOfInterest={true}
                  maxZoomLevel={1}
                  >
                  <Circle
                    key={'test'}
                    center={{
                      latitude: this.state.currentPositionLatitude,
                      longitude: this.state.currentPositionLongitude,
                    }}
                    radius={80}
                    strokeWidth={1}
                    strokeColor={'rgba(255,36,133,0.1)'}
                    fillColor={'rgba(255,36,133,0.1)'}
                  />
                  {this.state.arrPlace.map((report, index) => (
                    <Marker
                      key={report.id}
                      coordinate={{
                        latitude: report.marklatitude,
                        longitude: report.marklongitude,
                      }}
                      title={report.name}
                      onPress={() => this.handlePosition(report.id, index)}>
                      <View style={styles.markerView}>
                        <Image
                          source={
                            report.id === this.state.selectedEventId
                              ? AppImages.livemarker
                              : null
                          }
                          style={styles.liveMakerImageView}
                        />
                        <Image
                          source={report.image}
                          style={styles.markerImageView}
                        />
                      </View>
                    </Marker>
                  ))}
                </MapView>
                <View style={styles.markerFlatListMainView}>
                  <FlatList
                    horizontal
                    data={this.state.arrPlace}
                    ref={(ref) => (this.flatList = ref)}
                    //keyExtractor={(item) => item.id}
                    renderItem={({ item }: any) => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this._handleEventSelect(item.id)}
                        style={[
                          styles.markerListItemMainView,
                          item.id === this.state.selectedEventId
                            ? styles.showshadow
                            : styles.hideShadow,
                        ]}>
                        <View style={styles.listItemImageMainView}>
                          <Image
                            style={styles.listItemImageView}
                            source={AppImages.fifaresume}
                          />
                        </View>
                        <View style={styles.listItemInformationMainView}>
                          <View style={styles.listItemTypeMainView}>
                            <Text style={styles.listItemTypeTextView}>
                              {item.tag}
                            </Text>
                          </View>
                          <View style={styles.eventNameMainView}>
                            <Text
                              numberOfLines={1}
                              adjustsFontSizeToFit
                              style={styles.eventNameTextView}>
                              {item.name}
                            </Text>
                            <Text
                              numberOfLines={1}
                              adjustsFontSizeToFit
                              style={styles.nameTextView}>
                              {item.userName}
                            </Text>
                          </View>
                          <View style={styles.dateMainView}>
                            <Text style={styles.dateTextView}>{item.date}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
              <View style={{ width: '100%', height: 49 }}></View>
              <SafeAreaView />
            </View>
            <View style={styles.segMainView}>            
              <TouchableOpacity activeOpacity={0.9} style={styles.eventMainView}>
                <View style={[styles.eventView, { backgroundColor: '#FF2485' }]}>
                  <Text style={[styles.eventTxt, { color: 'white' }]}>Events</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1.0}
                style={styles.accountsMainView}
                onPress={this.segmentControll}>
                <View style={[styles.accountsView, { backgroundColor: 'white' }]}>
                  <Text style={styles.accountsTxt}>Accounts</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.searchMainView}>
              <View style={styles.descriptionView}>
                <TextInput
                  style={styles.followTxt}
                  underlineColorAndroid="transparent"
                  placeholder="Search"
                  placeholderTextColor="grey"
                />
                <Image source={AppImages.search} style={styles.searchIcon} />
              </View>
            </View>
          </View>
       </View>
      );
    }else{
       return (
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            <View style={styles.findUserView}>
              <Text style={styles.findUserTxt}>Find</Text>
            </View>
          </View>
          <View style={styles.mainView}>
            <View style={styles.searchMainView}>
              <View style={styles.descriptionView}>
                  <TextInput
                    style={styles.followTxt}
                    underlineColorAndroid="transparent"
                    placeholder="Search"
                    placeholderTextColor="grey"
                    onChangeText={this.handleInputTextChange}
                    onTouchStart={()=>  this.setState({ isEvents: true })}
                  />
                <Image source={AppImages.search} style={styles.searchIcon} />
              </View>
               <SafeAreaView style={styles.imageMainContainer}>
                  <FlatList
                  data={this.state.arrPlace}
                  renderItem={({ item }) => (
                    <View style={styles.listItemImageMainView}>
                      <Image
                            style={styles.listItemImageView}
                            source={AppImages.fifaresume}
                      />
                    </View>
                  )}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.bottomPadding} />
                </SafeAreaView>          
            </View>           
            <View style={styles.bottomTabSpace} />
          </View>
        </View> 
      );
    }
  };

  accountListItem = (data: any) => (
    <TouchableWithoutFeedback onPress={() => {
      this.props.viewUser(data.item.id)
      data.item.id == this.props.userToView && this.props.navigation.navigate('UserProfile', { flowType: 'userToView' })
    }}>
      <View style={styles.list} >
        <View style={styles.listView}>
          <View style={styles.listProfileView}>
            <Image
              resizeMode={'cover'}
              source={data.item.displayPhoto}
              style={styles.listProfileImage}
            />
          </View>
          <View style={styles.listTextView}>
            <Text style={styles.userName}>{data.item.name}</Text>
            <Text style={styles.petName}>@{data.item.username}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar backgroundColor="black" />
        <ImageBackground
          source={AppImages.homeNavigation}
          style={styles.homeNavigationImg}
        />
        <View style={{ flex: 1 }}>{this.segmentControllView()}</View>
      </SafeAreaView>
    );
  }
}

Search.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getRecommendedUsers: () => dispatch(userOperations.getRecommendedUsers()),
    searchUsers: (key: Key) => dispatch(userOperations.searchUsers(key)),
    viewUser: (key: Key) => dispatch(userOperations.viewUser(key)),
    getMessageFriends: (currentUser) => dispatch(userOperations.getMessageFriends(currentUser)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    recommendedUsers: state.user.recommendedUsers,
    getRecommendedUsersError: state.user.getRecommendedUsersError,
    getRecommendedUsersLoading: state.user.getRecommendedUsersLoading,
    userToView: state.user.userToView,
    friendsList: state.user.friendsList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
