import React from 'react';

import PropTypes from 'prop-types';
import { ScrollView, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import { AppImages } from '../../config';
import styles from './styles';
import { authOperations } from '../../../state/ducks/auth';

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

function Menu({ onItemSelected, ...props }: any) {
  return (
    <SafeAreaView style={styles.menu}>
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: props.user.displayPhoto || uri }} />
          <Text style={styles.name}>{props.user.name}</Text>
          <Image source={AppImages.verify} style={styles.verified} />
        </View>

        <View style={styles.itemsMainView}>
          <View style={styles.viewitem}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onItemSelected('CreateEvent')}
              style={{ flex: 1 }}>
              <View style={styles.myEventView}>
                <Image source={AppImages.calendar} style={[styles.itemimage, { tintColor: 'white' }]} />
                <Text style={styles.item}> Create Event</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewitem}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onItemSelected('MyEvents')}
              style={{ flex: 1 }}>
              <View style={styles.myEventView}>
                <Image source={AppImages.heartwhite} style={styles.itemimage} />
                <Text style={styles.item}> My Events</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.viewitem}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onItemSelected('SavedStories')}
              style={{ flex: 1 }}>
              <View style={styles.myEventView}>
                <Image source={AppImages.bookmark} style={styles.itemimage} />
                <Text style={styles.item}> Saved</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewitem}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onItemSelected('EventInbox')}
              style={{ flex: 1 }}>
              <View style={styles.myEventView}>
                <Image source={AppImages.mail} style={styles.itemimage} />
                <Text style={styles.item}> Inbox</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewitem}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onItemSelected('AppSettings')}
              style={{ flex: 1 }}>
              <View style={styles.myEventView}>
                <Image source={AppImages.settings} style={styles.itemimage} />
                <Text style={styles.item}> Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewlogout}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.signOut()}
              style={{ flex: 1 }}>
              <View style={styles.myEventView}>
                <Image source={AppImages.logout} style={styles.itemimage} />
                <Text style={styles.item}> Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewlogout}>
            {/* <TouchableOpacity activeOpacity={0.7}  onPress={() => onItemSelected('EventInfo')} style={{flex:1}} > */}
            <View style={styles.myEventView}>
              <Image source={AppImages.star} style={styles.itemimage} />
              <Text style={styles.itemrateus}> Rate Us</Text>
            </View>
            {/* </TouchableOpacity>  */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(authOperations.signOut()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
