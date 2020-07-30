import React from 'react';
import { Image, ImageBackground, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

import { AppImages } from '../views/config';
import styles from './styles';

import Tutorial from '../views/screens/Tutorial';
import SignIn from '../views/screens/SignIn';
import Signup from '../views/screens/SignUp';
import ForgotPassword from '../views/screens/ForgotPassword';
import UploadProfile from '../views/screens/UploadProfile';

import Home from '../views/screens/Home';
import Search from '../views/screens/Search';
import CreateEvent from '../views/screens/CreateEvent';
import Messenger from '../views/screens/Messenger';
import Profile from '../views/screens/Profile';

import EventInfo from '../views/screens/EventInfo';
import Messages from '../views/screens/Messages';
import EnterNewPassword from '../views/screens/EnterNewPassword';
import MyEvents from '../views/screens/MyEvents';
import FollowRequests from '../views/screens/FollowRequests';
import Notifications from '../views/screens/Notifications';
import FindUser from '../views/screens/FindUser';
import AppSettings from '../views/screens/AppSettings';
import Language from '../views/screens/Language';
import SwitchToEvent from '../views/screens/SwitchToEvent';
import AccountVisibility from '../views/screens/AccountVisibility';
import BlockedAccounts from '../views/screens/BlockedAccounts';
import SavedStories from '../views/screens/SavedStories';
import EventInbox from '../views/screens/EventInbox';
import Comments from '../views/screens/Comments';
import AllowComments from '../views/screens/AllowComments';
import SignInActivity from '../views/screens/SignInActivity';
import ChangePassword from '../views/screens/ChangePassword';
import StorySettings from '../views/screens/StorySettings';
import TwoFactorAuthentication from '../views/screens/TwoFactorAuthentication';
import TicketBuy from '../views/screens/TicketBuy';
import PaymentStatus from '../views/screens/PaymentStatus';
import MyTickets from '../views/screens/MyTickets';
import PostMemory from '../views/screens/PostMemory';
import PostStory from '../views/screens/PostStory';
import { AuthContext } from '../providers/auth';
import { getGravatarSrc } from '../utils';
import { useDispatch } from 'react-redux';
import { userOperations } from '../state/ducks/user';
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export function AuthNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="Tutorial">
        <AuthStack.Screen name="Tutorial" component={Tutorial} />
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={Signup} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <AuthStack.Screen name="UploadProfile" component={UploadProfile} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export function HomeNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="Main">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <MainStack.Screen name="CreateEvents" component={CreateEvent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />

      <MainStack.Screen name="EventInfo" component={EventInfo} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="EnterNewPassword" component={EnterNewPassword} />
      <MainStack.Screen name="MyEvents" component={MyEvents} />
      <MainStack.Screen name="FollowRequests" component={FollowRequests} />
      <MainStack.Screen name="Notifications" component={Notifications} />
      <MainStack.Screen name="FindUser" component={FindUser} />
      <MainStack.Screen name="AppSettings" component={AppSettings} />
      <MainStack.Screen name="Language" component={Language} />
      <MainStack.Screen name="SwitchToEvent" component={SwitchToEvent} />
      <MainStack.Screen
        name="AccountPublicOrPrivate"
        component={AccountVisibility}
      />
      <MainStack.Screen name="BlockedAccounts" component={BlockedAccounts} />
      <MainStack.Screen name="SavedStories" component={SavedStories} />
      <MainStack.Screen name="EventInbox" component={EventInbox} />
      <MainStack.Screen name="Comments" component={Comments} />
      <MainStack.Screen name="AllowComments" component={AllowComments} />
      <MainStack.Screen name="LoginActivity" component={SignInActivity} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="StorySettings" component={StorySettings} />
      <MainStack.Screen
        name="TwoFactorAuthentication"
        component={TwoFactorAuthentication}
      />
      <MainStack.Screen name="PostMemory" component={PostMemory} />
      <MainStack.Screen name="PostStory" component={PostStory} />
      <MainStack.Screen name="TicketBuy" component={TicketBuy} />
      <MainStack.Screen name="PaymentStatus" component={PaymentStatus} />
      <MainStack.Screen name="MyTickets" component={MyTickets} />
      <MainStack.Screen name="CreateEvent" component={CreateEvent} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator({ navigation }: any) {
  const dispatch = useDispatch();
  const currentUser = AuthContext._currentValue.currentUser;
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,

        style: {
          backgroundColor: 'rgba(0,0,0,0)',
          position: 'absolute',
          borderTopWidth: 0,
          overflow: 'visible',
        },
        labelStyle: {
          fontSize: 12,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <ImageBackground
                source={AppImages.bottombar}
                style={styles.tabBackground}
                resizeMode={'cover'}>
                <Image
                  source={focused ? AppImages.homefocused : AppImages.home}
                  style={styles.iconHome}
                />
                <View style={styles.bottomSafeAreaView} />
              </ImageBackground>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? AppImages.searchfocused : AppImages.search}
                style={styles.icon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="PostMemory"
        component={PostMemory}
        // name="CreateEvent"
        // component={CreateEvent}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.iconPlus}>
                <Image
                  source={AppImages.plus}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Messenger"
        component={Messenger}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={
                  focused ? AppImages.messagesfocused : AppImages.messages
                }
                style={styles.icon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => {
            return <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                console.log('currentUser nav:', currentUser)
                dispatch(userOperations.getUser(currentUser.uid));
                dispatch(userOperations.viewUser(null))
              }}>
              <Image source={{ uri: currentUser.photoURL || getGravatarSrc(currentUser.displayName || currentUser.email) }} style={styles.icon} />
            </TouchableOpacity>;
          },
        }}
      />
    </BottomTab.Navigator >
  );
}
