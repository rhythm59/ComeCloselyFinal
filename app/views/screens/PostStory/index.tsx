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
import { connect, } from 'react-redux';

import { AppImages } from '../../config';
import styles from './styles';
import { MemoryServices } from '../../../services';
import { AuthContext } from '../../../../app/providers/auth';
import { userOperations } from '../../../state/ducks/user';

interface ComponentProp {
    navigation: any;
    user: any,
    addStory: Function;
}
interface ComponentState {
    isLoading: boolean,
    title: string;
    readMoreUrl: string;
    avatarSource: string;
    avatarBackgroundColor: string;
}
const INITIAL_STATE: ComponentState = {
    isLoading: false,
    title: '',
    readMoreUrl: '',
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

class PostStory extends React.Component<ComponentProp, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
    }
    setStateProperty = (key: any) => (value: any) => {
        this.setState({ [key]: value })
    }
    onAddStorySuccess = () => {
        this.props.navigation.goBack()
    }
    handleSubmit = () => {
        const { title, avatarSource, readMoreUrl } = this.state;
        this.setState({ isLoading: true })

        if (title && avatarSource) {
            let data: any = {
                userId: this.context.currentUser.uid,
                url: avatarSource,
                title,
                isSeen: false,
            }
            if (readMoreUrl) {
                data.readMoreUrl = readMoreUrl
            }
            this.props.addStory(data, this.onAddStorySuccess)
        }
        else {
            this.setState({ isLoading: false })
            Alert.alert('Some fields are missing.')
        }
    }

    render() {
        const { title, readMoreUrl, avatarSource, isLoading } = this.state;
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
                                <Text style={styles.postMemoryText}>Post a Story</Text>
                                <View style={styles.backImageMainView}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.goBack()}
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
                                            console.log('Response = ', response);
                                            if (response.didCancel) {
                                                console.log('User cancelled image picker');
                                            } else if (response.error) {
                                                console.log('ImagePicker Error: ', response.error);
                                            } else if (response.customButton) {
                                                console.log(
                                                    'User tapped custom button: ',
                                                    response.customButton,
                                                );
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
                        <View style={styles.locationTitleMainView}>
                            <Text style={styles.loactionTitle}>Readmore Url (optional)</Text>
                        </View>
                        <View style={styles.locationLineView}>
                            <View style={styles.locationMainView}>
                                <TextInput
                                    value={readMoreUrl}
                                    underlineColorAndroid="transparent"
                                    placeholder="Type a website url"
                                    placeholderTextColor="grey"
                                    onChangeText={this.setStateProperty('readMoreUrl')}
                                    style={styles.locationTextInputView}>
                                </TextInput>
                            </View>
                        </View>

                        <View style={styles.postMemoryMainView}>
                            <TouchableOpacity onPress={this.handleSubmit} style={styles.createEventButton}>
                                {isLoading ?
                                    <ActivityIndicator style={{ width: 160 }} color="white" size="small" /> :
                                    <Text style={styles.createEventButtonText}>POST STORY</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
PostStory.contextType = AuthContext;

const mapDispatchToProps = (dispatch: Function) => {
    return {
        addStory: (data: any, onSuccessCallback: Function) => dispatch(userOperations.addNewStory(data, onSuccessCallback))
    };
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostStory); 
