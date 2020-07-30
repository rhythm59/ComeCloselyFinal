import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const SIGNIN_REQUEST = 'auth/SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS';
export const SIGNIN_FAILED = 'auth/SIGNIN_FAILED';
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'auth/SIGNUP_FAILED';
export const RESEND_VERIFICATION_EMAIL_REQUEST =
  'auth/RESEND_VERIFICATION_EMAIL_REQUEST';
export const RESEND_VERIFICATION_EMAIL_SUCCESS =
  'auth/RESEND_VERIFICATION_EMAIL_SUCCESS';
export const RESEND_VERIFICATION_EMAIL_FAILED =
  'auth/RESEND_VERIFICATION_EMAIL_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'auth/FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'auth/FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'auth/FORGOT_PASSWORD_FAILED';
export const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS';

interface SignInSuccessAction {
  type: typeof SIGNIN_SUCCESS;
  payload: FirebaseAuthTypes.User;
}
interface SignInFailedAction {
  type: typeof SIGNIN_SUCCESS;
  payload: any;
}

interface SignUpSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  payload: FirebaseAuthTypes.User;
}
interface SignUpFailedAction {
  type: typeof SIGNUP_FAILED;
  payload: any;
}

export type AuthActionTypes =
  | SignInSuccessAction
  | SignInFailedAction
  | SignUpSuccessAction
  | SignUpFailedAction;
