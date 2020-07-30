import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { AppImages } from '../../config';
import styles from './styles';
import { UserI } from './types';
import StoryContainer from './components/StoryContainer';
import { useSelector, useDispatch } from 'react-redux';

import { userOperations } from '../../../state/ducks/user';
import { AuthContext } from '../../../providers/auth';



const MessagesData = [
  {
    id: '0',
    user: 'Sankhadeep',
    message: 'Its time to build a difference ...',
    image: AppImages.avata1,
    date: '3 minutes ago',
  },
  {
    id: '1',
    user: 'nik',
    message: 'Its time to build a difference ...',
    image: AppImages.avata2,
    date: '2 days ago',
  },
  {
    id: '2',
    user: 'dhaval',
    message: 'Its time to build a difference ...',
    image: AppImages.avata3,
    date: 'Dec 11, 2018',
  },
  {
    id: '3',
    user: 'johnson',
    message: 'Its time to build a difference ...',
    image: AppImages.avata4,
    date: 'Dec 16, 2018',
  },
];

// const AllStories: Array<UserI> = [
//   {
//     username: 'Amit',
//     title: 'Pune Dairies',
//     profile: 'https://avatars0.githubusercontent.com/u/16208872?s=460&v=4',
//     stories: [
//       {
//         id: 1,
//         url:
//           'https://images.unsplash.com/photo-1532579853048-ec5f8f15f88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         // duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         // isPaused: true,
//       },
//     ],
//   },
//   {
//     username: 'Trinadh',
//     profile: 'https://avatars2.githubusercontent.com/u/45196619?s=460&v=4',
//     title: 'My Gallery',
//     stories: [
//       {
//         id: 1,
//         url:
//           'https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//       {
//         id: 2,
//         url:
//           'https://images.unsplash.com/photo-1476292026003-1df8db2694b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//       {
//         id: 3,
//         url:
//           'https://images.unsplash.com/photo-1498982261566-1c28c9cf4c02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//     ],
//   },
//   {
//     username: 'Steve Jobs',
//     profile:
//       'https://s3.amazonaws.com/media.eremedia.com/uploads/2012/05/15181015/stevejobs.jpg',
//     title: ' Beach Moves',
//     stories: [
//       {
//         id: 1,
//         url:
//           'https://images.unsplash.com/photo-1515578706925-0dc1a7bfc8cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//       {
//         id: 3,
//         url:
//           'https://images.unsplash.com/photo-1496287437689-3c24997cca99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//       {
//         id: 4,
//         url:
//           'https://images.unsplash.com/photo-1514870262631-55de0332faf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//     ],
//   },
//   {
//     username: 'Rahul',
//     profile:
//       'https://images.unsplash.com/profile-1531581190171-0cf831d86212?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff',
//     title: 'Beauties @Beach',
//     stories: [
//       {
//         id: 4,
//         url:
//           'https://images.unsplash.com/photo-1512101176959-c557f3516787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//       {
//         id: 5,
//         url:
//           'https://images.unsplash.com/photo-1478397453044-17bb5f994100?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//       {
//         id: 4,
//         url:
//           'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=581&q=80',
//         type: 'image',
//         duration: 2,
//         isSeen: false,
//         isReadMore: true,
//         isPaused: true,
//       },
//     ],
//   },
// ];

export default function Messenger({ navigation }: any) {
  const [isModelOpen, setModel] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  const dispatch = useDispatch();
  const userChatrooms = useSelector((state: any) => state.user.userChatrooms);
  let AllStories: any = useSelector((state: any) => state.user.stories);

  const currentUser = AuthContext._currentValue.currentUser.uid;

  useEffect(() => {
    dispatch(userOperations.getUserChatrooms(currentUser))
  }, [userChatrooms?.length]);

  useEffect(() => {
    dispatch(userOperations.getStories(currentUser))
  }, [AllStories?.length]);

  const onStorySelect = (index: number) => {
    setCurrentUserIndex(index);
    setModel(true);
  };
  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll: boolean) => {
    const newIndex = currentUserIndex + 1;
    if (AllStories.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll: boolean) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue: number) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(true);
      setCurrentScrollValue(scrollValue);
    }
  };

  const chatListItem = (item: any) => {
    item.user = item.users.find(u => u !== currentUser)
    const { otherUserData } = item;
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.0)"
        onPress={() => {
          dispatch(userOperations.getUser(item.user))
          dispatch(userOperations.viewUser(item.user))
          navigation.navigate('Messages');
        }}>
        <View style={styles.mainCellView}>
          <View style={styles.cellProfileView}>
            <View style={styles.cellProfileImage}>
              <ImageBackground style={{ flex: 1 }} source={{ uri: otherUserData.displayPhoto }} />
            </View>
            <View style={styles.cellRightMainView}>
              <View style={styles.cellDateView}>
                <Text
                  style={styles.cellDateTxt}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {item.date}
                </Text>
              </View>
              <View style={styles.cellUnreadCountMainView}>
                <View
                  style={styles.cellUnreadCountView}
                /* adjustsFontSizeToFit
                numberOfLines={1} */
                >
                  <Text
                    style={styles.cellUnreadCountTxt}
                    adjustsFontSizeToFit
                    numberOfLines={1}>
                    1
                  </Text>
                </View>
              </View>
              <View style={styles.cellCenterMainView}>
                <View style={styles.cellUsernameView}>
                  <Text
                    style={styles.cellUserTxt}
                    adjustsFontSizeToFit
                    numberOfLines={1}>
                    {otherUserData.name}
                  </Text>
                </View>
                <View style={styles.cellMsgMainView}>
                  <Text
                    style={styles.cellMsgTxt}
                    adjustsFontSizeToFit
                    numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <Image
          style={styles.homeNavigationImage}
          source={AppImages.homeNavigation}
        />
      </View>
      <View style={styles.viewSwiper}>
        <SafeAreaView>
          <View style={styles.viewHeader}>
            <View style={styles.messageView}>
              <Text style={styles.storiesText}>Stories</Text>
              <Text style={styles.messageText}>Messages</Text>
            </View>
          </View>
          <View style={styles.storiesMainView}>
            <ScrollView horizontal={true}>
              <TouchableOpacity onPress={() => navigation.navigate('PostStory')} style={styles.cameraMainView}>
                <LinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#7F00EB', '#CF326F']}
                  style={styles.cameraGradientView}>
                  <Image source={AppImages.camera} style={styles.cameraImage} />
                </LinearGradient>
                <View style={styles.cameraTitleView}>
                  <Text style={styles.cameraTitleText}>+Add</Text>
                </View>
              </TouchableOpacity>
              <FlatList
                horizontal
                data={AllStories}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item.username}
                    style={styles.viewUpcomingEvent}
                    onPress={() => onStorySelect(index)}>
                    <ImageBackground
                      style={styles.storiesProfileImageItem}
                      source={{ uri: item.profile }}
                      onLoadEnd={() => setLoading(false)}>
                      <ActivityIndicator
                        size="large"
                        color="gray"
                        animating={isLoading}
                      />
                    </ImageBackground>
                    <View style={styles.storiesItemTitleView}>
                      <Text style={styles.storiesItemTitleText}>
                        {item.username}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
          <FlatList
            data={userChatrooms}
            // data={MessagesData}
            renderItem={({ item }) => chatListItem(item)}
            keyExtractor={(item) => item.id}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModelOpen}
            /* style={styles.modal} */
            onShow={() => {
              if (currentUserIndex > 0) {
                modalScroll.current.scrollTo(currentUserIndex, false);
              }
            }}
            onRequestClose={onStoryClose}>
            <CubeNavigationHorizontal
              callBackAfterSwipe={(g: number) => onScrollChange(g)}
              ref={modalScroll}
              style={styles.container}>
              {AllStories.map((item: UserI, index: number) => (
                <StoryContainer
                  onClose={onStoryClose}
                  onStoryNext={onStoryNext}
                  onStoryPrevious={onStoryPrevious}
                  user={item}
                  isNewStory={index !== currentUserIndex}
                />
              ))}
            </CubeNavigationHorizontal>
          </Modal>
        </SafeAreaView>
      </View>
    </View>
  );
}
