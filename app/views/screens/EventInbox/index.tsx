import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}

class EventInbox extends React.Component<ComponentProps> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    (this.state = {}), (this.closeTapped = this.closeTapped.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerChildView}>
          <View>
            <Image
              style={styles.backGroundImage}
              source={AppImages.homeNavigation}
            />
            <View style={styles.overlay}>
              <View style={styles.inboxView}>
                <View style={styles.inboxTitleContainer}>
                  <Text style={styles.createFollowText}>Inbox</Text>
                  <TouchableOpacity
                    onPress={this.closeTapped}
                    style={styles.closeIcon}>
                    <Image
                      source={AppImages.close}
                      style={{resizeMode: 'contain', flex: 1}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.followMainView}>
            <View style={styles.todayView}>
              <Text style={styles.todayText}>Today</Text>
            </View>
            <View style={styles.mashiView}>
              <Text style={styles.mashiTitle}>Mashi Festival Event</Text>
              <Text style={styles.mashiDescription}>
                Event cancelled due to high risk of rain new date will be
                release tomorrow morning! if you need help, please contact us.
              </Text>
            </View>
            <View style={styles.sushiView}>
              <Text style={styles.sushiText}>Sushi Party Night</Text>
              <Text style={styles.sushiDescription}>
                The Dj,David Guetteira won't be able to Appear on Saturday due
                to sickness. New Dj will be announced on Thursday!
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default EventInbox;
