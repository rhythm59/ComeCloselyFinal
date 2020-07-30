import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {AppImages} from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  dataSource: any;
}
const INITIAL_STATE: ComponentState = {
  dataSource: '',
};
class SavedStories extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(50)).map((v, i) => {
      return {id: i, src: 'https://unsplash.it/400/400?image=' + (i + 1)};
    });
    that.setState({
      dataSource: items,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerChildView}>
          <View>
            <Image
              style={styles.backGroundImage}
              source={AppImages.homeNavigation}></Image>
            <View style={styles.overlay}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '15%',
                }}>
                <View style={{width: '100%'}}>
                  <View style={{marginLeft: '3%'}}>
                    <Text style={styles.createFollowText}>Saved</Text>
                  </View>

                  <View style={styles.inboxTitleContainer}>
                    <Text style={styles.createFollowText}>All Saved</Text>
                    <TouchableOpacity style={styles.closeIcon}>
                      <Image source={AppImages.folder} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <ScrollView style={{marginTop: '-20%'}}>
            <SafeAreaView style={styles.imageMainContainer}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => (
                  <View style={{flex: 1 / 3, flexDirection: 'column'}}>
                    <Image
                      style={styles.imageThumbnail}
                      source={{uri: item.src}}
                    />
                  </View>
                )}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </SafeAreaView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default SavedStories;
