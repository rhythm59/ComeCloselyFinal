import React from 'react';
import {Image, Text, View, SafeAreaView, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  dataAbout: Array<string>;
}
const INITIAL_STATE: ComponentState = {
  dataAbout: [
    'About :',
    '- ComeClosely Panel',
    '- Ability to sell tickets',
    '- Presence on “ Featured “ Section',
    '- Map priority',
    '- Create event',
    '- Spotlight zone access',
    '- Inbox message to users',
    '- Fast Payout',
    '- High Security Payment',
    '- QR Tickets Generator',
  ],
};
class SwitchToEvent extends React.Component<ComponentProps, ComponentState> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.closeTapped = this.closeTapped.bind(this);
  }

  renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.headerView}>
        <Text style={styles.headerTxt}>{item}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.navigationText}>
            Switch to Event Account
          </Text>
          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView}></View>
        <ScrollView style={{width: '100%', height: '88%', alignSelf: 'center'}}>
          <View style={styles.subscriptionView}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.subscriptionTxt}>
              Yearly Subscription : 1200$
            </Text>
          </View>
          <View style={{width: '100%', height: '88%', alignSelf: 'center'}}>
            <FlatList
              data={this.state.dataAbout}
              keyExtractor={(x, i) => i.toString()}
              renderItem={this.renderItem}
            />
            <TouchableOpacity style={styles.bottomView}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.reqEventAccountTxt}>
                Request an event account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomMainView}>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SwitchToEvent;
