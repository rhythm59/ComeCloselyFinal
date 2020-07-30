import React from 'react';
import {
  TextInput,
  FlatList,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
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

class FindUser extends React.Component<{navigation: any}, ComponentState> {
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
      .catch((error) => console.log(error));
  }

  accountListItem = (data: any) => (
    <View style={styles.list}>
      <View style={styles.listView}>
        <View style={styles.listProfileView}>
          <Image source={AppImages.demoimage} style={styles.listProfileImage} />
        </View>
        <View style={styles.listTextView}>
          <Text style={styles.userName}>{data.item.name}</Text>
          <Text style={styles.petName}>{data.item.name}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar backgroundColor="black" /* style={{flex: 1}} */ />
        <ImageBackground
          source={AppImages.homeNavigation}
          style={styles.homeNavigationImg}></ImageBackground>
        <View style={{flex: 1}}>
          <View style={styles.headerMainView}>
            <View style={styles.findUserView}>
              <Text style={styles.findUserTxt}>Find Users</Text>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  style={styles.closeView}>
                  <Image
                    source={AppImages.close}
                    style={styles.closeImg}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.mainView}>
            <View style={styles.segMainView}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.eventMainView}>
                <View /* elevation={10} */ style={styles.eventView}>
                  <Text style={styles.eventTxt}>Events</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.accountsMainView}>
                <View /* elevation={10} */ style={styles.accountsView}>
                  <Text style={styles.accountsTxt}>Accounts</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.searchMainView}>
              <View /* elevation={5} */ style={styles.descriptionView}>
                <TextInput
                  style={styles.followTxt}
                  underlineColorAndroid="transparent"
                  placeholder="Search"
                  placeholderTextColor="grey"
                />
                <Image source={AppImages.search} style={styles.searchIcon} />
              </View>
            </View>
            <FlatList
              data={this.state.dataSource}
              renderItem={(item) => this.accountListItem(item)}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default FindUser;
