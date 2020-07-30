import {createReducer} from '../../utils';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  GET_RECOMMENDED_USERS_FAILED,
} from './types';

const initialState = {
  user: [],
  getUserLoading: false,
  getUserError: null,
  recommendedUsers: [],
  getRecommendedUsersLoading: false,
  getRecommendedUsersError: null,
};

const eventReducer = createReducer(initialState)({
  [GET_USER_REQUEST]: (state: any) => {
    console.log('request user');
    return {
      ...state,
      getUserLoading: true,
    };
  },
  [GET_USER_SUCCESS]: (state: any, action: any) => {
    console.log('success get user');
    return {
      ...state,
      getUserLoading: false,
      getUserError: null,
      user: action.payload,
    };
  },
  [GET_USER_FAILED]: (state: any, action: any) => {
    console.log('failed get user');
    return {
      ...state,
      getEventsLoading: false,
      getUserError: action.payload.message,
    };
  },
  [GET_RECOMMENDED_USERS_REQUEST]: (state: any) => {
    console.log('get recommended users');
    return {
      ...state,
      getRecommendedUsersLoading: true,
    };
  },
  [GET_RECOMMENDED_USERS_SUCCESS]: (state: any, action: any) => {
    console.log('success get recommended users');
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: null,
      recommendedUsers: action.payload,
    };
  },
  [GET_RECOMMENDED_USERS_FAILED]: (state: any, action: any) => {
    console.log('failed get recommended users');
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: action.payload.message,
    };
  },
});

export default eventReducer;
