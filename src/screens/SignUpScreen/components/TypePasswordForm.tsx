import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller, UseFormRegister, Control } from "react-hook-form";
import { TextField } from "components";
import { styles, width, height } from "../SignUpStyles";

interface Props {
  submit(): void;
  goBack(): void;
}

const defaultProps = {
  submit: () => {},
};

const TypePasswordForm: React.FC<Props> = (props: Props) => {
  const { submit, goBack } = props;
  const navigation = useNavigation();

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    submit();
  };

  return (
    <View
      style={{
        flexDirection: "column",
        width: width,
        flex: 1,
        paddingHorizontal: (width * 5.33) / 100,
      }}
    >
      <View style={{ alignItems: "center", width: "100%" }}>
        <Image
          resizeMode="contain"
          style={{ height: (height * 30.66) / 100 }}
          source={require("assets/images/image2.png")}
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
          Step 2
        </Text>
        <Text
          style={{
            fontFamily: "NunitoSans-SemiBold",
            fontSize: 18,
            color: "#606060",
          }}
        >
          Type password
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: (1 * height) / 100 }}>
        <TextField
          textInputStyle={{ width: "100%" }}
          control={control}
          label={"Password"}
          name={"password"}
          error={errors.password}
        />
        <TextField
          textInputStyle={{ width: "100%" }}
          control={control}
          label={"Password Confirm"}
          name={"passwordConfirm"}
          error={errors.passwordConfirm}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style= {{width: '100%'}}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => goBack()}
          >
            <Text style={styles.buttonText}>Go back</Text>
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

TypePasswordForm.defaultProps = defaultProps;

export default TypePasswordForm;
