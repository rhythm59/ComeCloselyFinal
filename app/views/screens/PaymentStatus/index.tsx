import React from 'react';
import { Image, Text, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppImages } from '../../config';
import styles from './styles';

interface ComponentProps {
  navigation: any;
}
interface ComponentState {
  isPaymentSuccess: boolean;
}
const INITIAL_STATE: ComponentState = {
  isPaymentSuccess: true,
};
class PaymentStatus extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      isPaymentSuccess: this.props.route.params.isPaymentSuccess
    };
  }

  ShowHideComponent = () => {
    this.setState({
      isPaymentSuccess: !this.state.isPaymentSuccess,
    });
  };

  PaymentSuccessView = () => {
    if (this.state.isPaymentSuccess) {
      return (
        <View style={styles.paymentMainView}>
          <View style={styles.paymentMainImgView}>
            <Image
              style={{ aspectRatio: 1, height: '100%' }}
              source={AppImages.paymentsuccess}
            />
          </View>

          <View style={styles.paymentsuccessMainTxt}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.txtpaymentStatus}>
              Payment Succeed!
            </Text>
          </View>
          <View style={styles.buttonMainView}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.buttonChildView}
              onPress={() => this.props.navigation.navigate('MyTickets')}>
              <Text style={styles.txtButtonTitle}>MY TICKETS</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.paymentMainView}>
          <View style={styles.paymentMainImgView}>
            <Image
              style={{ aspectRatio: 1, height: '100%' }}
              source={AppImages.paymentfailed}
            />
          </View>

          <View style={styles.paymentsuccessMainTxt}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.txtpaymentStatus}>
              Payment Failed
            </Text>
          </View>
          <View style={styles.buttonMainView}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.buttonChildView}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.txtButtonTitle}>Start again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={AppImages.loginImage}
          style={styles.containerChildView}>
          <View style={styles.mainView}>{this.PaymentSuccessView()}</View>
        </ImageBackground>
      </View>
    );
  }
}

export default PaymentStatus;
