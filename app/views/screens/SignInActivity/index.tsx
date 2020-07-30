import React from 'react';
import {Image, Text, View, SafeAreaView} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {AppImages} from '../../config';
import styles from './styles';

interface MemoryI {
  id: number;
  name: string;
  time: string;
  phone: string;
}
interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  memories: Array<MemoryI>;
}
const INITIAL_STATE: ComponentState = {
  memories: [
    {
      id: 0,
      name: 'London',
      time: 'Active 2 min ago.',
      phone: 'Mi A3',
    },
    {
      id: 1,
      name: 'Mumbai',
      time: 'Active 12 min ago.',
      phone: 'Iphone 11',
    },
  ],
};
class SignInActivity extends React.Component<ComponentProps, ComponentState> {
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
            Login Activity
          </Text>
          <View style={styles.closeView}>
            <TouchableOpacity onPress={this.closeTapped}>
              <Image source={AppImages.close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />
        <Text style={styles.whereRYouText}>Where are you logged In</Text>
        <View>
          <FlatList
            data={this.state.memories}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: any) => (
              <View key={item.id}>
                <View style={styles.locationListItem}>
                  <Image
                    style={styles.locationListItemImg}
                    source={AppImages.locationactivity}
                  />
                  <View style={styles.locationListItemRightView}>
                    <Text style={styles.locationNameText}>{item.name}</Text>
                    <View style={styles.locationListItemTimeNPhoneView}>
                      <Text style={styles.locationListItemTimeText}>
                        {item.time}
                      </Text>
                      <Text style={styles.locationNameText}>{item.phone}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default SignInActivity;
