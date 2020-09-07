import React, {Fragment} from 'react';
import {Text, View, Alert} from 'react-native';

import {connect} from 'react-redux';
import TextInput from 'react-native-textinput-with-icons';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import FormButton from '../../components/FormButton';
import FormFieldWrapper from '../../components/FormFieldWrapper';
import {authOperations} from '../../../state/ducks/auth';

interface ComponentProps {
  navigation: any;
  forgotPasswordError: string;
  isLoading: boolean;
  forgotPassword(email: string): void;  
}
interface ComponentState {
  email: string;
  flashMessage: boolean;
}
const INITIAL_STATE: ComponentState = {
  email: '',
  flashMessage: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email('Please enter a username'),
});

class ForgotPassword extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  handleSubmit = async (values: ComponentState,actions: any) => {
    try {
      await this.props.forgotPassword(values.email);
      this.setState({
        flashMessage: true,email: ''
      },()=>{setTimeout(() => this.closeFlashMessage(), 3000)});
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  closeFlashMessage(){
    this.setState({
      flashMessage: false
    })
  }

  render() {
    const {isLoading} = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.childView}>
          <View style={styles.forgotTextMainView}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </View>

          <View style={styles.descriptionMainView}>
            <Text style={styles.descriptionText}>
              Enter the email address you used to create your {'\n'}account and
              we will email you a link to reset your{'\n'}password
            </Text>
          </View>

          <Formik
            initialValues={INITIAL_STATE}
            validationSchema={validationSchema}
            onSubmit={(values,actions) => {
              this.handleSubmit(values,actions);
            }}>
            {(formikProps) => (
              <Fragment>
                <FormFieldWrapper
                  formikProps={formikProps}
                  formikKey="email"
                  containerStyles={styles.fieldWrapper}>
                  <TextInput
                    style={styles.textInput}
                    color="#515C6F"
                    underlineActiveColor="#FF2485"
                    fontFamily="Poppins-Regular"
                    label="Email"
                    labelColor="#D4D4D4"
                    labelActiveColor="#FF2485"
                    containerMaxWidth="100%"
                    value={formikProps.values.email}
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                  />
                </FormFieldWrapper>
                <View style={styles.buttonSubmitView}>
                  <FormButton
                    title="SUBMIT"
                    containerStyles={styles.buttonSubmit}
                    loading={isLoading}
                    disabled={isLoading || !formikProps.isValid}
                    onPress={formikProps.handleSubmit}
                  />
                </View>
              </Fragment>
            )}
          </Formik>
          {this.state.flashMessage==true?
            <View style={styles.flashMessage}>
              <Text style={{color:'white'}}>Password reset email sent successfully</Text>
            </View>
          :
          null
          }
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    forgotPassword: (email: string) =>
      dispatch(authOperations.forgotPassword(email)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    authError: state.auth.forgotPasswordError,
    isLoading: state.auth.forgotPasswordLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
