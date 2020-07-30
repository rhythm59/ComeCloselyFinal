import React from 'react';
import {Image, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
class StorySettings extends React.Component<ComponentProps> {
  CloseTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {};
    this.CloseTapped = this.CloseTapped.bind(this);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.navigationText}>
            Story
          </Text>

          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.CloseTapped}>
              <Image source={AppImages.close} style={styles.closeImg}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView}></View>
        <View style={styles.dscrMainView}>
          <Text style={styles.dscrTitle}>Hide Story from</Text>
          <View style={styles.rightArrowView}>
            <TouchableOpacity>
              <Image
                source={AppImages.arrowright}
                style={styles.arrowRight}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default StorySettings;
