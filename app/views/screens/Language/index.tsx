import React from 'react';
import {Image, Text, View, SafeAreaView, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  dataLanguage: Array<string>;
}
const INITIAL_STATE: ComponentState = {
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
class Language extends React.Component<ComponentProps, ComponentState> {
  closeTapped() {
    this.props.navigation.goBack();
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.closeTapped = this.closeTapped.bind(this);
  }

  languageListItem = ({item}: any) => {
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
          <Text style={styles.navigationText}>Language</Text>

          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView}></View>
        <ScrollView>
          {/* <View style={styles.headerView}>
            <Image style={styles.headerImage}></Image>
          </View> */}

          <FlatList
            data={this.state.dataLanguage}
            keyExtractor={(x, i) => i.toString()}
            renderItem={this.languageListItem}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Language;
