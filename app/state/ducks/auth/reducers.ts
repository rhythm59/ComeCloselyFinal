import {createReducer} from '../../utils';

import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  RESEND_VERIFICATION_EMAIL_REQUEST,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESEND_VERIFICATION_EMAIL_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  SIGNOUT_SUCCESS,
} from './types';

const initialState = {
  currentUser: null,
  signInError: null,
  signInLoading: false,
  signUpError: null,
  signUpLoading: false,
  resendVerificationEmailError: null,
  resendVerificationEmailLoading: false,
  forgotPasswordError: null,
  forgotPasswordLoading: false,
};

const authReducer = createReducer(initialState)({
  [SIGNIN_REQUEST]: (state: any) => {
    return {
      ...state,
      signInLoading: true,
    };
  },
  [SIGNIN_SUCCESS]: (state: any) => {
    return {
      ...state,
      signInError: null,
      signInLoading: false,
    };
  },
  [SIGNIN_FAILED]: (state: any, action: any) => {
    return {
      ...state,
      signInError: action.payload.message,
      signInLoading: false,
    };
  },
  [SIGNUP_REQUEST]: (state: any) => {
    return {
      ...state,
      signUpLoading: true,
    };
  },
  [SIGNUP_SUCCESS]: (state: any) => {
    return {
      ...state,
      signUpError: null,
      signUpLoading: false,
    };
  },
  [SIGNUP_FAILED]: (state: any) => {
    return {
      ...state,
      signUpError: 'SignUp Failed.',
      signUpLoading: false,
    };
  },
  [RESEND_VERIFICATION_EMAIL_REQUEST]: (state: any) => {
    return {
      ...state,
      resendVerificationEmailLoading: true,
    };
  },
  [RESEND_VERIFICATION_EMAIL_SUCCESS]: (state: any) => {
    return {
      ...state,
      resendVerificationEmailError: null,
      resendVerificationEmailLoading: false,
    };
  },
  [RESEND_VERIFICATION_EMAIL_FAILED]: (state: any) => {
    return {
      ...state,
      resendVerificationEmailError: 'Failed.',
      resendVerificationEmailLoading: false,
    };
  },
  [FORGOT_PASSWORD_REQUEST]: (state: any) => {
    return {
      ...state,
      forgotPasswordLoading: true,
    };
  },
  [FORGOT_PASSWORD_SUCCESS]: (state: any) => {
    return {
      ...state,
      forgotPasswordError: null,
      forgotPasswordLoading: false,
    };
  },
  [FORGOT_PASSWORD_FAILED]: (state: any) => {
    return {
      ...state,
      forgotPasswordError: 'Forgot Password Failed.',
      forgotPasswordLoading: false,
    };
  },
  [SIGNOUT_SUCCESS]: (state: any) => {
    return state;
  },
});

export default authReducer;
