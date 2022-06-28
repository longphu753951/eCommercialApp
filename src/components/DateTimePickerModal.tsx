import DatePicker from "@dietime/react-native-date-picker";
import moment from "moment";
import { Control, Controller, FieldError } from "react-hook-form";
import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { height, width } from "screens/SignUpScreen/SignUpStyles";
import CustomModal from "./CustomModal";


interface Props {
  inputStyle: any;
  name: string;
  control?: Control<any>;
  error: FieldError;
  rules: any;
}

const DateTimePickerModal = (props: Props) => {
  const { inputStyle, control, error, rules, name } = props;
  const [date, setDate] = useState("XX/XXXX");
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    console.log(visible);
    setVisible(false);
  };

  const Modal = () => {
    let dateTime = "";
    return (
      <CustomModal visible={visible} onClose={closeModal}>
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 80,
                  paddingVertical: 20,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 24 }}>Year</Text>
                <Text style={{ fontSize: 24 }}>Month</Text>
              </View>

              <DatePicker
                height={200}
                startYear={moment().year()}
                endYear={2099}
                
                value={new Date()}
                onChange={(value: Date) => {
                  dateTime =
                    (value.getMonth() + 1).toString() +
                    "/" +
                    value.getFullYear().toString();
                }}
                format="mm-yyyy"
              />
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: "85%",
                    marginTop: 50,
                    marginHorizontal: 20,
                    backgroundColor: "#212121",
                  },
                ]}
                onPress={() => {
                  setDate(dateTime);
                  onChange(dateTime);
                  closeModal();
                }}
              >
                <Text style={styles.buttonText}>Add new card</Text>
              </TouchableOpacity>
            </>
          )}
          name={name}
          rules={rules}
        />
      </CustomModal>
    );
  };

  const ButtonInput = () => {
    return (
      <View>
        {/* @ts-ignore */}
        <TextInput
          style={[{ backgroundColor: "white" }, inputStyle]}
          mode={"outlined"}
          editable={false}
          onPressIn={() => setVisible(true)}
          activeOutlineColor={"#303030"}
          label={"DateTime"}
          autoCapitalize={"none"}
          returnKeyLabel={"next"}
          autoCorrect={false}
          value={date}
        />
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    );
  };
  return (
    <>
      <Modal />
      <ButtonInput />
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    height: (height * 5.54) / 100,
    borderRadius: 4,
  },
  errorText: {
    marginTop: (height * 0.6) / 100,
    marginLeft: (width * 3) / 100,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

export default DateTimePickerModal;
