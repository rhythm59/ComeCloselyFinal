import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

// import {FormikProps, FormikValues} from 'formik';

import styles from './styles';

interface ComponentProps {
  children: any;
  formikKey: string;
  formikProps: any;
  containerStyles: any;
}

const FormFieldWrapper = ({
  children,
  formikKey,
  formikProps,
  containerStyles,
}: ComponentProps) => (
  <Fragment>
    <View style={containerStyles}>
      {children}
      {formikProps.errors[formikKey] && formikProps.touched[formikKey] && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </View>
  </Fragment>
);

export default FormFieldWrapper;
