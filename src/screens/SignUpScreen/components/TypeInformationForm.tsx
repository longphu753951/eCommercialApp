import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller, UseFormRegister, Control } from "react-hook-form";
import { TextField } from "components";
import { styles, width, height } from "../SignUpStyles";
import * as inputRule from "services/inputRuleService";

interface Props {
  submit(): void;
}

const defaultProps = {
  submit: () => {},
};

const TypeInformationForm: React.FC<Props> = (props: Props) => {
  const { submit } = props;
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);

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
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: (width * 5.33) / 100,
        width: (width),
      }}
    >
      <View style={{ alignItems: "center", width: "100%" }}>
        <Image
          resizeMode="contain"
          style={{ height: (height * 30.66) / 100 }}
          source={require("assets/images/image1.png")}
        />
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Gelasio-SemiBold",
            fontSize: 43,
            color: "#303030",
          }}
        >
          Step 1
        </Text>
        <Text
          style={{
            fontFamily: "NunitoSans-SemiBold",
            fontSize: 18,
            color: "#606060",
          }}
        >
          Type your information here
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: (1 * height) / 100 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            textInputStyle={styles.nameInput}
            control={control}
            label={"First name"}
            name={"firstName"}
            rules={inputRule.nameRule}
            error={errors.firstName}
          />
          <TextField
            textInputStyle={styles.nameInput}
            control={control}
            label={"Last name"}
            name={"lastName"}
            rules={inputRule.nameRule}
            error={errors.lastName}
          />
        </View>
        <TextField
          textInputStyle={{ width: "100%", marginTop: (height * 0.5) / 100 }}
          control={control}
          label={"Email"}
          name={"email"}
          rules={inputRule.emailRule}
          error={errors.email}
        />
        <TextField
          textInputStyle={{ width: "100%", marginTop: (height * 0.5) / 100 }}
          control={control}
          label={"Telephone"}
          name={"telephone"}
          rules={inputRule.telephoneRule}
          error={errors.telephone}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.signInWithButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signInWithButton]}
            onPress={() => navigation.navigate("tabNavigation")}
          >
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("assets/images/apple-logo.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signInWithButton]}
            onPress={() => navigation.navigate("tabNavigation")}
          >
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("assets/images/google-logo.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signInWithButton]}
            onPress={() => navigation.navigate("tabNavigation")}
          >
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("assets/images/facebook-logo.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.alreadyText}>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

TypeInformationForm.defaultProps = defaultProps;

export default TypeInformationForm;
