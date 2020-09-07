import React, {Fragment} from 'react';
import {View, Text, TouchableHighlight, KeyboardAvoidingView} from 'react-native';

import {connect} from 'react-redux';
import TextInput from 'react-native-textinput-with-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SocialIcon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import 'react-native-gesture-handler';

import styles from './styles';
import FormButton from '../../components/FormButton';
import FormFieldWrapper from '../../components/FormFieldWrapper';
import {Creds} from '../../../state/types';
import {authOperations} from '../../../state/ducks/auth';

interface ComponentProp {
  navigation: any;
  signInError: string;
  isLoading: boolean;
  signIn(creds: Creds): void;
}
interface ComponentState {
  email: string;
  password: string;
}
const INITIAL_STATE: ComponentState = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .required('Please enter your email')
    .email('Enter a valid email'),
  password: Yup.string()
    .label('Password')
    .required('Please enter your password'),
});

class SignIn extends React.Component<ComponentProp, ComponentState> {
  constructor(props: any) {
    super(props);
  }

  handleSubmit = (values: ComponentState) => {
    this.props.signIn(values);
  };

  btnSignUpTapped = () => {
    this.props.navigation.navigate('SignUp');
  };

  btnForgotPasswordTapped = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  render() {
    const {isLoading} = this.props;
    return (
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.mainView}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Come</Text>
            <Text style={styles.titleColor}>Closely</Text>
          </View>
          <Formik
            initialValues={INITIAL_STATE}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.handleSubmit(values);
            }}>
            {(formikProps) => (
              <Fragment>
                <View style={styles.topView}>
                  <FormFieldWrapper
                    formikProps={formikProps}
                    formikKey="email"
                    containerStyles={styles.fieldWrapper}>
                    <TextInput
                      style={styles.textInput}
                      color="#515C6F"
                      underlineActiveColor="#FF2485"
                      fontFamily="Poppins-Regular"
                      label="Email Address"
                      labelColor="#D4D4D4"
                      labelActiveColor="#FF2485"
                      leftIcon="email-outline"
                      leftIconType="material"
                      mode="outlined"
                      leftIconColor="#707070"
                      value={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      onBlur={formikProps.handleBlur('email')}
                    />
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    formikProps={formikProps}
                    formikKey="password"
                    containerStyles={styles.fieldWrapper}>
                    <TextInput
                      style={styles.textInput}
                      color="#515C6F"
                      underlineActiveColor="#FF2485"
                      fontFamily="Poppins-Regular"
                      label="Password"
                      labelColor="#D4D4D4"
                      labelActiveColor="#FF2485"
                      leftIcon="lock"
                      leftIconType="awesome"
                      mode="outlined"
                      leftIconColor="#707070"
                      secureTextEntry={true}
                      value={formikProps.values.password}
                      onChangeText={formikProps.handleChange('password')}
                      onBlur={formikProps.handleBlur('password')}
                    />
                  </FormFieldWrapper>

                  <TouchableHighlight
                    underlayColor="rgba(0,0,0,0.0)"
                    onPress={() => {
                      this.btnForgotPasswordTapped();
                    }}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.bottomView}>
                  <View style={styles.buttonView}>
                    <View style={styles.submitView}>
                      <FormButton
                        title="LOGIN"
                        containerStyles={styles.buttonSubmit}
                        loading={isLoading}
                        disabled={isLoading || !formikProps.isValid}
                        onPress={formikProps.handleSubmit}
                      />
                    </View>
                    {/* <View>
                      {signInError ? (
                        <Text style={styles.or}> {signInError} </Text>
                      ) : null}
                    </View> */}
                    <View style={styles.orView}>
                      <Text style={styles.or}>OR</Text>
                    </View>
                    {/* social icon  */}
                    <View style={styles.buttonFacebookView}>
                      <SocialIcon
                        style={styles.buttonFacebook}
                        button
                        iconSize={20}
                        type="facebook"
                        title="Login with Facebook"
                        onPress={() => {
                          // alert('facebook');
                        }}
                      />
                    </View>

                    <View style={styles.buttonGoogleView}>
                      <SocialIcon
                        style={styles.buttonGoogle}
                        button
                        iconSize={20}
                        type="google"
                        title="Login with Google"
                        onPress={() => {
                          // alert('Googleplus');
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.footerView}>
                    <View style={styles.newUserView}>
                      <Text style={styles.newUser}>New user?</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.btnSignUpTapped();
                        }}>
                        <Text style={styles.textTerms}>Sign up</Text>
                      </TouchableOpacity>
                      <Text style={styles.here}>here</Text>
                    </View>
                    <View style={styles.bottomTextView}>
                      <Text style={styles.bottomText}>
                        By creating an account, You agree to our
                      </Text>

                      <View style={styles.termsMainView}>
                        <TouchableOpacity>
                          <Text style={styles.textTerms}>Terms of Service</Text>
                        </TouchableOpacity>
                        <Text style={styles.and}>and</Text>
                        <TouchableOpacity>
                          <Text style={styles.textTerms}>Privacy Policy</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Fragment>
            )}
          </Formik>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    signIn: (creds: Creds) => dispatch(authOperations.signIn(creds)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    signInError: state.auth.signInError,
    isLoading: state.auth.signInLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);