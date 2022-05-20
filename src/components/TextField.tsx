import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Dimensions, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  label: String;
  name: String;
  control?: Control<any>;
  isSecure: Boolean;
  error: FieldError;
  keyboardType: String;
  textInputStyle: any;
}

const TextField: React.FC<Props> = (props: Props) => {
  const { name, control, isSecure, error, label, keyboardType, textInputStyle } = props;
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
              <TextInput
                style={textInputStyle}
                mode="outlined"
                keyboardType={keyboardType}
                activeOutlineColor={"#303030"}
                label={label}
                autoCapitalize={"none"}
                secureTextEntry={isSecure && !isShowingPassword}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
              {isSecure && (
                <TouchableOpacity
                  style={styles.showHidePasswordButton}
                  onPress={() => setShowPassword()}
                >
                  <Ionicons
                    name={isShowingPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#303030"
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
        name={name}
        rules={{ required: true }}
      />
      {error && (
        <Text style={styles.errorText}>This is required.</Text>
      )}
    </View>
  );
};

TextField.defaultProps = {
    label: 'label',
    name: 'label',
    isSecure: false,
}

const styles = StyleSheet.create({
  container: {
    marginBottom: (1 * height) / 100,
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