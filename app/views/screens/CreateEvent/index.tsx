import React, { Fragment } from 'react';
import {
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import TextInputCustome from 'react-native-textinput-with-icons';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { AppImages } from '../../config';
import styles from './styles';
import FormFieldWrapper from '../../components/FormFieldWrapper';
import MapLocationSelectionModal from '../../components/MapLocationSelectionModal';
import FormButton from '../../components/FormButton';
import { EventI, EventTypeI } from '../../../state/types';
import { eventOperations } from '../../../state/ducks/event';
import { AuthContext } from '../../../providers/auth';

interface ComponentProp {
  navigation: any;
  eventTypes: Array<EventTypeI>;
  getEventTypesLoading: boolean;
  error: string;
  isLoading: boolean;
  addEventSuccess: boolean;
  addEvent(event: EventI, onAddEventSuccess: any): void;
  getEventTypes(): Array<EventTypeI>;
}
interface ComponentState {
  coverPhotoSource: string;
  coverPhotoSourcePath: string | undefined;
  isDatePickerVisible: boolean;
  isTimePickerVisible: boolean;
  isMapViewModalVisible: boolean;
}
const INITIAL_STATE: ComponentState = {
  coverPhotoSource: '',
  coverPhotoSourcePath: undefined,
  isDatePickerVisible: false,
  isTimePickerVisible: false,
  isMapViewModalVisible: false,
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
  title: Yup.string()
    .label('Title')
    .required('Please enter title of event')
    .min(3, 'Must have at least 3 characters')
    .max(100, 'Must have at most 100 characters'),
  type: Yup.string()
    .label('Event Type')
    .required('Please select type of event'),
  location: Yup.string()
    .label('Location')
    .required('Please enter the location of event'),
  date: Yup.string().label('Date').required('Please select date for event'),
  time: Yup.string().label('Time').required('Please select time for event'),
  ticketsAvailable: Yup.number()
    .label('Number Of Tickets')
    .required('Please enter number of tickets for event')
    .test(
      'non-zero-tickets',
      'At least one ticket should be available',
      function (value) {
        return value > 0;
      },
    ),
  ticketPrice: Yup.number()
    .label('Price Of Ticket')
    .required('Please enter price of ticket for event')
    .test(
      'non-zero-tickets',
      'Price should be greater than zero',
      function (value) {
        return value > 0;
      },
    ),
  description: Yup.string()
    .label('Description')
    .required('Please enter small description of event')
    .min(5, 'Must have at least 5 characters')
    .max(1000, 'Must have at most 1000 characters'),
  otherDetails: Yup.string()
    .label('Other details')
    .required('Please enter other details of event')
    .min(5, 'Must have at least 5 characters')
    .max(1000, 'Must have at most 1000 characters'),
  coverPhoto: Yup.string()
    .label('Cover Photo')
    .required('Please select a cover photo for event'),
});

class CreateEvent extends React.Component<ComponentProp, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  closeTapped = () => {
    this.props.navigation.goBack();
  }
  handleSelectEventType = (type: string, formikProps: any) => {
    formikProps.setFieldValue('type', type);
    if (!formikProps.touched.type) {
      formikProps.setFieldTouched('type', true);
    }
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

  toggleMapViewModal = () => {
    this.setState({ isMapViewModalVisible: !this.state.isMapViewModalVisible })
  }
  onAddEventSuccess = () => { this.props.navigation.goBack() }
  handleSubmit(values: FormI) {
    let userId = this.context.currentUser.uid
    const data: EventI = {
      ...values,
      userId
    };
    this.props.addEvent(data, this.onAddEventSuccess);
  }

  componentDidMount() {
    this.props.getEventTypes();
  }

  eventTypeListItem = (data: any, formikProps: any) => (
    <TouchableOpacity
      style={[
        styles.eventTypeItemView,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor:
            formikProps.values.type === data.item.name ? '#FF2485' : 'white',
        },
      ]}
      onPress={() => this.handleSelectEventType(data.item.name, formikProps)}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontFamily: 'Gilroy-ExtraBold',
          alignSelf: 'center',
          color:
            formikProps.values.type === data.item.name ? 'white' : '#BEBEBE',
        }}>
        {data.item.name}
      </Text>
    </TouchableOpacity>
  );

  chooseFile = (formikProps: any) => {
    var options: ImagePickerOptions = {
      title: 'Choose Photo',
      takePhotoButtonTitle: 'Camera',
      chooseFromLibraryButtonTitle: 'Gallery',
      mediaType: 'photo',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
      
      if (response.didCancel) {       
      } else if (response.error) {        
      } else if (response.customButton) {        
      } else {
        this.setState({
          coverPhotoSource: response.uri,
        });
        formikProps.setFieldValue('coverPhoto', response.path);
      }
    });
  };

  render() {
    const { eventTypes, getEventTypesLoading, isLoading } = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.bgImageView}>
          <Image style={styles.bgImage} source={AppImages.homeNavigation} />
        </View>

        <View style={styles.overlay}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Create Event</Text>
            <TouchableOpacity
              onPress={this.closeTapped}
              style={styles.closeIconView}>
              <Image source={AppImages.close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
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
                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="title"
                      containerStyles={styles.fieldWrapper}>
                      <TextInputCustome
                        style={styles.textInput}
                        label="Title"
                        fontFamily="Gilroy-SemiBold"
                        labelColor="#D4D4D4"
                        labelActiveColor="#BEBEBE"
                        underlineActiveColor="#BEBEBE"
                        containerMaxWidth="100%"
                        value={formikProps.values.title}
                        onChangeText={formikProps.handleChange('title')}
                        onBlur={formikProps.handleBlur('title')}
                      />
                    </FormFieldWrapper>

                    <View style={styles.eventTypeView}>
                      <Text style={styles.eventTypeText}>Event Type</Text>
                    </View>
                    <View>
                      {getEventTypesLoading && (
                        <ActivityIndicator size="small" color="#FF2485" />
                      )}
                      {!getEventTypesLoading && (
                        <FormFieldWrapper
                          formikProps={formikProps}
                          formikKey="type"
                          containerStyles={styles.eventTypesView}>
                          <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={eventTypes}
                            renderItem={(item) =>
                              this.eventTypeListItem(item, formikProps)
                            }
                            keyExtractor={(item) => item.id}
                          />
                        </FormFieldWrapper>
                      )}
                    </View>

                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="location"
                      containerStyles={styles.fieldWrapper}>
                      <TextInputCustome
                        style={styles.textInput}
                        label="Location"
                        fontFamily="Gilroy-SemiBold"
                        labelColor="#D4D4D4"
                        labelActiveColor="#BEBEBE"
                        underlineActiveColor="#BEBEBE"
                        containerMaxWidth="100%"
                        /* rightIcon="map-marker"
                        rightIconType="awesome" */
                        value={formikProps.values.location}
                        // onChangeText={formikProps.handleChange('location')}
                        // onBlur={formikProps.handleBlur('location')}
                        onFocus={() => this.toggleMapViewModal()}
                      />
                      <MapLocationSelectionModal
                        visible={this.state.isMapViewModalVisible}
                        coordinate={
                          formikProps.values.location &&
                          {
                            longitude: parseFloat(formikProps.values.location.split(',')[0]),
                            latitude: parseFloat(formikProps.values.location.split(',')[1])
                          }
                        }
                        handlePosition={(e) => {
                          formikProps.setFieldValue(
                            'location',
                            e.nativeEvent.coordinate.longitude + ', ' + e.nativeEvent.coordinate.latitude,
                          )
                          this.toggleMapViewModal()
                        }}
                      />
                    </FormFieldWrapper>

                    <View style={styles.dateTimeView}>
                      <FormFieldWrapper
                        formikProps={formikProps}
                        formikKey="date"
                        containerStyles={styles.fieldWrapperHalf}>
                        <TextInputCustome
                          style={styles.textInput}
                          label="Date"
                          fontFamily="Gilroy-SemiBold"
                          labelColor="#D4D4D4"
                          labelActiveColor="#BEBEBE"
                          underlineActiveColor="#BEBEBE"
                          containerMaxWidth="100%"
                          /* rightIcon="calendar"
                          rightIconType="awesome" */
                          showSoftInputOnFocus={false}
                          value={formikProps.values.date}
                          onBlur={formikProps.handleBlur('date')}
                          onTouchEnd={() => this.showDatePicker()}
                        />
                      </FormFieldWrapper>
                      <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        onConfirm={(date: any) => {
                          this.hideDatePicker();
                          formikProps.setFieldValue(
                            'date',
                            moment(date).format('DD MMM YYYY'),
                          );
                        }}
                        onCancel={this.hideDatePicker}
                      />

                      <FormFieldWrapper
                        formikProps={formikProps}
                        formikKey="time"
                        containerStyles={styles.fieldWrapperHalf}>
                        <TextInputCustome
                          style={styles.textInput}
                          label="Time"
                          fontFamily="Gilroy-SemiBold"
                          labelColor="#D4D4D4"
                          labelActiveColor="#BEBEBE"
                          underlineActiveColor="#BEBEBE"
                          containerMaxWidth="100%"
                          /* rightIcon="clock"
                          rightIconType="awesome" */
                          showSoftInputOnFocus={false}
                          value={formikProps.values.time}
                          onBlur={formikProps.handleBlur('time')}
                          onTouchEnd={() => this.showTimePicker()}
                        />
                      </FormFieldWrapper>
                      <DateTimePickerModal
                        isVisible={this.state.isTimePickerVisible}
                        mode="time"
                        onConfirm={(time: any) => {
                          this.hideTimePicker();
                          formikProps.setFieldValue(
                            'time',
                            moment(time).format('hh:mm a'),
                          );
                        }}
                        onCancel={this.hideTimePicker}
                      />
                    </View>

                    <View style={styles.dateTimeView}>
                      <FormFieldWrapper
                        formikProps={formikProps}
                        formikKey="ticketsAvailable"
                        containerStyles={styles.fieldWrapperHalf}>
                        <TextInputCustome
                          style={styles.textInput}
                          label="Tickets available"
                          fontFamily="Gilroy-SemiBold"
                          labelColor="#D4D4D4"
                          labelActiveColor="#BEBEBE"
                          underlineActiveColor="#BEBEBE"
                          containerMaxWidth="100%"
                          /* rightIcon="ticket"
                          rightIconType="awesome" */
                          keyboardType={'phone-pad'}
                          returnKeyType={
                            Platform.OS === 'android' ? 'next' : 'done'
                          }
                          value={formikProps.values.ticketsAvailable}
                          onChangeText={formikProps.handleChange(
                            'ticketsAvailable',
                          )}
                          onBlur={formikProps.handleBlur('ticketsAvailable')}
                        />
                      </FormFieldWrapper>

                      <FormFieldWrapper
                        formikProps={formikProps}
                        formikKey="ticketPrice"
                        containerStyles={styles.fieldWrapperHalf}>
                        <TextInputCustome
                          style={styles.textInput}
                          label={"Ticket price"}
                          fontFamily="Gilroy-SemiBold"
                          labelColor="#D4D4D4"
                          labelActiveColor="#BEBEBE"
                          underlineActiveColor="#BEBEBE"
                          containerMaxWidth="100%"
                          /* rightIcon="ticket"
                          rightIconType="awesome" */
                          keyboardType={'phone-pad'}
                          returnKeyType={
                            Platform.OS === 'android' ? 'next' : 'done'
                          }
                          value={formikProps.values.ticketPrice}
                          onChangeText={formikProps.handleChange(
                            'ticketPrice',
                          )}
                          onBlur={formikProps.handleBlur('ticketPrice')}
                        />
                      </FormFieldWrapper>
                    </View>

                    <View style={styles.descriptionTextView}>
                      <Text style={styles.descriptionText}>Description</Text>
                    </View>
                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="description"
                      containerStyles={styles.descriptionView}>
                      <TextInput
                        style={styles.description}
                        underlineColorAndroid="transparent"
                        placeholder="Write a short description for your event..."
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        value={formikProps.values.description}
                        onChangeText={formikProps.handleChange('description')}
                        onBlur={formikProps.handleBlur('description')}
                      />
                    </FormFieldWrapper>

                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="otherDetails"
                      containerStyles={styles.fieldWrapper}>
                      <TextInputCustome
                        style={styles.textInput}
                        label="Other details"
                        fontFamily="Gilroy-SemiBold"
                        labelColor="#D4D4D4"
                        labelActiveColor="#BEBEBE"
                        underlineActiveColor="#BEBEBE"
                        containerMaxWidth="100%"
                        value={formikProps.values.otherDetails}
                        onChangeText={formikProps.handleChange('otherDetails')}
                        onBlur={formikProps.handleBlur('otherDetails')}
                      />
                    </FormFieldWrapper>

                    <View style={styles.addCoverImageView}>
                      <View style={styles.addCoverTextView}>
                        <Text style={styles.addCoverText}>Add Cover Image</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          this.chooseFile(formikProps);
                        }}
                        style={styles.addCoverimageAddIcon}>
                        <Image source={AppImages.imageaddButton} />
                      </TouchableOpacity>
                    </View>

                    <FormFieldWrapper
                      formikProps={formikProps}
                      formikKey="coverPhoto"
                      containerStyles={{}}>
                      {this.state.coverPhotoSource &&
                        this.state.coverPhotoSource !== '' ? (
                          <Image
                            style={styles.uploadImage}
                            source={{ uri: this.state.coverPhotoSource }}
                          />
                        ) : (
                          <Image
                            style={styles.uploadImage}
                            source={AppImages.imagePlaceholder}
                          />
                        )}
                    </FormFieldWrapper>

                    <FormButton
                      title="CREATE EVENT"
                      containerStyles={styles.buttonSubmit}
                      loading={isLoading}
                      disabled={
                        getEventTypesLoading ||
                        isLoading ||
                        !formikProps.isValid
                      }
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                </View>
              </ScrollView>
            </Fragment>
          )}
        </Formik> 
      </View>
    );
  }
}
CreateEvent.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getEventTypes: () => dispatch(eventOperations.getEventTypes()),
    addEvent: (event: EventI, onAddEventSuccess: any) => dispatch(eventOperations.addEvent(event, onAddEventSuccess)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    eventTypes: state.event.eventTypes,
    getEventTypesError: state.event.getEventTypesError,
    getEventTypesLoading: state.event.getEventTypesLoading,
    error: state.event.addEventError,
    isLoading: state.event.addEventLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
