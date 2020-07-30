import React from 'react';
import {Image, Text, View, SafeAreaView, Switch} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  switchValue: boolean;
  followersandfollowing: boolean;
  onlyfollowers: boolean;
}
const INITIAL_STATE: ComponentState = {
  switchValue: false,
  followersandfollowing: false,
  onlyfollowers: false,
};

class AllowComments extends React.Component<ComponentProps, ComponentState> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.closeTapped = this.closeTapped.bind(this);
  }

  everyoneToggleSwitch = (value: boolean) => {
    this.setState({switchValue: value});
  };

  followersAndFollowingToggleSwitch = (value: boolean) => {
    this.setState({followersandfollowing: value});
  };

  onlyFollowersToggleSwitch = (value: boolean) => {
    this.setState({onlyfollowers: value});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.navigationText}>
            Allow Comments
          </Text>

          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />

        <View style={styles.allowCommentsformView}>
          <Text style={styles.allowComments}>Allow Comments From</Text>
        </View>

        <View style={styles.cellMainView}>
          <Text style={styles.allowComments}>Everyone</Text>
          <View style={styles.switchView}>
            <Switch
              thumbColor="#FF2485"
              trackColor={{true: '#FF2485', false: '#EDEDED'}}
              onValueChange={this.everyoneToggleSwitch}
              value={this.state.switchValue}
            />
          </View>
        </View>

        <View style={styles.cellMainView}>
          <Text style={styles.allowComments}>Only followers and Following</Text>
          <View style={styles.switchView}>
            <Switch
              thumbColor="#FF2485"
              trackColor={{true: '#FF2485', false: '#EDEDED'}}
              onValueChange={this.followersAndFollowingToggleSwitch}
              value={this.state.followersandfollowing}
            />
          </View>
        </View>

        <View style={styles.cellMainView}>
          <Text style={styles.allowComments}>Only followers</Text>
          <View style={styles.switchView}>
            <Switch
              thumbColor="#FF2485"
              trackColor={{true: '#FF2485', false: '#EDEDED'}}
              onValueChange={this.onlyFollowersToggleSwitch}
              value={this.state.onlyfollowers}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AllowComments;
