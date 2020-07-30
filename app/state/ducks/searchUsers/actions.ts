import firestore from '@react-native-firebase/firestore';

import {UserI} from './../../types';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  GET_RECOMMENDED_USERS_FAILED,
} from './types';

export const getUser = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({type: GET_USER_REQUEST});
    try {
      firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            dispatch({
              type: GET_USER_SUCCESS,
              payload: documentSnapshot.data(),
            });
          }
        });
    } catch (error) {
      dispatch({type: GET_USER_FAILED, payload: error});
    }
  };
};

export const getRecommendedUsers = () => {
  return async (dispatch: Function) => {
    dispatch({type: GET_RECOMMENDED_USERS_REQUEST});
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

          dispatch({type: GET_RECOMMENDED_USERS_SUCCESS, payload: events});
        });
    } catch (error) {
      dispatch({type: GET_RECOMMENDED_USERS_FAILED, payload: error});
    }
  };
};
