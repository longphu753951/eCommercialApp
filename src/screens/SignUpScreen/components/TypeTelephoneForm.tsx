import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField } from "components";
import { styles, width, height } from "../SignUpStyles";
import * as inputRule from "services/inputRuleService";

interface Props {
  submit(telephone: string): void;
}

const defaultProps = {
  submit: () => {},
};

const TypeTelephoneForm: React.FC<Props> = (props: Props) => {
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
      telephone: "",
    },
  });

  const onSubmit = async (data) => {
    
    submit(data.telephone);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: (width * 5.33) / 100,
        width: width,
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginTop: (height * 3) / 100 }}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            resizeMode="contain"
            style={{ height: (height * 30.66) / 100 }}
            source={require("assets/images/image1.png")}
          />
        </View>
        <Text
          style={{
            fontFamily: "Gelasio-SemiBold",
            fontSize: 43,
            color: "#303030",
            marginTop: (height * 2) / 100
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
          Type your telephone here
        </Text>

        <TextField
          textInputStyle={{ width: "100%", marginTop: (height) / 100 }}
          control={control}
          label={"Telephone"}
          name={"telephone"}
          keyboardType={"phone-pad"}
          rules={inputRule.telephoneRule}
          error={errors.telephone}
        />
        <View style={{ marginTop: (height * 3) / 100 }}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.alreadyText}>Already have account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

TypeTelephoneForm.defaultProps = defaultProps;

export default TypeTelephoneForm;
