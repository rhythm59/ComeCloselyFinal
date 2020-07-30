import React from 'react';
import {Image, Text, View, SafeAreaView} from 'react-native';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
class AppSettings extends React.Component<ComponentProps> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  languageTapped() {
    this.props.navigation.navigate('Language');
  }

  switchToEventTapped() {
    this.props.navigation.navigate('SwitchToEvent');
  }

  blockedAccountsTapped() {
    this.props.navigation.navigate('BlockedAccounts');
  }

  accountPublicPrivateTapped() {
    this.props.navigation.navigate('AccountPublicOrPrivate');
  }

  allowCommentsTapped() {
    this.props.navigation.navigate('AllowComments');
  }

  storySettingsTapped() {
    this.props.navigation.navigate('StorySettings');
  }

  changePasswordTapped() {
    this.props.navigation.navigate('ChangePassword');
  }

  loginActivityTapped() {
    this.props.navigation.navigate('LoginActivity');
  }

  twoFactorAuthenticationTapped() {
    this.props.navigation.navigate('TwoFactorAuthentication');
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {};
    this.closeTapped = this.closeTapped.bind(this);
    this.languageTapped = this.languageTapped.bind(this);
    this.switchToEventTapped = this.switchToEventTapped.bind(this);
    this.accountPublicPrivateTapped = this.accountPublicPrivateTapped.bind(
      this,
    );
    this.blockedAccountsTapped = this.blockedAccountsTapped.bind(this);
    this.allowCommentsTapped = this.allowCommentsTapped.bind(this);
    this.storySettingsTapped = this.storySettingsTapped.bind(this);
    this.changePasswordTapped = this.changePasswordTapped.bind(this);
    this.loginActivityTapped = this.loginActivityTapped.bind(this);
    this.twoFactorAuthenticationTapped = this.twoFactorAuthenticationTapped.bind(
      this,
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text style={styles.navigationText}>Settings</Text>
          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />
        <ScrollView>
          <View style={styles.headerView}>
            <View style={styles.headerImageView}>
              <Image source={AppImages.account} style={styles.headerImage} />
            </View>
            <Text style={styles.headerTxt}>Account</Text>
          </View>
          <TouchableOpacity
            onPress={this.languageTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Language</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Request Verification</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.switchToEventTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text adjustsFontSizeToFit style={styles.cellTxt} numberOfLines={2}>
              Switch to Event Company Account
            </Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerView}>
            <View style={styles.headerImageView}>
              <Image source={AppImages.privacy} style={styles.headerImage} />
            </View>
            <Text style={styles.headerTxt}>Privacy</Text>
          </View>
          <TouchableOpacity
            onPress={this.accountPublicPrivateTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Account Public/Private</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.blockedAccountsTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Blocked Accounts</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.allowCommentsTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Allow Comments from </Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.storySettingsTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Story</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerView}>
            <View style={styles.headerImageView}>
              <Image source={AppImages.security} style={styles.headerImage} />
            </View>
            <Text style={styles.headerTxt}>Security</Text>
          </View>
          <TouchableOpacity
            onPress={this.changePasswordTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Password</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.loginActivityTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Login Activity</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.twoFactorAuthenticationTapped}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt} numberOfLines={2}>
              Two-Factor Authentication
            </Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerView}>
            <View style={styles.headerImageView}>
              <Image source={AppImages.help} style={styles.headerImage} />
            </View>
            <Text style={styles.headerTxt}>Help</Text>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Report a Problem</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Help Center</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerView}>
            <View style={styles.headerImageView}>
              <Image source={AppImages.about} style={styles.headerImage} />
            </View>
            <Text style={styles.headerTxt}>About</Text>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Data Policy</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.cellView}>
            <View style={styles.cellLeftImage} />
            <Text style={styles.cellTxt}>Terms of Use</Text>
            <View style={styles.cellRightView}>
              <Image
                source={AppImages.arrowright}
                style={styles.cellRightImage}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AppSettings;
