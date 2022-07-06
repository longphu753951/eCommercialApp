import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { FCKeyBoardAvoidingView } from "components";
import { styles, width, height } from "./SignUpStyles";
import {
  ChooseAvatarForm,
  TypeTelephoneForm,
  TypeOTPForm,
  TypePasswordForm,
  TypeInformationForm
} from "./components";

import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { signupRoutine, typePhoneRoutine } from "reducers/auth";

const FIREBASE_CONFIG: any = {
  apiKey: "AIzaSyBOJw-7JcmZrua6IS0OWWKCyOwV6LtFt2s",
  authDomain: "ecommercial-8d9ee.firebaseapp.com",
  projectId: "ecommercial-8d9ee",
  storageBucket: "ecommercial-8d9ee.appspot.com",
  messagingSenderId: "213082501110",
  appId: "1:213082501110:web:f93b9dad0ed631ae2a21d7",
  measurementId: "G-BRSDBV7BPE",
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

const auth = getAuth();

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [screenIndex, setScreenIndex] = useState(0);
  const [verificationId, setVerificationId] = React.useState("");
  const [telephone, setTelephone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [data, setData]= useState({});
  const [username, setUsername] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const recaptchaVerifier = useRef(null);

  const onChangeScreen = (number: number) => {
    const index = screenIndex + number;
    scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    setScreenIndex(index);
  };

  const onSubmitAva = (ava: React.SetStateAction<null>) => {
    setAvatar(ava);
    onChangeScreen(1);
  }

  const onSubmitTelephone = async (telephone: any): Promise<void> => {
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+84933501450",
        // @ts-ignore
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setTelephone(telephone)
    } catch (err) {
      return;
    }
    onChangeScreen(1);
  };

  const onSubmitOTP = async (otp: string): Promise<void> => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      const authResult = await signInWithCredential(auth, credential);
      setUsername(authResult.user.uid);
      if(!authResult){
        throw "No OTP receive"
      }
      onChangeScreen(1);
    }catch(e) {
      Alert.alert('Error', 'Error');
    }
  };

  const onSubmitInfo = (data: object) => {
    setData(data);
    onChangeScreen(1);
  }

  const onRegister = async (password: string): Promise<void> => {
    let dataRegister = data;
    dataRegister["password"] = password;
    dataRegister['username'] = username;
    dataRegister["telephone"] = telephone;
    dataRegister["avatar"] = avatar;
    await dispatch({type: signupRoutine.TRIGGER, data: dataRegister});
    navigation.navigate('CompleteScreen');
  }  

  return (
    <FCKeyBoardAvoidingView loading={loading} style={styles.container}>
      <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FIREBASE_CONFIG}
      />
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        bounces={false}
        scrollEnabled={false}
        pagingEnabled={true}
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
      >
        <TypeTelephoneForm
          submit={(telephone) => onSubmitTelephone(telephone)}
        />
        <TypeOTPForm
          submit={(otp) => onSubmitOTP(otp)}
          goBack={() => onChangeScreen(-1)}
        />
        <ChooseAvatarForm onSubmitAva={async (ava) => onSubmitAva(ava)} />
        <TypeInformationForm
          submit={(data) => onSubmitInfo(data)}
          goBack={() => onChangeScreen(-1)}
        />
        <TypePasswordForm 
          submit={(data) => onRegister(data)}
          goBack={() => onChangeScreen(-1)}
        />
      </ScrollView>
    </FCKeyBoardAvoidingView>
  );
};
