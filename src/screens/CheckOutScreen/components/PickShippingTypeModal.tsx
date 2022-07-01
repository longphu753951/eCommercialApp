import DatePicker from "@dietime/react-native-date-picker";
import moment from "moment";
import { Control, Controller, FieldError } from "react-hook-form";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { height, width } from "screens/SignUpScreen/SignUpStyles";
import { CustomModal } from "components";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  //   inputStyle: any;
  //   name: string;
  //   control?: Control<any>;
  //   error: FieldError;
  //   rules: any;
  isOpen: boolean;
  onClose(): void;
}

const PickShippingTypeModal = (props: Props) => {
  const { isOpen, onClose } = props;
  console.log(isOpen)
  const [visible, setVisible] = useState(isOpen);
  const [screenIndex, setScreenIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  

  const onChangeScreen = (number: number) => {
    const index = screenIndex + number;
    scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    setScreenIndex(index);
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);
  const closeModal = () => {
    onClose();
    setVisible(false);
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.13:8000/shippingUnit/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const Modal = () => {
    return (
      <CustomModal visible={visible} onClose={closeModal}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          bounces={false}
          scrollEnabled={true}
          pagingEnabled={true}
          style={{ flex: 1, backgroundColor: "blue" }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flex: 1, backgroundColor: "red", width: width }}>
            <TouchableOpacity onPress={() => {onChangeScreen(1)}}><Text>asdasd</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: "green", width: width }}>
            <Text>adas</Text>
          </View>
        </ScrollView>
      </CustomModal>
    );
  };

  return <Modal />;
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

PickShippingTypeModal.defaultProps = {
  isOpen: false,
};

export default PickShippingTypeModal;
