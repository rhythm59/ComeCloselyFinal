import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { userOperations } from '../../../state/ducks/user';
import {AppImages} from '../../config';
import { UserI } from '../../../state/types';
import styles from './styles';
import { AuthContext } from '../../../providers/auth';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface DataSourceI {
  id: number;
  name: string;
}
interface ComponentProps {
  navigation: any;  
  route: any;
  getFollower(id: string): void;
  getUser(id: string): void;
  following: any,
  follower: any,
  user: UserI;
  userToView: any;
}
interface ComponentState {
  loading: boolean;
  dataSource: Array<DataSourceI>;
}
const INITIAL_STATE: ComponentState = {
  loading: false,
  dataSource: [],
};

class MyFollowers extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.closeTapped = this.closeTapped.bind(this);
  }

  closeTapped() {
    this.props.navigation.goBack();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    // let flowType = this.props.route?.params?.flowType;
    // let prevFlowType = prevProps.route?.params?.flowType;
    // if (flowType !== prevFlowType) {
    //   if (flowType === 'userToView')
    //     this.props.getUser(this.props.userToView);
    //   else
    //     this.props.getUser(this.context.currentUser.uid);
    // }
  }

  componentDidMount() {
    // if (this.props.userToView){
    //   this.props.getUser(this.props.userToView);
    //   if(this.props.follower.length > 0){
    //     const dataSource = this.props.follower.filter((item: any) => item.userId == this.props.userToView)
    //     this.setState({ dataSource })
    //   }
    // }else{
    //   this.props.getUser(this.context.currentUser.uid);
    //   if(this.props.follower.length > 0){
    //     const dataSource = this.props.follower.filter((item: any) => item.userId == this.context.currentUser.uid)
    //     this.setState({ dataSource })
    //   }
    // }
  }

  followReqListItem = (data: any) => (
    <View style={styles.list}>
    <TouchableOpacity>
      <View style={styles.followReqItemView}>
        <View style={styles.followReqItemProfileView}>
          <Image
            source={AppImages.demoimage}
            style={styles.followReqItemProfileImg}
          />
        </View>
        <View style={styles.followReqItemTextView}>
          <Text style={styles.userName}>{data.item.name}</Text>
          <Text style={styles.petName}>{data.item.name}</Text>
        </View>
        <View style={styles.followReqItemAcptORDeleteView}>        
          <TouchableOpacity style={styles.acceptMainView}>
            <Text style={styles.acceptText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backGroundImage}
          source={AppImages.homeNavigation}
        />
        <ScrollView style={styles.followMainView}>
          <View
            style={{
              marginTop: getStatusBarHeight(),
              justifyContent: 'center',
              width: '100%',
              aspectRatio: 4.5,
              alignItems: 'center',
            }}>
            <View style={styles.followTitleContainer}>
              <Text style={styles.createFollowText}>Followers</Text>
              <TouchableOpacity
                onPress={this.closeTapped}
                style={styles.closeIconView}>
                <Image source={AppImages.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomView}>
            <View style={styles.descriptionView}>
              <TextInput
                style={styles.followTxt}
                underlineColorAndroid="transparent"
                placeholder="Search on followers"
                placeholderTextColor="grey"
              />
              <Image source={AppImages.search} style={styles.searchIcon} />
            </View>
            <View style={styles.listContainer}>
              {//this.state.dataSource && (
              //   <FlatList
              //   data={this.state.dataSource}
              //   renderItem={(item) => this.followReqListItem(item)}
              //   keyExtractor={(item) => item.id.toString()}
              //   />
              // )
              }
              {!this.state.dataSource && (
                <View>No Followers.</View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
MyFollowers.contextType = AuthContext;
const mapDispatchToProps = (dispatch: Function) => {
  return {
    getUser: (id: string) => dispatch(userOperations.getUser(id)),
    viewUser: (key: Key) => dispatch(userOperations.viewUser(key)),
    getFollower: (key: string) => dispatch(userOperations.getFollower(key)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    userToView: state.user.userToView,
    memories: state.memories.memories,
    user: state.user.user,
    follower: state.user.follower,
    following: state.user.following,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFollowers);