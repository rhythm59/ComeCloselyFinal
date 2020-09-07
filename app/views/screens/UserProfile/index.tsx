import React, { Fragment } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from 'react-native';

import { connect, useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as Progress from 'react-native-progress';
import Menu from '../../components/Menu';
import SideMenu from 'react-native-side-menu';
import { AppImages } from '../../config';
import styles from './styles';
import { AuthContext } from '../../../providers/auth';
import { UserI } from '../../../state/types';
import { userOperations } from '../../../state/ducks/user';
import UserView from '../Messenger/components/UserView';
import { getGravatarSrc } from '../../../utils';
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';

interface DataSourceI {
  name: string;
}
interface ComponentProps {
  navigation: any;
  route: any;
  memories: any;
  seenUser: UserI;
  userToView: any;
  getUserError: string;
  getUserLoading: boolean;
  followUser: any,
  following: any,
  follower: any,
  getUser(id: string): void;
  getFollowing(id: string): void;
  getFollower(id: string): void;
  getMessages(id: string, messages: any): void;
  unfollowUser(userKey: string, followUserKey: any): void;
  setViewUser(userKey: string): void;
}
interface ComponentState {
  dataSource: Array<DataSourceI>;
  ignoreResetUser: boolean;
  isOpen: boolean;
  isModalVisible: boolean;
  avatarSource: string;
  selectedItem: string | undefined;
  avatarBackgroundColor: string;
}
const INITIAL_STATE: ComponentState = {
  isOpen: false,
  isModalVisible: false,
  dataSource: [],
  avatarSource: '',
  ignoreResetUser: false,
  selectedItem: 'UserProfile',
  avatarBackgroundColor: 'rgba(0,0,0,0)',
};
const options: ImagePickerOptions = {
    title: 'Choose Photo',
    takePhotoButtonTitle: 'Camera',
    chooseFromLibraryButtonTitle: 'Gallery',
    mediaType: 'photo',
    quality: 0.5,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class UserProfile extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.menuTapped = this.menuTapped.bind(this);
  }
  menuTapped() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  

  updateMenuState(isOpen: boolean) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = (item: any) => {
    this.props.navigation.navigate(item);
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    let flowType = this.props.route?.params?.flowType;
    let prevFlowType = prevProps.route?.params?.flowType;
    if (flowType !== prevFlowType) {
      if (flowType === 'userToView')
        this.props.getUser(this.props.userToView);
      else
        this.props.getUser(this.props.userToView);
    }
  }
  
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      if (!this.state.ignoreResetUser) {
        this.props.getUser(this.props.userToView)
        this.props.setViewUser(this.props.userToView)
      }
      this._unsubscribe();
    });
    const dataSource = this.props.memories.filter((item: any) => item.userId == this.props.userToView)
    this.setState({ dataSource })

    var that = this;
    
    if (this.props.userToView)
      this.props.getUser(this.props.userToView);
    else
      this.props.getUser(this.context.currentUser.uid);
      this.props.getFollowing(this.props.userToView);
      this.props.getFollower(this.props.userToView);      
      this.props.getMessages(this.context.currentUser.uid, this.props.userToView);
    
  }

  onChange() {
    this.props.getFollower(this.props.userToView)
    this.props.getMessages(this.context.currentUser.uid, this.props.userToView)
  }

  onFollowButtonPress = () => {
    const { follower } = this.props;
    if (follower.find((item: any) => item.userKey == this.context.currentUser.uid)) {      
      this.props.unfollowUser(this.context.currentUser.uid, this.props.userToView)
    }
    else {
      this.props.followUser(this.context.currentUser.uid, this.props.userToView)
    }
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const { getUserLoading, seenUser, follower } = this.props;
    return (
      <View style={styles.mainView}>
        <ScrollView>
              <View style={styles.backImage}>
                <Image
                  style={styles.backgroundImage}
                  source={AppImages.homeNavigation}
                />                
              </View>
              
              <View style={styles.overlay}>
                <View style={styles.viewHeader}>
                  <View style={styles.messageView}>
                    <Text style={styles.messageText}>Profile</Text>
                  </View>
                  <View style={styles.viewMenu}>
                    <TouchableOpacity
                      onPress={() => {
                          this.setState({ ignoreResetUser: true })
                          this.props.getUser(this.context.currentUser.uid)
                          this.props.setViewUser(this.context.currentUser.uid)
                          this.props.navigation.navigate('Search')
                        }}                      
                      style={styles.closeButtonView}>
                      <Image source={AppImages.close} style={styles.closeImg}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.profileTextView}>
                  
                </View>
              </View>
              <View style={styles.profileImageView}>                
                  <View>
                    {getUserLoading && (
                      <SkeletonPlaceholder>
                        <View style={styles.profileImage} />
                      </SkeletonPlaceholder>
                    )}
                    {!getUserLoading && (
                      <Image
                        style={styles.profileImage}
                        source={{ uri: seenUser?.displayPhoto || getGravatarSrc(seenUser.email) }}
                      />
                    )}    
                  </View>
              </View> 
              {getUserLoading && (
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    width="100%"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center">
                    <SkeletonPlaceholder.Item marginLeft={20}>
                      <SkeletonPlaceholder.Item
                        width={200}
                        height={20}
                        marginTop={10}
                        borderRadius={5}
                      />
                      <SkeletonPlaceholder.Item
                        width={200}
                        height={20}
                        marginTop={10}
                        borderRadius={5}
                      />
                      <SkeletonPlaceholder.Item
                        width={200}
                        height={20}
                        marginTop={10}
                        borderRadius={5}
                      />
                      <SkeletonPlaceholder.Item
                        width={200}
                        height={20}
                        marginTop={10}
                        borderRadius={5}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              )}
              
              {!getUserLoading && (
                <Fragment>
                  <View style={styles.userMainView}>
                    <Text style={styles.nameText}>{seenUser.name}</Text>
                    <Image source={AppImages.verify} style={styles.verified} />
                    
                  </View>
                  <View style={styles.followersFollowingView}>                   
                      <View style={styles.followingView}>
                        <View>
                          <Text style={styles.followingText}>Following</Text>
                        </View>
                        <View style={styles.followingTextView}>
                          <Text style={styles.followingCountText}>{this.props.following.length}</Text>
                        </View>
                      </View>
                    
                      <View style={styles.followersView}>
                        <View>
                          <Text style={styles.followersText}>Followers</Text>
                        </View>
                        <View style={styles.followersTextView}>
                          <Text style={styles.followersCountText}>{this.props.follower.length}</Text>
                        </View>
                      </View>
                    
                  </View>

                  <View style={styles.levelTextMainView}>
                    <Text style={styles.levelText}>Level</Text>
                    <Text style={styles.levelTextAns}>Master</Text>
                  </View>
                  <View style={styles.progressbarMainView}>
                    <Progress.Bar
                      progress={0.3}
                      width={300}
                      height={3}
                      color={'#CF326F'}
                    />
                  </View>

                  {seenUser.email !== this.context.currentUser.email && (
                    <Fragment>
                      <View style={styles.locationFollowingView}>

                        <TouchableOpacity onPress={() => {
                          this.setState({ ignoreResetUser: true })
                          this.props.getUser(this.props.userToView)
                          this.props.setViewUser(this.props.userToView)
                          this.props.navigation.navigate('Messages')
                        }}>
                          <View style={styles.locationImage}>
                            <Image style={styles.messageButton} resizeMode="contain" source={AppImages.sendmessagebutton} />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onFollowButtonPress}>
                          {follower.find((item: any) => item.userKey === this.context.currentUser.uid) ?
                            <Image style={styles.followButton} source={AppImages.followingbutton} /> :
                            <Image style={styles.followButton} source={AppImages.followbutton} />
                          }
                        </TouchableOpacity>

                      </View>

                      <View style={styles.dotView}>
                        <View>
                          <Image source={AppImages.dotview} />
                        </View>
                      </View>
                      
                      <View style={{}}>

                      </View>
                    </Fragment>
                  )}

                  <View style={styles.profileBioTextMian}>
                    <Text style={styles.profileBioText}>
                      Here is my biogaraphy. Let's party hard and create memories
                      through
                    </Text>
                  </View>

                  <View style={styles.memoriesView}>
                    <Text style={styles.memoriesText}>Memories</Text>
                    <Text style={styles.memoriesTextCount}>{this.state.dataSource.length}</Text>
                  </View>
                </Fragment>
              )}
              <SafeAreaView style={styles.imageMainContainer}>
                <FlatList
                  data={this.state.dataSource}
                  renderItem={({ item }) => (
                    <View style={styles.imageThumbnailView}>
                      <Image
                        style={styles.imageThumbnail}
                        source={{ uri: item.image }}
                      />
                    </View>
                  )}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.bottomPadding} />
              </SafeAreaView>
            </ScrollView>
          </View>
    );
  }
}
UserProfile.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getUser: (id: string) => dispatch(userOperations.getUser(id)),
    getFollowing: (key: string) => dispatch(userOperations.getFollowing(key)),
    getFollower: (key: string) => dispatch(userOperations.getFollower(key)),
    followUser: (userKey: string, followUserKey: string) => dispatch(userOperations.followUser(userKey, followUserKey)),
    unfollowUser: (userKey: string, followUserKey: string) => dispatch(userOperations.unfollowUser(userKey, followUserKey)),
    getMessages: (userKey: string, otherUserKey: string) => dispatch(userOperations.getMessages(userKey, otherUserKey)),
    setViewUser: (key: string) => dispatch(userOperations.viewUser(key))
  };
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    memories: state.memories.memories,
    seenUser: state.user.user,
    getUserError: state.user.getUserError,
    getUserLoading: state.user.getUserLoading,
    follower: state.user.follower,
    following: state.user.following,
    userToView: state.user.userToView,

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
