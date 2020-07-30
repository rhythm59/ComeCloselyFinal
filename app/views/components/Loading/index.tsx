import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './styles';

export default function Loading() {
  return (
    <View style={styles.mainView}>
      <ActivityIndicator size="large" color="#FF2485" />
    </View>
  );
}
