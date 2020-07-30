import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TextInput from 'react-native-textinput-with-icons';

import styles from './styles';

interface ComponentProps {
  iconName: string;
  iconSize: number;
  iconColor: string;
  conainerStyles?: {};
  iconStyles?: {};
  inputStyles?: {};
  [x: string]: any;
}

const TextInputWithIcon = ({
  iconName,
  iconSize,
  iconColor,
  containerStyles,
  iconStyles,
  inputStyles,
  ...rest
}: ComponentProps) => (
  <View style={{...styles.mainView, ...containerStyles}}>
    {/* <TextInput {...rest} style={{...styles.textInput, ...inputStyles}} /> */}
    <TextInput {...rest} style={{...styles.textInput, ...inputStyles}} />
    <Icon
      style={{...styles.icon, ...iconStyles}}
      name={iconName}
      size={iconSize}
      color={iconColor}
    />
  </View>
);

export default TextInputWithIcon;
