import { createReducer } from '../../utils';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  GET_RECOMMENDED_USERS_FAILED,
  GET_SEARCH_USERS_SUCCESS,
  GET_SEARCH_USERS_FAILD,
  GET_SEARCH_USERS_REQUEST,
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
  GET_STORIES_REQUEST,
  GET_STORIES_SUCCESS,
  ADD_STORY_REQUEST,
  ADD_STORY_SUCCESS,
  ADD_STORY_FAILED
} from './types';

const initialState = {
  user: [],
  getUserLoading: false,
  getUserError: null,
  recommendedUsers: [],
  following: [],
  follower: [],
  searchUsers: [],
  userToView: null,
  getRecommendedUsersLoading: false,
  getRecommendedUsersError: null,
  userMessages: [],
  friendsList: [],
  stories:[]
};

const eventReducer = createReducer(initialState)({
  [GET_USER_REQUEST]: (state: any) => {
    return {
      ...state,
      getUserLoading: true,
    };
  },
  [GET_USER_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getUserLoading: false,
      getUserError: null,
      user: action.payload,
    };
  },
  [GET_USER_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      getEventsLoading: false,
      getUserError: action.payload.message,
    };
  },
  [GET_RECOMMENDED_USERS_REQUEST]: (state: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: true,
    };
  },
  [GET_RECOMMENDED_USERS_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: null,
      recommendedUsers: action.payload,
    };
  },
  [GET_RECOMMENDED_USERS_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: action.payload.message,
    };
  },
  [GET_RECOMMENDED_USERS_REQUEST]: (state: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: true,
    };
  },
  [GET_SEARCH_USERS_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      searchUsers: action.payload,
    };
  },
  [GET_SEARCH_USERS_FAILD]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: action.payload.message,
    };
  },
  [GET_FOLLOW_USERS_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: action.payload.message,
    };
  },
  [GET_FOLLOW_USERS_FAILD]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      getRecommendedUsersError: action.payload.message,
    };
  },
  [GET_FOLLOWER_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      follower: action.payload,
    };
  },
  [GET_FOLLOWING_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getRecommendedUsersLoading: false,
      following: action.payload,
    };
  },
  [SET_USER_ID_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      userToView: action.payload,
    };
  },
  [SEND_MESSAGE_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
    };
  },
  [GET_MESSAGE_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      userMessages: action.payload,
    };
  },
  [GET_MESSAGE_FRIEND_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      friendsList: action.payload,
    };
  },
  [GET_CHATROOMS_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      userChatrooms: action.payload,
    };
  },
  [ADD_STORY_REQUEST]: (state: any, action: any) => {
    return {
      ...state,
      addStoryLoading: true,
    };
  },
  [ADD_STORY_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      addStorySuccess: action.payload,
      addStoryLoading: false,
    };
  },
  [ADD_STORY_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      addStoryFailed: action.payload,
      addStoryLoading: false,
    };
  },
  [GET_STORIES_REQUEST]: (state: any, action: any) => {
    return {
      ...state,
      getStoriesLoading: true,
    };
  },
  [GET_STORIES_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      stories: action.payload,
      getStoriesLoading: false,
    };
  },
});

export default eventReducer;
