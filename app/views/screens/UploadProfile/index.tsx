import React, {Fragment} from 'react';
import {View, Text, Image, Switch, TouchableHighlight} from 'react-native';

import {connect} from 'react-redux';
import TextInput from 'react-native-textinput-with-icons';
import {SocialIcon} from 'react-native-elements';
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import 'react-native-gesture-handler';

import {AppImages} from '../../config';
import styles from './styles';
import FormFieldWrapper from '../../components/FormFieldWrapper';
import FormButton from '../../components/FormButton';
import {Creds, UserI} from '../../../state/types';
import {authOperations} from '../../../state/ducks/auth';

interface ComponentProp {
  navigation: any;
  route: any;
  signUpError: string;
  isLoading: boolean;
  signUp(creds: Creds, user: UserI, avatarFilePath: string | undefined): void;
}
interface ComponentState {
  avatarSource: string;
  avatarFilePath: string | undefined;
  avatarBackgroundColor: string;
}
const INITIAL_STATE: ComponentState = {
  avatarSource: '',
  avatarFilePath: '',
  avatarBackgroundColor: 'rgba(0,0,0,0)',
};
interface FormI {
  username: string;
  isPrivate: boolean;
}
const INITIAL_FORM_STATE: FormI = {
  username: '',
  isPrivate: false,
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required('Please enter a username')
    .min(3, 'Must have at least 3 characters')
    .max(50, 'Must have at most 50 characters'),
  isPrivate: Yup.bool().label('Private'),
});

const options: ImagePickerOptions = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Camera',
  chooseFromLibraryButtonTitle: 'Gallery',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UploadProfile extends React.Component<ComponentProp, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  handleSubmit = (values: FormI) => {
    console.log('upload photo values', {...values, ...this.props.route.params});
    const creds: Creds = {
      email: this.props.route.params.email,
      password: this.props.route.params.password,
    };
    const user: UserI = {
      ...values,
      email: this.props.route.params.email,
      name: this.props.route.params.name,
      phone: this.props.route.params.phone,
    };
    this.props.signUp(creds, user, this.state.avatarFilePath);
  };

  handleShowImagePicker() {
    ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
      console.log('Response = ', response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: response.uri,
          avatarFilePath: response.path,
          avatarBackgroundColor: 'black',
        });
      }
    });
  }

  render() {
    const {isLoading} = this.props;
    return (
      <View style={styles.mainView}>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}>
          {(formikProps) => (
            <Fragment>
              <View style={styles.upperView}>
                <View style={styles.headerChildViewContainer}>
                  <View style={styles.headerChildView}>
                    <Text style={styles.title}>Come</Text>
                    <Text style={styles.titleColor}>Closely</Text>
                  </View>
                </View>

                <View style={styles.borderChildViewContainer}>
                  <View style={styles.borderChildView}>
                    <TouchableHighlight
                      style={styles.dotsBorders}
                      underlayColor="rgba(0,0,0,0)"
                      onPress={() => {
                        this.handleShowImagePicker();
                      }}>
                      <View style={styles.borderInsideView}>
                        <View style={styles.borderInsideView}>
                          <Image
                            source={AppImages.camera}
                            style={styles.image}
                          />
                          <Text style={styles.borderInsideText}>
                            Upload Photos
                          </Text>
                        </View>
                        <Image
                          source={{uri: this.state.avatarSource}}
                          // eslint-disable-next-line react-native/no-inline-styles
                          style={{
                            borderRadius: 10,
                            height: '103%',
                            width: '103%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            resizeMode: 'stretch',
                            backgroundColor: this.state.avatarBackgroundColor,
                          }}
                        />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>

                <View style={styles.textInputChildViewContainer}>
                  <View style={styles.textInputChildView}>
                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="username"
                      containerStyles={styles.fieldWrapper}>
                      <TextInput
                        style={styles.textInput}
                        label="Username"
                        labelActiveColor="#FF2485"
                        underlineActiveColor="#FF2485"
                        value={formikProps.values.username}
                        onChangeText={formikProps.handleChange('username')}
                        onBlur={formikProps.handleBlur('username')}
                      />
                    </FormFieldWrapper>
                  </View>
                </View>

                <View style={styles.switchMainViewContainer}>
                  <View style={styles.switchMainView}>
                    <Text style={styles.profileText}>Profile</Text>
                    <View style={styles.privateView}>
                      <Text
                        style={[
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            color: !formikProps.values.isPrivate
                              ? '#FF2485'
                              : '#707070',
                          },
                          styles.visibilitySwitchText,
                        ]}>
                        Public
                      </Text>
                      <Switch
                        style={styles.switch}
                        thumbColor="#FF2485"
                        trackColor={{true: '#EDEDED', false: '#EDEDED'}}
                        onValueChange={(value) =>
                          formikProps.setFieldValue('isPrivate', value)
                        }
                        value={formikProps.values.isPrivate}
                      />

                      <Text
                        style={[
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            color: formikProps.values.isPrivate
                              ? '#FF2485'
                              : '#707070',
                          },
                          styles.visibilitySwitchText,
                        ]}>
                        Private
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.bottomView}>
                <View style={styles.buttonSubmitView}>
                  <FormButton
                    title="SIGN UP"
                    containerStyles={styles.buttonSubmit}
                    loading={isLoading}
                    disabled={isLoading || !formikProps.isValid}
                    onPress={formikProps.handleSubmit}
                  />
                </View>

                {/* social icon  */}

                <View style={styles.socialBottomView}>
                  <View style={styles.buttonContainer}>
                    <View style={styles.buttonSocialView}>
                      <SocialIcon
                        style={styles.buttonSocial}
                        button
                        type="facebook"
                        onPress={() => {
                          // alert('facebook');
                        }}
                      />
                    </View>

                    <View style={styles.buttonSocialView}>
                      <SocialIcon
                        style={styles.buttonSocial}
                        button
                        type="twitter"
                        onPress={() => {
                          // alert('twitter');
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={styles.bottomText}>
                    By creating an account, you agree to our
                  </Text>
                </View>

                <View style={styles.termsView}>
                  <Text style={styles.termsText}>Terms of Service</Text>
                  <Text style={styles.and}>and</Text>
                  <Text style={styles.termsText}>Privacy Policy</Text>
                </View>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    signUp: (creds: Creds, user: UserI, avatarFilePath: string) =>
      dispatch(authOperations.signUp(creds, user, avatarFilePath)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    authError: state.auth.signUpError,
    isLoading: state.auth.signUpLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfile);
