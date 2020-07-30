import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import Modal from 'react-native-modal';

import { AppImages } from '../../config';
import styles from './styles';
import Loading from '../../components/Loading';
import { EventI } from '../../../state/types';
import { eventOperations } from '../../../state/ducks/event';
import { AuthContext } from '../../../providers/auth';

interface ComponentProps {
  navigation: any;
  events: Array<EventI>;
  getEventsError: string;
  getEventsLoading: boolean;
  deleteEventError: string;
  deleteEventLoading: boolean;
  getEvents(): Array<EventI>;
  deleteEvent(id: string): void;
}
interface DataSourceI {
  id: number;
  type: string;
  title: string;
  time: string;
}
interface ComponentState {
  isModalVisible: boolean;
  selectedEventId: string | undefined;
}
const INITIAL_STATE: ComponentState = {
  isModalVisible: false,
  selectedEventId: undefined,
};

class MyEvents extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  showModal = (id: string | undefined) => {
    this.setState({
      selectedEventId: id,
      isModalVisible: true,
    });
  };

  modalYes = () => {
    this.setState({
      isModalVisible: false,
    });
    if (this.state.selectedEventId) {
      this.props.deleteEvent(this.state.selectedEventId);
    }
  };

  modalNo = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  formattedDate(date: string): string {
    console.log('date:', date)
    return date?.substring(0, date.lastIndexOf(' ') + 1);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events, getEventsLoading, deleteEventLoading } = this.props;
    console.log(events)
    return (
      <View style={styles.mainView}>
        {/* <ScrollView> */}
        <View style={styles.backImage}>
          <Image
            style={styles.backgroundImage}
            source={AppImages.homeNavigation}
          />
        </View>

        <View style={styles.overlay}>
          <View style={styles.profileTextView}>
            <View>
              <Text style={styles.profileText}>My Events</Text>
            </View>
            <View style={styles.menuImageViewContainer}>
              <View style={styles.menuImageView}>
                <Image style={styles.menuImage} source={AppImages.menu} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.eventsView}>
          {/* <ScrollView> */}
          {(getEventsLoading || deleteEventLoading) && <Loading />}
          {!getEventsLoading && (
            <FlatList
              contentContainerStyle={styles.eventsListContainer}
              data={events.filter(e => (e.userId == this.context?.currentUser?.uid))}
              keyExtractor={(event: EventI) => event.id}
              renderItem={({ item, index }) => {
                const event = item;
                return (
                  <View key={event.id} style={styles.eventView}>
                    <Modal isVisible={this.state.isModalVisible}>
                      <View style={styles.deleteModelView}>
                        <View style={styles.deleteModelTitleView}>
                          <Text style={styles.deleteModelTitleText}>
                            Delete Event
                            </Text>
                        </View>

                        <View style={styles.deleteModelSubTitleView}>
                          <Text style={styles.deleteModelSubTitleText}>
                            Are you sure you {'\n'} want to delete this event?
                            </Text>
                        </View>

                        <View style={styles.deleteModelYesORNoView}>
                          <TouchableOpacity
                            onPress={this.modalYes}
                            style={styles.deleteModelYesBtnView}>
                            <Text style={styles.deleteModelYesBtnText}>
                              Yes
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={this.modalNo}
                            style={styles.deleteModelNoBtnView}>
                            <Text style={styles.deleteModelNoBtnText}>
                              No
                              </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>

                    <ImageBackground
                      style={styles.backImage}
                      source={{ uri: event.coverPhoto }}>
                      <View style={styles.imageHeader}>
                        <View style={styles.typeView}>
                          <Text style={styles.typeText}>{event.type}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            this.showModal(event.id);
                          }}
                          style={styles.deleteImageView}>
                          <Image source={AppImages.delete} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.dateTitleView}>
                        <View style={styles.dateView}>
                          {console.log(event)}
                          <Text style={styles.dateText}>
                            {this.formattedDate(event.date)} | {event.time}
                          </Text>
                        </View>
                        <View style={styles.titleView}>
                          <Text
                            style={styles.titleText}
                            adjustsFontSizeToFit
                            numberOfLines={2}>
                            {event.title}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                )
              }}
            />
          )}
          {/* </ScrollView> */}
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}
MyEvents.contextType = AuthContext;

//export default MyEvents;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getEvents: () => dispatch(eventOperations.getEvents()),
    deleteEvent: (id: string) => dispatch(eventOperations.deleteEvent(id)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    events: state.event.events,
    getEventsError: state.event.getEventsError,
    getEventsLoading: state.event.getEventsLoading,
    deleteEventError: state.event.deleteEventError,
    deleteEventLoading: state.event.deleteEventLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
