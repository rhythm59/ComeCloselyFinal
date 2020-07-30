import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserI } from './../../types';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  GET_RECOMMENDED_USERS_FAILED,
  GET_SEARCH_USERS_SUCCESS,
  GET_SEARCH_USERS_FAILD,
  GET_FOLLOW_USERS_REQUEST,
  GET_FOLLOW_USERS_SUCCESS,
  GET_FOLLOW_USERS_FAILD,
  GET_FOLLOWER_SUCCESS,
  GET_FOLLOWING_SUCCESS,
  SET_USER_ID_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FRIEND_SUCCESS,
  GET_CHATROOMS_SUCCESS,
  GET_STORIES_SUCCESS,
  GET_STORIES_REQUEST,
  ADD_STORY_REQUEST,
  ADD_STORY_SUCCESS,
  ADD_STORY_FAILED
} from './types';
import { generateNewChatRoomKey } from '../../../utils';
export const getUser = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            let userData = { ...documentSnapshot.data(), uid: documentSnapshot.id }
            dispatch({
              type: GET_USER_SUCCESS,
              payload: userData,
            });
            auth().currentUser?.updateProfile({
              displayName: userData.name,
              photoURL: userData.displayPhoto
            })
          }
        });
    } catch (error) {
      dispatch({ type: GET_USER_FAILED, payload: error });
    }
  };
};

export const getRecommendedUsers = () => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_RECOMMENDED_USERS_REQUEST });
    try {
      firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
          const events: Array<UserI> = [];

          querySnapshot.forEach((documentSnapshot) => {
            events.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });

          dispatch({ type: GET_RECOMMENDED_USERS_SUCCESS, payload: events });
        });
    } catch (error) {
      dispatch({ type: GET_RECOMMENDED_USERS_FAILED, payload: error });
    }
  };
};
export const searchUsers = (key) => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_RECOMMENDED_USERS_REQUEST });
    try {
      firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
          const events: Array<UserI> = [];

          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data().name.toLowerCase().indexOf(key.toLowerCase()) != -1) {
              events.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            }
          });
          dispatch({ type: GET_SEARCH_USERS_SUCCESS, payload: events });
        });
    } catch (error) {
      dispatch({ type: GET_SEARCH_USERS_FAILD, payload: error });
    }
  };
};


export const unfollowUser = (userKey, followUserKey) => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_FOLLOW_USERS_REQUEST });
    try {
      return await firestore()
        .collection('following_followers')
        .where('userKey', '==', userKey)
        .where('followUserKey', '==', followUserKey)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log('doc:', doc.id)
            doc.ref.delete();
          });
        });

      // dispatch({ type: GET_FOLLOW_USERS_SUCCESS, payload: 'Follow' });
    } catch (error) {
      // dispatch({ type: GET_FOLLOW_USERS_FAILD, payload: error });
    }
  };
};
export const followUser = (userKey, followUserKey) => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_FOLLOW_USERS_REQUEST });
    try {
      firestore()
        .collection('following_followers').doc().set({
          userKey,
          followUserKey
        })

      dispatch({ type: GET_FOLLOW_USERS_SUCCESS, payload: 'Follow' });
    } catch (error) {
      dispatch({ type: GET_FOLLOW_USERS_FAILD, payload: error });
    }
  };
};
export const getFollowing = (userKey) => {
  return async (dispatch: Function) => {
    try {
      firestore()
        .collection('following_followers')
        .onSnapshot((querySnapshot) => {
          const events: Array<UserI> = [];
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data().userKey == userKey) {
              events.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            }
          });
          dispatch({ type: GET_FOLLOWING_SUCCESS, payload: events });
        });
    } catch (error) {
      dispatch({ type: GET_FOLLOW_USERS_FAILD, payload: error });
    }
  };
};
export const getFollower = (userKey) => {
  return async (dispatch: Function) => {
    try {
      firestore()
        .collection('following_followers')
        .onSnapshot((querySnapshot) => {
          const events: Array<UserI> = [];
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data().followUserKey == userKey) {
              events.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            }
          });
          dispatch({ type: GET_FOLLOWER_SUCCESS, payload: events });
        });
    } catch (error) {
      dispatch({ type: GET_FOLLOW_USERS_FAILD, payload: error });
    }
  };
};
export const viewUser = (userKey) => {
  return async (dispatch: Function) => {
    dispatch({ type: SET_USER_ID_SUCCESS, payload: userKey });
  };
};
export const sendMessage = (chatroomId: string, userKey: string, otherUserKey: string, message: string, onNewChatroomCreated) => {
  return async (dispatch: Function) => {
    try {
      let now = Date.now()


      if (!chatroomId) {//start new chatroom between userKey and otherUser
        let roomKey = generateNewChatRoomKey(userKey, otherUserKey)
        const res = await firestore().collection('chatrooms').doc(roomKey).set({
          createdAt: now,
          updatedAt: now,
          users: [userKey, otherUserKey],
          lastMessage: message
        });
        chatroomId = roomKey;
        onNewChatroomCreated(chatroomId)
      }
      else {
        await firestore().collection('chatrooms').doc(chatroomId)
          .update({
            updatedAt: now,
            lastMessage: message
          })
      }
      firestore().collection('chatroomMessages')
        .add({
          chatroomId,
          updatedAt: now,
          createdAt: now,
          sender: userKey,
          message
        })

      // firestore().collection('friends').doc(currentUser).collection(otherUser).doc().set({ id: 'message' })
      // firestore().collection('friends').doc(otherUser).collection(currentUser).doc().set({ id: 'message' })
      // firestore().collection('messages').doc(currentUser).collection(otherUser).doc().set({ message })
      // firestore().collection('messages').doc(otherUser).collection(currentUser).doc().set({ message })

      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: 'Send' });
    } catch (error) {
      console.log(error)
    }
  };
};

export const getMessages = (chatroomId: string) => {
  return async (dispatch: Function) => {
    try {
      firestore()
        .collection('chatroomMessages')
        .where('chatroomId', '==', chatroomId)
        // .orderBy('message')
        .orderBy('createdAt')
        // .orderBy('sender')
        .onSnapshot((querySnapshot) => {
          const events: Array<UserI> = [];
          querySnapshot?.forEach((documentSnapshot) => {
            events.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          // firestore()
          //   .collection('messages').doc(currentUser).collection(otherUser)
          //   .onSnapshot((querySnapshot) => {
          //     const events: Array<UserI> = [];
          //     querySnapshot.forEach((documentSnapshot) => {
          //       events.push({
          //         ...documentSnapshot.data(),
          //         id: documentSnapshot.id,
          //       });
          //     });
          dispatch({ type: GET_MESSAGE_SUCCESS, payload: events });

        });
    } catch (error) {
      dispatch({ type: GET_MESSAGE_SUCCESS, payload: [] });
      console.log(error)
      // dispatch({type: GET_FOLLOW_USERS_FAILD, payload: error});
    }
  };
};
export const getUserChatrooms = (userId: string) => {
  return async (dispatch: Function) => {
    try {
      firestore()
        .collection('chatrooms')
        .where('users', 'array-contains', userId)
        // .orderBy('createdAt')
        .onSnapshot(async (querySnapshot) => {
          let events: Array<UserI> = [];
          querySnapshot?.forEach((documentSnapshot) => {
            events.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });

          // var results: number[] = await Promise.all(arr.map(async (item): Promise<number> => {
          //   await callAsynchronousOperation(item);
          //   return item + 1;
          // }));
          await Promise.all(events.map(async (event, index): Promise<any> => {
            let otherUser = event.users.filter(u => u !== userId)[0]
            const uRef = firestore().collection('users').doc(otherUser);
            const doc = await uRef.get();
            events[index].otherUserData = { ...doc.data(), id: doc.id }
            return
          }))
          dispatch({ type: GET_CHATROOMS_SUCCESS, payload: events });

        });
    } catch (error) {
      dispatch({ type: GET_CHATROOMS_SUCCESS, payload: [] });
      console.log(error)
      // dispatch({type: GET_FOLLOW_USERS_FAILD, payload: error});
    }
  };
};
export const addNewStory = (data: any, onSuccessCallback: Function) => {
  return async (dispatch: Function) => {
    dispatch({ type: ADD_STORY_REQUEST });
    try {
      let now = Date.now()
      await firestore()
        .collection('stories').add({
          ...data,
          createdAt: now,
          updatedAt: now,
        })
      onSuccessCallback(true)
      dispatch({ type: ADD_STORY_SUCCESS, payload: true });
    } catch (error) {
      dispatch({ type: ADD_STORY_FAILED, payload: error });
    }
  };
};

export const getStories = (userId: string) => {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: GET_STORIES_REQUEST, payload: true });
      firestore()
        .collection('stories')
        .onSnapshot(async (querySnapshot) => {
          let events: any = [];
          let storiesWithUserData: any = [];
          querySnapshot?.forEach((documentSnapshot) => {
            events.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          let userIdsList = events.map((item: any) => item.userId);//get list of userId's
          userIdsList = [...new Set(userIdsList)] //get unique list of userId's

          await Promise.all(userIdsList.map(async (userId: any, index: number): Promise<any> => {
            const uRef = firestore().collection('users').doc(userId);
            const user = await uRef.get();
            const userData: any = { ...user.data(), id: user.id }
            storiesWithUserData.push({
              profile: userData.displayPhoto,
              username: userData.name,
              title: userData.name,
              stories: events.map((ev: any) => {
                if (ev.userId == userId) {
                  return { ...ev, type: 'image' };
                }
                return false;
              })
            })
            return
          }))
          dispatch({ type: GET_STORIES_SUCCESS, payload: storiesWithUserData });
        });
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_STORIES_SUCCESS, payload: [] });
    }
  };
};
// export const getMessageFriends = (currentUser) => {
//   console.log(currentUser)
//   return async (dispatch: Function) => {
//     try {
//      let a = firestore()
//         .collection('friends').doc(currentUser).get()
//         console.log(a)
//         // .onSnapshot((querySnapshot) => {
//         //   const events: Array<UserI> = [];
//         //   console.log('sadsdsasd',querySnapshot)
//         //   querySnapshot.forEach((documentSnapshot) => {
//         //       events.push({
//         //         ...documentSnapshot.data(),
//         //         id: documentSnapshot.id,
//         //       });
//         //   });
//           dispatch({type: GET_MESSAGE_FRIEND_SUCCESS, payload: events});
//         });
//     } catch (error) {
//         // dispatch({type: GET_FOLLOW_USERS_FAILD, payload: error});
//     }
//   };
// };