import React, { Fragment } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import { connect, useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as Progress from 'react-native-progress';
import Menu from '../../components/Menu';
import SideMenu from 'react-native-side-menu';
import { AppImages } from '../../config';
import styles from './styles';
import { AuthContext } from '../../../providers/auth';
import { UserI } from '../../../state/types';
import { userOperations } from '../../../state/ducks/user';
import UserView from '../Messenger/components/UserView';
import { getGravatarSrc } from '../../../utils';
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';
import { Formik } from 'formik';
import FormFieldWrapper from '../../components/FormFieldWrapper';
import MapLocationSelectionModal from '../../components/MapLocationSelectionModal';
import FormButton from '../../components/FormButton';
import TextInputCustome from 'react-native-textinput-with-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';

interface DataSourceI {
  name: string;
}
interface ComponentProps {
  navigation: any;
  route: any;
  memories: any;
  user: UserI;
  userToView: any;
  getUserError: string;
  getUserLoading: boolean;
  followUser: any,
  following: any,
  follower: any,
  getUser(id: string): void;
  getFollowing(id: string): void;
  getFollower(id: string): void;
  getMessages(id: string, messages: any): void;
  unfollowUser(userKey: string, followUserKey: any): void;
  setViewUser(userKey: string): void;
}
interface ComponentState {
  dataSource: Array<DataSourceI>;
  ignoreResetUser: boolean;
  isOpen: boolean;
  isModalVisible: boolean;
  avatarSource: string;
  selectedItem: string | undefined;
  avatarBackgroundColor: string;
  isDatePickerVisible: boolean;
  isTimePickerVisible: boolean;
}
const INITIAL_STATE: ComponentState = {
  isOpen: false,
  isModalVisible: false,
  dataSource: [],
  avatarSource: '',
  ignoreResetUser: false,
  selectedItem: 'Profile',
  avatarBackgroundColor: 'rgba(0,0,0,0)',
  isDatePickerVisible: false,
  isTimePickerVisible: false,
};
const options: ImagePickerOptions = {
    title: 'Choose Photo',
    takePhotoButtonTitle: 'Camera',
    chooseFromLibraryButtonTitle: 'Gallery',
    mediaType: 'photo',
    quality: 0.5,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
interface FormI {
  title: string;
  type: string;
  location: string;
  date: string;
  time: string;
  ticketsAvailable: number;
  ticketPrice: number;
  description: string;
  otherDetails: string;
  coverPhoto: string;
}
const INITIAL_FORM_STATE: FormI = {
  title: '',
  type: '',
  location: '',
  date: '',
  time: '',
  ticketsAvailable: 0,
  ticketPrice: 0,
  description: '',
  otherDetails: '',
  coverPhoto: '',
};
const validationSchema = Yup.object().shape({
  // title: Yup.string()
  //   .label('Title')
  //   .required('Please enter title of event')
  //   .min(3, 'Must have at least 3 characters')
  //   .max(100, 'Must have at most 100 characters'),
  // type: Yup.string()
  //   .label('Event Type')
  //   .required('Please select type of event'),
  // location: Yup.string()
  //   .label('Location')
  //   .required('Please enter the location of event'),
  // date: Yup.string().label('Date').required('Please select date for event'),
  // time: Yup.string().label('Time').required('Please select time for event'),
  // ticketsAvailable: Yup.number()
  //   .label('Number Of Tickets')
  //   .required('Please enter number of tickets for event')
  //   .test(
  //     'non-zero-tickets',
  //     'At least one ticket should be available',
  //     function (value) {
  //       return value > 0;
  //     },
  //   ),
  // ticketPrice: Yup.number()
  //   .label('Price Of Ticket')
  //   .required('Please enter price of ticket for event')
  //   .test(
  //     'non-zero-tickets',
  //     'Price should be greater than zero',
  //     function (value) {
  //       return value > 0;
  //     },
  //   ),
  // description: Yup.string()
  //   .label('Description')
  //   .required('Please enter small description of event')
  //   .min(5, 'Must have at least 5 characters')
  //   .max(1000, 'Must have at most 1000 characters'),
  // otherDetails: Yup.string()
  //   .label('Other details')
  //   .required('Please enter other details of event')
  //   .min(5, 'Must have at least 5 characters')
  //   .max(1000, 'Must have at most 1000 characters'),
  // coverPhoto: Yup.string()
  //   .label('Cover Photo')
  //   .required('Please select a cover photo for event'),
});

class EditProfile extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.menuTapped = this.menuTapped.bind(this);
  }
  menuTapped() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  closeTapped = () => {
    this.props.navigation.goBack();
  }

  updateMenuState(isOpen: boolean) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = (item: any) => {
    this.props.navigation.navigate(item);
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };
  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };
  

  componentDidUpdate(prevProps: any, prevState: any) {
    let flowType = this.props.route?.params?.flowType;
    let prevFlowType = prevProps.route?.params?.flowType;
    if (flowType !== prevFlowType) {
      if (flowType === 'userToView')
        this.props.getUser(this.props.userToView);
      else
        this.props.getUser(this.context.currentUser.uid);
    }
  }
  
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      if (!this.state.ignoreResetUser) {
        this.props.getUser(this.context.currentUser.uid)
        this.props.setViewUser(null)
      }
      this._unsubscribe();
      // do something
    });
    const dataSource = this.props.memories.filter((item: any) => item.userId == this.props.userToView)
    this.setState({ dataSource })

    var that = this;
    // let items = Array.apply(null, Array(10)).map((v, i) => {
    //   return { id: i, src: 'https://unsplash.it/400/400?image=' + (i + 1) };
    // });
    // that.setState({
    //   dataSource: items,
    // });
    if (this.props.userToView)
      that.props.getUser(this.props.userToView);
    else
      that.props.getUser(that.context.currentUser.uid);
    // this.props.getFollowing(that.context.currentUser.uid)
    // this.props.getFollower(that.context.currentUser.uid)
    this.props.getFollowing(this.props.userToView)
    this.props.getFollower(this.props.userToView)
    this.props.getMessages(that.context.currentUser.uid, this.props.userToView)
  }

  onChange() {
    this.props.getFollower(this.props.userToView)
    this.props.getMessages(this.context.currentUser.uid, this.props.userToView)
  }

  handleSubmit(values: FormI) {
    let userId = this.context.currentUser.uid    
  }
  
  render() {
    const { getUserLoading, user, follower } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
        menuPosition="right">
          <View style={styles.mainView}>
              <View style={styles.backImage}>
                <Image
                  style={styles.backgroundImage}
                  source={AppImages.otherNavigation}
                />                
              </View>
              <View style={styles.overlay}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Edit My Profile</Text>
                  <TouchableOpacity
                    onPress={this.closeTapped}
                    style={styles.closeIconView}>
                    <Image 
                      source={AppImages.close} 
                      style={styles.closeIcon} 
                      tintColor='#FF2485' />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileImageView}>
                <TouchableHighlight
                      underlayColor="rgba(0,0,0,0)"
                      onPress={() => {
                        ImagePicker.showImagePicker(options, (response) => {
                        
                        if (response.didCancel) {
                          
                        } else if (response.error) {
                         
                        } else if (response.customButton) {
                          
                        } else {
                          this.setState({
                          avatarSource: response.uri,
                          });
                          this.setState({
                          avatarBackgroundColor: 'black',
                          });
                        }
                      });
                  }}>
                  <View style={styles.shadowBack}>                    
                    <Image
                        style={styles.profileImage}
                        source={{ uri: user?.displayPhoto || getGravatarSrc(user.email) }}
                    />
                    <Image source={AppImages.camera} style={styles.cameraEdit} />
                  </View>
                </TouchableHighlight>
              </View> 
              <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  this.handleSubmit(values);
                }}>
                {(formikProps) => (
                  <Fragment>
                    <ScrollView style={styles.eventsFormMainView}>
                      <View>
                        <View style={styles.eventsFormMainChildView}>
                          <View style={styles.descriptionTextView}>
                            <Text style={styles.descriptionText}>Username</Text>
                          </View>
                          <FormFieldWrapper
                            formikProps={formikProps}
                            formikKey="username"
                            containerStyles={styles.fieldWrapper}>
                            <TextInputCustome
                              style={styles.textInput}
                              fontFamily="Gilroy-SemiBold"
                              underlineColor="#FF2485"
                              underlineActiveColor="#FF2485"
                              containerMaxWidth="100%"
                              value={this.props.user.username}
                            />
                          </FormFieldWrapper>


                          <View style={styles.descriptionTextView}>
                            <Text style={styles.descriptionText}>Name</Text>
                          </View>
                          <FormFieldWrapper
                            formikProps={formikProps}
                            formikKey="name"
                            containerStyles={styles.fieldWrapper}>
                            <TextInputCustome
                              style={styles.textInput}
                              fontFamily="Gilroy-SemiBold"
                              underlineColor="#FF2485"
                              underlineActiveColor="#FF2485"
                              containerMaxWidth="100%"
                              value={this.props.user.name}
                            />
                          </FormFieldWrapper>

                          <View style={styles.descriptionTextView}>
                            <Text style={styles.descriptionText}>Bio</Text>
                          </View>
                          <FormFieldWrapper
                            formikProps={formikProps}
                            formikKey="otherDetails"
                            containerStyles={styles.fieldWrapper}>
                            <TextInputCustome
                              style={styles.textInput}
                              fontFamily="Gilroy-SemiBold"
                              underlineColor="#FF2485"
                              underlineActiveColor="#FF2485"
                              containerMaxWidth="100%"
                              value="Party hard, etc …"
                            />
                          </FormFieldWrapper>

                          <View style={styles.descriptionTextView}>
                            <Text style={styles.descriptionText}>Email</Text>
                          </View>
                          <FormFieldWrapper
                            formikProps={formikProps}
                            formikKey="email"
                            containerStyles={styles.fieldWrapper}>
                            <TextInputCustome
                              style={styles.textInput}
                              underlineColor="#FF2485"
                              underlineActiveColor="#FF2485"
                              fontFamily="Gilroy-SemiBold"
                              value={this.props.user.email}
                              containerMaxWidth="100%"                              
                            />
                          </FormFieldWrapper>

                          <View style={styles.descriptionTextView}>
                            <Text style={styles.descriptionText}>Phone</Text>
                          </View>
                          <FormFieldWrapper
                            formikProps={formikProps}
                            formikKey="phone"
                            containerStyles={styles.fieldWrapper}>
                            <TextInputCustome
                              style={styles.textInput}
                              underlineColor="#FF2485"
                              underlineActiveColor="#FF2485"
                              fontFamily="Gilroy-SemiBold"
                              value={this.props.user.phone}
                              containerMaxWidth="100%"                              
                            />
                          </FormFieldWrapper>

                          <View style={styles.descriptionTextView}>
                            <Text style={styles.descriptionText}>Gender</Text>
                          </View>
                          <FormFieldWrapper
                            formikProps={formikProps}
                            formikKey="gender"
                            containerStyles={styles.fieldWrapper}>
                            <TextInputCustome
                              style={styles.textInput}
                              underlineColor="#FF2485"
                              underlineActiveColor="#FF2485"
                              fontFamily="Gilroy-SemiBold"
                              value="Male"
                              containerMaxWidth="100%"                              
                            />
                          </FormFieldWrapper>

                          <FormButton
                            title="Save"
                            containerStyles={styles.buttonSubmit}   
                            onPress={formikProps.handleSubmit}
                          />
                    </View>
                  </View>
                </ScrollView>
              </Fragment>
            )}
            </Formik> 
          </View>
        </SideMenu>
    );
  }
}
EditProfile.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getUser: (id: string) => dispatch(userOperations.getUser(id)),
    getFollowing: (key: string) => dispatch(userOperations.getFollowing(key)),
    getFollower: (key: string) => dispatch(userOperations.getFollower(key)),
    followUser: (userKey: string, followUserKey: string) => dispatch(userOperations.followUser(userKey, followUserKey)),
    unfollowUser: (userKey: string, followUserKey: string) => dispatch(userOperations.unfollowUser(userKey, followUserKey)),
    getMessages: (userKey: string, otherUserKey: string) => dispatch(userOperations.getMessages(userKey, otherUserKey)),
    setViewUser: (key: string) => dispatch(userOperations.viewUser(key))
  };
};

const mapStateToProps = (state: any) => {
  return {
    memories: state.memories.memories,
    user: state.user.user,
    getUserError: state.user.getUserError,
    getUserLoading: state.user.getUserLoading,
    follower: state.user.follower,
    following: state.user.following,
    userToView: state.user.userToView,

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
