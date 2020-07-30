import React from 'react';
import {Image, Text, View, SafeAreaView, Switch} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  followersandfollowing: boolean;
}
const INITIAL_STATE: ComponentState = {
  followersandfollowing: false,
};
class TwoFactorAuthentication extends React.Component<
  ComponentProps,
  ComponentState
> {
  CloseTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.CloseTapped = this.CloseTapped.bind(this);
  }

  FollowersAndFollowingtoggleSwitch = (value: boolean) => {
    this.setState({followersandfollowing: value});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.navigationText}>
            Two-Factor Authentication
          </Text>
          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.CloseTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />

        <View style={styles.mathodView}>
          <Text style={styles.mathodText}>Method</Text>
          <Text style={styles.mathodSubTitleText}>
            Choose a method to use when we need to confirm that you’re logging
            in
          </Text>
        </View>
        <View style={styles.textMassageView}>
          <Text style={styles.messageText}>Text Message</Text>
          <View style={styles.switchView}>
            <Switch
              thumbColor="#FF2485"
              trackColor={{true: '#FF2485', false: '#EDEDED'}}
              onValueChange={this.FollowersAndFollowingtoggleSwitch}
              value={this.state.followersandfollowing}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default TwoFactorAuthentication;
