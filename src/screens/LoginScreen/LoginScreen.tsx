import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import size from '../../config/size';

export default class LoginScreen extends Component {
  render() {
    const {containerStyle} = styles;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'android' ? -200 : 0}
          contentContainerStyle={containerStyle}
          style={containerStyle}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: 315}}
                  resizeMode={'contain'}
                  source={require('../../assets/images/icon.png')}
                />
              </View>
              <View style={{marginLeft: size.h52, marginTop: 30.7}}>
                <Text
                  style={{
                    fontFamily: 'Gelasio-SemiBold',
                    fontSize: 30,
                    color: '#606060',
                  }}>
                  HELLO !
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gelasio-SemiBold',
                    fontSize: 30,
                    color: '#303030',
                    marginTop: size.h26,
                  }}>
                  WELCOME BACK
                </Text>
              </View>
              <View
                style={{
                  marginTop: 35,
                  marginHorizontal: size.h52,
                }}>
                <TextInput
                  mode="outlined"
                  activeOutlineColor={'#303030'}
                  label="Telephone"
                  onChangeText={text => console.log(text)}
                />
                <TextInput
                  style={{marginTop: 15}}
                  mode="outlined"
                  activeOutlineColor={'#303030'}
                  label="Password"
                  onChangeText={text => console.log(text)}
                />
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableOpacity style={{marginVertical: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'NunitoSans-Regular',
                      }}>
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: size.s50,
                      height: 40,
                      borderRadius: 4,
                      backgroundColor: '#212121',
                    }}
                    onPress={() => console.log('')}>
                    <Text
                      style={{
                        fontFamily: 'NunitoSans-Regular',
                        fontSize: 18,
                        width: '100%',
                        textAlign: 'center',
                        color: '#ffffff',
                      }}>
                      SIGN IN
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginVertical: 30,
                      fontSize: 15,
                    }}>
                    OR
                  </Text>
                  <View style={{width: '100%'}}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: 40,
                        borderRadius: 4,
                        backgroundColor: '#ffffff',
                        borderColor: '#212121',
                        borderWidth: 2,
                      }}
                      onPress={() => console.log('')}>
                      <View
                        style={{ flexDirection:'row',alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                          style={{
                            width: 27,
                            marginRight: 5,
                          }}
                          resizeMode="contain"
                          source={require('../../assets/images/GoogleIcon.png')}
                        />
                        <Text
                          style={{
                            fontFamily: 'NunitoSans-Regular',
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#212121',
                          }}>
                          COUNTINUE WITH GOOGLE
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: 40,
                        borderRadius: 4,
                        backgroundColor: '#ffffff',
                        borderColor: '#212121',
                        borderWidth: 2,
                        marginTop: 10,
                      }}
                      onPress={() => console.log('')}>
                      <View
                        style={{ flexDirection:'row',alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                          style={{
                            width: 40,
                            marginRight: 5,
                          }}
                          resizeMode="contain"
                          source={require('../../assets/images/FacebookIcon.png')}
                        />
                        <Text
                          style={{
                            fontFamily: 'NunitoSans-Regular',
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#212121',
                          }}>
                          COUNTINUE WITH FACEBOOK
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: 40,
                        borderRadius: 4,
                        backgroundColor: '#ffffff',
                        borderColor: '#212121',
                        borderWidth: 2,
                        marginTop: 10,
                      }}
                      onPress={() => console.log('')}>
                      <View
                        style={{ flexDirection:'row',alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                          style={{
                            width: 36,
                            marginRight: 5,
                          }}
                          resizeMode="contain"
                          source={require('../../assets/images/TwitterIcon.jpeg')}
                        />
                        <Text
                          style={{
                            fontFamily: 'NunitoSans-Regular',
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#212121',
                          }}>
                          COUNTINUE WITH TWITTER
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
};
