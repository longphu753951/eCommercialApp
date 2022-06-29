import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  onChangeValue(number: number): void;
  defaultCount: number;
}

const IncrementButton: React.FC<Props> = (props: Props) => {
  const {onChangeValue, defaultCount } = props;
  const [count, setCount] = useState(defaultCount);



  useEffect(() => {
    onChangeValue(count);
  }, [count]);

  useEffect(() => {
    setCount(defaultCount);
    onChangeValue(defaultCount);
  }, [defaultCount])

  const onChangeCount = (status: string) => {
    let value = status === "i" ? count + 1 : count - 1;
    if (value < 1 || value > 12) return;
    setCount(value);
  };

  const pad = (number: number) => {
    return number < 10 ? "0" + number.toString() : number.toString();
  };

  return (
    <View style={styles.icrementButtonContainer}>
      <TouchableOpacity
        disabled={count === 1}
        style={styles.button}
        onPress={() => onChangeCount("d")}
        onLongPress= {() => onChangeCount("d")}
      >
        <AntDesign name="minus" size={(height * 1.72) / 100} color="black" />
      </TouchableOpacity>
      <Text style={styles.countNumber}>{pad(count)}</Text>
      <TouchableOpacity
        disabled={count === 12}
        style={styles.button}
        onPress={() => onChangeCount("i")}
        onLongPress= {() => onChangeCount("i")}
      >
        <AntDesign name="plus" size={(height * 1.72) / 100} color="black" />
      </TouchableOpacity>
    </View>
  );
};

IncrementButton.defaultProps = {
  onChangeValue: () => {},
  defaultCount: 1,
}

const styles = StyleSheet.create({
  button: {
    width: (height * 3.69) / 100,
    height: (height * 3.69) / 100,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icrementButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countNumber: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (height * 2.21) / 100,
    marginHorizontal: (width * 4) / 100,
  },
});

export default IncrementButton;
