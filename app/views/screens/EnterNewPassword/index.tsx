import React from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';

import TextInput from 'react-native-textinput-with-icons';

import styles from './styles';

interface ComponentState {
  newPassword: string;
  confirmPassword: string;
}
const INITIAL_STATE: ComponentState = {
  newPassword: '',
  confirmPassword: '',
};

class EnterNewPassword extends React.Component<
  {navigation: any},
  ComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.childView}>
            <View style={styles.forgotTextMainView}>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </View>
            <View style={styles.descriptionMainView}>
              <Text style={styles.descriptionText}>
                Enter the new password to get in your account {'\n'}make sure to
                remember your password{'\n'}and don't sahre it with anyone
              </Text>
            </View>

            <View style={styles.inputCotainer}>
              <TextInput
                style={styles.textInputBackground}
                label="New Password"
                labelActiveColor="#FF2485"
                underlineActiveColor="#FF2485"
                containerMaxWidth="100%"
                color="#515C6F"
                secureTextEntry={true}
                value={this.state.newPassword}
                onChangeText={(newPassword: string) =>
                  this.setState({newPassword})
                }
              />
            </View>
            <View style={styles.confirmPasswordInputCotainer}>
              <TextInput
                style={styles.confirmPasswordBackground}
                label="Confirm Password"
                labelActiveColor="#FF2485"
                underlineActiveColor="#FF2485"
                color="#515C6F"
                secureTextEntry={true}
                containerMaxWidth="100%"
                value={this.state.confirmPassword}
                onChangeText={(confirmPassword: string) =>
                  this.setState({confirmPassword})
                }
              />
            </View>
            <TouchableHighlight
              style={styles.submitMainView}
              underlayColor="rgba(0,0,0,0.0)"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EnterNewPassword;
