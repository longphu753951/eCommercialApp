import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  label: string;
  name: string;
  control?: Control<any>;
  isSecure: Boolean;
  error: FieldError;
  keyboardType: string;
  textInputStyle: any;
  rules: any;
  mode: string;
}

const TextField: React.FC<Props> = (props: Props) => {
  const {
    name,
    control,
    isSecure,
    error,
    label,
    keyboardType,
    textInputStyle,
    rules,
    mode
  } = props;
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const setShowPassword = () => {
    setIsShowingPassword(!isShowingPassword);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.textInputContainer}>
              {/* @ts-ignore */}
              <TextInput
                style={textInputStyle}
                mode={mode}
                keyboardType={keyboardType}
                activeOutlineColor={"#303030"}
                label={label}
                autoCapitalize={"none"}
                returnKeyLabel={"next"}
                autoCorrect={false} 
                right={
                  isSecure && (
                    <TextInput.Icon
                      color="#303030"
                      onPress={() => setShowPassword()}
                      name={isShowingPassword ? "eye" : "eye-off"}
                    />
                  )
                }
                secureTextEntry={isSecure && !isShowingPassword}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            </View>
          </>
        )}
        name={name}
        rules={rules}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

TextField.defaultProps = {
  label: "label",
  name: "label",
  isSecure: false,
  mode: "outlined"
};

const styles = StyleSheet.create({
  container: {
    marginBottom: (0.5 * height) / 100,
    height: (height * 8.86) / 100,
  },
  showHidePasswordButton: {
    width: (height * 3.69) / 100,
    height: (height * 3.69) / 100,
    position: "absolute",
    right: (width * 4.26) / 100,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  errorText: {
    marginTop: (height * 0.6) / 100,
    marginLeft: (width * 3) / 100,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

export default TextField;
