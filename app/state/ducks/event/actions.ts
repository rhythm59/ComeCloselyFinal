import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { EventI, EventTypeI } from './../../types';
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

export const getEventTypes = () => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_EVENT_TYPES_REQUEST });
    try {
      firestore()
        .collection('eventTypes')
        .onSnapshot((querySnapshot) => {
          const eventTypes: Array<EventTypeI> = [];

          querySnapshot.forEach((documentSnapshot) => {
            eventTypes.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });

          dispatch({ type: GET_EVENT_TYPES_SUCCESS, payload: eventTypes });
        });
    } catch (error) {
      dispatch({ type: GET_EVENT_TYPES_FAILED, payload: error });
    }
  };
};

export const getEvents = () => {
  return async (dispatch: Function) => {
    dispatch({ type: GET_EVENTS_REQUEST });
    try {
      firestore()
        .collection('events')
        .onSnapshot((querySnapshot) => {
          const events: Array<EventI> = [];

          querySnapshot.forEach((documentSnapshot) => {
            events.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });

          dispatch({ type: GET_EVENTS_SUCCESS, payload: events });
        });
    } catch (error) {
      dispatch({ type: GET_EVENTS_FAILED, payload: error });
    }
  };
};

export const addEvent = (event: EventI, onAddEventSuccess: any) => {
  return async (dispatch: Function) => {
    dispatch({ type: ADD_EVENT_REQUEST });
    try {
      const now = Date.now();
      if (event.coverPhoto && event.coverPhoto !== '') {
        const coverPhotoReference = storage().ref(`eventCovers/${now}.png`);
        await coverPhotoReference.putFile(event.coverPhoto);
        event.coverPhoto = await storage()
          .ref(`eventCovers/${now}.png`)
          .getDownloadURL();
      }

      const eventRef = firestore().collection('events').doc();
      event = {
        ...event,
        createdAt: now,
        updatedAt: now,
      };
      await eventRef.set(event);
      onAddEventSuccess(true)
      dispatch({ type: ADD_EVENT_SUCCESS });
    } catch (error) {
      dispatch({ type: ADD_EVENT_FAILED, payload: error });
    }
  };
};

export const deleteEvent = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
      await firestore().collection('events').doc(id).delete();
      dispatch({ type: DELETE_EVENT_SUCCESS });
    } catch (error) {
      dispatch({ type: DELETE_EVENT_FAILED, payload: error });
    }
  };
};
