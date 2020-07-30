import React from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import Barcode from 'react-native-barcode-builder';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { AppImages } from '../../config';
import styles from './styles';
import { connect } from 'react-redux';
import AuthProvider from '../../../../app/providers/auth';
import { AuthContext } from '../../../../app/providers/auth';
import firestore from '@react-native-firebase/firestore';

class TicketBuy extends React.Component {
  state = {
    isLoading: false,
    eventData: {},
    ticketData: {},
    ticketId: this.createTicketId(),
    creditCard: {
      name: '',
      number: '',
      cvs: '',
      expiry: '',
      save: false
    }
  }

  componentDidMount() {
    const { eventData, ticketData } = this.props.route.params;
    this.setState({ eventData, ticketData })
  }

  createTicketId() {
    var result = 'NDF';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getCreditCardToken = (creditCardData: any) => {
    const card = {
      'owner[name]': creditCardData.name,
      'card[number]': creditCardData.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.expMonth,
      'card[exp_year]': creditCardData.expYear,
      'card[cvc]': creditCardData.cvs
    };

    return fetch('https://api.stripe.com/v1/sources', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer pk_test_51H2Nb4KydQMjEXTR4eX9PRRN6W1WZNMfjPwWLJdc2JQutGTpQdHgpKs4GFmGfyMJ0IRvxlkt7pJ360xIwmp6MNNp00xGFzUayR`
      },
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: 'type=card&' + Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json());
  };

  handleSubmit = async () => {
    try {
      this.setState({ isLoading: true })
      const { eventData, ticketData, ticketId, creditCard } = this.state;
      const expMonth = creditCard.expiry.split('/')[0] || 0;
      const expYear = creditCard.expiry.split('/')[1] || 0;
      const token = await this.getCreditCardToken({ ...creditCard, expMonth, expYear })
      if (typeof token?.error == 'object') {
        this.setState({ isLoading: false })
        Alert.alert(token.error.message)
      }
      else {
        fetch(
          'https://us-central1-comeclosely-71c7c.cloudfunctions.net/chargeuser',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
              name: creditCard.name,
              email: this.props.currentUser.email,
              token: token.id,
              amount: ticketData.totalAmount * 100,
              saveCard: creditCard.save
            })
          }
        )
          .then(res => res.json())
          .then(async (resp: any) => {
            console.log(resp)
            if (resp.error) {
              this.setState({ isLoading: false })
              this.props.navigation.navigate('PaymentStatus', { isPaymentSuccess: false })
            }
            else {
              const ticketRef = firestore().collection('tickets').doc(ticketId);
              const now = Date.now();
              let ticket = {
                ...ticketData,
                userId: this.props.currentUser.uid,
                createdAt: now,
                updatedAt: now,
              };
              ticketRef.set(ticket);
              if (creditCard.save) {
                const userRef = firestore().collection('users').doc(this.props.currentUser.uid);
                userRef.update({ customerId: resp.customerId })
              }
              this.setState({ isLoading: false })
              this.props.navigation.navigate('PaymentStatus', { isPaymentSuccess: true })
            }
          })
          .catch(e => {
            console.log('error:', e.message)
            this.setState({ isLoading: false })
            this.props.navigation.navigate('PaymentStatus', { isPaymentSuccess: false })
          })
      }
    }
    catch (error) {
      this.setState({ isLoading: false })
    }
  }

  handleCreditCardData = (type: any) => (value: any) => {
    const { creditCard } = this.state;
    if (type === 'expiry') {
      let expiry = this.cc_expires_format(value);
      this.setState({ creditCard: { ...creditCard, expiry } })
    }
    else {
      this.setState({ creditCard: { ...creditCard, [type]: value } })
    }
  }
  cc_expires_format(string: any) {
    return string.replace(
      /[^0-9]/g, '' // To allow only numbers
    ).replace(
      /^([2-9])$/g, '0$1' // To handle 3 > 03
    ).replace(
      /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^0{1,}/g, '0' // To handle 00 > 0
    ).replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
    );
  }

  renderSaveCardCheckBox = () => {
    var imgSource = this.state.creditCard.save
      ? AppImages.checkboxSelected
      : AppImages.checkboxUnselected;
    return <Image style={styles.cardSaveCheckMarkImage} source={imgSource} />;
  }

  render() {
    const { eventData, ticketData, ticketId, creditCard, isLoading } = this.state;
    return (
      <View style={styles.container}>
        {/* for back Image */}
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.eventImageView}>
          <Image source={AppImages.loginImage} style={styles.eventImage} />
        </View>
        <View style={styles.headerMainView}>
          <View style={styles.shareButtonView}>
            <TouchableOpacity>
              <Image
                resizeMode={'contain'}
                source={AppImages.share}
                style={styles.shareImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.closeButtonMainView}>
            <View style={styles.closeButtonView}>
              <TouchableOpacity>
                <Image
                  resizeMode={'contain'}
                  source={AppImages.close}
                  style={styles.shareImg}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.heartButtonMainView}>
              <View style={styles.heartButtonView}>
                <TouchableOpacity>
                  <Image
                    resizeMode={'contain'}
                    source={AppImages.filledHeart}
                    style={styles.shareImg}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.ticketMainView}>
            <Image
              resizeMode={'contain'}
              source={AppImages.ticketImg}
              style={styles.ticketImg}
            />
            <View style={styles.ticketTitleNTimeView}>
              <View style={styles.ticketTimeView}>
                <Text style={styles.ticketTimeText}>{eventData.date} | {eventData.time}</Text>
              </View>
              <View style={styles.ticketTitleView}>
                <Text
                  numberOfLines={3}
                  adjustsFontSizeToFit
                  style={styles.ticketTitleText}>
                  {eventData.title}
                </Text>
              </View>
            </View>
            <View style={styles.ticketbottomView}>
              <View style={styles.ticketTypeView}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.ticketTypeText}>
                  {eventData.type}
                </Text>
              </View>
              <View style={styles.ticketEntryNExtrasView}>
                <View style={styles.ticketEntryMainView}>
                  <View style={styles.ticketEntryTitleView}>
                    <Image
                      resizeMode={'contain'}
                      source={AppImages.entry}
                      style={styles.ticketEntryImage}
                    />
                    <Text style={styles.ticketEntryTitleText}>Entry</Text>
                  </View>
                  <View style={styles.ticketEntryAnsView}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.ticketEntryAnsText}>
                      {ticketData.totalPersons} Persons
                    </Text>
                  </View>
                </View>
                <View style={styles.ticketExtrasMainView}>
                  <View style={styles.ticketExtrasTitleView}>
                    <Image
                      resizeMode={'contain'}
                      source={AppImages.starpink}
                      style={styles.ticketExtrasTitleImage}
                    />
                    <Text style={styles.ticketExtrasTitleText}>Extras</Text>
                  </View>
                  <View style={styles.ticketExtrasTitleAnsView}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.ticketExtrasTitleAnsText}>
                      {ticketData.extras}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.ticketIdMainView}>
                <Text style={styles.ticketIdTitleText}>Ticket ID</Text>
                <Text style={styles.ticketIdText}>{ticketId}</Text>
                <View style={styles.ticketBarcodeView}>
                  <Barcode value={ticketId} format="CODE128" />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.creditCardMainView}>
            <View style={styles.creditCardView}>
              <Image source={AppImages.card} style={styles.creditCardImage} />
              <Text style={styles.creditCardNumberText}>
                4000 2331 5875 1453
              </Text>
              <View style={styles.creditCardBottomSubView}>
                <View style={styles.creditCardNameView}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.creditCardNameText}>
                    BIN BURHAN
                  </Text>
                </View>
                <View style={styles.creditCardExDateNCvcView}>
                  <View style={styles.creditCardExDateView}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.creditCardExDateText}>
                      EX Date : 02/22
                    </Text>
                  </View>
                  <View style={styles.creditCardCvcView}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.creditCardCvcText}>
                      CVC : 351{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.creditCardNPaypalBtnView}>
            <View style={styles.creditCardBtnMainView}>
              <View style={styles.creditCardBtnView}>
                <View style={styles.creditCardCheckBtnView}>
                  <Image
                    source={AppImages.checkedpink}
                    style={styles.creditCardCheckImage}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.creditCardBtnText}>
                  Credit Cards
                </Text>
              </View>
            </View>
            <View style={styles.payPalBtnMainView}>
              <View style={styles.payPalBtnView}>
                <View style={styles.paypalBtnImgView}>
                  <Image
                    source={AppImages.unchecked}
                    style={styles.paypalBtnImage}
                  />
                </View>
                <Image source={AppImages.paypal} style={styles.paypalLogo} />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.payPalBtnTxt}>
                  {' '}
                  PayPal
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.skrillBtnMainView}>
            <View style={styles.skrillBtnSubView}>
              <View style={styles.skrillBtnView}>
                <View style={styles.skrillBtnCheckImgView}>
                  <Image
                    source={AppImages.unchecked}
                    style={styles.skrillBtnCheckImage}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.skrillBtnText}>
                  Skrill
                </Text>
              </View>
            </View>
          </View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.cardInformationText}>
            {' '}
            Card Information
          </Text>
          <View style={styles.nameTextInputView}>
            <TextInput
              placeholder={'Name'}
              placeholderTextColor={'#707070'}
              style={styles.nameTextInput}
              value={creditCard.name}
              onChangeText={this.handleCreditCardData('name')}
            />
          </View>
          <View style={styles.cardNoTextInputView}>
            <TextInput
              placeholder={'Card No'}
              placeholderTextColor={'#707070'}
              style={styles.cardNoTextInput}
              value={creditCard.number}
              onChangeText={this.handleCreditCardData('number')}
            />
            <Image source={AppImages.visa} style={styles.visaImage} />
          </View>
          <View style={styles.cvcNExpDate}>
            <View style={styles.cvcView}>
              <View style={styles.cvcTextInputView}>
                <TextInput
                  placeholder={'CVS'}
                  placeholderTextColor={'#707070'}
                  style={styles.cvcTextInput}
                  value={creditCard.cvs}
                  onChangeText={this.handleCreditCardData('cvs')}
                />
              </View>
            </View>
            <View style={styles.exDateView}>
              <View style={styles.exDateTextInputView}>
                <TextInput
                  placeholder={'Ex Date'}
                  placeholderTextColor={'#707070'}
                  style={styles.exDateTextInput}
                  value={creditCard.expiry}
                  onChangeText={this.handleCreditCardData('expiry')}
                />
              </View>
            </View>
          </View>
          <View style={styles.cardSaveView}>
            <TouchableOpacity onPress={() => this.handleCreditCardData('save')(!creditCard.save)} style={styles.cardSaveCheckMarkImage} >
              {this.renderSaveCardCheckBox()}
            </TouchableOpacity>
            <Text style={styles.cardSaveTextInput}>save the card</Text>
          </View>
          <View style={styles.completePaymentBtnView}>
            <TouchableOpacity disabled={isLoading} onPress={this.handleSubmit}>
              <View style={styles.completePaymentBtnSubView}>{
                isLoading ?
                  <View style={[styles.CompletePaymentText, { width: 180 }]}>
                    <ActivityIndicator color="white" />
                  </View> :
                  <Text style={styles.CompletePaymentText}>COMPLETE PAYMENT</Text>
              }
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSafeArea} />
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
  };
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};
function WrapTicketBuy(props: any) {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ currentUser, isLoading }) => (
          <TicketBuy currentUser={currentUser} {...props} />
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(WrapTicketBuy);

// export default TicketBuy;