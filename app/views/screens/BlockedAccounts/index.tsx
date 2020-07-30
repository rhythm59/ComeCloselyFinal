import React from 'react';
import {Image, Text, View, SafeAreaView} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}

class BlockedAccounts extends React.Component<ComponentProps> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {};
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
            Blocked Accounts
          </Text>

          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />

        {/* <View style={styles.headerView}>
          <Image style={styles.headerImage}></Image>
        </View> */}
      </SafeAreaView>
    );
  }
}

export default BlockedAccounts;
