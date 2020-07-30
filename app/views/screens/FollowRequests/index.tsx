import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {AppImages} from '../../config';
import styles from './styles';

interface DataSourceI {
  id: number;
  name: string;
}
interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  loading: boolean;
  dataSource: Array<DataSourceI>;
}
const INITIAL_STATE: ComponentState = {
  loading: false,
  dataSource: [],
};

class FollowRequests extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
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

  followReqListItem = (data: any) => (
    <View style={styles.list}>
      <View style={styles.followReqItemView}>
        <View style={styles.followReqItemProfileView}>
          <Image
            source={AppImages.demoimage}
            style={styles.followReqItemProfileImg}
          />
        </View>
        <View style={styles.followReqItemTextView}>
          <Text style={styles.userName}>{data.item.name}</Text>
          <Text style={styles.petName}>{data.item.name}</Text>
        </View>
        <View style={styles.followReqItemAcptORDeleteView}>
          <TouchableOpacity style={styles.acceptMainView}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteMainView}>
            <Text style={styles.deleteMainViewText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backGroundImage}
          source={AppImages.homeNavigation}
        />
        <ScrollView style={styles.followMainView}>
          <View
            style={{
              marginTop: getStatusBarHeight(),
              justifyContent: 'center',
              width: '100%',
              aspectRatio: 4.5,
              alignItems: 'center',
            }}>
            <View style={styles.followTitleContainer}>
              <Text style={styles.createFollowText}>Follow Requests</Text>
              <TouchableOpacity
                onPress={this.closeTapped}
                style={styles.closeIconView}>
                <Image source={AppImages.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomView}>
            <View style={styles.descriptionView}>
              <TextInput
                style={styles.followTxt}
                underlineColorAndroid="transparent"
                placeholder="Search on requests"
                placeholderTextColor="grey"
              />
              <Image source={AppImages.search} style={styles.searchIcon} />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={this.state.dataSource}
                renderItem={(item) => this.followReqListItem(item)}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FollowRequests;
