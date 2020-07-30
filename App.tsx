import React, {Fragment} from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import configureStore from './app/state/store';
const reduxStore = configureStore({});

import {AuthNavigator, HomeNavigator} from './app/navigation';
import Loading from './app/views/components/Loading';
import EmailNotVerified from './app/views/screens/EmailNotVerified';
import AuthProvider from './app/providers/auth';
import {AuthContext} from './app/providers/auth';

console.disableYellowBox = true;

export default function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <AuthProvider>
        <AuthContext.Consumer>
          {({currentUser, isLoading}) => (
            <Fragment>
              {isLoading && <Loading />}
              {!isLoading && !currentUser && <AuthNavigator />}
              {!isLoading && currentUser && !currentUser.emailVerified && (
                <EmailNotVerified />
              )}
              {!isLoading && currentUser && currentUser.emailVerified && (
                <HomeNavigator />
              )}
            </Fragment>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    </ReduxProvider>
  );
}
