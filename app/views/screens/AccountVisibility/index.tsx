import React from 'react';
import {Image, Text, View, SafeAreaView, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppImages} from '../../config';
import styles from './styles';

interface ComponentState {
  switchValue: boolean;
  dataLanguage: Array<string>;
}const INITIAL_STATE: ComponentState = {
  switchValue: false,
  dataLanguage: [
    'English',
    'French',
    'Spanish',
    'Russian',
    'Portuguese',
    'German',
    'Dutch',
    'Chinese',
    'Polish',
    'Italian',
    'Arabish',
    'Romana',
    'Norwegian',
    'Bulgarian',
    'Serbian',
    'Indi',
    'Japanese',
    'Korean',
  ],
};

class AccountVisibility extends React.Component<
  {navigation: any},
  ComponentState
> {
  CloseTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.CloseTapped = this.CloseTapped.bind(this);
  }

  changeAccountSwitch = (value: any) => {
    this.setState({switchValue: value});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.navigationText}>
            Account Public/Private
          </Text>

          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.CloseTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />

        {/* <View style={styles.headerView}>
          <Image />
        </View> */}

        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.PrivateAccountTxt}>
          Private Account
        </Text>
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          style={styles.descriptionText}>
          Once your account is private, only people you \n approve can see your
          memories and event locations.
        </Text>

        <View style={styles.switchMainView}>
          <Text
            style={[
              styles.privateTxt,
              {color: !this.state.switchValue ? '#FF2485' : '#707070'},
            ]}>
            Private
          </Text>
          <Switch
            style={{marginLeft: 5}}
            thumbColor="#FF2485"
            trackColor={{true: '#EDEDED', false: '#EDEDED'}}
            onValueChange={this.changeAccountSwitch}
            value={this.state.switchValue}
          />
          <Text
            style={[
              styles.publicTxt,
              {color: this.state.switchValue ? '#FF2485' : '#707070'},
            ]}>
            Public
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default AccountVisibility;
