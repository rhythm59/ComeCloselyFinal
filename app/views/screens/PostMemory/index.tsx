import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';
import { connect } from 'react-redux';

import { AppImages } from '../../config';
import styles from './styles';
import { MemoryServices } from '../../../services';
import { AuthContext } from '../../../../app/providers/auth';

interface ComponentProp {
  navigation: any;
  user: any
}
interface ComponentState {
  isLoading: boolean,
  title: string;
  description: string;
  location: string;
  dataSource: [];
  tagList: Array<string>;
  selected_category: number | null;
  avatarSource: string;
  avatarBackgroundColor: string;
}
const INITIAL_STATE: ComponentState = {
  isLoading: false,
  title: '',
  description: '',
  location: '',
  dataSource: [],
  tagList: [],
  // tagList: ['party', 'food', 'Fashion', 'Business', 'Events'],
  selected_category: null,
  avatarSource: '',
  avatarBackgroundColor: 'rgba(0,0,0,0)',
};

const options: ImagePickerOptions = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Camera',
  chooseFromLibraryButtonTitle: 'Gallery',
  mediaType: 'photo',
  quality: 0.5,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class PostMemory extends React.Component<ComponentProp, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  _handleCategorySelect = (index: number) => {
    this.setState({ selected_category: index });
  };

  componentDidMount() {
    MemoryServices.getMemoryTags()
      .then(tagList => {
        if (Array.isArray(tagList)) {
          this.setState({ tagList })
        }
      })
      .catch(e => console.error(e.message))
  }
  setStateProperty = (key: any) => (value: any) => {
    this.setState({ [key]: value })
  }

  handleSubmit = () => {
    const { title, description, location, avatarSource, selected_category } = this.state;
    
    this.setState({ isLoading: true })
    if (title && avatarSource) {
      MemoryServices.saveMemory({
        userId: this.props.user.id,
        userName: this.props.user.name,
        image: avatarSource,
        title, description, location,
        tagId: selected_category,
        userAvatar: this.props.user.displayPhoto
      })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.navigation.navigate('Home')
        })
        .catch(e => {
          this.setState({ isLoading: false })
          Alert.alert('There was an error while uploading memory.\n' + e.message)
        })
    }
    else {
      this.setState({ isLoading: false })
      Alert.alert('Some fields are missing.')
    }
  }
  tagListItem = (data: any) => (
    <TouchableOpacity
      style={[
        styles.eventTypeListItemView,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor:
            this.state.selected_category === data.item.id ? '#FF2485' : 'white',
        },
      ]}
      onPress={() => this._handleCategorySelect(data.item.id)}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontSize: 12,
          alignSelf: 'center',
          fontFamily: 'Gilroy-ExtraBold',
          color:
            this.state.selected_category === data.item.id ? 'white' : '#BEBEBE',
        }}>
        {data.item.name}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { title, description, location, avatarSource, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={styles.backGroundImage}
          source={AppImages.homeNavigation}
        />
        <View style={styles.postMemoryTitleMainView}>
          <View style={styles.overlay}>
            <View style={styles.postMemoryTitleChildView}>
              <View style={styles.postMemoryTitleContainer}>
                <Text style={styles.postMemoryText}>Post a Memory</Text>
                <View style={styles.backImageMainView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    style={styles.closeButtonView}>
                    <Image source={AppImages.close} style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.postMemoryScrollView}>
          <View style={styles.postMemoryChildScrollView}>
            <View style={styles.titleMainView}>
              <View style={styles.titleImageMianView}>
                <TouchableHighlight
                  style={styles.dotsBorders}
                  underlayColor="rgba(0,0,0,0)"
                  onPress={() => {
                    ImagePicker.showImagePicker(options, (response) => {
                      
                      if (response.didCancel) {
                        
                      } else if (response.error) {
                        
                      } else if (response.customButton) {
                        
                      } else {
                        // const source = { uri: response.uri };
                        // You can also display the image using data:
                        this.setState({
                          avatarSource: response.uri,
                        });
                        this.setState({
                          avatarBackgroundColor: 'black',
                        });
                      }
                    });
                  }}>
                  <View style={styles.borderInsideView}>
                    <View style={styles.borderInsideView}>
                      <Image source={AppImages.camera} style={styles.image} />
                    </View>
                    <Image
                      source={{ uri: avatarSource }}
                      style={styles.avatarImage}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.textInputMainView}>
                <View style={styles.textInputTitleView}>
                  <Text style={styles.textTitleView}>Title</Text>
                </View>
                <View style={styles.titleView}>
                  <TextInput
                    value={title}
                    onChangeText={this.setStateProperty('title')}
                    style={styles.titleArea}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    textAlignVertical={'top'}
                    multiline={true}
                  />
                </View>
              </View>
            </View>
            <View style={styles.eventTypeMainView}>
              <Text style={styles.eventTypeText}>Tags</Text>
            </View>
            <View>
              <View style={styles.listcontainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  data={this.state.tagList}
                  renderItem={(item) => this.tagListItem(item)}
                // keyExtractor={item => item.id.toString()}
                />
              </View>
            </View>
            <View style={styles.locationTitleMainView}>
              <Text style={styles.loactionTitle}>Location</Text>
            </View>
            <View style={styles.locationLineView}>
              <View style={styles.locationMainView}>
                <TextInput
                  value={location}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  onChangeText={this.setStateProperty('location')}
                  style={styles.locationTextInputView}>
                  {/* Grand Canyon Nation */}
                </TextInput>
                <Image
                  style={styles.locationImageView}
                  source={AppImages.mappin}
                />
              </View>
            </View>
            <View style={styles.descriptionMainView}>
              <Text style={styles.descriptionText}>Description</Text>
            </View>
            <View style={styles.descriptionView}>
              <TextInput
                value={description}
                onChangeText={this.setStateProperty('description')}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                textAlignVertical={'top'}
                multiline={true}
              />
            </View>
            <View style={styles.postMemoryMainView}>
              <TouchableOpacity onPress={this.handleSubmit} style={styles.createEventButton}>
                {isLoading ?
                  <ActivityIndicator style={{ width: 160 }} color="white" size="small" /> :
                  <Text style={styles.createEventButtonText}>POST MEMORY</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
PostMemory.contextType = AuthContext;

const mapDispatchToProps = () => {
  return {
  };
};

const mapStateToProps = (state: any) => {
  
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostMemory);