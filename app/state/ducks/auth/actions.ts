import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { Creds, UserI } from './../../types';
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

const sendVerificationEmail = (user: FirebaseAuthTypes.User): Promise<void> => {
  return user.sendEmailVerification();
};

export const signIn = (creds: Creds) => {
  return async (dispatch: Function) => {
    dispatch({ type: SIGNIN_REQUEST });
    try {
      const { email, password } = creds;
      const response = await auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: SIGNIN_SUCCESS, payload: response.user });
    } catch (error) {
      dispatch({ type: SIGNIN_FAILED, payload: error });
    }
  };
};

export const signUp = (
  creds: Creds,
  user: UserI,
  avatarFilePath: string | undefined,
) => {
  return async (dispatch: Function) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      /* Create a User on firebase Authentication */
      const { email, password } = creds;
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      let avatarUrl = '';

      /* Upload User's avatar photo */
      if (avatarFilePath && avatarFilePath !== '') {
        const avatarReference = storage().ref(
          `avatars/${response.user.uid}/${response.user.uid}.png`,
        );
        await avatarReference.putFile(avatarFilePath);
        avatarUrl = await storage()
          .ref(`avatars/${response.user.uid}/${response.user.uid}.png`)
          .getDownloadURL();
      }
      /* Add the user data in a firestore collection */
      const userRef = firestore().collection('users').doc(response.user.uid);
      const now = Date.now();
      user = {
        ...user,
        createdAt: now,
        updatedAt: now,
        displayPhoto: avatarUrl,
      };
      await userRef.set(user);

      /* Send verification email to user */
      await sendVerificationEmail(response.user);

      dispatch({ type: SIGNUP_SUCCESS, payload: response.user });
      auth().currentUser?.updateProfile({
        displayName: user.name,
        photoURL: avatarUrl
      })
    } catch (error) {
      dispatch({ type: SIGNUP_FAILED, payload: error });
    }
  };
};

export const resendVerificationEmail = (user: FirebaseAuthTypes.User) => {
  return async (dispatch: Function) => {
    dispatch({ type: RESEND_VERIFICATION_EMAIL_REQUEST });
    try {
      await sendVerificationEmail(user);
      dispatch({ type: RESEND_VERIFICATION_EMAIL_SUCCESS, payload: {} });
    } catch (error) {
      dispatch({ type: RESEND_VERIFICATION_EMAIL_FAILED, payload: error });
    }
  };
};

export const forgotPassword = (email: string) => {
  return async (dispatch: Function) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
      await auth().sendPasswordResetEmail(email);
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: {} });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAILED, payload: error });
    }
  };
};

export const signOut = () => {
  return async (dispatch: Function) => {
    await auth().signOut();
    dispatch({ type: SIGNOUT_SUCCESS });
  };
};
