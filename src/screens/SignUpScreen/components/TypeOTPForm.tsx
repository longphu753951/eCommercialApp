import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller, UseFormRegister, Control } from "react-hook-form";
import { TextField } from "components";
import { styles, width, height } from "../SignUpStyles";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import Constants from "expo-constants";

interface Props {
  submit(): void;
  goBack(): void;
}

const defaultProps = {
  submit: () => {},
};
const auth = getAuth();

const TypeOTPForm: React.FC<Props> = (props: Props) => {
  const { submit, goBack } = props;
  const FIREBASE_CONFIG = Constants.manifest.extra.firebase;
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState("");

  useEffect(async () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+84933501450",
        // @ts-ignore
        recaptchaVerifier.current
      );
      
    } catch (err) {
      console.log('asd')
    }
  }, []);

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      telephone: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    submit();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
        justifyContent: "space-between",
        flexDirection: "column",
        paddingHorizontal: (width * 5.33) / 100,
        width: width,
      }}
    >
      <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FIREBASE_CONFIG}
      />
      <View style={{ alignItems: "center" }}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            resizeMode="contain"
            style={{ height: (height * 30.66) / 100 }}
            source={require("assets/images/image3.png")}
          />
        </View>
        <Text
          style={{
            fontFamily: "Gelasio-SemiBold",
            fontSize: (5.29 * height) / 100,
            color: "#303030",
            letterSpacing: (width * 0.5) / 100,
          }}
        >
          Almost done
        </Text>
        <Text
          style={{
            fontFamily: "NunitoSans-SemiBold",
            fontSize: (2.21 * height) / 100,
            color: "#606060",
            letterSpacing: (width * 0.13) / 100,
          }}
        >
          You will get a OTP via SMS
        </Text>
        <View
          style={{
            width: "100%",
            marginTop: (4.06 * height) / 100,
            alignItems: "center",
          }}
        >
          <TextField
            textInputStyle={{ width: "100%" }}
            control={control}
            label={"OTP"}
            name={"telephone"}
            error={errors.telephone}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.alreadyText}>Haven't received an OTP? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.signInText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => goBack()}
          >
            <Text style={styles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

TypeOTPForm.defaultProps = defaultProps;

export default TypeOTPForm;
