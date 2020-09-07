import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';


import { AppImages } from '../../config';
import styles from './styles';
import { timeSince } from '../../../utils';
import { MemoryServices } from '../../../services';
import { memoriesOperations } from '../../../state/ducks/memories';

interface CommentI {
  message: string,
  createdAt: number,
  likedByUsers: string
  userAvatar: string,
  userName: string,
}


interface ComponentProps {
  navigation: any;
  route: any;
  getMemories: typeof Function,
  memories: any;
  commentsList: any;
  user: any;
}
interface ComponentState {
  commentsList: Array<CommentI>;
  memoryData: any,
  newCommentText: string,
  isLoading: boolean,
}
const INITIAL_STATE: ComponentState = {
  commentsList: [],
  memoryData: {},
  newCommentText: '',
  isLoading: false,
};

class Comments extends React.Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
    this.closeTapped = this.closeTapped.bind(this);
    this.commentList = this.commentList.bind(this);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { memoryId } = this.props.route.params
    let memoryData = this.props.memories.find((item: any) => item.id == memoryId);
    let newMemoryData = prevProps.memories.find((item: any) => item.id == memoryId);
    if (JSON.stringify(memoryData) !== JSON.stringify(newMemoryData)) {
      this.setState({ memoryData })
    }
  }
  componentDidMount() {
    const { memoryId } = this.props.route.params
    this.props.getMemories(memoryId)
    let memoryData = this.props.memories.find((item: any) => item.id == memoryId)
    memoryData = memoryData ? memoryData : {}

    this.setState({ memoryData });

  }

  closeTapped() {
    this.props.navigation.goBack();
  }

  addNewComment = async () => {
    const { newCommentText, memoryData } = this.state;
    const commentMessageBackup = newCommentText.trim()
    const { user } = this.props;
    try {
      this.setState({ isLoading: true, newCommentText: '' })

      await MemoryServices.addCommentToMemory(newCommentText, memoryData, user)

    } catch (error) {
      this.setState({ isLoading: false, newCommentText: commentMessageBackup })

    }
  }

  likeMemoryComment = async (commentData: any) => {
    await MemoryServices.likeDislikeCommentOnMemory(commentData)
  }
  commentList({ item }) {
    let likesText = item.likedByUsers ? ((item.likedByUsers.split(",")?.length) + ' likes') : null
    return (
      <View style={styles.commentContainer}>
        <View style={styles.commentAvatarContainer}>
          <View style={[styles.memoriesBottomProfileView, { marginLeft: 0 }]}>
            <ImageBackground
              style={{ flex: 1 }}
              source={item.userAvatar ? { uri: item.userAvatar } : AppImages.loginImage}
            />
          </View>
        </View>
        <View style={styles.commentDetailsContainer}>
          <Text style={styles.commentOwnerText}>{item.userName}</Text>
          <Text style={styles.commentDescText}>{item.message}</Text>
          <Text style={styles.commentLikesText}>{likesText}</Text>
        </View>
        <TouchableOpacity onPress={() => this.likeMemoryComment(item)}>
          <ImageBackground
            resizeMode={'contain'}
            style={styles.commentLikeImage}
            source={(item.likedByUsers &&
              (auth().currentUser && item.likedByUsers.indexOf(auth().currentUser?.uid)) != -1) ?
              AppImages.filledHeart :
              AppImages.outlineHeart}
          />
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    const { memoryData, newCommentText, isLoading } = this.state;
    const { commentsList } = this.props;
    return (
      <View style={styles.mainScreenView}>
        {
          isLoading &&
          <ActivityIndicator />
        }
        <View
          // onPress={Keyboard.dismiss}
          // accessible={false}
          style={styles.keyboardDissmiss}>
          <View style={styles.mainScreenSubView}>
            <SafeAreaView>
              <View style={styles.inputContent}>
                <View style={styles.inputProfileView} >
                  <ImageBackground
                    style={{ flex: 1 }}
                    source={{ uri: this.props.user.displayPhoto }}
                  />
                </View>
                <View style={styles.textInputCommentMainView}>
                  <TextInput
                    onChangeText={newCommentText => this.setState({ newCommentText })}
                    placeholder={'Add Comment…'}
                    value={newCommentText}
                    style={styles.textinputComment}
                  />
                </View>
                <TouchableOpacity
                  disabled={!newCommentText.trim()}
                  onPress={this.addNewComment}
                  style={styles.sendIcon}>
                  <Image style={styles.sendImage} source={AppImages.send} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
            <View style={styles.mainView}>
              <View style={styles.memoriesMainView}>
                <View style={styles.memoriesImageView}>
                  <Image
                    source={{ uri: memoryData.image }}
                    style={styles.memoriesImage}
                  />
                  <View style={styles.headerMainView}>
                    <View style={styles.BackButtonView}>
                      <TouchableOpacity onPress={this.closeTapped}>
                        <Image
                          source={AppImages.arrowleft}
                          style={styles.backArrowImg}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.commentsText}>Comments</Text>
                  </View>
                </View>
                <View style={styles.memoriesBottomMainView}>
                  <View style={styles.memoriesBottomFirstView}>
                    <View style={styles.memoriesBottomProfileView}>
                      <ImageBackground
                        style={{ flex: 1 }}
                        source={memoryData.userAvatar ? { uri: memoryData.userAvatar } : AppImages.loginImage}
                      />
                    </View>
                    <View style={styles.memoriesBottomSecondView}>
                      <View style={styles.memorisBottomCommentView}>
                        <TouchableOpacity style={styles.commentsImageView}>
                          <ImageBackground
                            style={styles.commentsImage}
                            resizeMode={'contain'}
                            source={AppImages.comment}
                          />
                        </TouchableOpacity>
                        <View style={styles.commentsCountView}>
                          <Text
                            style={styles.commentsCountTxt}
                            adjustsFontSizeToFit
                            numberOfLines={1}>
                            {memoryData.commentsCounter ? memoryData.commentsCounter : null}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.memorisBottomLikesView}>
                        <TouchableOpacity style={styles.filledHeartImageView}>
                          <ImageBackground
                            resizeMode={'contain'}
                            style={styles.filledHeartMainImage}
                            source={(memoryData.likedByUsers &&
                              (auth().currentUser && memoryData.likedByUsers.indexOf(auth().currentUser?.uid)) != -1) ?
                              AppImages.filledHeart :
                              AppImages.outlineHeart}
                          // source={AppImages.filledHeart}
                          />
                        </TouchableOpacity>
                        <View style={styles.postlikeCountView}>
                          <Text
                            style={styles.postlikeCountTxt}
                            adjustsFontSizeToFit
                            numberOfLines={1}>
                            {memoryData.likedByUsers ? memoryData.likedByUsers.split(",")?.length : null}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.postNameMainView}>
                        <View style={styles.postNameView}>
                          <Text
                            style={styles.postNameTxt}
                            adjustsFontSizeToFit
                            numberOfLines={1}>
                            {memoryData.userName}
                          </Text>
                        </View>
                        <View style={styles.postTimeView}>
                          <Text
                            style={styles.postTimeTxt}
                            adjustsFontSizeToFit
                            numberOfLines={1}>
                            {timeSince(memoryData.createdAt)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <FlatList
                style={styles.commentsFlatList}
                data={commentsList.filter((c: any) => c.memoryId == memoryData.id)}
                renderItem={this.commentList}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getMemories: (memoryId: string) => dispatch(memoriesOperations.getCommentsByMemoryId(memoryId)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    memories: state.memories.memories,
    commentsList: state.memories.commentsOnMemory,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
// export default Comments;
