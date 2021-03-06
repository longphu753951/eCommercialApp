import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { TextField } from "components";
import { styles, width, height } from "../SignUpStyles";
import { nameRule, emailRule } from "services/inputRuleService";

interface Props {
  submit(data: object): void;
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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const onSubmit = async (data: object) => {
    submit(data);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: (width * 5.33) / 100,
        width: width,
      }}
    >
      <View style={{ alignItems: "center", width: "100%" }}>
        <Image
          resizeMode="contain"
          style={{ height: (height * 30.66) / 100 }}
          source={require("assets/images/image4.png")}
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
          Step 4
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
            name={"first_name"}
            rules={nameRule}
            error={errors.first_name}
          />
          <TextField
            textInputStyle={styles.nameInput}
            control={control}
            label={"Last name"}
            name={"last_name"}
            rules={nameRule}
            error={errors.last_name}
          />
        </View>
        <TextField
          textInputStyle={{ width: "100%", marginTop: (height * 0.5) / 100 }}
          control={control}
          label={"Email"}
          name={"email"}
          rules={emailRule}
          error={errors.email}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
          marginTop: (height * 4) / 100,
        }}
      >
        <View style={{ width: "100%" }}>
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
      </View>
    </View>
  );
};

TypePasswordForm.defaultProps = defaultProps;

export default TypePasswordForm;
