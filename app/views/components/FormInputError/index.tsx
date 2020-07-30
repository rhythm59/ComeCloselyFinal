import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

interface ComponentProps {
  errorValue: any;
}

const FormInputError = ({errorValue}: ComponentProps) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

export default FormInputError;
