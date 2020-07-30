import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {AppImages} from '../../config';
import styles from './styles';

interface DataSourceI {
  id: number;
  name: string;
}
interface ComponentState {
  loading: boolean;
  dataSource: Array<DataSourceI>;
}
const INITIAL_STATE: ComponentState = {
  loading: false,
  dataSource: [],
};

class Notifications extends React.Component<{navigation: any}, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.closeTapped = this.closeTapped.bind(this);
  }

  closeTapped() {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }

  notificationListItem = (data: any) => (
    <View style={styles.list}>
      <View style={styles.notificationItemView}>
        <View style={styles.notificationItemProfileView}>
          <Image
            source={AppImages.loginImage}
            resizeMode={'cover'}
            style={styles.notificationItemProfileImage}
          />
        </View>

        <View style={styles.notificationItemNameView}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.userName}>
            {data.item.name}
          </Text>
          <Text numberOfLines={2} adjustsFontSizeToFit style={styles.petName}>
            {data.item.name}
          </Text>
        </View>

        <View style={styles.notificationItemFollowView}>
          <TouchableOpacity style={styles.notificationItemFollowBtn}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backImage}>
          <Image
            style={styles.backGroundImage}
            source={AppImages.homeNavigation}
          />
          <View style={styles.overlay}>
            <View style={styles.followTitleContainer}>
              <Text style={styles.createFollowText}>Notifications</Text>
              <View style={{flex: 1, marginTop: 45}}>
                <TouchableOpacity
                  onPress={this.closeTapped}
                  style={styles.closeIconView}>
                  <Image source={AppImages.close} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.followMainView}>
          <View style={styles.descriptionView}>
            <Text style={styles.days}>Today</Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={this.state.dataSource}
              renderItem={(item) => this.notificationListItem(item)}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Notifications;
