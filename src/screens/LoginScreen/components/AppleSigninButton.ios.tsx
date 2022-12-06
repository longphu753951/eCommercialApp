import {View, Text, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {useFirebase} from 'react-redux-firebase';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AppleSigninButton = () => {
  const firebase = useFirebase();
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    console.log(identityToken);
    const credential = auth.AppleAuthProvider.credential(identityToken, nonce);
    console.log(auth().signInWithCredential(credential));
  };

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE_OUTLINE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: (width * 89.06) / 100,
        borderWidth: 3,
        borderRadius: 4,
        marginBottom: (1.35 * height) / 100,
        height: (height * 5.54) / 100,
      }}
      onPress={() =>
        firebase.login({
          provider: 'apple.com',
          type: 'redirect',
        })
      }
    />
  );
};

export default AppleSigninButton;
