import { createReducer } from '../../utils';

import {
    GET_MEMORIES_FAILED, GET_MEMORIES_SUCCESS, GET_MEMORIES_REQUEST,
    GET_COMMENTS_BY_MEMORY_ID_FAILED, GET_COMMENTS_BY_MEMORY_ID_REQUEST, GET_COMMENTS_BY_MEMORY_ID_SUCCESS
} from './types';

const initialState = {
    memories: [],
    getMemoriesLoading: false,
    getMemoriesError: null,
    commentsOnMemory: [],
    getCommentsOnMemoryLoading: false,
    getCommentsOnMemoryError: null,
};

const memoryReducer = createReducer(initialState)({
    [GET_MEMORIES_REQUEST]: (state: any) => {
        return {
            ...state,
            getMemoriesLoading: true,
        };
    },
    [GET_MEMORIES_SUCCESS]: (state: any, action: any) => {
        return {
            ...state,
            getMemoriesError: null,
            getMemoriesLoading: false,
            memories: action.payload,
        };
    },
    [GET_MEMORIES_FAILED]: (state: any, action: any) => {
        return {
            ...state,
            getMemoriesError: action.payload.message,
            getMemoriesLoading: false,
        };
    },

    [GET_COMMENTS_BY_MEMORY_ID_REQUEST]: (state: any) => {
        console.log('GET_COMMENTS_BY_MEMORY_ID_REQUEST');
        return {
            ...state,
            getCommentsOnMemoryLoading: true,
        };
    },
    [GET_COMMENTS_BY_MEMORY_ID_SUCCESS]: (state: any, action: any) => {
        console.log('GET_COMMENTS_BY_MEMORY_ID_SUCCESS');
        return {
            ...state,
            getCommentsOnMemoryError: null,
            getCommentsOnMemoryLoading: false,
            commentsOnMemory: action.payload,
        };
    },
    [GET_COMMENTS_BY_MEMORY_ID_FAILED]: (state: any, action: any) => {
        console.log('GET_COMMENTS_BY_MEMORY_ID_FAILED');
        return {
            ...state,
            getCommentsOnMemoryError: action.payload.message,
            getCommentsOnMemoryLoading: false,
        };
    },
});

export default memoryReducer;
