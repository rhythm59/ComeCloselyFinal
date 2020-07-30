import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {
    GET_MEMORIES_REQUEST,
    GET_MEMORIES_SUCCESS,
    GET_MEMORIES_FAILED,
    GET_COMMENTS_BY_MEMORY_ID_REQUEST,
    GET_COMMENTS_BY_MEMORY_ID_SUCCESS,
    GET_COMMENTS_BY_MEMORY_ID_FAILED,
} from './types';


export const getMemories = () => {
    return async (dispatch: Function) => {
        dispatch({ type: GET_MEMORIES_REQUEST });
        try {
            firestore()
                .collection('memories')
                .onSnapshot((querySnapshot) => {
                    const memories: any = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        memories.push({
                            ...documentSnapshot.data(),
                            id: documentSnapshot.id,
                        });
                    });
                    dispatch({ type: GET_MEMORIES_SUCCESS, payload: memories });
                });
        } catch (error) {
            dispatch({ type: GET_MEMORIES_FAILED, payload: error });
        }
    };
};

export const getCommentsByMemoryId = (memoryId: string | number) => {
    return async (dispatch: Function) => {
        dispatch({ type: GET_COMMENTS_BY_MEMORY_ID_REQUEST });
        try {
            firestore()
                .collection('memoryComments')
                .where('memoryId', '==', memoryId)
                .onSnapshot((querySnapshot) => {
                    const comments: any = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        comments.push({
                            ...documentSnapshot.data(),
                            id: documentSnapshot.id,
                        });
                    });
                    dispatch({ type: GET_COMMENTS_BY_MEMORY_ID_SUCCESS, payload: comments });
                });
        } catch (error) {
            dispatch({ type: GET_COMMENTS_BY_MEMORY_ID_FAILED, payload: error });
        }
    };
};

