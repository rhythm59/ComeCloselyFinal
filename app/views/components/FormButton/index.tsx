import React from 'react';
import {Button} from 'react-native-elements';

import styles from './styles';

interface ComponentProps {
  title: string;
  containerStyles: any;
  buttonType?: 'solid' | 'clear' | 'outline' | undefined;
  [x: string]: any;
}

const FormButton = ({
  title,
  containerStyles,
  buttonType,
  ...rest
}: ComponentProps) => (
  <Button
    {...rest}
    title={title}
    type={buttonType}
    containerStyle={containerStyles}
    buttonStyle={styles.submit}
  />
);

export default FormButton;
