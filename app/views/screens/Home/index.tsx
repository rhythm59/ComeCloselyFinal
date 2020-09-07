import React from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';

import Menu from '../../components/Menu';
import { scrollInterpolator, animatedStyles } from './animations';
import { AppImages } from '../../config';
import styles from './styles';
import { timeSince } from '../../../utils';
import { eventOperations } from '../../../state/ducks/event';
import { memoriesOperations } from '../../../state/ducks/memories';
import { MemoryServices } from '../../../services';
import { AuthContext } from '../../../providers/auth';
import { userOperations } from '../../../state/ducks/user';


const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.9);

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

interface ComponentProps {
  navigation: any;
  getMemories: typeof Function;
  getEvents: typeof Function;
  getUser: typeof Function;
  events: any;
  memories: any;
}
class Home extends React.Component<ComponentProps> {
  menuTapped() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen: boolean) {
    this.setState({ isOpen });
  }

  memoriesCommentTapped(memoryId: any) {
    this.props.navigation.navigate('Comments', { memoryId });
  }

  onMenuItemSelected = (item: any) => {
    this.props.navigation.navigate(item);
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  onEventTapped = (item: any) => {
    this.props.navigation.navigate('EventInfo', { eventData: item })
  }

  state = {
    isOpen: false,
    selectedItem: 'About',
    index: 0,
    memories: [
      {
        id: 0,
        name: 'Ben',
        time: '2 min ago',
        likes: '12',
        comments: '4',
        image: AppImages.memories1,
      },
      {
        id: 1,
        name: 'Susan',
        time: '12 min ago',
        likes: '20',
        comments: '8',
        image: AppImages.memories2,
      },
    ],
    // upcomingEvets: [
    //   {
    //     id: 0,
    //     type: 'Party',
    //     title: 'All Summer Castle Launch Party',
    //     time: '12 Aug | 12:00 AM',
    //     image: AppImages.upcomingEvent1,
    //   },
    //   {
    //     id: 1,
    //     type: 'food',
    //     title: 'Summer Food Festival',
    //     time: '12 Aug | 12:00 AM',
    //     image: AppImages.upcomingEvent2,
    //   },
    // ],
    eventsBannerList: [
      {
        id: 0,
        type: 'Party',
        title: 'All Summer Castle Launch Party',
        time: '12 Aug | 12:00 AM',
        image: AppImages.event1,
      },
      {
        id: 1,
        type: 'Travel',
        title: 'Summer Food Festival',
        time: '12 Aug | 12:00 AM',
        image: AppImages.event2,
      },
      {
        id: 2,
        type: 'food',
        title: 'Summer Food Festival',
        time: '12 Aug | 12:00 AM',
        image: AppImages.event3,
      },
    ],
  };

  alertItemName = (item: any) => {
    
  };

  constructor(props: ComponentProps) {
    super(props);
    this.bannerItem = this.bannerItem.bind(this);
    this.menuTapped = this.menuTapped.bind(this);
    this.memoriesCommentTapped = this.memoriesCommentTapped.bind(this);
  }
  componentDidMount() {
    this.props.getEvents();
    this.props.getMemories();
    this.props.getUser(this.context.currentUser.uid);
  }

  bannerItem({ item }: any) {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.0)"
        onPress={() => {
          this.onEventTapped(item)
          // this.props.navigation.navigate('EventInfo');
        }}>
        <View style={styles.itemContainer}>
          <ImageBackground style={styles.pagerbackImage} source={{ uri: item.coverPhoto }}>
            <View style={styles.pagerEventTypeMainView}>
              <View style={styles.pagerEventTypeView}>
                <Text>{item.type}</Text>
              </View>
            </View>
            <View style={styles.pagerBottomSubView}>
              <View style={styles.pagerTimeView}>
                <Text style={styles.pagerTimeText}>{item.time}</Text>
              </View>
              <View style={styles.pagerEventTitle}>
                <Text
                  style={styles.pagerEventTitleTxt}
                  adjustsFontSizeToFit
                  numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
    );
  }

  render() { 
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
        menuPosition="right">
        <View style={styles.container}>
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
                  {/* <view></view> */}
                  <View style={styles.explore}>
                    <Text style={styles.exploretext}>Explore</Text>
                  </View>
                  <View style={styles.viewMenu}>
                    <TouchableHighlight
                      underlayColor="rgba(0,0,0,0.0)"
                      style={styles.menu}
                      onPress={this.menuTapped}>
                      <Image source={AppImages.menu} style={styles.menuImg} />
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.viewEventForYou}>
                  {/* <view></view> */}
                  <View style={styles.explore}>
                    <Text style={styles.eventForYouText}>Events for you</Text>
                  </View>
                </View>
                <Carousel
                  /* ref={(c) => (this.carousel = c)} */
                  data={this.props.events.filter(e => e.userId !== this.context.currentUser.uid)}
                  // data={this.state.eventsBannerList}
                  renderItem={this.bannerItem}
                  sliderWidth={SCREEN_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  containerCustomStyle={styles.carouselContainer}
                  inactiveSlideShift={0}
                  inactiveSlideOpacity={1}
                  onSnapToItem={(index: number) => this.setState({ index })}
                  scrollInterpolator={scrollInterpolator}
                  slideInterpolatedStyle={animatedStyles}
                  useScrollView={true}
                />
                <View style={styles.headerMemories}>
                  {/* <view></view> */}
                  <View style={styles.explore}>
                    <Text style={styles.memoriesText}>Memories</Text>
                  </View>
                </View>

                <FlatList
                  // data={this.props.memories}
                  data={this.props.memories.sort((a: any, b: any) => b.createdAt > a.createdAt)}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (  
                    <View
                      key={item.id}
                      style={styles.viewMemories}
                      onPress={() => this.alertItemName(item)} 
                    >
                      <View style={styles.memoriesMainView}>
                        <ImageBackground
                          style={{ flex: 1 }}
                          source={{ uri: item.image }}
                        />
                      </View>
                      <View style={styles.memoriesBottomMainView}>
                        <View style={styles.memoriesBottomFirstView}>
                          <View style={styles.memoriesBottomProfileView}>
                            <ImageBackground
                              style={{ flex: 1 }}
                              source={item.userAvatar ? { uri: item.userAvatar } : item.loginImage}
                            />
                          </View>
                          <View style={styles.memoriesBottomSecondView}>
                            <View style={styles.memorisBottomCommentView}>
                              <Text
                                style={styles.commentsCountTxt}
                                adjustsFontSizeToFit
                                numberOfLines={1}>
                                {item.comments}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.memoriesCommentTapped(item.id)}
                                style={{
                                  marginTop: 8,
                                  aspectRatio: 1,
                                  height: '55%',
                                }}>
                                <ImageBackground
                                  style={styles.commentsImage}
                                  source={AppImages.comment}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.memorisBottomLikesView}>
                              <Text
                                style={styles.memoriesLikesCountTxt}
                                adjustsFontSizeToFit
                                numberOfLines={1}>
                                {item.likedByUsers ? item.likedByUsers.split(',')?.length : '0'}
                              </Text>
                              <TouchableOpacity
                                onPress={() => MemoryServices.likeDislikeMemory(item)}
                                style={styles.memoriesHeartView}>
                                <ImageBackground
                                  style={styles.memoriesHeartImg}
                                  source={(item.likedByUsers && auth().currentUser &&
                                    item.likedByUsers.indexOf(auth().currentUser?.uid) != -1) ?
                                    AppImages.filledHeart :
                                    AppImages.outlineHeart}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.memoriesNameNTimeView}>
                              <View style={styles.memoriesProfileNameView}>
                                <Text
                                  style={styles.memoriesProfileNameTxt}
                                  adjustsFontSizeToFit
                                  numberOfLines={1}>
                                  {item.userName} 
                                </Text>
                              </View>
                              <Text
                                style={styles.memoriesTimeText}
                                adjustsFontSizeToFit
                                numberOfLines={1}>
                                {timeSince(item.createdAt)} 
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />

                <View style={styles.headerUpcomingEvent}>
                  {/* <view></view> */}
                  <View style={styles.explore}>
                    <Text style={styles.memoriesText}>Upcoming Events</Text>
                  </View>
                </View>
                <View style={styles.mainViewUpcomingEvent}>
                  <FlatList
                    horizontal
                    data={this.props.events}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.viewUpcomingEvent}
                        onPress={() => this.onEventTapped(item)}
                      >
                        <ImageBackground
                          style={styles.upcomingEvetsBackImg}
                          source={{ uri: item.coverPhoto }}>
                          <View style={styles.UpcomingEventTypeMainView}>
                            <Text style={styles.UpcomingEventTypeView}>
                              {item.type}
                            </Text>
                          </View>
                          <View style={styles.upcomingEvetsTimeNTitleView}>
                            <Text
                              style={styles.upcomingEvetsTitleText}
                              adjustsFontSizeToFit
                              numberOfLines={2}>
                              {item.title}
                            </Text>
                            <Text style={styles.upcomingEvetsTimeTxt}>
                              {item.time}
                            </Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View style={styles.bottomTabSpace} />
              </SafeAreaView>
            </ScrollView>
          </View>
        </View>
      </SideMenu>
    );
  }
}
Home.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getEvents: () => dispatch(eventOperations.getEvents()),
    getMemories: () => dispatch(memoriesOperations.getMemories()),
    getUser: (id: string) => dispatch(userOperations.getUser(id)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    events: state.event.events,
    memories: state.memories.memories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
