import DatePicker from "@dietime/react-native-date-picker";
import moment from "moment";
import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { height } from "screens/SignUpScreen/SignUpStyles";
import CustomModal from "./CustomModal";

const DateTimePickerModal = () => {
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  

  const closeModal = () => {
    console.log(visible)
    setVisible(false)
  };

  const Modal = () => {
    return (
      <CustomModal visible={visible} onClose= {closeModal}>
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
          value={date}
          onChange={(value: Date) => {
            const dateTime = (value.getMonth() + 1).toString() +"/"+ value.getFullYear().toString();
            
            setDate(value);
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
          onPress={() => console.log("abc")}
        >
          <Text style={styles.buttonText}>Add new card</Text>
        </TouchableOpacity>
      </CustomModal>
    );
  };

  const ButtonInput = () => {
    return (
    <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>abc</Text>
    </TouchableOpacity>
    );
  };
  return (
    <>
      <Modal />
      <ButtonInput />
    </>
  );
};

const styles =  StyleSheet.create({
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
});


export default DateTimePickerModal;