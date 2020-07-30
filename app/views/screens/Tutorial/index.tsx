import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

import Swiper from 'react-native-swiper';
import 'react-native-gesture-handler';

import {AppImages} from '../../config';
import styles from './styles';

class Tutorial extends React.Component<{navigation: any}, {}> {
  btnLoginTapped = () => {
    this.props.navigation.navigate('SignIn');
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.backImage} source={AppImages.loginImage}>
          <View style={styles.overlay}>
            <Text>
              <Text style={styles.slider1text1come}>Come</Text>
              <Text style={styles.slider1text1closly}>Closely</Text>
            </Text>
          </View>
          <View style={styles.viewSwiper} /* backgroundColor="transparent" */>
            <Swiper
              showsButtons={false}
              paginationStyle={styles.paginationStyle}
              /* backgroundColor="transparent" */
              activeDot={<View style={styles.selectedDotView} />}
              dot={<View style={styles.unselectedDotView} />}>
              <View style={styles.slide1}>
                <View style={styles.slider1View1} />
                <View style={styles.slider1View2}>
                  <Text style={styles.slider1text2}>Book & Share</Text>
                  <View style={styles.viewfullCover}>
                    <Text
                      style={styles.slider1text3}
                      adjustsFontSizeToFit
                      numberOfLines={3}>
                      Meet the Social Network that brings together all the
                      events and entertainments factors, by combining innovation
                      and simplicity.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.slide2}>
                <View style={styles.slider1View1} />
                <View style={styles.slider1View2}>
                  <Text style={styles.slider1text2}>Book & Share</Text>
                  <View style={styles.viewfullCover}>
                    <Text
                      style={styles.slider1text3}
                      adjustsFontSizeToFit
                      numberOfLines={3}>
                      We do what Social Network is actually supposed to do, we
                      bring people closer and encourage to create memories.
                    </Text>
                  </View>
                </View>
              </View>
            </Swiper>
          </View>
          <View style={styles.viewButtons}>
            <View style={styles.viewlogin}>
              <TouchableHighlight
                style={styles.buttonLogin}
                underlayColor="#FF2485"
                onPress={() => {
                  this.props.navigation.navigate('SignIn');
                }}>
                <Text style={styles.txtLogin}>LOGIN</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.viewFnT}>
              <View style={styles.buttonFacebook}>
                <Image
                  style={styles.imageTwitter}
                  source={AppImages.faceBook}
                />
              </View>
              <View style={styles.buttonTwitter}>
                <Image style={styles.imageTwitter} source={AppImages.twitter} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Tutorial;
