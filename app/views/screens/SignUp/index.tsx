import React, {Fragment} from 'react';
import {
  Platform,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import TextInput from 'react-native-textinput-with-icons';
import {SocialIcon} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import 'react-native-gesture-handler';

import styles from './styles';
import FormButton from '../../components/FormButton';
import FormFieldWrapper from '../../components/FormFieldWrapper';

interface ComponentProp {
  navigation: any;
}
interface ComponentState {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
const INITIAL_STATE: ComponentState = {
  email: '',
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Please enter your name')
    .min(3, 'Must have at least 3 characters')
    .max(100, 'Must have at most 100 characters'),
  phone: Yup.string().label('Phone').required('Please enter your Phone Number'),
  email: Yup.string()
    .label('Email')
    .required('Please enter your email')
    .email('Enter a valid email'),
  password: Yup.string()
    .label('Password')
    .required('Please enter your password'),
  confirmPassword: Yup.string()
    .label('Confirm Password')
    .required('Please enter your password again')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

class SignUp extends React.Component<ComponentProp, ComponentState> {
  constructor(props: any) {
    super(props);
  }

  handleSubmit = async (values: ComponentState) => {
    this.props.navigation.navigate('UploadProfile', values);
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.mainViewContainer}>
        <ScrollView>
          <SafeAreaView style={styles.mainView}>
            <View style={styles.titleViewContainer}>
              <Text style={styles.titleView}>
                <Text style={styles.title}>Come</Text>
                <Text style={styles.titleColor}>Closely</Text>
              </Text>
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
                      formikKey="name"
                      containerStyles={styles.fieldWrapper}>
                      <TextInput
                        style={styles.textInput}
                        color="#515C6F"
                        underlineActiveColor="#FF2485"
                        fontFamily="Poppins-Regular"
                        label="Name"
                        labelColor="#D4D4D4"
                        labelActiveColor="#FF2485"
                        leftIcon="account-outline"
                        leftIconType="material"
                        mode="outlined"
                        leftIconColor="#707070"
                        value={formikProps.values.name}
                        onChangeText={formikProps.handleChange('name')}
                        onBlur={formikProps.handleBlur('name')}
                      />
                    </FormFieldWrapper>

                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="phone"
                      containerStyles={styles.fieldWrapper}>
                      <TextInput
                        style={styles.textInput}
                        color="#515C6F"
                        underlineActiveColor="#FF2485"
                        fontFamily="Poppins-Regular"
                        label="Phone Number"
                        labelColor="#D4D4D4"
                        labelActiveColor="#FF2485"
                        leftIcon="phone-outline"
                        leftIconType="material"
                        mode="outlined"
                        leftIconColor="#707070"
                        value={formikProps.values.phone}
                        onChangeText={formikProps.handleChange('phone')}
                        onBlur={formikProps.handleBlur('phone')}
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

                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="confirmPassword"
                      containerStyles={styles.fieldWrapper}>
                      <TextInput
                        style={styles.textInput}
                        color="#515C6F"
                        underlineActiveColor="#FF2485"
                        fontFamily="Poppins-Regular"
                        label="Confirm Password"
                        labelColor="#D4D4D4"
                        labelActiveColor="#FF2485"
                        leftIcon="lock"
                        leftIconType="awesome"
                        mode="outlined"
                        leftIconColor="#707070"
                        secureTextEntry={true}
                        value={formikProps.values.confirmPassword}
                        onChangeText={formikProps.handleChange(
                          'confirmPassword',
                        )}
                        onBlur={formikProps.handleBlur('confirmPassword')}
                      />
                    </FormFieldWrapper>
                  </View>

                  <View style={styles.centerView}>
                    <View style={styles.buttonSubmitView}>
                      <FormButton
                        title="NEXT STEP"
                        containerStyles={styles.buttonSubmit}
                        disabled={!formikProps.isValid}
                        onPress={formikProps.handleSubmit}
                      />
                    </View>

                    {/* social icon  */}
                    <View style={styles.bottomView}>
                      <View style={styles.socialView}>
                        <SocialIcon
                          style={styles.buttonFacebook}
                          button
                          type="facebook"
                          iconSize={20}
                          onPress={() => {
                            // alert('facebook');
                          }}
                        />

                        <SocialIcon
                          style={styles.buttonTwitter}
                          iconSize={20}
                          button
                          type="twitter"
                          onPress={() => {
                            // alert('twitter');
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.bottomTextView}>
                      <Text style={styles.bottomText}>
                        By creating an account, you agree to our
                      </Text>

                      <View style={styles.termsView}>
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
                </Fragment>
              )}
            </Formik>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
