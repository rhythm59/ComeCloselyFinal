import { createReducer } from '../../utils';

import {
  GET_EVENT_TYPES_REQUEST,
  GET_EVENT_TYPES_SUCCESS,
  GET_EVENT_TYPES_FAILED,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILED,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILED,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILED,
} from './types';

const initialState = {
  eventTypes: [],
  getEventTypesError: null,
  getEventTypesLoading: false,
  events: [],
  getEventsLoading: false,
  getEventsError: null,
  addEventError: null,
  addEventLoading: false,
  deleteEventError: null,
  deleteEventLoading: false,
};

const eventReducer = createReducer(initialState)({
  [GET_EVENT_TYPES_REQUEST]: (state: any) => {
    return {
      ...state,
      getEventTypesLoading: true,
    };
  },
  [GET_EVENT_TYPES_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getEventTypesError: null,
      getEventTypesLoading: false,
      eventTypes: action.payload,
    };
  },
  [GET_EVENT_TYPES_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      getEventTypesError: action.payload.message,
      getEventTypesLoading: false,
    };
  },
  [GET_EVENTS_REQUEST]: (state: any) => {
    return {
      ...state,
      getEventsLoading: true,
    };
  },
  [GET_EVENTS_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      getEventsError: null,
      getEventsLoading: false,
      events: action.payload,
    };
  },
  [GET_EVENTS_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      getEventsError: action.payload.message,
      getEventsLoading: false,
    };
  },
  [ADD_EVENT_REQUEST]: (state: any) => {
    return {
      ...state,
      addEventLoading: true,
    };
  },
  [ADD_EVENT_SUCCESS]: (state: any) => {
    return {
      ...state,
      addEventError: null,
      addEventLoading: false,
    };
  },
  [ADD_EVENT_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      addEventError: action.payload.message,
      addEventLoading: false,
    };
  },
  [DELETE_EVENT_REQUEST]: (state: any) => {
    return {
      ...state,
      deleteEventLoading: true,
    };
  },
  [DELETE_EVENT_SUCCESS]: (state: any) => {
    return {
      ...state,
      deleteEventError: null,
      deleteEventLoading: false,
    };
  },
  [DELETE_EVENT_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      deleteEventError: action.payload.message,
      deleteEventLoading: false,
    };
  },
});

export default eventReducer;