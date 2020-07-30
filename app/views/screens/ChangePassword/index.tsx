import React from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import TextInput from 'react-native-textinput-with-icons';

import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
const INITIAL_STATE: ComponentState = {
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: '',
};
class ChangePassword extends React.Component<ComponentProps, ComponentState> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.closeTapped = this.closeTapped.bind(this);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.navigationText}>
            Password
          </Text>
          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />
        <View style={{marginTop: 25}}>
          <View style={styles.inputCotainer}>
            <TextInput
              style={styles.textInputBackground}
              label="Current Password"
              labelActiveColor="#FF2485"
              underlineActiveColor="#FF2485"
              underlineColor="#FF2485"
              // color='#515C6F'
              labelColor="#2B2424"
              fontFamily="Gilroy-Semibold"
              containerMaxWidth="100%"
              value={this.state.currentPassword}
              onChangeText={(currentPassword: string) =>
                this.setState({currentPassword})
              }
            />
          </View>
          <View style={styles.newPasswordInputCotainer}>
            <TextInput
              style={styles.newPasswordTextInputBackground}
              label="New Password"
              labelActiveColor="#FF2485"
              underlineActiveColor="#FF2485"
              underlineColor="#FF2485"
              containerMaxWidth="100%"
              labelColor="#2B2424"
              fontFamily="Gilroy-Semibold"
              value={this.state.newPassword}
              onChangeText={(newPassword: string) =>
                this.setState({newPassword})
              }
            />
          </View>
          <View style={styles.repeatNewPasswordinputCotainer}>
            <TextInput
              style={styles.RepeatnewPasswordTextinputBackground}
              label="Repeat the new Password"
              labelActiveColor="#FF2485"
              underlineActiveColor="#FF2485"
              underlineColor="#FF2485"
              containerMaxWidth="100%"
              labelColor="#2B2424"
              fontFamily="Gilroy-Semibold"
              value={this.state.repeatNewPassword}
              onChangeText={(repeatNewPassword: string) =>
                this.setState({repeatNewPassword})
              }
            />
          </View>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.0)"
            style={styles.SubmitMainView}>
            <Text style={styles.SubmitText}>SUBMIT</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChangePassword;
