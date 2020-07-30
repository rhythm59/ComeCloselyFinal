import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import styles from './styles';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../../../providers/auth';
import {authOperations} from '../../../state/ducks/auth';

interface ComponentProps {
  error: string;
  isLoading: boolean;
  resendVerificationEmail(user: FirebaseAuthTypes.User): void;
  signOut(): void;
}

class EmailNotVerified extends React.Component<ComponentProps, {}> {
  constructor(props: any) {
    super(props);
  }

  handleResendVerificationEmail(user: FirebaseAuthTypes.User) {
    this.props.resendVerificationEmail(user);
  }

  handleSignOut() {
    this.props.signOut();
  }

  render() {
    const {isLoading} = this.props;
    let user = this.context.currentUser;
    return (
      <View style={styles.mainView}>
        <View style={styles.childView}>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Email Not Verified</Text>
          </View>

          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>
              Please Verify Your account by clicking on the link in
              {'\n'}the email sent to {user.email} and Login
              {'\n'}again
            </Text>
            {/* <Text style={styles.descriptionText}>And Login Again</Text> */}
          </View>

          <View style={styles.buttonSubmitView}>
            <FormButton
              title="RESEND EMAIL"
              containerStyles={styles.buttonSubmit}
              loading={isLoading}
              disabled={isLoading}
              onPress={() => {
                this.handleResendVerificationEmail(user);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              this.handleSignOut();
            }}>
            <Text style={styles.buttonLogout}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
EmailNotVerified.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    resendVerificationEmail: (user: FirebaseAuthTypes.User) =>
      dispatch(authOperations.resendVerificationEmail(user)),
    signOut: () => dispatch(authOperations.signOut()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    error: state.auth.resendVerificationEmailError,
    isLoading: state.auth.resendVerificationEmailLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailNotVerified);
