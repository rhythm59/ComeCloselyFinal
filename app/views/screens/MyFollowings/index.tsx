import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { userOperations } from '../../../state/ducks/user';
import {AppImages} from '../../config';
import { UserI } from '../../../state/types';
import styles from './styles';
import { AuthContext } from '../../../providers/auth';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface DataSourceI {
   createdAt: string,
   displayPhoto: string,
   email: string,
   fuid: string,
   isPrivate: string,
   name: string,
   phone: string,
   updatedAt: string,
   username: string,
}
interface ComponentProps {
  navigation: any;  
  route: any;
  myArray: Array<DataSourceI>;
  getFollowing(id: string): Array<UserI>;
  getUser(id: string): void;
  following: any,
  follower: any,
  user: UserI;
  userToView: any;
  setViewUser(userKey: string): void;
}
interface ComponentState {
  loading: boolean;  
  ignoreResetUser: boolean;
}
const INITIAL_STATE: ComponentState = {
  loading: false,
  ignoreResetUser: false,
};
// const itemLogs = {};
// var arr = [];
class MyFollowings extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      //newArray: [],
    };
    this.closeTapped = this.closeTapped.bind(this);
  }

  closeTapped() {
    this.props.navigation.goBack();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    let flowType = this.props.route?.params?.flowType;
    let prevFlowType = prevProps.route?.params?.flowType;
    if (flowType !== prevFlowType) {
      if (flowType === 'userToView')
        this.props.getUser(this.props.userToView);
      else
        this.props.getUser(this.context.currentUser.uid);
    }
  }

  componentDidMount() {
    if (this.props.userToView){
      this.props.getUser(this.props.userToView);
      if(this.props.following.length > 0){ 
        const dataSource = this.props.following;
        
      }
    }else{
      this.props.getUser(this.context.currentUser.uid);
      // if(this.props.following.length > 0){        

      //    try {
      //       firestore()
      //         .collection('following_followers')
      //         .where('userKey', "==", this.context.currentUser.uid)
      //         .onSnapshot((querySnapshot) => {
      //           querySnapshot.forEach((documentSnapshot) => {
      //             const ticketData = documentSnapshot.data()
      //             firestore()
      //               .collection('users')
      //               .doc(ticketData.followUserKey)
      //               .get()
      //               .then((documentSnapshot) => {
      //                 if (documentSnapshot.exists) {
      //                   let userdata = { ...documentSnapshot.data(), fuid: documentSnapshot.id }
      //                   arr.push(userdata);                        
      //                 }
      //                 this.setState({ newArray: arr});
      //               });
                
      //         });
              
      //       })
      //     } catch (error) {

      //     }

      // }
    }
   // console.log(this.state.newArray);
  }

  followReqListItem = (data: any) => (

    <View style={styles.list}>
      <TouchableOpacity onPress={() => {}}>
      <View style={styles.followReqItemView}>
        <View style={styles.followReqItemProfileView}>
          <Image
            source={AppImages.demoimage}
            style={styles.followReqItemProfileImg}
          />
        </View>
        <View style={styles.followReqItemTextView}>
          <Text style={styles.userName}>{data.item.id}</Text>
          <Text style={styles.petName}>{data.item.followUserKey}</Text>
        </View>
        <View style={styles.followReqItemAcptORDeleteView}>
          <TouchableOpacity style={styles.deleteMainView}>
            <Text style={styles.deleteMainViewText}>Following</Text>
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
              <Text style={styles.createFollowText}>Followings</Text>
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
                placeholder="Search on followings"
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
              <Text>No Followings.</Text>
              {//!this.state.dataSource && (
               
              //)
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

MyFollowings.contextType = AuthContext;
const mapDispatchToProps = (dispatch: Function) => {
  return {
    getUser: (id: string) => dispatch(userOperations.getUser(id)),
    viewUser: (key: Key) => dispatch(userOperations.viewUser(key)),
    getFollowing: (key: string) => dispatch(userOperations.getFollowing(key)),
    setViewUser: (key: string) => dispatch(userOperations.viewUser(key))
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

export default connect(mapStateToProps, mapDispatchToProps)(MyFollowings);