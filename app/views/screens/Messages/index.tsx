import React, { useState, useEffect, Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';

import AutoScrollFlatList from 'react-native-autoscroll-flatlist';

import { AppImages } from '../../config';
import styles from './styles';
import { userOperations } from '../../../state/ducks/user';
import { AuthContext } from '../../../providers/auth';
import { UserServices, ChatroomServices } from '../../../services/';
import { formatAMPM } from '../../../utils';

class Messages extends Component {
  state = {
    input: '',
  }
  onNewChatroomCreated = (chatroomId) => {
    this.setState({ chatroomId })
    this.props.getMessages(chatroomId)
  }


  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      if (!this.state.ignoreResetUser) {
        this.props.getUser(this.context.currentUser.uid)
        this.props.setViewUser(null)
      }
      this._unsubscribe();
      // do something
    });
    const userKey = this.context.currentUser.uid;
    const otherUserKey = this.props.userToView;
    this.props.getUser(otherUserKey)
    let chatroomData = await ChatroomServices.getChatroomByUsers(userKey, otherUserKey)
    // const chatroomId = this.props.route?.params?.chatroomId || generateNewChatRoomKey(userKey, otherUserKey);
    if (chatroomData) {
      this.setState({ chatroomId: chatroomData.id })
      this.props.getMessages(chatroomData.id)
    }
  }

  renderItem = ({ item }) => {
    const otherUser = this.props.user;
    const currentUser = this.context.currentUser.uid;
    const time = formatAMPM(new Date(item.createdAt))
    if (item.sender == currentUser) {
      return (
        <View style={styles.senderContentView}>
          <View style={styles.senderContentDate}></View>
          <View style={{ paddingLeft: 8, flex: 7 }}>
            <View
              style={[styles.senderContentMessage, { backgroundColor: '#CF326F' }]}>
              <Text style={styles.senderCretedTimeText} numberOfLines={1}>
                {time}
              </Text>
              <Text style={styles.massageText}>{item.message}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.receiverContentView}>
        <Image source={otherUser.displayPhoto ? { uri: otherUser.displayPhoto } : AppImages.loginImage} style={styles.avatar} />
        <View style={{ paddingHorizontal: 8, flex: 7 }}>
          {/* <Text >{item.user.name}</Text> */}
          <View
            style={[
              styles.receiverContentMessageView,
              { backgroundColor: '#7D00E7' },
            ]}>
            <Text style={styles.receiverCretedTimeText} numberOfLines={1}>
              {time}
            </Text>
            <Text style={styles.massageText}>{item.message}</Text>
          </View>
        </View>
        {/* <View style={styles.receiverContentDate}></View> */}
      </View>
    );



  };
  sendMessage = () => {
    const otherUser = this.props.userToView;
    const currentUser = this.context.currentUser.uid;
    const { chatroomId, input } = this.state;
    this.setState({ input: '' })
    this.props.sendMessage(chatroomId, currentUser, otherUser, input, this.onNewChatroomCreated)
  };

  render() {
    const otherUser = this.props.user;
    return (
      <SafeAreaView style={styles.mainView} >
        <ImageBackground
          source={AppImages.homeNavigation}
          style={styles.homeNavigationImg}></ImageBackground>
        <KeyboardAvoidingView
          enabled={Platform.OS === 'ios' ? true : false}
          behavior="padding"
          style={styles.keyboardAvoiding}>
          <View style={styles.headerView}>
            <View style={styles.headerSubView}>
              <Text style={styles.titleHeaderText}> {otherUser.name}</Text>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Messenger')
                  }}
                  style={styles.closeButtonView}>
                  <Image source={AppImages.close} style={styles.closeImg}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.chatMainView}>
            <AutoScrollFlatList
              data={this.props.userMessages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={this.renderItem}
            />
            <View style={styles.inputContent}>
              <View style={styles.textInputMainView}>
                <KeyboardAvoidingView
                  behavior="padding"
                  style={styles.keyboardAvoiding}>
                  <TextInput
                    onChangeText={(input) => this.setState({ input })}
                    // onSubmitEditing={() => sendMessage()}
                    placeholder={'type_message'}
                    value={this.state.input}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    style={styles.textInputSendMassage}
                  />
                </KeyboardAvoidingView>
              </View>
              <TouchableOpacity style={styles.sendIcon} onPress={this.sendMessage}>
                <Image
                  style={styles.sendImg}
                  source={AppImages.sendButton}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
Messages.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getUser: (id: string) => dispatch(userOperations.getUser(id)),
    sendMessage: (chatroomId: string, userKey: string, otherUserKey: string, message: string, onNewChatroomCreated: any) => dispatch(userOperations.sendMessage(chatroomId, userKey, otherUserKey, message, onNewChatroomCreated)),
    getMessages: (chatroomId: string) => dispatch(userOperations.getMessages(chatroomId)),
    setViewUser: (key: string) => dispatch(userOperations.viewUser(key))
  };
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
    userToView: state.user.userToView,
    userMessages: state.user.userMessages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
